import { Component } from '@angular/core';
import { FormGroup  } from '@angular/forms';
import { CommonModule } from '@angular/common';
 

interface TableData {
  description: string;
  question: string;
  answers: string;
}

@Component({
  selector: 'app-meetings-list',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './meetings-list.component.html',
  styleUrl: './meetings-list.component.scss'
})
export class MeetingsListComponent {
  form!: FormGroup;
  // tableData: any[] = []; // Initialize with your data

  // create for me an example data table, 3 columns 3 rows, col1-description, col-2-question, col-3-answers from the user
  tableData: TableData[]  = [  
    { description: 'answer the following quesiotn', 
  question: 'is rain made of water?', answers: 'yes' },
    { description: 'solve the equation', question: '2x+3=5, is the answer 5?', answers: 'maybe' },
    { description: 'answer the following quesiotn', question: 'is rain made of water?', answers: 'yes' },
    { description: 'solve the equation', question: '2x+3=6, is the answer 5?', answers: 'no' },
    { description: 'answer the following quesiotn', question: 'is rain made of water?', answers: 'yes' },
  
  ]
  
}
