import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { passwordsMatchValidator } from './register-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
    }, {
  validators: [passwordsMatchValidator]}
  ),
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    street: new FormControl('', {validators: [Validators.required]}),
    number: new FormControl('', {validators: [Validators.required]}),
    postalCode: new FormControl('', {validators: [Validators.required]}),
    city: new FormControl('', {validators: [Validators.required]}),
    // dropdown controller
    role: new FormControl<'user' | 'admin' | 'devOps' | 'developer' | 'tester'>('user', {validators: [Validators.required]}),
    agree: new FormControl(false, {validators: [Validators.requiredTrue]}),
  });

    // a getter for checking formcontrols validity
    get emailIsInvalid() {
      const emailControl = this.registrationForm.get('email');
      return emailControl?.invalid && (emailControl?.touched || emailControl?.dirty);
    }
  
    get passwordIsInvalid() {
      const passwordControl = this.registrationForm.get('password');
      return passwordControl?.invalid && (passwordControl?.touched || passwordControl?.dirty);
    }

  get confirmPasswordIsInvalid() {
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');
    return confirmPasswordControl?.invalid && (confirmPasswordControl?.touched || confirmPasswordControl?.dirty);
  }

  get roleIsInvalid() {
    const roleControl = this.registrationForm.get('role');
    return roleControl?.invalid && (roleControl?.touched || roleControl?.dirty);
  }

  onSubmit() {
    console.log('Form submitted');
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.valid);
  }
}
