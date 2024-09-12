import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Injectable({
  providedIn: 'root'
})
export class SpreadSheetService {
  data: any; // Declare the 'data' property

  constructor(private http: HttpClient) { } // Inject the HttpClient module

  loadAvailableFiles() {
    return this.http.get('http://localhost:3000/spreadsheets');
  }

  
  loadFromMockDatabase() {
    this.http.get('http://localhost:3000/spreadsheets')
      .subscribe((response: any) => {
        this.data = response[0].data;  // Assuming you're fetching the first spreadsheet entry
        console.log('Data loaded from mock DB:', this.data);
      });
  }

  updateMockDatabase() {
    this.http.put('http://localhost:3000/spreadsheets/1', { data: this.data })
      .subscribe(response => {
        console.log('Data updated in mock DB:', response);
      });
  }
}
