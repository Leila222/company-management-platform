import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomNameValidator} from "../../../../validators/nameValidator";
import {CustomEmailValidator} from "../../../../validators/emailValidator";
import {CustomPhoneValidator} from "../../../../validators/phoneValidator";
import {Position} from "../../../../models/Position";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {Employee} from "../../../../models/Employee";
import {Role} from "../../../../models/Role";

declare var Swal: any;
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  positions: string[] = Object.values(Position);
  constructor(private fb: FormBuilder,  private employeeService: EmployeeService,  private router: Router) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      username: ['', Validators.required ],
      firstName: ['',  [Validators.required, CustomNameValidator()]],
      lastName: ['', [Validators.required, CustomNameValidator()]],
      email: ['', [Validators.required, CustomEmailValidator()]],
      role: [{value: Role.EMPLOYEE, disabled: true }, Validators.required],
      phoneNumber: ['',  [Validators.required, CustomPhoneValidator()]],
      experienceYears: ['', Validators.required],
      availability: ['', Validators.required],
      position:['', Validators.required]
    });
  }

  submitAdd(): void {
    if (this.addEmployeeForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form data',
      });
      return;
    }

    const newEmployee: Employee = { ...this.addEmployeeForm.value, userId: 0 };

    this.employeeService.addEmployee(newEmployee).subscribe(
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
        Swal.fire({
          icon: 'error',
          title: error.error,
        });
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.addEmployeeForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}
