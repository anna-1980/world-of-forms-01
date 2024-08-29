// connect to json server and check if credentials fit a user 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:3000/users'; // URL to the JSON server

  constructor(private http: HttpClient) { }

  // Method to check if user exists and password matches
  checkCredentials(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        return !!user; // Return true if user exists and password matches, otherwise false
      }),
      catchError(error => {
        console.error('Error checking credentials:', error);
        return of(false); // Return false in case of error
      })
    );
  }
}