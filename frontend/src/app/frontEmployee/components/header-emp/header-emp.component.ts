import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authenticate/auth.service";

@Component({
  selector: 'app-header-emp',
  templateUrl: './header-emp.component.html',
  styleUrls: ['./header-emp.component.css']
})
export class HeaderEmpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout();
  }

}
