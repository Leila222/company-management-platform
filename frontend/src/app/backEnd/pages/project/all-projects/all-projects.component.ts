import { Component, OnInit } from '@angular/core';
import {Project} from "../../../../models/Project";
import {ProjectService} from "../../../../services/project/project.service";
import {Router} from "@angular/router";

declare var Swal:any;
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: Project[] = [];
  expandedProjectDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  filteredProjects: Project [] = [];
  searchTerm: string = '';

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
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

  selectProject(project: Project): void {
    this.router.navigate(['/update-project', project.idProject]);
  }

  deleteProject(id: number): void {
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
        this.projectService.deleteProject(id).subscribe(
          () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Project deleted successfully",
              showConfirmButton: false,
              timer: 1500
            });

            this.projects = this.projects.filter(project => project.idProject !== id);
            this.filteredProjects = this.filteredProjects.filter(project=>project.idProject !== id);
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete project. Please try again later.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProjects = [...this.projects];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredProjects = this.projects.filter(project=>
        project.name.toLowerCase().includes(searchTermLower) ||
        project.projectManager.firstName.toLowerCase().includes(searchTermLower) ||
        project.projectManager.lastName.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
