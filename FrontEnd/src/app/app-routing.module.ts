import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { RootUserComponent } from './root-user/root-user.component';

const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'signup',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'signup/login', redirectTo:'login'},
  {path:'rootUserDash',component:RootUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
