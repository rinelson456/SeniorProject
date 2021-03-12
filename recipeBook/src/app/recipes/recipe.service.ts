import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[];
    private ingredient: Ingredient[];

    private recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService, private http: HttpClient) {
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes; 
        console.log(this.recipes)
        this.recipesChanged.next(this.recipes.slice());
    }

    
    getRecipes(currentPage: number){
        this.ingredient = this.slService.getIngredients();
        let ingredientArray: any[] = [];
        for(let j= 0; j < this.ingredient.length; j++){
            ingredientArray[j] = this.ingredient[j].name
        }
        const queryParams = `?i=${ingredientArray}&page=${currentPage}`;
        return this.http
        .get('http://localhost:3000/recipes/' + queryParams).subscribe(
            // success method
            (recipes: any[] ) => {
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