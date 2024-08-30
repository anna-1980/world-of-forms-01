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

  // Cached validity states
  personalDetailsInvalidCached: boolean | undefined = false;
  collaboratorInvalidCached: boolean[] = [];

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

  ngOnInit() {
    this.initializePersonalDetailsValidity();
    this.initializeCollaboratorsValidity();
  }

  private initializePersonalDetailsValidity() {
    const personalDetails = this.myForm.get('personalDetails');
    console.log('[NestedForm] personalDetails');
    personalDetails?.valueChanges.subscribe(() => {
      this.updatePersonalDetailsValidity();
    });
  }

  private initializeCollaboratorsValidity() {
    const collaboratorsArray = this.myForm.get('collaborators') as FormArray;
    collaboratorsArray.controls.forEach((control, index) => {
      control.valueChanges.subscribe(() => {
        this.updateCollaboratorValidity(index);
      });
    });
  }

  private updatePersonalDetailsValidity() {
    const personalDetails = this.myForm.get('personalDetails');
    this.personalDetailsInvalidCached =
      personalDetails?.invalid && (personalDetails?.touched || personalDetails?.dirty);
    console.log(`PersonalDetailsInvalid: ${this.personalDetailsInvalidCached}`);
  }

  private updateCollaboratorValidity(index: number) {
    const collaborator = this.collaborators.at(index);
    this.collaboratorInvalidCached[index] =
      collaborator.invalid && (collaborator.touched || collaborator.dirty);
    console.log(`Collaborator ${index} Invalid: ${this.collaboratorInvalidCached[index]}`);
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
  
     // Getter methods to access the cached values
  get isPersonalDetailsValid() {
    console.log('[NestedForm] personalDetails---> cached');
    return !this.personalDetailsInvalidCached;
  }

    //  // Getter method to check if the form is valid
    //  get isPersonalDetailsValid() {
    //   const personalDetails = this.myForm.get('personalDetails');
    //   console.log('[NestedForm] personalDetails');
    //   return personalDetails?.invalid && (personalDetails?.touched || personalDetails?.dirty);
    // }

  onSubmit() {
    console.log('[NestedForm],Form submitted');
    console.log('[NestedForm],Form  ', this.myForm);
     
  }
}
