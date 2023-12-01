import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bpi-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formProduct = new FormBuilder().group({
    name: ['',Validators.required],
  });

  constructor() { }

  ngOnInit(): void {

  }

}
