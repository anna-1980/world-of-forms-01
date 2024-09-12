import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { Observable } from 'rxjs';
import { AvailableFile, SpreadsheetData } from './spread-sheet/spread-sheet.component';

@Injectable({
  providedIn: 'root'
})
export class SpreadSheetService {
  private apiUrl = 'http://localhost:3000/spreadsheets'; // Base URL for JSON Server

  constructor(private http: HttpClient) { } // Inject the HttpClient module

   // Load all available files from the mock database
   loadAvailableFiles(): Observable<AvailableFile[]> {
    return this.http.get<AvailableFile[]>(this.apiUrl);
  }

  // Load a specific file's data from the mock database
  loadFileById(id: number): Observable<SpreadsheetData> {
    return this.http.get<SpreadsheetData>(`${this.apiUrl}/${id}`);
  }

  // Update a specific file's data in the mock database
  updateFile(id: number, data: SpreadsheetData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Create a new file in the mock database
  createFile(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
