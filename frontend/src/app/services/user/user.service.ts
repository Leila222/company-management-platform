import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from '../../models/User';
import { AuthService } from '../authenticate/auth.service'; // Assuming you have an AuthService for handling authentication

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`, { headers: this.authService.getHeaders() })
        .pipe(
            catchError(error => {
              return throwError(error);
            })
        );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get/${id}`, { headers: this.authService.getHeaders() })
        .pipe(
            catchError(error => {
              return throwError(error);
            })
        );
  }

  updateUser(userId: number, user: User): Observable<string> {
    const url = `${this.baseUrl}/update/${userId}`;
    return this.http.put<string>(url, user, {
      headers: this.authService.getHeaders(),
      observe: 'response',
      responseType: 'text' as 'json'
    })
      .pipe(
        map(response => response.body as string) // Directly return the response body as string
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.authService.getHeaders() })
        .pipe(
            catchError(error => {
              return throwError(error);
            })
        );
  }

  updatePassword(userId: number | null, currentPassword: string, newPassword: string): Observable<string> {
    const url = `${this.baseUrl}/update-password/${userId}`;
    const body = { currentPassword, newPassword };

    return this.http.put<string>(url, body, {
      headers: this.authService.getHeaders(),
      observe: 'response',
      responseType: 'text' as 'json'
    }).pipe(
      map(response => response.body as string),
      catchError(error => {
        return throwError(error);
      })
    );
  }


}
