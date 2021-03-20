import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../Shared/data-storage.service';
import { Ingredient } from '../Shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private igChange: Subscription;
  constructor(private dSService: DataStorageService, private sLService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.sLService.getIngredients();
    if(this.ingredients.length == 0){
      this.dSService.fetchIngredients();
    }
    this.igChange = this.sLService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number){
    this.sLService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChange.unsubscribe();
  }
}
