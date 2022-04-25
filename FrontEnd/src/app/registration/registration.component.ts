import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import {AuthService} from '../auth.service'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signupForm!:FormGroup;
  // serverError:boolean = false;
  serverErrorMsg : any ;
  showSuccessMsg:boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private _auth:AuthService,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$")])],

    });
  }

  signupUser(){
    this._auth.registerUser(this.signupForm.value)
    .subscribe({
      next:(res)=>{ 
                  this.showSuccessMsg = true;

              },
      error:(err)=>{
        if(err.status === 422){
          this.serverErrorMsg = err.error.error;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          // console.log(err.error.error);
          
        }
        else{
          this.serverErrorMsg = "Something went wrong. Please contact Admin or Try Again.";
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        // this.serverError = true;
        // this.serverErrorMsg = "E-mail address already registered!";
      },    
    });
    // this._router.navigate(['login'])
  }
}
