import { FormControl, FormGroup } from '@angular/forms';

/**
 * Accessor for a given form field by control name.
 * @return The form control.
 * @throws Error indicating that incorrect or nonexistent form control name.
 */
export const getFormControl = (formGroup: FormGroup, formControlName: string): FormControl => {
    if (!(formGroup instanceof FormGroup)) {
        throw new Error(`No form group with name '${String(formGroup)}'.`);
    }
    const control: FormControl = formGroup.controls[ formControlName ] as FormControl;
    if ((control === undefined) || (control === null)) {
        throw new Error(`No form control with name '${formControlName}'.`);
    }
    
    return control;
}

/**
 * Accessor for a given form field's value by control name.
 * @return The form control's value.
 */
export const getFormFieldValue = (formGroup: FormGroup, formControlName: string, defaultValue: any = ''): any => 
    getFormControl(formGroup, formControlName).value;


/**
 * Setter for a given form field's value by control name.
 * @return The form control's value.
 */
export const setFormFieldValue = (formGroup: FormGroup, formControlName: string, value: any = ''): void => 
    { getFormControl(formGroup, formControlName).setValue(value); }
