import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter <any> = new EventEmitter();
  // Variables : 
  isRootUser !: Boolean;
  isAdmin !: Boolean;
  isUser !: Boolean;
  role : any;
  userDetails : any;
  constructor(
    private _data : DataService,
    private _router:Router
  ) { }

  ngOnInit(): void {
     this._data.getRole()
    .subscribe({
      next: res => {
        this.role = res;
        // console.log(this.role);
        
        if(this.role[0] == [3333]){
         this.isUser = true
          console.log( `User Logged in is  ${ this.isUser}`);
          
        }
        else if(this.role[0] == [5555]){
         this.isAdmin = true
          console.log(`Admin Logged in is ${ this.isAdmin}`);

        }
        else{
          this.isRootUser = true;
          console.log(`Root User Logged in is  ${ this.isRootUser}`);

        }
      },
      error: err => {
        console.log(err);
        
      }
    });
    this._data.User()
    .subscribe((user) => {
      this.userDetails = JSON.parse(JSON.stringify(user))
      // console.log(this.userDetails.name);
    })
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
  //  Logout Func:
  logout(){
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('Id');
    this._router.navigate([''])
  }
}
