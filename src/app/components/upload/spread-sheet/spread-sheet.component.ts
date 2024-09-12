import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { SpreadSheetService } from '../spread-sheet.service';

@Component({
  selector: 'app-spread-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spread-sheet.component.html',
  styleUrl: './spread-sheet.component.scss',
})
export class SpreadSheetComponent {
  data: any[][] = []; // To store the data parsed from the Excel file
  availableFiles: string[] = []; // To store the available files in the mock database

  // Inject the SpreadSheetService
  constructor(private spreadSheetService: SpreadSheetService) {}
 
  ngOnInit() {
    this.loadAvailableFiles(); // Load available files when the component is initialized
  }

  loadAvailableFiles() {
    this.spreadSheetService.loadAvailableFiles().subscribe((response: any) => {
      this.availableFiles = response;
    });
  }
 
  // Function to handle file input change event
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    };
    reader.readAsBinaryString(target.files[0]);
  }

   // Function to save the parsed data to the mock database
   saveToDatabase() {
    this.spreadSheetService.data = this.data; // Update the service with the current data
    this.spreadSheetService.updateMockDatabase(); // Call the service to save to the database
  }

  // Function to load data from the mock database
  loadFromDatabase() {
    this.spreadSheetService.loadFromMockDatabase(); // Call the service to load data
    this.data = this.spreadSheetService.data; // Assign the loaded data to the component's data
  }

  saveAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'ExportedData.xlsx');
  }
}
