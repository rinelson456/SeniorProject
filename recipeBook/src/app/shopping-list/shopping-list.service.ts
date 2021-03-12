
import { Subject } from 'rxjs';

import { Ingredient } from '../Shared/ingredient.model';

export class ShoppingListService {
    startedEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [ new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 15)];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
    
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    setIngredients(ingredients: Ingredient[]){
        this.ingredients = ingredients; 
        console.log(this.ingredients)
        this.ingredientsChanged.next(this.ingredients.slice());
    }
     
}