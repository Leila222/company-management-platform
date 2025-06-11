import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/User";
import {Role} from "../../../../models/Role";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {UserService} from "../../../../services/user/user.service";
import {Employee} from "../../../../models/Employee";

@Component({
  selector: 'app-profile-m',
  templateUrl: './profile-m.component.html',
  styleUrls: ['./profile-m.component.css']
})
export class ProfileMComponent implements OnInit {

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
}
