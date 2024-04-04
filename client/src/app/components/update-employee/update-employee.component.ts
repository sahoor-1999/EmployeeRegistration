import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  updateEmployeeForm!: FormGroup;
  title = 'formvalidation';
  submitted = false;

  id:number = this.activatedRout.snapshot.params["id"];

constructor(private activatedRout:ActivatedRoute,
  private service:EmployeeService, 
  private fb:FormBuilder,
  private router:Router){}


  ngOnInit(){

    this.updateEmployeeForm = this.fb.group({
      empNo:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      empName:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      mobile:['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email:['',[Validators.required, Validators.email, Validators.maxLength(100)]]
    })

  this.getEmployeeById(this.id);
  }

  getEmployeeById(id:number){
    this.service.getEmployeeById(this.id).subscribe((res) => {
      console.log(res)
      this.updateEmployeeForm.patchValue(res);
    })
  }

  updateEmployee(){
    this.service.updateEmployee(this.id, this.updateEmployeeForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/data")
      }
    })
  }
}
