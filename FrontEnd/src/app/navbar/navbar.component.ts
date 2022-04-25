import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public _auth : AuthService,
    private _data : DataService
  ) { }
  // Variables : 
  isRootUser !: Boolean;
  isAdmin !: Boolean;
  isUser !: Boolean;
  role : any;

  ngOnInit(): void {
    // Call the getRole Func only if there is a login token in local storage
   if(this._auth.isLoggedIn()){
    this._data.getRole()
    .subscribe({
      next: res => {
        this.role = res;
        // console.log(this.role);
        
        if(this.role[0] == [3333]){
         this.isUser = true
          // console.log( `User Logged in is  ${ this.isUser}`);
          
        }
        else if(this.role[0] == [5555]){
         this.isAdmin = true
          // console.log(`Admin Logged in is ${ this.isAdmin}`);

        }
        else{
          this.isRootUser = true;
          // console.log(`Root User Logged in is  ${ this.isRootUser}`);

        }
      },
      error: err => {
        console.log(err);
        
      }
    });
   }
  }

}
