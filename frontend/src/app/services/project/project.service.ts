import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Project } from '../../models/Project';
import {catchError} from "rxjs/operators";
import {AuthService} from "../authenticate/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8081/api/project';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/add`, project, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  updateProject(id: number, updatedProject: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/update/${id}`, updatedProject, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/all`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/get/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getProjectsByManagerId(managerId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/manager/${managerId}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
