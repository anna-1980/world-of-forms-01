import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/answers`).pipe(
      catchError(error => {
        console.error('Error fetching answers:', error);
        throw error;
      })
    );
  }

  updateAnswer(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/answers/${id}`, data);
  }
}