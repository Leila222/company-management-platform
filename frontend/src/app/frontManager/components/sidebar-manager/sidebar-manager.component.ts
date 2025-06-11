import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authenticate/auth.service";

@Component({
  selector: 'app-sidebar-manager',
  templateUrl: './sidebar-manager.component.html',
  styleUrls: ['./sidebar-manager.component.css']
})
export class SidebarManagerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
