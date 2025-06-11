import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Complaint } from '../../models/Complaint';
import {AuthService} from "../authenticate/auth.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private baseUrl = 'http://localhost:8081/api/complaint';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/add`, complaint, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  updateComplaint(id: number, updatedComplaint: Complaint): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.baseUrl}/update/${id}`, updatedComplaint, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  deleteComplaint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/all`, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseUrl}/get/${id}`, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getComplaintsBySenderId(senderId: number): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/sender/${senderId}`, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getComplaintsByReceiverId(receiverId: number): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/receiver/${receiverId}`, {headers: this.authService.getHeaders()})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
