import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UsersModel } from '../Models/users.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(
    private DataService:DataService
  ) { }
  serverMsg : any;
  usersList:UsersModel[] | any;
  noUsers!:Boolean;
  sideBarOpen = true;

  ngOnInit(): void {
    
    this.DataService.getUsers()
    .subscribe((users) =>{ 
        this.usersList = JSON.parse(JSON.stringify(users));
        if(this.usersList.length === 0){
          this.noUsers = true;
        }
        else{
          this.noUsers = false;
        }
        // console.log(this.usersList);
    })
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen
  }

  // Promote btn function to promote a user role into an admin role
  promoteUser(user:any){
    console.log("Promote " ,user._id);
    this.DataService.promoteToAdmin(user._id)
    .subscribe({
      next: (res) =>{
        this.serverMsg = `${user.name} has been promoted to an Admin!`
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

}
