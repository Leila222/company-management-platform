import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectManager} from "../../../../models/ProjectManager";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {ComplaintService} from "../../../../services/complaint/complaint.service";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {ProjectManagerService} from "../../../../services/manager/project-manager.service";
import {Complaint} from "../../../../models/Complaint";
import {TaskService} from "../../../../services/task/task.service";
import {Project} from "../../../../models/Project";

declare var Swal:any;
@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  complaintForm: FormGroup;
  projectManagers: ProjectManager[] = [];
  projects: Project[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private complaintService: ComplaintService,
    private employeeService: EmployeeService,
    private projectManagerService: ProjectManagerService,
    private taskService: TaskService
  ) {
    this.complaintForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      receiverId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    const employeeId = this.authService.getUserId();
    if (employeeId)
      this.taskService.getTasksByAssignedEmpId(employeeId).subscribe(
        (tasks) => {
          const projectMap = new Map<number, Project>();
          tasks.forEach(task => {
            projectMap.set(task.project.idProject, task.project);
          });
          this.projects = Array.from(projectMap.values());
          this.projectManagers = this.projects.map(project => project.projectManager);
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to load tasks. Please try again later.',
            icon: 'error'
          });
        }
      );
  }


  addComplaint(): void {
    const employeeId = this.authService.getUserId();
    if (employeeId && this.complaintForm.valid) {
      this.employeeService.getEmployeeById(employeeId).subscribe(
        employee => {
          const complaint: Complaint = {
            idComplaint: 0,
            title: this.complaintForm.get('title')?.value,
            description: this.complaintForm.get('description')?.value,
            issueDate: new Date(),
            status: false,
            sender: employee,
            receiver: this.projectManagers.find(manager => manager.userId === +this.complaintForm.get('receiverId')?.value) || new ProjectManager()
          };

          this.complaintService.addComplaint(complaint).subscribe(
            (response) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Complaint added successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/myComplaints']);
              });
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error adding complaint',
                text: error.error || 'An error occurred while adding the complaint.'
              });
            }
          );
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error fetching employee details',
            text: 'Failed to retrieve sender details. Please try again later.'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form data',
        text: 'Please fill in all required fields.'
      });
    }
  }



  isFieldInvalid(field: string): boolean {
    const control = this.complaintForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
