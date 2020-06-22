import { AuthData } from './../models/auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token:string;
  private isAuth = false;
  private authStatus = new Subject<boolean>();
  private tokenTimer:any
  private currentUserData;
  me;
 

  constructor(private http: HttpClient, private router:Router) { }

  getToken() {
    return this.token;
  }
  getAuthStatus(){
    return this.authStatus.asObservable()
  }
  getIsAuth(){
    return this.isAuth;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("https://url-shrinker-auth.herokuapp.com/users", authData)
      .subscribe(response => {
        this.router.navigate(["/"])
        console.log(response);
      }, err => {
        alert(err.error.message)
        this.router.navigate(["/"])
      })
  }

  loginUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{user:any, token:string, expiresIn:number}>("https://url-shrinker-auth.herokuapp.com/users/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          this.me = email;
          const expiresInSec = response.expiresIn;
          this.setAuthTimer(expiresInSec);
          this.isAuth = true;
          this.authStatus.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInSec * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/dashboard"])
        }
      }, err => {
        alert(err.error.message)
        window.location.reload()
      })
  }

  currentUser(){
    this.http.get('https://url-shrinker-auth.herokuapp.com/users/current-user')
    .subscribe(userData => {
    this.currentUserData = userData
    })
  }


  logout(){
    this.http.post<{message:string}>('https://url-shrinker-auth.herokuapp.com/users/logout', this.currentUserData)
    .subscribe(data =>{
      console.log(data.message);
      this.token = null;
      this.isAuth = false;
      this.authStatus.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(["/"]);  
    })
    
  }


  checkAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuth= true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatus.next(true);
    }
  }


  resend(email:string){
    this.http.post('https://url-shrinker-auth.herokuapp.com/resend-mail', email)
    .subscribe(res => {
      alert(res['message'])
      this.router.navigate(["/"]);
    }, 
    err => {
      console.log(err)
    })
  }


  forgotPass(email:string){
    this.http.post('https://url-shrinker-auth.herokuapp.com/forgot-pass', email)
    .subscribe(res => {
      console.log(res)
      this.router.navigate(["/"])
    },
    err => {
      console.log(err)
    })
  }


  verifyForgot(token, email){
    return this.http.get(`https://url-shrinker-auth.herokuapp.com/verify-pass-reset/${token}/${email}`)
  }

  resetPass(data:any){
    this.http.post('https://url-shrinker-auth.herokuapp.com/reset-pass', data)
    .subscribe(res => {
    console.log(res)
    }, err => {
      console.log(err)
    })
    this.router.navigate(["/"])
  }


  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
