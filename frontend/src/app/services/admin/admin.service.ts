import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import { Admin } from '../../models/Admin';
import {AuthService} from "../authenticate/auth.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient, private authService: AuthService) {}


  addAdmin(admin: Admin): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, admin, { headers: this.authService.getHeaders(), responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateAdmin(id: number, admin: Admin): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update/${id}`, admin, {
      headers: this.authService.getHeaders(),
      observe: 'response',
      responseType: 'text' as 'json'
    })
      .pipe(
        map(response => response.body as string),
        catchError(error => throwError(error))
      );
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => throwError(error))
      );
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseUrl}/all`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => throwError(error))
      );
  }

  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/get/${id}`, { headers: this.authService.getHeaders() })
      .pipe(
        catchError(error => throwError(error))
      );
  }
}
