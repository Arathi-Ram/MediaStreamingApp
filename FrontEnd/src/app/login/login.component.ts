import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  userLogged:any;
  constructor(
    private formBuilder:FormBuilder,
    private _auth:AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$")])]

    });
  }
  loginUser(){
    // console.log(this.loginForm.value);
    
    this._auth.login(this.loginForm.value)
    .subscribe({
      next: (res) =>
          {
            this.userLogged = res
            if(this.userLogged.role === "Root User"){
              localStorage.setItem("rootLoginTok", this.userLogged.token);
              this._router.navigate(['rootUserDash']);
            }
            // console.log(res);
          },
      error: (err)=>{
            console.log(err);
            
          }
    })
  }
}
