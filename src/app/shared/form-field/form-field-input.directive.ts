import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormFieldComponent } from './form-field.component';



@Directive({
  selector: '[bpiInput]',
  host: {
    'class': 'bpi-form-field__input',
    '[disabled]': 'disabled',
  }
})
export class FormFieldInputDirective implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    protected formField: FormFieldComponent,
    @Optional() protected ngControl: NgControl,
    private el: ElementRef
  ) { }

  ngOnInit() {
    if (this.ngControl) {
      // @ts-ignore
      const subscription1 = this.ngControl.statusChanges.subscribe(status => {
        this.formField.$isDisabled = status === 'DISABLED';
      });
      // @ts-ignore
      const subscription2 = this.ngControl.valueChanges.subscribe(value => {
        if (value !== undefined && value !== null) {
          this.formField.$isSelected = value.toString().length > 0;
          this.formField.$hasError = this.ngControl.errors ? true : false;
          return;
        }
        this.formField.$isSelected = false;
      });
      this.subscriptions.push(subscription1);
      this.subscriptions.push(subscription2);

      if (this.ngControl.value) {
        this.formField.$isSelected = this.ngControl.value.toString().length > 0;
        return;
      }
      this.formField.$isSelected = false;
    } else {
      if (this.el.nativeElement.value) {
        this.formField.$isSelected = this.el.nativeElement.value.toString().length > 0;
        return;
      }
      this.formField.$isSelected = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription && subscription.unsubscribe();
    });
  }

  @Input()
  set disabled(value: boolean) {
    this.formField.$isDisabled = value;
  }

  get disabled() {
    return this.formField.$isDisabled;
  }

  @HostListener('change', ['$event']) public onChange(event: any): void {
    if (!this.ngControl) {
      const value = (event.target as HTMLInputElement).value;
      this.formField.$isSelected = value.toString().length > 0;
    }
  }

  @HostListener('focus')
  onFocus() {
    this.formField.$isFocused = true;
  }

  @HostListener('blur')
  onBlur() {
    this.formField.$isFocused = false;
  }
}
