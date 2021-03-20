import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class DataStorageService{
    constructor(private http: HttpClient, private slService: ShoppingListService, private authService: AuthService){

    }

    ingredients: Ingredient[] = [];

    storeIngredients(){
        const ingredients = this.slService.getIngredients();
        this.http.put('https://wdd430-cf305.firebaseio.com/pantryItems.json', ingredients).subscribe(response => {
            console.log(response);
        });
    }

    fetchIngredients(){
        return this.http
        .get<Ingredient[]>('https://wdd430-cf305.firebaseio.com/pantryItems.json').subscribe(
            // success method
            (ingredient: any[] ) => {
              let ingredientString = JSON.stringify(ingredient);
              let parse = JSON.parse(ingredientString);
              let length = parse.length
              for(let i = 0; i < length; i++){
                this.ingredients[i] = ({
                  name: parse[i].name,
                  amount: parse[i].amount
                }); 
                this.slService.ingredientsChanged.next(this.ingredients.slice()); 
              }     
          },
            // error method
            (error: any) => {
               console.log(error);
            });
          }
}
