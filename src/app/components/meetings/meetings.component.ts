import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import { AnswerService } from '../../services/answers.service';


interface TableDataRow {
  description: string;
  question: string;
  answers: string;
}

interface TableData {
  id: number;
  rows: TableDataRow[];
}
@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MeetingsListComponent],
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  form!: FormGroup;
  tableData: TableData[] = [];

  constructor(private fb: FormBuilder, private http: HttpClientModule, private answerService: AnswerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });
  

    this.answerService.getAnswers().subscribe((answers: TableData[]) => {
      this.tableData = answers;
      const rowsFormArray = this.form.get('rows') as FormArray;
      this.tableData.forEach(tableDataItem => {
        tableDataItem.rows.forEach(row => {
          const newRow = this.fb.group({
            description: [row.description],
            question: [row.question],
            answers: [row.answers]
          });
          rowsFormArray.push(newRow);
        });
      });
    });

    this.fetchExistingAnswers();

    console.log('Table data:', this.tableData);

  }
  fetchExistingAnswers() {
    this.answerService.getAnswers().subscribe((answers: TableData[]) => {
      this.tableData = answers;
      const rowsFormArray = this.form.get('rows') as FormArray;
      this.tableData.forEach(answer => {
        answer.rows.forEach(row => {
          const newRow = this.fb.group({
            description: [row.description],
            question: [row.question],
            answers: [row.answers]
          });
          rowsFormArray.push(newRow);
        });
      });
    });
  }
  

  onSubmit() {
    const formData = this.form.value;
    console.log('Form values:', formData);
    formData.rows.forEach((row: TableData) => {
      this.answerService.updateAnswer(row.id, row).subscribe(response => {
        console.log('Data updated successfully:', response);
      });
    });
  }

  toControl(abstrCtrl: AbstractControl): FormControl {
    return abstrCtrl as FormControl;
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

 
  addRow() {
    const newRow = this.fb.group({
      description: [''],
      question: [''],
      answers: ['']
    });
    this.rows.push(newRow);
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
  }
}
