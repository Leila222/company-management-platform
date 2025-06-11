import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomNameValidator} from "../../../../validators/nameValidator";
import {CustomEmailValidator} from "../../../../validators/emailValidator";
import {CustomPhoneValidator} from "../../../../validators/phoneValidator";
import {Employee} from "../../../../models/Employee";
import {AdminService} from "../../../../services/admin/admin.service";
import {Admin} from "../../../../models/Admin";
import {Role} from "../../../../models/Role";

declare var Swal: any;
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm!: FormGroup;
  constructor(private fb: FormBuilder,  private adminService: AdminService,  private router: Router) { }

  ngOnInit(): void {
    this.addAdminForm = this.fb.group({
      username: ['', Validators.required ],
      firstName: ['',  [Validators.required, CustomNameValidator()]],
      lastName: ['', [Validators.required, CustomNameValidator()]],
      email: ['', [Validators.required, CustomEmailValidator()]],
      role: [{ value: Role.ADMIN, disabled: true }, Validators.required],
      phoneNumber: ['',  [Validators.required, CustomPhoneValidator()]]
    });
  }

  submitAdd(): void {
    if (this.addAdminForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form data',
      });
      return;
    }

    const newAdmin: Admin = { ...this.addAdminForm.value, userId: 0 };

    this.adminService.addAdmin(newAdmin).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/users']);
        });
      },
      (error) => {
        console.error('Error adding Admin:', error);
        Swal.fire({
          icon: 'error',
          title: error.error,
        });
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.addAdminForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}
