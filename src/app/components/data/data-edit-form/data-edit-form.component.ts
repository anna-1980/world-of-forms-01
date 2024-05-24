import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    criterium0: 'Outstanding',
    criterium1: 'Excellent',
    criterium2: 'Very good',
    criterium3: 'Average',
    criterium4: 'Below average',
    criterium5: 'Poor'
  }

  constructor(private fb: FormBuilder) {}

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
      evaluationCriteriaRating: levelArray
    });

    console.log('log ', this.levelArray());
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
