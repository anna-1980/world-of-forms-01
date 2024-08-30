import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-nested-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedFormComponent implements OnInit {

  // Cached validity states
  personalDetailsInvalidCached: boolean | undefined= false;
  collaboratorInvalidCached: boolean[] = [];
  companyDetailsInvalidCached: boolean | undefined = false;
  count: number = 0;

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
    this.initializeCompanyDetailsValidity();
  }

  private initializePersonalDetailsValidity() {
    this.count = this.count + 1;
    const personalDetails = this.myForm.get('personalDetails');
    if (personalDetails) {
      personalDetails.valueChanges.pipe(
        debounceTime(300) // Debounce for better performance
      ).subscribe(() => {
        this.updatePersonalDetailsValidity();
      });
    }
  }

  private initializeCollaboratorsValidity() {
    const collaboratorsArray = this.myForm.get('collaborators') as FormArray;
    collaboratorsArray.controls.forEach((control, index) => {
      control.valueChanges.pipe(
        debounceTime(300) // Debounce for better performance
      ).subscribe(() => {
        this.updateCollaboratorValidity(index);
      });
    });

    // Listen for changes in the collaborators array itself to handle dynamic additions/removals
    collaboratorsArray.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.updateAllCollaboratorsValidity();
    });
  }

  private initializeCompanyDetailsValidity() {
    const companyDetails = this.myForm.get('companyDetails');
    if (companyDetails) {
      companyDetails.valueChanges.pipe(
        debounceTime(300) // Debounce for better performance
      ).subscribe(() => {
        this.updateCompanyDetailsValidity();
      });
    }
  }

  private updatePersonalDetailsValidity() {
    const personalDetails = this.myForm.get('personalDetails');
    this.personalDetailsInvalidCached =
      personalDetails?.invalid && (personalDetails?.touched || personalDetails?.dirty);
    console.log(`[NestedForm] PersonalDetailsInvalid ---> cached: ${this.personalDetailsInvalidCached}, ${this.count}`);
  }

  private updateCollaboratorValidity(index: number) {
    const collaborator = this.collaborators.at(index);
    this.collaboratorInvalidCached[index] =
      collaborator.invalid && (collaborator.touched || collaborator.dirty);
    console.log(`Collaborator ${index} Invalid: ${this.collaboratorInvalidCached[index]}`);
  }

  private updateAllCollaboratorsValidity() {
    this.collaboratorInvalidCached = this.collaborators.controls.map((control, index) => 
      control.invalid && (control.touched || control.dirty)
    );
  }

  private updateCompanyDetailsValidity() {
    const companyDetails = this.myForm.get('companyDetails');
    this.companyDetailsInvalidCached =
      companyDetails?.invalid && (companyDetails?.touched || companyDetails?.dirty);
    console.log(`CompanyDetailsInvalid: ${this.companyDetailsInvalidCached}`);
  }

  // Getter to access collaborators FormArray
  get collaborators(): FormArray {
    return this.myForm.get('collaborators') as FormArray;
  }

  // Getter to access companyDetails FormGroup
  get companyDetails(): FormGroup {
    return this.myForm.get('companyDetails') as FormGroup;
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

    // Subscribe to the new collaborator's value changes
    collaboratorGroup.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      const index = this.collaborators.controls.indexOf(collaboratorGroup);
      this.updateCollaboratorValidity(index);
    });
  }

  // Method to remove a collaborator
  removeCollaborator(index: number) {
    this.collaborators.removeAt(index);
    this.collaboratorInvalidCached.splice(index, 1); // Update cached validity states
  }

  // Getter methods to access the cached values
  get isPersonalDetailsValid() {
    console.log('[NestedForm] personalDetails---> cached');
    return !this.personalDetailsInvalidCached;
  }

  get isCompanyDetailsValid() {
    console.log('[NestedForm] companyDetails---> cached');
    return !this.companyDetailsInvalidCached;
  }

  onSubmit() {
    console.log('[NestedForm],Form submitted');
    console.log('[NestedForm],Form  ', this.myForm.value);
  }
}
