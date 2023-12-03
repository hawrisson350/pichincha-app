import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldModule } from './form-field/form-field.module';
import { ButtonsModule } from './buttons/buttons.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    FormFieldModule,
    ButtonsModule
  ]
})
export class SharedModule { }
