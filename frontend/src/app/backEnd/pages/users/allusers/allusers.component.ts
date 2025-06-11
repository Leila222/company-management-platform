import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user/user.service';
import {User} from '../../../../models/User';
import {Employee} from "../../../../models/Employee";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {ProjectManager} from "../../../../models/ProjectManager";
import {Role} from "../../../../models/Role";
import {ProjectManagerService} from "../../../../services/manager/project-manager.service";

declare var Swal: any;

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  errorMessage: string = '';
  expandedUserDetails: { [key: number]: boolean } = {}
  areAllExpanded: boolean = false;
  searchTerm: string = '';
  constructor(private userService: UserService, private projectManagerService: ProjectManagerService, private employeeService: EmployeeService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const loggedInUserId = this.authService.getUserId();
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users.filter(user => user.userId !== loggedInUserId);
        this.filteredUsers = [...this.users];
      },
      error => {
        this.errorMessage = 'Failed to load users. Please try again later.';
      }
    );
  }

  selectUser(user: User): void {
    if (this.isEmployee(user)) {
      this.router.navigate(['/update-employee', user.userId]);
    }
    else {
    this.router.navigate(['/update-user', user.userId]);
    }
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5D87FF',
      cancelButtonColor: '#FA896B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; } )=> {
      if (result.isConfirmed) {
        const user = this.users.find(u => u.userId === id);

        if (!user) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'User not found.',
          });
          return;
        }

        if (this.isEmployee(user)) {
          this.employeeService.deleteEmployee(id).subscribe(
            () => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Employee deleted successfully',
                showConfirmButton: false,
                timer: 1500
              });
              this.users = this.users.filter(u => u.userId !== id);
              this.filteredUsers = this.filteredUsers.filter(u=>u.userId !== id);
            },
            (error) => {
              Swal.fire({
                title: 'Error!',
                text: error.error,
                icon: 'error'
              });
            }
          );
        } else {
          if(this.isProjectManager(user)){
            this.projectManagerService.deleteProjectManager(id).subscribe(
              () => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Project Manager deleted successfully',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.users = this.users.filter(u => u.userId !== id);
                this.filteredUsers = this.filteredUsers.filter(u=>u.userId !== id);
              },
              (error) => {
                Swal.fire({
                  title: 'Error!',
                  text: error.error,
                  icon: 'error'
                });
              }
            );
          } else {
          this.userService.deleteUser(id).subscribe(
            () => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User deleted successfully',
                showConfirmButton: false,
                timer: 1500
              });
              this.users = this.users.filter(u => u.userId !== id);
              this.filteredUsers = this.filteredUsers.filter(u=>u.userId !== id);
            },
            (error) => {
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete user. Please try again later.',
                icon: 'error'
              });
            }
          );
        }
        }
      }
    });
  }

  toggleDetails(userId: number): void {
      this.expandedUserDetails[userId] = !this.expandedUserDetails[userId];
    }

    toggleAllDetails(): void {
      this.areAllExpanded = !this.areAllExpanded;
      this.users.forEach(user => {
        this.expandedUserDetails[user.userId] = this.areAllExpanded;
      });
    }

  isEmployee(user: User): user is Employee {
    return (user as Employee).availability !== undefined;
  }
  isProjectManager(user: User): user is ProjectManager {
    return user.role == Role.PROJECT_MANAGER;
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = [...this.users];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(searchTermLower) ||
        user.lastName.toLowerCase().includes(searchTermLower) ||
        user.firstName.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
