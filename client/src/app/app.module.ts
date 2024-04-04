import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostEmployeeComponent } from './components/post-employee/post-employee.component';
import { GetAllEmployeeComponent } from './components/get-all-employee/get-all-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { ForbidenComponent } from './components/forbiden/forbiden.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, mapToCanActivate } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PostEmployeeComponent,
    GetAllEmployeeComponent,
    UpdateEmployeeComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    HeaderComponent,
    ForbidenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
