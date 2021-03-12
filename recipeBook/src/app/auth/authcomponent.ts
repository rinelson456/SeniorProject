import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    isLoginMode = true;
    error: string = null;

    constructor(private authService: AuthService, private router: Router){

    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode){
            this.authService.login(email, password).subscribe(resData=> {
                console.log(resData);
                this.router.navigate(['/miPantry'])
            },
            errorMessage => {
                this.error= errorMessage
                console.log(errorMessage);
            });
        } 
        else{ 
            this.authService.signup(email, password).subscribe(resData=> {
                console.log(resData);
                this.router.navigate(['/miPantry'])
            }
            ,
            errorMessage => {
                this.error= errorMessage
                console.log(errorMessage);
            });
        }

        form.reset();
    }
}