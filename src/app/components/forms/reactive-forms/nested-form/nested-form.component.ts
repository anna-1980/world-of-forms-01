import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, combineLatest } from 'rxjs';

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
  personalDetailsInvalidCached: boolean | undefined = false;
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
    this.loadCount();  // Load the count from localStorage

    this.initializeFormObservables();
    console.log('[OnInit] ------------------------------------');
  }

  private loadCount() {
    const storedCount = localStorage.getItem('debugCount');
    if (storedCount) {
      this.count = parseInt(storedCount, 10);
    }
  }

  private saveCount() {
    localStorage.setItem('debugCount', this.count.toString());
  }

  private updateCount() {
    this.count++;
    this.saveCount();  // Save the updated count to localStorage
    console.log(`[Debug] Count updated: ${this.count}`);
  }

  private initializeFormObservables() {
    // Observables for form groups and arrays
    const personalDetailsChanges$ = this.myForm.get('personalDetails')!.valueChanges.pipe(debounceTime(300));
    const companyDetailsChanges$ = this.myForm.get('companyDetails')!.valueChanges.pipe(debounceTime(300));
    const collaboratorsArray$ = (this.myForm.get('collaborators') as FormArray).valueChanges.pipe(debounceTime(300));

    // Combine all observables
    combineLatest([personalDetailsChanges$, companyDetailsChanges$, collaboratorsArray$]).subscribe(() => {
      console.log('combine all observables', '-0-0-0-0-0-0-0-0-0')
      this.updateCount();  // Update count and save to localStorage
      this.updateFormValidity();
    });

    // Subscribe to individual collaborator additions/removals
    (this.myForm.get('collaborators') as FormArray).controls.forEach((control, index) => {
      control.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(() => {
        this.updateCollaboratorValidity(index);
      });
    });
  }

  private updateFormValidity() {
    this.updatePersonalDetailsValidity();
    this.updateAllCollaboratorsValidity();
    this.updateCompanyDetailsValidity();
  }

  private updatePersonalDetailsValidity() {
    const personalDetails = this.myForm.get('personalDetails');
    this.personalDetailsInvalidCached =
      personalDetails?.invalid && (personalDetails?.touched || personalDetails?.dirty);
    console.log(`[NestedForm] PersonalDetailsInvalid ---> cached: ${this.personalDetailsInvalidCached}, Count: ${this.count}`);
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
  get isPersonalDetailsValid(): boolean {
    console.log('[NestedForm] PersonalDetails Validity Check');
    return !this.personalDetailsInvalidCached;
  }

  get isCompanyDetailsValid(): boolean {
    console.log('[NestedForm] CompanyDetails Validity Check');
    return !this.companyDetailsInvalidCached;
  }

  getCollaboratorInvalid(index: number): boolean {
    return this.collaboratorInvalidCached[index] ?? false;
  }

  getCollaboratorControl(index: number, controlName: string) {
    return this.collaborators.at(index).get(controlName);
  }

  onSubmit() {
    console.log('[NestedForm], Form submitted');
    console.log('[NestedForm], Form value:', this.myForm.value);
  }
}
