import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bpi-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formProduct = new FormBuilder().group({
    id: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(10), ]],
    name: ['', Validators.required],
    description: ['', Validators.required],
    logo: ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: ['', Validators.required],
  });

  constructor(private httpReqs: HttpReqsService,private datePipe: DatePipe) { }

  ngOnInit(): void { }

  sendDataProduct() {
    if (!this.formProduct.valid) {
      this.formProduct.markAllAsTouched();
      return;
    } else {
      this.formProduct.get('date_release')?.setValue(this.datePipe.transform(this.formProduct.get('date_release')?.value, 'yyyy-MM-dd'));
      this.formProduct.get('date_revision')?.setValue(this.datePipe.transform(this.formProduct.get('date_revision')?.value, 'yyyy-MM-dd'));

      this.httpReqs.sendProduct(this.formProduct.value).subscribe(res => {
        console.log("exito");
      });
    }
  }

}
