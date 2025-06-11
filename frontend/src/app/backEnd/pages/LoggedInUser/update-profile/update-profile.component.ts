import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/authenticate/auth.service';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user/user.service';
import {Role} from "../../../../models/Role";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CustomEmailValidator } from 'src/app/validators/emailValidator';
import { CustomPhoneValidator } from 'src/app/validators/phoneValidator';
import {CustomNameValidator} from "../../../../validators/nameValidator";

declare var Swal: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
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

  roles: string[] = Object.values(Role);

  updateProfileForm!: FormGroup;
  constructor(private authService: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUserProfile();

    this.updateProfileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: ['', [Validators.required, CustomEmailValidator()]],
      firstName: ['', [Validators.required, CustomNameValidator()]],
      lastName: ['', [Validators.required, CustomNameValidator()]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, CustomPhoneValidator()]]
    });

  }

  isFieldInvalid(field: string): boolean {
    const control = this.updateProfileForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  loadUserProfile(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.userProfile = user;
          this.updateFormValues();
        }
      );
    }
  }

  updateFormValues(): void {
    this.updateProfileForm.patchValue({
      username: this.userProfile.username,
      email: this.userProfile.email,
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      role: this.userProfile.role,
      phoneNumber: this.userProfile.phoneNumber,
    });
  }
  submitUpdate(): void {
    if (this.updateProfileForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form data',
      });
      return;
    }


    this.userProfile = { ...this.userProfile, ...this.updateProfileForm.value};
    this.userService.updateUser(this.userProfile.userId, this.userProfile).subscribe(
      () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/profile']);
        }).then(() => {
      const currentUserRole = this.userProfile.role;
      if (currentUserRole !== Role.ADMIN) {
        this.authService.logout();
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/profile']);
      }
    });
  },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error,
        });
      }
    );
  }

  changePassword(): void {
    this.router.navigate(['/update-pwd']);
  }
}
