import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../../services/task/task.service";
import { Task } from "../../../models/Task";
import { AuthService } from "../../../services/authenticate/auth.service";


declare var Swal: any;

@Component({
  selector: 'app-dashboard-emp',
  templateUrl: './dashboard-emp.component.html',
  styleUrls: ['./dashboard-emp.component.css']
})
export class DashboardEmpComponent implements OnInit {

  tasks: Task[] = [];
  todayTasks: Task[] = [];
  completedOnTimeCount: number = 0;
  overdueCount: number = 0;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadScripts();
  }

  loadTasks(): void {
    const employeeId = this.authService.getUserId();
    if (employeeId) {
      this.taskService.getTasksByAssignedEmpId(employeeId).subscribe(
        tasks => {
          const today = new Date();
          this.todayTasks = tasks.filter(task => this.isToday(new Date(task.dueDate), today) && task.status.toLowerCase() !== 'completed');
          // Calculate statistics
          this.completedOnTimeCount = tasks.filter(task =>
            task.status.toLowerCase() === 'completed' &&
            new Date(task.endDate) <= new Date(task.dueDate)
          ).length;

          this.overdueCount = tasks.filter(task =>
            new Date(task.endDate) > new Date(task.dueDate)
          ).length;
          this.renderApexCharts();

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
  }

  private renderApexCharts() {
    const breakup = {
      color: "#adb5bd",
      series: [this.completedOnTimeCount, this.overdueCount],
      labels: ["Completed on Time", "Overdue"],
      chart: {
        width: 180,
        type: "donut",
        fontFamily: "Plus Jakarta Sans', sans-serif",
        foreColor: "#adb0bb",
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5D87FF", "#ecf2ff"], // Adjust colors as needed
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 150,
            },
          },
        },
      ],
      tooltip: {
        theme: "dark",
        fillSeriesColor: false,
      },
    };

    const chart = new ApexCharts(document.querySelector("#breakup"), breakup);
    chart.render();
  }

  isToday(date: Date, today: Date): boolean {
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  private loadScripts() {
    this.loadScript('assets/backTemplate/libs/apexcharts/dist/apexcharts.min.js').then(() => {
      console.log('apexcharts.min.js loaded successfully');
      this.loadScript('assets/backTemplate/js/dashboard.js').then(() => {
        console.log('dashboard.js loaded successfully');
      }).catch(error => console.error('Error loading dashboard.js', error));
    }).catch(error => console.error('Error loading apexcharts.min.js', error));
  }

  private loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);
      document.head.appendChild(script);
    });
  }
}

