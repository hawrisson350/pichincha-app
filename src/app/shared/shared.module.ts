import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldModule } from './form-field/form-field.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    FormFieldModule
  ]
})
export class SharedModule { }
