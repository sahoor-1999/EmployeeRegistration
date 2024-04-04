import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  
  userForm!: FormGroup;  
  title = 'formvalidation';
  submitted = false;
  
  constructor(private employeeService:EmployeeService,
    private fb:FormBuilder, 
    private router:Router){
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      username:['',[Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email:['',[Validators.required, Validators.email, Validators.maxLength(100)]],
      password:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    })
  }

  get formControl(){
    return this.userForm.controls;
  }

  postUser(){
    this.submitted=true;
    if(this.userForm.invalid){
      return
    }
    console.log(this.userForm.value);
    this.employeeService.postUser(this.userForm.value).subscribe(
      (res=>{
        console.log(res);
        if (this.submitted) {
          this.router.navigateByUrl("/login")          
        }
      })
    )
  }

}
