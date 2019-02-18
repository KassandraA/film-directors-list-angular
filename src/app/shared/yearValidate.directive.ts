import { Directive } from '@angular/core';
import { ValidatorFn, ValidationErrors, Validator, FormGroup, NG_VALIDATORS, AbstractControl } from '@angular/forms';


export const identifyYearValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const dateOfBirth = control.get('dateOfBirth').value;
    const dateOfDeath = control.get('dateOfDeath').value;
    let invalidDate = false;
    if (dateOfBirth && dateOfDeath) {
        const birthDate = new Date(dateOfBirth).getTime();
        const deathDate = new Date(dateOfDeath).getTime();
        invalidDate = (deathDate - birthDate) < 0;
    } else if (!dateOfBirth && dateOfDeath) {
        invalidDate = true;
    }
    return invalidDate ? { 'datesConflict': true } : null;
};

@Directive({
    selector: '[appYearValidate]',
    providers: [{ provide: NG_VALIDATORS, useExisting: YearValidateDirective, multi: true }]
})
export class YearValidateDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return identifyYearValidator(control);
    }

}
