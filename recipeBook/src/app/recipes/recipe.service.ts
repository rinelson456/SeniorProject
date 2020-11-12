import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[];

    private recipes: Recipe[] = [new Recipe('Burger', 'Great Burger', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCstGnwN8sGGaLNG9i02mRyKsTs0F_Eb_GaQ&usqp=CAU', 
        [ new Ingredient('Meat', 1), 
            new Ingredient('French Fries', 20)]),
                                new Recipe('Hot Dog', 'Great Hotdog', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCstGnwN8sGGaLNG9i02mRyKsTs0F_Eb_GaQ&usqp=CAU', 
                                    [ new Ingredient('Buns', 2),
                                    new Ingredient('Meat', 1)])];
    constructor(private slService: ShoppingListService) {
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes; 
        console.log(this.recipes)
        this.recipesChanged.next(this.recipes.slice());
    }
    
    getRecipes() {
        return this.recipes.slice();
    }


    getRecipe(index: number){
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