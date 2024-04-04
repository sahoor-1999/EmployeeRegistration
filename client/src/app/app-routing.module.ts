import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEmployeeComponent } from './components/post-employee/post-employee.component';
import { GetAllEmployeeComponent } from './components/get-all-employee/get-all-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForbidenComponent } from './components/forbiden/forbiden.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'employee', component: PostEmployeeComponent },
  { path: "data", component: GetAllEmployeeComponent },
  { path: "employee/:id", component: UpdateEmployeeComponent },
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "user", component: UserComponent },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
