import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nested-form',
  standalone: true,
  imports: [],
  templateUrl: './nested-form.component.html',
  styleUrl: './nested-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedFormComponent {


  onSubmit() {
    console.log('[NestedForm],Form submitted');
     
  }
}
