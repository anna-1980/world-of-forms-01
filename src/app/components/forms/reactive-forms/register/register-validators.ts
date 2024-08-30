// form group validators
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if(password === confirmPassword) {
    return null;
  }

  return { passwordsMatchFailed: true };
};
