import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class DataStorageService{
    constructor(private http: HttpClient, private slService: ShoppingListService, private authService: AuthService){

    }

    storeIngredients(){
        const ingredients = this.slService.getIngredients();
        this.http.put('https://wdd430-cf305.firebaseio.com/pantryItems.json', ingredients).subscribe(response => {
            console.log(response);
        });
    }

    fetchIngredients(){
        return this.http
        .get<Ingredient[]>(
          'https://wdd430-cf305.firebaseio.com/pantryItems.json',
        ).pipe(
          map(ingredients => {
            return ingredients.map(ingredients => {
              return {
                ...ingredients,
              };
            });
          })
        )
        .subscribe(ingredients => {
          this.slService.setIngredients(ingredients);
        });
  }
}
