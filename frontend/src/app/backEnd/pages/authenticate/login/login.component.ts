import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/authenticate/auth.service';
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../models/User";
import {Role} from "../../../../models/Role";

interface AuthenticationRequest {
  username: string;
  password: string;
}
declare var Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {
    username: '',
    password: ''
  };


  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  login(): void {
    this.authService.login(this.authRequest).subscribe(
      () => {
        const userId = this.authService.getUserId();
        if (userId !== null) {
          this.userService.getUserById(userId).subscribe(
            (user: User) => {
              if (user.role=== Role.ADMIN) {
                this.router.navigate(['/dashboard']);
              } else if (user.role === Role.PROJECT_MANAGER) {
                this.router.navigate(['/dashboardManager']);
              } else if (user.role === Role.EMPLOYEE){
                this.router.navigate(['/dashboardEmp']);
              }
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'User fetch failed',
                text: 'Could not retrieve user details!',
              });
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'User ID is null. Please try again.',
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect credentials',
          text: 'Please try again!',
        });
      }
    );
  }

}
