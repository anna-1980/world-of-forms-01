import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Meeting } from '../models/meetings.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

 

  private apiUrl = 'http://localhost:3000/meetings'; // replace with your json-server URL

  constructor(private http: HttpClient) { }
  meetingCreated = new Subject<void>();
  
  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editMeeting(id: number, data: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/${id}`, data);
  }

  createMeeting(meetingData: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, meetingData).pipe(
      tap(() => this.meetingCreated.next()),
      catchError(error => {
        console.error('Error creating meeting:', error);
        return throwError(new Error('Error creating meeting'));
      })
    );
  }
}
