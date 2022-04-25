import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http:HttpClient
  ) { }

 roles : any;
  // Retrieving User's Data to Display them
  getUsers(){
    return this.http.get('http://localhost:3000/users/userslist');
  }
   // Retrieving Admin's Data to Display them
   getAdmin(){
    return this.http.get('http://localhost:3000/users/adminslist');
  }
  // Update user role into admin role to implement promotion to admin privileges
  promoteToAdmin(userId:any){
    return this.http.put('http://localhost:3000/users/promoteUser',{"userId":userId})
  }
  // Update admin role into user role to implement demotion
  demoteToUser(adminId:any){
    return this.http.put('http://localhost:3000/users/demoteAdmin',{"adminId":adminId})
  }

  // Retrieve the role of the person loggedIn:
  getRole(){
    var ID = localStorage.getItem('Id')
    return this.http.get('http://localhost:3000/users/role/'+ ID)
    
  }
// Retrieve single user details to display
  User(){
    var ID = localStorage.getItem('Id')
    return this.http.get('http://localhost:3000/users/user/'+ ID)
  }
}
