import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import { ProjectManager } from '../../models/ProjectManager';
import {catchError} from "rxjs/operators";
import {AuthService} from "../authenticate/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private baseUrl = 'http://localhost:8081/api/manager';

  constructor(private http: HttpClient, private authService: AuthService) {}


  addProjectManager(manager: ProjectManager): Observable<string> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/add`, manager, { headers, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error adding Project Manager:', error.message);
          return throwError(error);
        })
      );
  }

  updateProjectManager(id: number, manager: ProjectManager): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update/${id}`, manager, {
      headers: this.authService.getHeaders(),
      observe: 'response',
      responseType: 'text' as 'json'
    })
      .pipe(
        map(response => response.body as string),
        catchError(error => throwError(error))
      );
  }

  deleteProjectManager(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => throwError(error))
      );
  }

  getAllProjectManagers(): Observable<ProjectManager[]> {
    return this.http.get<ProjectManager[]>(`${this.baseUrl}/all`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => throwError(error))
      );
  }

  getProjectManagerById(id: number): Observable<ProjectManager> {
    return this.http.get<ProjectManager>(`${this.baseUrl}/get/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => throwError(error))
      );
  }
}
