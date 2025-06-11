import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user/user.service";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {PasswordValidator} from "../../../../validators/passwordValidator";

declare var Swal:any;
@Component({
  selector: 'app-update-password-emp',
  templateUrl: './update-password-emp.component.html',
  styleUrls: ['./update-password-emp.component.css']
})
export class UpdatePasswordEmpComponent implements OnInit {
  updatePasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, PasswordValidator()]],
      confirmPassword: ['', [Validators.required, PasswordValidator()]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.updatePasswordForm.valid) {
      Swal.fire({
        text: 'Please fill out all fields correctly',
        icon: 'error',
      });
      return;
    }

    const currentPassword = this.updatePasswordForm.get('currentPassword')?.value;
    const newPassword = this.updatePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.updatePasswordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      Swal.fire({
        text: 'New password and confirmation do not match',
        icon: 'error',
      });
      return;
    }

    if (currentPassword === newPassword) {
      Swal.fire({
        text: 'New password cannot be the same as the current password',
        icon: 'error',
      });
      return;
    }

    const userId = this.authService.getUserId();
    if (userId === null) {
      Swal.fire({
        text: 'User not authenticated',
        icon: 'error',
      });
      return;
    }

    this.updateUserPassword(userId, currentPassword, newPassword);

  }

  private updateUserPassword(userId: number, currentPassword: string, newPassword: string): void {
    this.userService.updatePassword(userId, currentPassword, newPassword).subscribe(
      () => {
        this.handleSuccess();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  private handleSuccess(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your password has been updated',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.authService.logout();
    });
  }

  private handleError(error: any): void {
    Swal.fire({
      text: error.error || 'An error occurred',
      icon: 'error',
    });
  }

  isFieldInvalid(field: string): null | false | undefined | boolean {
    const control = this.updatePasswordForm.get(field);
    return control && control?.invalid && (control?.dirty || control?.touched);
  }
}
