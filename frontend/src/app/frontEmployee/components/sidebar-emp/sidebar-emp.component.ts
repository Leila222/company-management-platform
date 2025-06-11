import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authenticate/auth.service";

@Component({
  selector: 'app-sidebar-emp',
  templateUrl: './sidebar-emp.component.html',
  styleUrls: ['./sidebar-emp.component.css']
})
export class SidebarEmpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
