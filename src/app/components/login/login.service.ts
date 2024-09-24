// connect to json server and check if credentials fit a user 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users'; // URL to the JSON server

  constructor(private http: HttpClient) { }

  // Method to check if user exists and password matches
  checkCredentials(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        return  user ? user : null;  
      }),
      catchError(error => {
        console.error('Error checking credentials:', error);
        return of(null); // Return null in case of error
      })
    );
  }
}
