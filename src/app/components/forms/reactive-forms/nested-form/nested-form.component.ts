import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nested-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nested-form.component.html',
  styleUrl: './nested-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedFormComponent {


  myForm: FormGroup;
  companies = ['Company A', 'Company B', 'Company C'];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      personalDetails: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      collaborators: this.fb.array([]),
      companyDetails: this.fb.group({
        companyName: ['', Validators.required],
      }),
    });
  }

    // Getter to access collaborators FormArray
    get collaborators(): FormArray {
      return this.myForm.get('collaborators') as FormArray;
    }
  
    // Method to add a collaborator to the FormArray
    addCollaborator() {
      const collaboratorGroup = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      });
      this.collaborators.push(collaboratorGroup);
    }
  
    // Method to remove a collaborator
    removeCollaborator(index: number) {
      this.collaborators.removeAt(index);
    }
  
     // Getter method to check if the form is valid
     get isPersonalDetailsValid() {
      const personalDetails = this.myForm.get('personalDetails');
      console.log('[NestedForm] 4-roleIsInvalid');
      return personalDetails?.invalid && (personalDetails?.touched || personalDetails?.dirty);
    }

  onSubmit() {
    console.log('[NestedForm],Form submitted');
    console.log('[NestedForm],Form  ', this.myForm);
     
  }
}
