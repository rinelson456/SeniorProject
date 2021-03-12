import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string){
        console.log(password);
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzC1ac22IDZnzdGnZR98oVkJ_g0Kzc19E',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError), tap(resData => {
                    this.HandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzC1ac22IDZnzdGnZR98oVkJ_g0Kzc19E',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError), tap(resData => {
                    this.HandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }));
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenTimer){
            clearTimeout(this.tokenTimer);
        }
        this.tokenTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenTimer = setTimeout(()=> {
            this.logout();
        }, expirationDuration)
    }

    private HandleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000000000000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured!'
                if(!errorRes.error || !errorRes.error.error){
                   return throwError(errorMessage); 
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS': 
                    errorMessage = 'This email is being used by someone else!';
                    break;
                    case 'EMAIL_NOT_FOUND': 
                    errorMessage = 'This email is not associated with a user!';
                    break;
                    case 'INVALID_PASSWORD': 
                    errorMessage = 'Password is incorrect!';
                    break;
                }
                return throwError(errorMessage);
    }
}

