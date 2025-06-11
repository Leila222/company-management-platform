import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../models/Task";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import {TaskService} from "../../../../services/task/task.service";
import {ProjectService} from "../../../../services/project/project.service";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {Status} from "../../../../models/Status";

declare var Swal:any;
@Component({
  selector: 'app-calendar-emp',
  templateUrl: './calendar-emp.component.html',
  styleUrls: ['./calendar-emp.component.css']
})
export class CalendarEmpComponent implements OnInit {
  tasks: Task [] = [];
  managedProjectIds: number []= [];
  calendarEvents: any[] = [];
  selectedTask: Task | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    eventClick: this.handleEventClick.bind(this)
  };
  constructor(private taskService: TaskService, private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const employeeId = this.authService.getUserId();
    if (employeeId)
    this.taskService.getTasksByAssignedEmpId(employeeId).subscribe(
      tasks => {
        this.tasks = tasks;
        this.calendarEvents = this.tasks.map(task => ({
          title: task.title,
          start: task.startDate,
          end: task.endDate ? task.endDate : task.dueDate,
          backgroundColor: this.getTaskColor(task.status),
          borderColor: this.getTaskColor(task.status),
          extendedProps: { task },
          textColor: '#000000'
        }));
        this.calendarOptions.events = this.calendarEvents;
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

  getTaskColor(status: Status): string {
    switch (status) {
      case Status.COMPLETED:
        return '#C4E9DA';
      case Status.IN_PROGRESS:
        return '#D3C7E6';
      default:
        return '#FED5CF';
    }
  }

  handleEventClick(arg: any): void {
    this.selectedTask = arg.event.extendedProps.task;
  }

  discardTaskDetails(): void {
    this.selectedTask = null;
  }

  doneTask(task:Task) {
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
}
