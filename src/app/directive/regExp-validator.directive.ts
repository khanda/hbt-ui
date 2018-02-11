import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function regExpValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : {'invalidExp': {value: control.value}};
  };
}

export function samePasswordValidator(abstractControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const nameRe = '';
    const forbidden = nameRe === control.value;
    return forbidden ? null : {'notSame': {value: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.forbiddenName ? regExpValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
}
