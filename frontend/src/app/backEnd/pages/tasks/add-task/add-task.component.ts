import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../../models/Project";
import {Employee} from "../../../../models/Employee";
import {Task} from "../../../../models/Task";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../services/project/project.service";
import {TaskService} from "../../../../services/task/task.service";
import {Status} from "../../../../models/Status";
import {EmployeeService} from "../../../../services/employee/employee.service";

declare var Swal: any;
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  projects: Project[];
  employees: Employee[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private projectService: ProjectService, private taskService: TaskService,
              private employeesService: EmployeeService  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      startDate: ['', Validators.required],
      projectId: ['', Validators.required],
      assignedEmpId: ['', Validators.required]
    }, { validator: this.dateValidator });
    this.projects = [];
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load projects. Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  loadEmployees(): void {
    this.employeesService.getAllEmployees().subscribe(
      employees => {
        this.employees = employees;
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load employees. Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const dueDateInput = this.taskForm.get('dueDate')?.value;
      let dueDate = new Date(dueDateInput);

      const startDateInput = this.taskForm.get('startDate')?.value;
      let startDate = new Date(startDateInput);

      const task: Task = {
        idTask: 0,
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        startDate: startDate,
        endDate: new Date(),
        dueDate: dueDate,
        status: Status.TO_DO,
        project: this.projects.find(project => project.idProject === +this.taskForm.get('projectId')?.value) || new Project(),
        assignedEmp: this.employees.find(employee => employee.userId === +this.taskForm.get('assignedEmpId')?.value) || new Employee(),
      };

      this.taskService.addTask(task).subscribe(
        (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/tasks']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error adding task',
            text: error.error || 'An error occurred while adding the task.'
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

  dateValidator(group: AbstractControl): { [key: string]: any } | null {
    const startDate = group.get('startDate')?.value;
    const dueDate = group.get('dueDate')?.value;
    return startDate && dueDate && new Date(startDate) >= new Date(dueDate) ? {dateInvalid: true} : null;
  }

}
