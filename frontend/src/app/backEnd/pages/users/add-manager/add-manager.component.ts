import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomNameValidator} from "../../../../validators/nameValidator";
import {CustomEmailValidator} from "../../../../validators/emailValidator";
import {CustomPhoneValidator} from "../../../../validators/phoneValidator";
import {ProjectManagerService} from "../../../../services/manager/project-manager.service";
import {ProjectManager} from "../../../../models/ProjectManager";
import {Role} from "../../../../models/Role";

declare var Swal: any;
@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {

  addManagerForm!: FormGroup;
  constructor(private fb: FormBuilder,  private managerService: ProjectManagerService,  private router: Router) { }

  ngOnInit(): void {
    this.addManagerForm = this.fb.group({
      username: ['', Validators.required ],
      firstName: ['',  [Validators.required, CustomNameValidator()]],
      lastName: ['', [Validators.required, CustomNameValidator()]],
      email: ['', [Validators.required, CustomEmailValidator()]],
      role: [{ value: Role.PROJECT_MANAGER, disabled: true }, Validators.required],
      phoneNumber: ['',  [Validators.required, CustomPhoneValidator()]]
    });
  }

  submitAdd(): void {
    if (this.addManagerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form data',
      });
      return;
    }

    const newManager: ProjectManager = { ...this.addManagerForm.value, userId: 0 };

    this.managerService.addProjectManager(newManager).subscribe(
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
        console.error('Error adding Project Manager:', error);
        Swal.fire({
          icon: 'error',
          title: error.error,
        });
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.addManagerForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
