import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {TaskService} from "../../../../services/task/task.service";
import {Task} from "../../../../models/Task";
import {Status} from "../../../../models/Status";

declare var Swal:any;
@Component({
  selector: 'app-calendar-tasks',
  templateUrl: './calendar-tasks.component.html',
  styleUrls: ['./calendar-tasks.component.css']
})
export class CalendarTasksComponent implements OnInit {

  tasks: Task [] = [];
  calendarEvents: any[] = [];
  selectedTask: Task | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    eventClick: this.handleEventClick.bind(this)
  };
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
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
              text: 'Failed to delete task. Please try again later.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
}
