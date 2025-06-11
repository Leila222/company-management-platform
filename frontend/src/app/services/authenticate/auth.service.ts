import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
  interface AuthenticationRequest {
    username: string;
    password: string;
  }

  interface AuthenticationResponse {
    jwt: string;
    userId: number;
    role: string;
  }

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
      return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, authRequest).pipe(
        tap(response => {
          console.log('Received response:', response);
          localStorage.setItem('token', response.jwt);
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('role', response.role.toString());
        }),
        catchError(error => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
