import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasUpperCase) {
      return { missingUpperCase: true };
    }

    const hasLowerCase = /[a-z]/.test(value);
    if (!hasLowerCase) {
      return { missingLowerCase: true };
    }

    const hasDigit = /\d/.test(value);
    if (!hasDigit) {
      return { missingDigit: true };
    }

    if (value.length < 6) {
      return { minLength: true };
    }

    return null;
  };
}
