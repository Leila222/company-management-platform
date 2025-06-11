import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function resetPwdPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^\d{8}$/.test(control.value);
    return valid ? null : { invalidPhoneNumber: true };
  };
}
