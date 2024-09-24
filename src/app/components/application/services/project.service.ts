import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Project } from '../../../models/project.model'; // Assuming you have a Project model

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  // Subject to store the current list of projects
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  // Subject to track loading state (optional)
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch all projects from the API
  getProjects(): void {
    this.setLoading(true);
    this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(this.handleError),
      tap((projects: Project[]) => {
        this.projectsSubject.next(projects); // Update the BehaviorSubject with the latest data
        this.setLoading(false);
      })
    ).subscribe();
  }

  // Fetch a single project by ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new project
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing project by ID
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a project by ID
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Reusable error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend error
      errorMessage = `Backend returned code ${error.status}, body was: ${error.message}`;
      console.error(errorMessage);
    }

    return throwError(() => new Error(errorMessage));
  }

  // Helper method to toggle loading state (optional)
  private setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }
}
