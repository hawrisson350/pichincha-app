import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'label[bpiLabel]',
  host: {
    class: 'bpi-form-field__label',
    '[class.bpi-form-field__label--required]': 'required === true',
  }
})
export class FormFieldLabelDirective {
  @Input() required = false;
}
