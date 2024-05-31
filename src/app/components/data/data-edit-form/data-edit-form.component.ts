import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

type Level = { 
  criterium0: string,
  criterium1: string,
  criterium2: string,
  criterium3: string,
  criterium4: string,
  criterium5: string
 };

@Component({
  selector: 'app-data-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './data-edit-form.component.html',
  styleUrl: './data-edit-form.component.scss'
})
export class DataEditFormComponent implements OnInit{
  signmentForm!: FormGroup;

  kindOfCriterium = [
    'Medical need',
    "scientific competitiveness",
    "Existance of preparatory work",
    "Innovation",
    "Contribution to Science",
    "Overall judgement"
  ];

  level: Level = {
    criterium0: 'Poor',
    criterium1: 'Average',
    criterium2: 'Good',
    criterium3: 'Very good',
    criterium4: 'Excellent',
    criterium5: 'Outstanding'
  }

  currentStudy!: any;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
 
    
    const levelArray: FormArray = this.fb.array([]);

    this.kindOfCriterium.forEach((criterium) => {
      levelArray.push(this.fb.group({
        //array generated below in the form
        criteriumType: [criterium], 
        level: [null, Validators.required],
      }))
    });

    this.signmentForm = this.fb.group({
      result: [''],
      keyStrengths: [''],
      keyWeaknesses: [''],
      evaluationCriteriaRating:  this.fb.array([])
    });

    this.kindOfCriterium.forEach(criterium => {
      const formGroup = this.fb.group({
        criteriumType: [criterium],
        level: [null, Validators.required]
      });
      (this.signmentForm.get('evaluationCriteriaRating') as FormArray).push(formGroup);
    });

    console.log('log ', this.signmentForm);
  }

  // createRating(): FormGroup {
  //   return this.fb.group({
  //     criterium: [''],
  //     level: ['']
  //   });
  // }

  // addRating() {
  //   this.evaluationCriteriaRating.push(this.createRating());
  // }
  
  levelArray() {
    return this.signmentForm.get('evaluationCriteriaRating') as FormArray;
  }

  toControl(abstrCtrl: AbstractControl): FormControl {
    return abstrCtrl as FormControl;

  }
  get evaluationCriteriaRating() {
    return this.signmentForm.get('evaluationCriteriaRating') as FormArray;
  }

  onSubmit() {
    console.log(this.signmentForm.value);
    // Send the updated data back to your server here
  }
}
