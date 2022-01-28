import { FormGroup } from '@angular/forms';

export function ConfirmPasswords(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmPasswords']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedPasswords: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
