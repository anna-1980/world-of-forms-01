import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpreadSheetService } from '../spread-sheet.service'; // Import the service
import * as XLSX from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';

export interface SpreadsheetRow {
  cells: string[];
}

export interface AvailableFile {
  id: number;
  name: string;
}

export interface SpreadsheetData {
  name: string;
  data: string[][];
}

@Component({
  selector: 'app-spread-sheet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './spread-sheet.component.html',
  styleUrls: ['./spread-sheet.component.scss'],
})
export class SpreadSheetComponent implements OnInit {
  spreadsheetForm: FormArray = this.fb.array([]);
  availableFiles: AvailableFile[] = []; // Use the AvailableFile interface
  currentFileName: string = ''; // Track the current file name
  currentFileId: number | null = null; // Track the current file ID

  constructor(
    private fb: FormBuilder,
    private spreadSheetService: SpreadSheetService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadAvailableFiles(); // Load available files when the component is initialized
    this.addRow();
    this.addRow();
    console.log('available files',this.availableFiles);
  }

  get rows(): FormArray {
    return this.spreadsheetForm;
  }

  addRow(): void {
    const row = this.fb.group({
      cells: this.fb.array([this.fb.control('', Validators.required), this.fb.control('', Validators.required)])
    });
    this.rows.push(row);
  }

  addCell(rowIndex: number): void {
    const row = this.rows.at(rowIndex) as FormGroup;
    const cells = row.get('cells') as FormArray;
    cells.push(this.fb.control('', Validators.required));
  }

  // Load the available files
  loadAvailableFiles(): void {
    this.spreadSheetService.loadAvailableFiles().subscribe({
      next: (response: AvailableFile[]) => {
        this.availableFiles = response;
        console.log('Available files:', this.availableFiles); // Log after files are loaded
        this.cdr.detectChanges(); // Trigger change detection if needed
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading available files:', error);
        alert('Error loading available files. Please try again.');
      }
    });
  }

  // Load a specific file's data from the mock database
  loadFile(id: number): void {
    console.log('File ID to load:', id);  // Debugging line
  
    this.spreadSheetService.loadFileById(id).subscribe({
      next: (response: SpreadsheetData) => {
        this.populateFormWithData(response.data);
        
        this.currentFileName = response.name;
        this.currentFileId = id;  // Store the numeric ID
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading file:', error);
        alert('Error loading file. Please try again.');
      }
    });
  }
  

  // Convert form data to Excel-compatible format and download
  saveAsExcel(): void {
    const formData = this.spreadsheetForm.value.map((group: { cells: string[] }) => group.cells);
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(formData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ExportedData.xlsx');
  }

  // Handle Excel file upload
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const bstr = e.target?.result as string;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
      this.populateFormWithData(data as string[][]);
    };
    reader.readAsBinaryString(file);
  }

  populateFormWithData(data: string[][]): void {
    this.spreadsheetForm.clear(); // Clear previous form data
  
    // Create a new row for each array in the data
    data.forEach(row => {
      const rowArray = this.fb.array(row.map(cell => this.fb.control(cell)));
      this.spreadsheetForm.push(this.fb.group({ cells: rowArray }));
    });
  
    // Trigger change detection if needed
    this.cdr.detectChanges();
  }

  // Save the current spreadsheet to the database
  saveToDatabase(): void {
    const formData = this.spreadsheetForm.value.map((group: { cells: string[] }) => group.cells);
    const data: SpreadsheetData = {
      name: this.currentFileName,
      data: formData
    };

    console.log('Data to save:', this.currentFileId, data);

    if (this.currentFileId !== null) {
      this.spreadSheetService.updateFile(this.currentFileId, data).subscribe(response => {
        console.log('Data saved to mock DB:', response);
      });
    } else {
      this.spreadSheetService.createFile(data).subscribe(response => {
        console.log('New file created in mock DB:', response);
        this.currentFileId = response.id; // Update the current file ID with the new file's ID
      });
    }
  }
  // getCellControls(rowIndex: number): FormControl[] {
  //   const row = this.spreadsheetForm.at(rowIndex) as FormGroup;
  //   return (row.get('cells') as FormArray).controls as FormControl[];
  // }

  // getCellControls(rowIndex: number): FormArray {
  //   const row = this.spreadsheetForm.at(rowIndex) as FormGroup;
  //   return row.get('cells') as FormArray;
  // }

  getCellControls(rowIndex: number): FormArray {
    const row = this.spreadsheetForm.at(rowIndex) as FormGroup;
    return row.get('cells') as FormArray;
  }

  getCellControl(rowIndex: number, colIndex: number): FormControl {
    // Get the row as a FormGroup
    const row = this.spreadsheetForm.at(rowIndex) as FormGroup;
    // Get the cells FormArray from the row
    const cells = row.get('cells') as FormArray;
    // Return the specific FormControl (cell) at the given column index
    return cells.at(colIndex) as FormControl;
  }

  getRowFormGroup(rowIndex: number): FormGroup {
    return this.spreadsheetForm.at(rowIndex) as FormGroup;
  }
}