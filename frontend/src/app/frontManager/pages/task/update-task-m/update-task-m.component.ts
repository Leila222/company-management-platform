import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../../models/Employee";
import {Status} from "../../../../models/Status";
import {Project} from "../../../../models/Project";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../../services/task/task.service";
import {ProjectService} from "../../../../services/project/project.service";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {Task} from "../../../../models/Task";
import {AuthService} from "../../../../services/authenticate/auth.service";

declare var Swal: any;
@Component({
  selector: 'app-update-task-m',
  templateUrl: './update-task-m.component.html',
  styleUrls: ['./update-task-m.component.css']
})
export class UpdateTaskMComponent implements OnInit {

  taskForm: FormGroup;
  employees: Employee[] = [];
  taskId!: number;
  status: string[] = Object.values(Status);
  projects: Project[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeesService: EmployeeService
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      assignedEmpId: ['', Validators.required],
      projectId: ['', Validators.required]
    }, {validator: this.dateValidator});
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];
    this.loadEmployees();
    this.loadTaskDetails();
    this.loadProjects();
  }

  loadProjects(): void {
    const managerId = this.authService.getUserId();
    if (managerId)
    this.projectService.getProjectsByManagerId(managerId).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error loading projects',
          text: 'An error occurred while loading the projects.'
        });
      }
    );
  }
  loadEmployees(): void {
    this.employeesService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error loading employees',
          text: 'An error occurred while loading the employees.'
        });
      }
    );
  }

  loadTaskDetails(): void {
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(
        (task) => {

          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            startDate: this.formatDatetimeForInput(task.startDate),
            endDate: this.formatDatetimeForInput(task.endDate),
            dueDate: this.formatDatetimeForInput(task.dueDate),
            status: task.status,
            projectId: task.project.idProject,
            assignedEmpId: task.assignedEmp ? task.assignedEmp.userId : null
          });
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error loading task',
            text: 'An error occurred while loading the task details.'
          });
        }
      );
    }
  }


  updateTask(): void {
    if (this.taskForm.valid && this.taskId) {
      const dueDateInput = this.taskForm.get('dueDate')?.value;
      let dueDate = new Date(dueDateInput);
      const startDateInput = this.taskForm.get('startDate')?.value;
      let startDate = new Date(startDateInput);
      const endDateInput = this.taskForm.get('endDate')?.value;
      let endDate = new Date(endDateInput);
      const updatedTask: Task = {
        idTask: this.taskId,
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        startDate: startDate,
        endDate: endDate,
        dueDate: dueDate,
        status: this.taskForm.get('status')?.value,
        project: this.projects.find(proj => proj.idProject === +this.taskForm.get('projectId')?.value) || new Project(),
        assignedEmp: this.employees.find(emp => emp.userId === +this.taskForm.get('assignedEmpId')?.value) || new Employee()
      };

      this.taskService.updateTask(this.taskId, updatedTask).subscribe(
        (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/allTasks']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'An error occurred while updating the task.'
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
    const control = this.taskForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  formatDatetimeForInput(dateString: string | Date): string {
    if (!dateString) {
      return '';
    }
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const offset = date.getTimezoneOffset();
    date.setTime(date.getTime() - offset * 60 * 1000);
    return date.toISOString().slice(0, 16);
  }


  dateValidator(group: AbstractControl): { [key: string]: any } | null {
    const startDate = group.get('startDate')?.value;
    const dueDate = group.get('dueDate')?.value;
    return startDate && dueDate && new Date(startDate) >= new Date(dueDate) ? {dateInvalid: true} : null;
  }
}
