import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

interface PasswordResetRequest {
  phoneNumber: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private baseUrl = 'http://localhost:8081/api/reset-password';

  constructor(private http: HttpClient) {}

  initiatePasswordReset(request: PasswordResetRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, request, { responseType: 'text' as 'json' }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  resetPassword(request: ResetPasswordRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/confirm`, request, { responseType: 'text' as 'json' }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
