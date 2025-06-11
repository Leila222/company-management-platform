import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Employee } from '../../models/Employee';
import {AuthService} from "../authenticate/auth.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8081/api/employee';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addEmployee(employee: Employee): Observable<string> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/add`, employee, { headers, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

    updateEmployee(id: number, employee: Employee): Observable<string> {
        const headers = this.authService.getHeaders();
        return this.http.put<string>(`${this.baseUrl}/update/${id}`, employee, { headers, responseType: 'text' as 'json' });
    }


    deleteEmployee(id: number): Observable<string> {
    const headers = this.authService.getHeaders();
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<Employee[]>(`${this.baseUrl}/all`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    const headers = this.authService.getHeaders();
    return this.http.get<Employee>(`${this.baseUrl}/get/${id}`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
