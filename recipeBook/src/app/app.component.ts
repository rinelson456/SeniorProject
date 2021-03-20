import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../app/Shared/ingredient.model'
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './Shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private dSService: DataStorageService){}

  ngOnInit(){
    this.authService.autoLogin();
  }
}
