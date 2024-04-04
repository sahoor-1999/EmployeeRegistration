import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

const BASIC_URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  requestHeader = new HttpHeaders({
    "No-Auth":"True"
  })

  constructor(private http: HttpClient,
    private userAuthService:UserAuthService
    ) { }

  login(loginData: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/auth/signin", loginData, {headers:this.requestHeader});
  }
  postEmployee(employee: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/employee_management/save", employee);
  }

  postUser(user: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/auth/signup", user);
  }

  getAllEmployee():Observable<any>{
    return this.http.get(BASIC_URL + "/api/employee_management/getRecord");
  }

  getEmployeeById(id: number):Observable<any>{
    return this.http.get(BASIC_URL + "/api/employee_management/getRecordById/" + id);
  }

  updateEmployee(id: number, employee:any):Observable<any>{
    return this.http.put(BASIC_URL + "/api/employee_management/update/" + id, employee);
  }

  deleteEmployee(id: number):Observable<any>{
    return this.http.delete(BASIC_URL + "/api/employee_management/delete/" + id);
  }

  public roleMatch(allowedRoles:any):boolean{
    let isMatch = false;
    const roles:any = this.userAuthService.getRoles();
    if(roles != null && roles){
      for(let i = 0; i<roles.length; i++){
        for(let j = 0; j<allowedRoles.length; j++){
          if (roles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return false;
  }
}
