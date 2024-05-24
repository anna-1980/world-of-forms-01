import { Component } from '@angular/core';
import { DataEditFormComponent } from './data-edit-form/data-edit-form.component';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [DataEditFormComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

}
