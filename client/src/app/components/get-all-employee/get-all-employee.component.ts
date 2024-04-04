import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-get-all-employee',
  templateUrl: './get-all-employee.component.html',
  styleUrls: ['./get-all-employee.component.css']
})
export class GetAllEmployeeComponent {

 employees:any = [];

  constructor(private employeeService: EmployeeService){}
  
  ngOnInit(){
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.employeeService.getAllEmployee().subscribe((res)=>{
      console.log(res);
      this.employees = res;
    })
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe((res)=>{
      console.log(res);
      this.getAllEmployee();
    })
  }
}
