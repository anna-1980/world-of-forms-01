import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap, throwError, catchError } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/study'; // replace with your json-server URL

  constructor(private http: HttpClient) { }
  studyCreated = new Subject<void>();
     
  getStudies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getStudy(studyId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studyId}`).pipe(
      catchError(error => {
        console.error('Error fetching study:', error);
        return throwError(() => new Error('Error fetching study'));
      })
    );
  }


  editStudy(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }


  createStudy(studyData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, studyData).pipe(
      tap(() => this.studyCreated.next()),
      catchError(error => {
        console.error('Error creating study:', error);
        return throwError(() => new Error('Error creating study'));
      })
    );
  }
}
