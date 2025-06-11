import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../../../services/resetPwd/password-reset.service";
import {PasswordValidator} from "../../../../validators/passwordValidator";
import {Router} from "@angular/router";

declare var Swal:any;
@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.css']
})
export class ResetPasswordConfirmComponent implements OnInit {
  confirmPasswordResetForm!: FormGroup;

  constructor(private fb: FormBuilder, private passwordResetService: PasswordResetService, private router: Router) {}

  ngOnInit(): void {
    this.confirmPasswordResetForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, PasswordValidator()]]
    });
  }

  onSubmit(): void {
    if (this.confirmPasswordResetForm.invalid) {
      return;
    }

    const { token, newPassword } = this.confirmPasswordResetForm.value;
    this.passwordResetService.resetPassword({ token, newPassword }).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Password reset successfully',
          text: 'You can now log in with your new password.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to reset password',
          text: 'Please try again later.'
        });
      }
    );
  }
}
