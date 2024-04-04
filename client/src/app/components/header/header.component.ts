import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router) {

  }
  ngOnInit(): void {

  }

  public isLogedIn() {
    return this.userAuthService.isLogedIn();
  }

  public logedOut() {
    this.userAuthService.clear();
    this.router.navigate(['/home'])
  }
}
