import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CustomPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneRegex = /^\+216[0-9]{8}$/;
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}
