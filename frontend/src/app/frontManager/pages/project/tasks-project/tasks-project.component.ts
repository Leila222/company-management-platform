import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../models/Task";
import {Project} from "../../../../models/Project";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../../services/task/task.service";
import {ProjectService} from "../../../../services/project/project.service";

declare var Swal:any;
@Component({
  selector: 'app-tasks-project',
  templateUrl: './tasks-project.component.html',
  styleUrls: ['./tasks-project.component.css']
})
export class TasksProjectComponent implements OnInit {
  tasks: Task[] = [];
  expandedTaskDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  projectId: number = this.route.snapshot.params['id'];
  project!: Project;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProject();
  }

  loadTasks(): void {
    this.taskService.getTasksByProjectId(this.projectId).subscribe(
      tasks => {
        this.tasks = tasks;
      },
      error => {
        console.error('Error loading tasks:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load tasks. Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  loadProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      project => {
        this.project = project;
      },
      error => {
        console.error('Error loading the project:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load the project. Please try again later.',
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
          },
          error => {
            console.error('Error deleting task:', error);
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
  filterTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
