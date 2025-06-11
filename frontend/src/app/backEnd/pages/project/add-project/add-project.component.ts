import { Component, OnInit } from '@angular/core';
import {Project} from "../../../../models/Project";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectManager} from "../../../../models/ProjectManager";
import {ProjectService} from "../../../../services/project/project.service";
import {ProjectManagerService} from "../../../../services/manager/project-manager.service";
import {Router} from "@angular/router";

declare var Swal:any;
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectManagers: ProjectManager[];

  constructor( private router: Router,private formBuilder: FormBuilder, private projectService: ProjectService, private projectManagerService: ProjectManagerService) {

    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      projectManagerId: ['', Validators.required]
    }, { validator: this.dateValidator });
    this.projectManagers = [];
  }

  ngOnInit(): void {
    this.loadProjectManagers();
  }

  loadProjectManagers(): void {
    this.projectManagerService.getAllProjectManagers().subscribe(
      (managers) => {
        this.projectManagers = managers;
      },
      (error) => {
        console.error('Error loading project managers:', error);
      }
    );
  }

  addProject(): void {
    if (this.projectForm.valid) {
      const project: Project = {
        idProject: 0,
        name: this.projectForm.get('name')?.value,
        description: this.projectForm.get('description')?.value,
        startDate: this.projectForm.get('startDate')?.value,
        endDate: this.projectForm.get('endDate')?.value,
        tasks: [],
        projectManager: this.projectManagers.find(manager => manager.userId === +this.projectForm.get('projectManagerId')?.value) || new ProjectManager()
      };

      this.projectService.addProject(project).subscribe(
        (newProject) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Project added successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
              this.router.navigate(['/projects']);
          });
        },
        (error) => {
          console.error('Error adding project:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error adding project',
            text: error.message || 'An error occurred while adding the project.'
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
