import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVideoComponent } from './add-video/add-video.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DashboardRootuserComponent } from './dashboard-rootuser/dashboard-rootuser.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeRootuserComponent } from './home-rootuser/home-rootuser.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Role } from './Models/role';
import { RegistrationComponent } from './registration/registration.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { UsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  {
    path:'',
    component:MainPageComponent
  },
  {
    path:'signup',
    component:RegistrationComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'login/signup', 
    redirectTo:'signup'
  },
  {
    path:'signup/login', 
    redirectTo:'login'
  },
  {
    path:'rootUserDash',
    canActivate:[AuthGuard],
    data:{roles:[Role.RootUser]},
    component:DashboardRootuserComponent
  },
  {
    path:'adminDashboard',
    canActivate:[AuthGuard],
    data:{roles:[Role.Admin]},
    component:DashboardRootuserComponent
  },
  {
    path:'userDashboard',
    canActivate:[AuthGuard],
    data:{roles:[Role.User]},
    component:DashboardUserComponent
  },
  {
    path:'rootUserHome',
    canActivate:[AuthGuard],
    data:{roles:[Role.RootUser]},
    component:HomeRootuserComponent
  },
  {
    path:'adminHome',
    canActivate:[AuthGuard],
    data:{roles:[Role.Admin]},
    component:HomeRootuserComponent
  },

  {
    path:'userHome', 
    canActivate:[AuthGuard],
    data:{roles:[Role.User]},
    component:HomeUserComponent
  },
  {
    path:'upload-video',
    canActivate:[AuthGuard],
    data:{roles:[Role.User,Role.Admin,Role.RootUser]},
    component:AddVideoComponent
  },
  {
    path:'usersList',
    canActivate:[AuthGuard],
    data:{roles:[Role.RootUser]},
    component:UsersListComponent
  },
  {
    path:'adminsList', 
    canActivate:[AuthGuard],
    data:{roles:[Role.RootUser]},
    component:AdminListComponent
  },
  {
    path:'rootUserDash/watch/:id',
    component:SingleVideoComponent
  },
  {
    path:'adminDashboard/watch/:id',
    component:SingleVideoComponent
  },
  {
    path:'userDashboard/watch/:id',
    component:SingleVideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
