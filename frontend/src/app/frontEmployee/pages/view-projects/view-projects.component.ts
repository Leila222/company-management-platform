import { Component, OnInit } from '@angular/core';
import {Project} from "../../../models/Project";
import {TaskService} from "../../../services/task/task.service";
import {AuthService} from "../../../services/authenticate/auth.service";

declare var Swal:any;
@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project [] = [];
  expandedProjectDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  searchTerm: string='';
  constructor(private taskService: TaskService, private authService: AuthService ) {}

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
        this.filteredProjects = [...this.projects];
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

  toggleDetails(projectId: number): void {
    this.expandedProjectDetails[projectId] = !this.expandedProjectDetails[projectId];
  }

  toggleAllDetails(): void {
    this.areAllExpanded = !this.areAllExpanded;
    this.projects.forEach(project => {
      this.expandedProjectDetails[project.idProject] = this.areAllExpanded;
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProjects = [...this.projects];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(searchTermLower) ||
        project.description.toLowerCase().includes(searchTermLower) ||
        project.projectManager.firstName.toLowerCase().includes(searchTermLower) ||
        project.projectManager.lastName.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
