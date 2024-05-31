import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/answers`);
  }

  updateAnswer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/answers/${id}`, data);
  }
}