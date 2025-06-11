import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectManager} from "../../../../models/ProjectManager";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../../services/project/project.service";
import {ProjectManagerService} from "../../../../services/manager/project-manager.service";
import {Project} from "../../../../models/Project";

declare var Swal: any;
@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent implements OnInit {

  projectForm: FormGroup;
  projectId!: number;
  projectManager: ProjectManager | any;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private projectService: ProjectService,
              private projectManagerService: ProjectManagerService) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      projectManagerId: ['']
    }, { validator: this.dateValidator });

  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.loadProjectDetails();
  }


  loadProjectDetails(): void {
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (project) => {
          this.projectForm.patchValue({
            name: project.name,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            tasks: [],
            projectManagerId: project.projectManager.userId
          });
          this.projectManager = project.projectManager;
        },
        (error) => {
          console.error('Error loading project details:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error loading project',
            text: 'An error occurred while loading the project details.'
          });
        }
      );
    }
  }

  updateProject(): void {
    if (this.projectForm.valid && this.projectId) {
      const updatedProject: Project = {
        idProject: this.projectId,
        name: this.projectForm.get('name')?.value,
        description: this.projectForm.get('description')?.value,
        startDate: this.projectForm.get('startDate')?.value,
        endDate: this.projectForm.get('endDate')?.value,
        tasks: [],
        projectManager: this.projectManager
      };

      this.projectService.updateProject(this.projectId, updatedProject).subscribe(
        (project) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Project updated successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/projectsManager']);
          });
        },
        (error) => {
          console.error('Error updating project:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error updating project',
            text: error.message || 'An error occurred while updating the project.'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form data',
        text: 'Please fill in all required fields.'
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.projectForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  dateValidator(group: AbstractControl): { [key: string]: any } | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    return startDate && endDate && new Date(startDate) >= new Date(endDate) ? { dateInvalid: true } : null;
  }

}
