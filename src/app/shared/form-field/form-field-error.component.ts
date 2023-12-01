import { Component } from '@angular/core';

@Component({
  selector: 'bpi-error',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'bpi-form-field__error'
  }
})
export class FormFieldErrorComponent { }
