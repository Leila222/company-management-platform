import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Task } from '../../models/Task';
import {catchError} from "rxjs/operators";
import {AuthService} from "../authenticate/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8081/api/task';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addTask(task: Task): Observable<String> {
    return this.http.post(`${this.baseUrl}/add`, task, { headers: this.authService.getHeaders(), responseType: 'text' })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  updateTask(id: number, updatedTask: Task): Observable<string> {
    console.log('Updating task with ID:', id, 'and data:', updatedTask);
    return this.http.put<string>(`${this.baseUrl}/update/${id}`, updatedTask, { headers: this.authService.getHeaders(), responseType: 'text' as 'json'})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }


  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/all`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/get/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/project/${projectId}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getTasksByAssignedEmpId(assignedEmpId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/employee/${assignedEmpId}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
