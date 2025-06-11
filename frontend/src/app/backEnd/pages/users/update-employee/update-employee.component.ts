import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomNameValidator} from "../../../../validators/nameValidator";
import {CustomEmailValidator} from "../../../../validators/emailValidator";
import {CustomPhoneValidator} from "../../../../validators/phoneValidator";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../../../models/Employee";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {Role} from "../../../../models/Role";
import {Position} from "../../../../models/Position";
import {UserService} from "../../../../services/user/user.service";

declare var Swal: any;
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  updateProfileForm!: FormGroup;

  roles: string[]=Object.values(Role)
  positions: string[] = Object.values(Position);
  employee: Employee = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: Role.EMPLOYEE,
    phoneNumber: '',
    experienceYears: 0,
    position: Position.CLOUD_ARCHITECT,
    availability: false,
    tasks: [],
    madeComplaints: []
  }
  constructor(private route: ActivatedRoute, private userService: UserService, private employeeService: EmployeeService, private fb: FormBuilder, private router: Router ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(userId).subscribe(
      (employee: Employee) => {
        this.employee = employee;
        this.updateProfileForm.patchValue({
          username: employee.username,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          role: employee.role,
          phoneNumber: employee.phoneNumber,
          experienceYears:employee.experienceYears,
          availability: employee.availability,
          position: employee.position
        });
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
    );

    this.updateProfileForm = this.fb.group({
      username: ['', Validators.required ],
      firstName: ['',  [Validators.required, CustomNameValidator()]],
      lastName: ['', [Validators.required, CustomNameValidator()]],
      email: ['', [Validators.required, CustomEmailValidator()]],
      role: ['', Validators.required],
      phoneNumber: ['',  [Validators.required, CustomPhoneValidator()]],
      experienceYears: ['', Validators.required],
      availability: ['', Validators.required],
      position:['', Validators.required]
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

      const updatedEmployee: Employee = { ...this.employee, ...this.updateProfileForm.value };

      if (updatedEmployee.role === Role.EMPLOYEE) {
          this.employeeService.updateEmployee(updatedEmployee.userId, updatedEmployee).subscribe(
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
                  console.error('Error updating Employee:', error);
                  Swal.fire({
                      icon: 'error',
                      title: error.error,
                  });
              }
          );
      } else {
          // Role has changed, update using userService
          this.userService.updateUser(updatedEmployee.userId, updatedEmployee).subscribe(
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
                  console.error('Error updating User:', error);
                  Swal.fire({
                      icon: 'error',
                      title: error.error,
                  });
              }
          );
      }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.updateProfileForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
