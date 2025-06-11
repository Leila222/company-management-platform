import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../../services/project/project.service";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {Project} from "../../../../models/Project";
import {Router} from "@angular/router";

declare var Swal: any;

@Component({
  selector: 'app-consult-projects',
  templateUrl: './consult-projects.component.html',
  styleUrls: ['./consult-projects.component.css']
})

export class ConsultProjectsComponent implements OnInit {

  projects: Project [] = [];
  filteredProjects : Project [] = [];
  expandedProjectDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  searchTerm: string = '';
  constructor(private projectService: ProjectService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects(){
    const managerId = this.authService.getUserId();
    if (managerId) {
      this.projectService.getProjectsByManagerId(managerId).subscribe(
        projects => {
          this.projects = projects;
          this.filteredProjects = [...this.projects];
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to load projects. Please try again later.',
            icon: 'error'
          });
        }
      )
    }
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

  selectProject(project: Project): void {
    this.router.navigate(['/updateProject', project.idProject]);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProjects = [...this.projects];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(searchTermLower) ||
        project.description.toLowerCase().includes(searchTermLower)
      );
    }
  }

}
