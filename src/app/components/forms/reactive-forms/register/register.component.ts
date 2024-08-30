import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { last } from 'rxjs';
import { passwordsMatchValidator } from './register-validators';
import { NestedFormComponent } from '../nested-form/nested-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NestedFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

    // Define counters for each getter
    private emailIsInvalidCount = 0;
    private passwordIsInvalidCount = 0;
    private confirmPasswordIsInvalidCount = 0;
    private roleIsInvalidCount = 0;


  registrationForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'blur',
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'blur',
        }),
      },
      {
        validators: [passwordsMatchValidator],
      }
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    street: new FormControl('', { validators: [Validators.required] }),
    number: new FormControl('', { validators: [Validators.required] }),
    postalCode: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    // dropdown controller
    role: new FormControl<'user' | 'admin' | 'devOps' | 'developer' | 'tester'>(
      'user',
      { validators: [Validators.required] }
    ),
    agree: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

  // a getter for checking formcontrols validity
  get emailIsInvalid() {
    const emailControl = this.registrationForm.get('email');
    console.log(`1-emailIsInvalid: ${this.emailIsInvalidCount}`);
    return (
      emailControl?.invalid && (emailControl?.touched || emailControl?.dirty)
    );
  }

  get passwordIsInvalid() {
    const passwordControl = this.registrationForm.get('passwords.password');
    console.log('2-passwordIsInvalid');
    return (
      passwordControl?.invalid &&
      (passwordControl?.touched || passwordControl?.dirty)
    );
  }

  get confirmPasswordIsInvalid() {
    const confirmPasswordControl = this.registrationForm.get(
      'passwords.confirmPassword'
    );
    console.log('3-confirmPasswordIsInvalid');
    return (
      confirmPasswordControl?.errors &&
      (confirmPasswordControl?.touched || confirmPasswordControl?.dirty)
    );
  }

  get roleIsInvalid() {
    const roleControl = this.registrationForm.get('role');
    console.log('4-roleIsInvalid');
    return roleControl?.invalid && (roleControl?.touched || roleControl?.dirty);
  }

  onSubmit() {
    console.log('Form submitted');
    console.log(this.registrationForm);
    console.log(this.registrationForm.valid);
  }
}
