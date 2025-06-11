import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/authenticate/auth.service";
import {User} from "../../../../models/User";
import {Employee} from "../../../../models/Employee";
import { UserService } from '../../../../services/user/user.service';
import {Router} from "@angular/router";
import {Role} from "../../../../models/Role";

declare var Swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  userProfile: User = {
    userId: 0,
    username: '',
    password: '',
    email:'',
    firstName: '',
    lastName: '',
    role: Role.ADMIN,
    phoneNumber: ''
  };

  constructor(private authService: AuthService, private userService: UserService) { }


  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.userProfile = user;
        }
      );
    }
  }


  isEmployee(user: User): user is Employee {
    return (user as Employee).availability !== undefined;
  }

  confirmDelete(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8AB4FF',
      cancelButtonColor: '#FA896B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.userProfile.userId).subscribe(
          () => {
            Swal.fire({
              title: 'Deleted!',
              color: "#8AB4FF",
              text: 'Your account has been deleted.',
              icon: 'success'
            }).then(() => {
              this.authService.logout();
            });
          },
          (error) => {
            console.error('Error deleting user:', error);
            Swal.fire({
              title: 'Error!',
              color: "#8AB4FF",
              text: 'Failed to delete your account. Please try again later.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

 }
