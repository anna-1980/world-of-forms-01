import { Component } from '@angular/core';
import { DataEditFormComponent } from './data-edit-form/data-edit-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [HttpClientModule, CommonModule,DataEditFormComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

}
