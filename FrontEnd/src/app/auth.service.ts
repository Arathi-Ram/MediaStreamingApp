// This File handles services related to authentication & Authorization

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private _data : DataService
  ) { }

  registerUser(user:any){
    return this.http.post("http://localhost:3000/auth/signup",user);
  }
  login(user:any){
    return this.http.post("http://localhost:3000/auth/signin",user);
  }
  // Function to get the token of user or admin loggedIn: 
    getToken(){
      return localStorage.getItem('TOKEN');
    }

    isLoggedIn(){
      return !!localStorage.getItem('TOKEN');
    }

    
}
