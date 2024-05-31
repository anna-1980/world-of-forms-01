import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
 
interface TableData {
  description: string;
  question: string;
  answers: string;
}

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, MeetingsListComponent, ReactiveFormsModule ],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})
export class MeetingsComponent implements OnInit {
  form!: FormGroup;
  tableData: TableData[]  = [  
    { description: 'answer the following quesiotn', 
  question: 'is rain made of water?', answers: 'yes' },
    { description: 'solve the equation', question: '2x+3=5, is the answer 5?', answers: 'maybe' },
    { description: 'answer the following quesiotn', question: 'is rain made of water?', answers: 'yes' },
    { description: 'solve the equation', question: '2x+3=6, is the answer 5?', answers: 'no' },
    { description: 'answer the following quesiotn', question: 'is rain made of water?', answers: 'yes' },
  
  ]
  constructor(private fb: FormBuilder, private http: HttpClient) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      id: Math.random(),
      rows: this.fb.array([])

      
    });

    const rowsFormArray = this.form.get('rows') as FormArray;
    this.tableData.forEach(row => {
      const newRow = this.fb.group({
        description: [row.description],
        question: [row.question],
        answers: [row.answers]
      });
      rowsFormArray.push(newRow); // Push the new row into the FormArray
    });
  }

  onSubmit() {
    // Get form values and send to JSON server
    const formData = this.form.value;
    console.log('Form values:', formData);
    this.http.post('http://localhost:3000/answers', formData).subscribe(response => {
      console.log('Data sent successfully:', response);
    });
  }

  toControl(abstrCtrl: AbstractControl): FormControl {
    return abstrCtrl as FormControl;

  }
}
