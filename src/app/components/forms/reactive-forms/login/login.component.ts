import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from './form-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink  } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFailed: boolean = false;

  //This is a service provided by Angular that helps manage cleanup tasks 
  private destroyRef = inject(DestroyRef);

  constructor(private formService: FormService) {}


  ngOnInit() {

    const savedLoginEmail = window.localStorage.getItem('loginForm-email');

    if (savedLoginEmail){
      const savedEmail = JSON.parse(savedLoginEmail);
      this.loginForm.patchValue({
        email: savedEmail.email
      });
    }

    const  subscribeEmail = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe( {
      next: (value) => {
        window.localStorage.setItem('loginForm-email', JSON.stringify({email: value.email}));
      }
    });

    this.destroyRef.onDestroy(() => {
      subscribeEmail.unsubscribe();
    });
  }

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email], 
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    }),
  });

  // a getter for checking formcontrols validity
  get emailIsInvalid() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.invalid && (emailControl?.touched || emailControl?.dirty);
  }

  get passwordIsInvalid() {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.invalid && (passwordControl?.touched || passwordControl?.dirty);
  }

  onSubmit() {
    console.log(this.loginForm);
    // call the service to authenticate the user
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (typeof email === 'string' && typeof password === 'string') {
        this.formService
          .checkCredentials(email, password)
          .subscribe((isValid) => {
            if (isValid) {
              console.log('Login successful');
              // Handle successful login
            } else {
              console.log('Login failed');
              this.loginFailed = true;
            }
          });
      }
    }
  }
}
