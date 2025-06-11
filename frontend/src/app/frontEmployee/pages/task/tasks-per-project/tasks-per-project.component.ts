import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../models/Task";
import {Project} from "../../../../models/Project";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../../services/task/task.service";
import {ProjectService} from "../../../../services/project/project.service";
import {AuthService} from "../../../../services/authenticate/auth.service";

declare var Swal:any;
@Component({
  selector: 'app-tasks-per-project',
  templateUrl: './tasks-per-project.component.html',
  styleUrls: ['./tasks-per-project.component.css']
})
export class TasksPerProjectComponent implements OnInit {
  tasks: Task[] = [];
  expandedTaskDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  projectId: number = this.route.snapshot.params['id'];
  project!: Project;
  constructor(private route: ActivatedRoute, private authService:AuthService, private taskService: TaskService, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProject();
  }

  loadTasks(): void {
    const employeeId = this.authService.getUserId();
    this.taskService.getTasksByProjectId(this.projectId).subscribe(
      tasks => {
        this.tasks = tasks.filter(task => task.assignedEmp.userId === employeeId);
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

  loadProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      project => {
        this.project = project;
      },
      error => {
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
  filterTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
