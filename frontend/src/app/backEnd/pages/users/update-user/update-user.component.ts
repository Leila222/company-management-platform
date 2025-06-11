import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/User";
import {UserService} from "../../../../services/user/user.service";
import {Role} from "../../../../models/Role";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEmailValidator} from "../../../../validators/emailValidator";
import {CustomNameValidator} from "../../../../validators/nameValidator";
import {CustomPhoneValidator} from "../../../../validators/phoneValidator";

declare var Swal: any;
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateProfileForm!: FormGroup;

  roles: string[] = Object.values(Role);

  user: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: Role.ADMIN,
    phoneNumber: ''
  };

  constructor(private userService: UserService, private route: ActivatedRoute,private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
        this.updateProfileForm.patchValue({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber
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
      phoneNumber: ['',  [Validators.required, CustomPhoneValidator()]]
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

    this.user= { ...this.user, ...this.updateProfileForm.value };


    this.userService.updateUser(this.user.userId, this.user).subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User updated successfully',
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

  isFieldInvalid(field: string): boolean {
    const control = this.updateProfileForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
