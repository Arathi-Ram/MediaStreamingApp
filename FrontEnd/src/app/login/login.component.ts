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
  serverErrorMsg : any  = '';

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
            if(this.userLogged.roles[0] === 1111){
              localStorage.setItem("TOKEN", this.userLogged.token);
              localStorage.setItem("Id",this.userLogged.userLogged._id);
              console.log(`root user ${this.userLogged.roles[0]}`);
              
              this._router.navigate(['rootUserDash']);
            }
            else if(this.userLogged.roles[0] === 3333){
              localStorage.setItem("TOKEN",this.userLogged.token);
              localStorage.setItem("Id",this.userLogged.userLogged._id);
              this._router.navigate(['userDashboard'])
            }
            // this.userLogged.roles[0] === 5555
            else{
              localStorage.setItem("TOKEN",this.userLogged.token);
              localStorage.setItem("Id",this.userLogged.userLogged._id);
              this._router.navigate(['adminDashboard'])
            }
            console.log(res);
          },
      error: (err)=>{
        if(err.status === 422){
          this.serverErrorMsg = err.error.error;
          console.log(err.error.error);         
        }   
        else if (err.status === 404){
          this.serverErrorMsg = err.error.error;
          console.log(err.error.error);
        }     
        setTimeout(() => {
          this.serverErrorMsg = ''
        }, 3000);
            
      }
    });
  }
}
