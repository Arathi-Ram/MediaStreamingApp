import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UsersModel } from '../Models/users.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  constructor(
    private dataService:DataService

  ) { }
  serverMsg : any;
  sideBarOpen = true;
  adminsList: UsersModel[] | any;
  noAdmins!:Boolean;

  ngOnInit(): void {
    this.dataService.getAdmin()
    .subscribe((admins) => {
      this.adminsList = JSON.parse(JSON.stringify(admins))
      if(this.adminsList.length ===0){
        this.noAdmins = true
      }
      else{
        this.noAdmins = false;
      }
      console.log(this.adminsList);
      
    })
  }
  // Side Bar toggler func:
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen
  }
  //Demote function to change role from admin to user:
  demoteAdmin(admin:any){
    console.log(admin.name,"is DEMOTED");
    this.dataService.demoteToUser(admin._id)
    .subscribe({
      next: (res) => {
        this.serverMsg = `${admin.name} has been demoted!`
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
