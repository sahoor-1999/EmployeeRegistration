import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
constructor(private employeeService:EmployeeService, 
  private userAuthService:UserAuthService,
  private router:Router){

}
ngOnInit(): void {
    
}
login(loginForm: NgForm) {
 this.employeeService.login(loginForm.value).subscribe(
  (response:any) => {
    this.userAuthService.setToken(response.tokenType);
    this.userAuthService.setRoles(response.user.roles);

    const roles = response.user.roles[0].name;

    if(roles === 'ROLE_ADMIN'){
      this.router.navigate(['/employee'])
    }else{
      this.router.navigate(['/user'])
    }
  },
  (error) => {
    console.log(error);
  }
 );
}
}
