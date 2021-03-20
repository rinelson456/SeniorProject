import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../Shared/data-storage.service';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[];
    private ingredient: Ingredient[];

    private recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService, private http: HttpClient, private dsService: DataStorageService) {
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes; 
        console.log(this.recipes)
        this.recipesChanged.next(this.recipes.slice());
    }

    
    getRecipes(currentPage: number){
        let length;
        this.ingredient = this.slService.getIngredients();
        if(this.ingredient.length == 0){
             this.http
            .get('https://wdd430-cf305.firebaseio.com/pantryItems.json').subscribe(
                // success method
                (ingredients: any[] ) => {
                  let ingredientString = JSON.stringify(ingredients);
                  let parse = JSON.parse(ingredientString);
                  length = parse.length
                  for(let i = 0; i < length; i++){
                    this.ingredient[i] = ({
                        name: parse[i].name,
                        amount: parse[i].amount
                    }); 

                    this.slService.ingredientsChanged.next(this.ingredient.slice()); 
                  }     
              },
                // error method
                (error: any) => {
                   console.log(error);
                });
        }

        // let ingredientArray: any[] = [];

        // console.log(this.ingredient) 

        // for(let j= 0; j < 10; j++){
        //     console.log('here1')
        //     console.log(this.ingredient[j])
        //     ingredientArray[j] = this.ingredient[j].name
        //     console.log(ingredientArray[j])
        // }
        console.log(this.ingredient)
        const queryParams = `?i=${this.ingredient}&page=${currentPage}`;
        return this.http
        .get('http://localhost:3000/recipes/' + queryParams).subscribe(
            // success method
            (recipes: any[] ) => {
                console.log('http://localhost:3000/recipes/' + queryParams);
              let recipeString = JSON.stringify(recipes);
              let parse = JSON.parse(recipeString);
              for(let i = 0; i < 10; i++){
                this.recipes[i] = ({
                  name: parse.results[i].title,
                  description: parse.results[i].href,
                  imagePath: parse.results[i].thumbnail,
                  ingredients: parse.results[i].ingredients
                }); 
                this.recipesChanged.next(this.recipes.slice()); 
              }     
          },
            // error method
            (error: any) => {
               console.log(error);
            }); 
    }


    getRecipe(index: number){
        console.log(this.recipes)
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updatedRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}