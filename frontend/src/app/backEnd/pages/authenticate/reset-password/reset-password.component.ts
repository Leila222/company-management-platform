import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../../../services/resetPwd/password-reset.service";
import {resetPwdPhoneValidator} from "../../../../validators/resetPwdPhone";
import {Router} from "@angular/router";

declare var Swal: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  passwordResetForm!: FormGroup;

  constructor(private fb: FormBuilder, private passwordResetService: PasswordResetService, private router: Router) {}

  ngOnInit(): void {
    this.passwordResetForm = this.fb.group({
      phoneNumber: ['', [Validators.required, resetPwdPhoneValidator()]]
    });
  }

  onSubmit(): void {
    if (this.passwordResetForm.invalid) {
      return;
    }

    this.passwordResetService.initiatePasswordReset(this.passwordResetForm.value).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Password reset initiated',
          text: 'Check your SMS for instructions.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/reset-confirm']);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to initiate password reset',
          text: 'Please try again later.'
        });
      }
    );
  }
}
