import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authenticate/auth.service";

@Component({
  selector: 'app-header-manager',
  templateUrl: './header-manager.component.html',
  styleUrls: ['./header-manager.component.css']
})
export class HeaderManagerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout();
  }

}
