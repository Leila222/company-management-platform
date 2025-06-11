import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CustomNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validNameRegex = /^[a-zA-ZÀ-ÿ\s'']{2,30}$/;
    const valid = validNameRegex.test(control.value);
    return valid ? null : { invalidName: true };
  };
}
