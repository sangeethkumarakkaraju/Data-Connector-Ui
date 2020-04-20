import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    markAllFormFieldsAsTouched(form: AbstractControl): any {
        form.markAsTouched({ onlySelf: true });
        if (form instanceof FormArray || form instanceof FormGroup) {
            Object.values(form.controls).forEach(this.markAllFormFieldsAsTouched);
        }
    }
}