import { Component } from '@angular/core';
import { DataEditFormComponent } from './data-edit-form/data-edit-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SpreadSheetComponent } from "../upload/spread-sheet/spread-sheet.component";

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [HttpClientModule, CommonModule, DataEditFormComponent, SpreadSheetComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

}
