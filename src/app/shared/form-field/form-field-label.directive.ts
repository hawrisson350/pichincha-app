import { Directive, Input } from '@angular/core';
import { FormFieldComponent } from './form-field.component';

@Directive({
  selector: 'label[bpiLabel]',
  host: {
    class: 'bpi-form-field__label',
    '[class.bpi-form-field__label--required]': 'this.formField.$isRequired',
  }
})
export class FormFieldLabelDirective {

  constructor(
    protected formField: FormFieldComponent,
  ) { }
}
