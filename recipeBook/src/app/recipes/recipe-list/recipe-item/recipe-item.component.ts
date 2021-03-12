import { Component, OnInit, Input } from '@angular/core';
import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;
  @Input() index: number;

  constructor(private dSService: DataStorageService) { }

  ngOnInit(): void {

  }

  // onSaveData(){
  //   this.dSService.storeRecipes();
  // }

}
