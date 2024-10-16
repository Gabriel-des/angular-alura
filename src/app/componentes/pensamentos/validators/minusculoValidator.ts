import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function permitirApenasLetrasMinusculas(control: AbstractControl): ValidationErrors | null {
    if (/[A-Z]/.test(control.value))
        return { 'lowerCaseOnly': true };
    return null;
}