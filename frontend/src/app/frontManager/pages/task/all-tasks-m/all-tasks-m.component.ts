import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../models/Task";
import {TaskService} from "../../../../services/task/task.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {ProjectService} from "../../../../services/project/project.service";

declare var Swal:any;
@Component({
  selector: 'app-all-tasks-m',
  templateUrl: './all-tasks-m.component.html',
  styleUrls: ['./all-tasks-m.component.css']
})
export class AllTasksMComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks : Task [] = [];
  managedProjectIds: number []= [];
  expandedTaskDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  searchTerm: string = '';

  constructor(private taskService: TaskService, private authService: AuthService, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadManagedProjects();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks.filter(task => this.managedProjectIds.includes(task.project.idProject));
        this.filteredTasks = [...this.tasks];
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

  loadManagedProjects(): void {
    const managerId = this.authService.getUserId();
    if (managerId)
    this.projectService.getProjectsByManagerId(managerId).subscribe(
      projects => {
        this.managedProjectIds = projects.map(project => project.idProject);
        this.loadTasks();
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load managed projects. Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  toggleDetails(taskId: number): void {
    this.expandedTaskDetails[taskId] = !this.expandedTaskDetails[taskId];
  }

  toggleAllDetails(): void {
    this.areAllExpanded = !this.areAllExpanded;
    this.tasks.forEach(task => {
      this.expandedTaskDetails[task.idTask] = this.areAllExpanded;
    });
  }

  selectTask(task: Task): void {
    this.router.navigate(['/updateTask', task.idTask]);
  }

  deleteTask(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5D87FF',
      cancelButtonColor: '#FA896B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(
          () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Task deleted successfully",
              showConfirmButton: false,
              timer: 1500
            });

            this.tasks = this.tasks.filter(task => task.idTask !== id);
            this.filteredTasks = this.filteredTasks.filter(task=>task.idTask !== id);
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete task. Please try again later.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredTasks = [...this.tasks];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(searchTermLower) ||
        task.description.toLowerCase().includes(searchTermLower) ||
        task.assignedEmp.firstName.toLowerCase().includes(searchTermLower) ||
        task.assignedEmp.lastName.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
