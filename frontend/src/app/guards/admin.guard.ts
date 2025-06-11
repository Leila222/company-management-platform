import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/authenticate/auth.service";
import {Role} from "../models/Role";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (this.authService.isAuthenticated() && this.authService.getRole() == Role.ADMIN) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
