// Built-in :
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Materials:
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule } from "@angular/material/list";
// Components:
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardRootuserComponent } from './dashboard-rootuser/dashboard-rootuser.component';
import { HomeRootuserComponent } from './home-rootuser/home-rootuser.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './rating/rating.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
// Services:
import { AuthService } from './auth.service';
import { VideosService } from './videos.service';
import { DataService } from './data.service';


import { FilterPipe } from './filterPipe/filter.pipe';
import { HttpInterceptorService } from './http-interceptor.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    MainPageComponent,
    AddVideoComponent,
    SideNavComponent,
    DashboardRootuserComponent,
    HomeRootuserComponent,
    UsersListComponent,
    AdminListComponent,
    RatingComponent,
    SingleVideoComponent,
    NavbarComponent,
    DashboardUserComponent,
    HomeUserComponent,
    FilterPipe,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Angular Material Imports:
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    NgbModule
  ],
  providers: [
    AuthService,
    DataService,
    VideosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
