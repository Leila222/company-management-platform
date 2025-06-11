import {Component, OnInit} from '@angular/core';
import {Task} from "../../../../models/Task";
import {TaskService} from "../../../../services/task/task.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {Status} from "../../../../models/Status";

declare var Swal:any;
@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  expandedTaskDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  searchTerm :string = '';

  constructor(private taskService: TaskService, private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const empId = this.authService.getUserId();
    if (empId)
    this.taskService.getTasksByAssignedEmpId(empId).subscribe(
      tasks => {
        this.tasks = tasks;
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

  toggleDetails(taskId: number): void {
    this.expandedTaskDetails[taskId] = !this.expandedTaskDetails[taskId];
  }

  toggleAllDetails(): void {
    this.areAllExpanded = !this.areAllExpanded;
    this.tasks.forEach(task => {
      this.expandedTaskDetails[task.idTask] = this.areAllExpanded;
    });
  }

  doneTask(task: Task): void {
    task.status = Status.COMPLETED;

    this.taskService.updateTask(task.idTask, task).subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Task Completed successfully',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error updating task',
          text: error.message || 'An error occurred while updating the task.'
        });
      }
    );
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredTasks = [...this.tasks];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(searchTermLower) ||
        task.description.toLowerCase().includes(searchTermLower)
      );
    }
  }

}
