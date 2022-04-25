import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  // Variables : 
  isRootUser !: Boolean;
  isAdmin !: Boolean;
  isUser !: Boolean;
  role : any;

  constructor(
    private _data : DataService
  ) { }

  ngOnInit(): void {
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
