import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-post-employee',
  templateUrl: './post-employee.component.html',
  styleUrls: ['./post-employee.component.css']
})
export class PostEmployeeComponent implements OnInit{

  postEmployeeForm!: FormGroup;  
  title = 'formvalidation';
  submitted = false;

  constructor(private employeeService:EmployeeService,
    private fb:FormBuilder, 
    private router:Router
    ){}

  ngOnInit(){
    this.postEmployeeForm = this.fb.group({
      empNo:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      empName:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      mobile:['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email:['',[Validators.required, Validators.email, Validators.maxLength(100)]]
    })
  }
  get formControls() {
    return this.postEmployeeForm.controls;
  }
  postEmployee(){
    this.submitted=true;
    if(this.postEmployeeForm.invalid){
      return
    }
    console.log(this.postEmployeeForm.value);
    this.employeeService.postEmployee(this.postEmployeeForm.value).subscribe((res=>{
      console.log(res);
      this.router.navigateByUrl("/data")
    }));
  }
}
