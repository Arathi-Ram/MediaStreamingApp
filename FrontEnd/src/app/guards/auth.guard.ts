import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { faMehRollingEyes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  roleToCheck : any;
  constructor(
    private _auth : AuthService,
    private _data : DataService,
    private _router : Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this._auth.isLoggedIn()){
       this._data.getRole()
        .subscribe({
          next : (res) =>{
                  const role = res
                  var userRole = JSON.parse(JSON.stringify(role));
                  // Get the role of user logged In
                  this.roleToCheck = userRole[0]
                  // console.log(this.roleToCheck);
                  // Check if this role is restricted or not
                  if(route.data['roles'] && route.data['roles'].indexOf(this.roleToCheck) === -1){
                    this._router.navigate(['login']);
                    return false;
                  }
                  else{
                    console.log('role authorized');
                    // console.log(`route.data.roles is ${route.data['roles'] }`);
                    return true
                    
                  }
                },
          error : (err) => {
            console.log(err);
            // return false
          }
        });
        return true

    }
    else{
      this._router.navigate(['login']);
    return false;
    }
  //
  }
  
}
