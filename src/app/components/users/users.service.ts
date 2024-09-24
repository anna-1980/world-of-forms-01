import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }
 
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  // is logged in check?
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  isLoggedIn: boolean = false;

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError),
      tap(users => {
        this.usersSubject.next(users);
        console.log('UsersService getUsers', users);
      })
    ).subscribe();
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'an unknown error occured';
     // client side network error
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
   
    } else {
   // backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.error(errorMessage);
    }

    return throwError(()=> new Error(errorMessage));
  }
}
