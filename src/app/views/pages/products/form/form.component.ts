import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/data/service/Alert.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/data/schema/Product';
import { first } from 'rxjs';

@Component({
  selector: 'bpi-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  productToEdit= {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };

  formProduct = new FormBuilder().group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10),]],
    name: ['', Validators.required],
    description: ['', Validators.required],
    logo: ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: ['', Validators.required],
  });

  constructor(
    private alertService: AlertService,
    private httpReqs: HttpReqsService,
    private router: Router,
    private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.productToEdit = history.state;
    if (this.productToEdit?.id) {
      this.formProduct.get("id")?.setValue(this.productToEdit?.id);
      this.formProduct.get("name")?.setValue(this.productToEdit['name']);
      this.formProduct.get("description")?.setValue(this.productToEdit['description']);
      this.formProduct.get("logo")?.setValue(this.productToEdit['logo']);
      this.formProduct.get("date_release")?.setValue(this.productToEdit['date_release']);
      this.formProduct.get("date_revision")?.setValue(this.productToEdit['date_revision']);

      this.formProduct.get("id")?.disable();
    }

  }

  sendDataProduct() {
    if (!this.formProduct.valid) {
      this.formProduct.markAllAsTouched();
      return;
    } else {
      this.formProduct.get('date_release')?.setValue(this.datePipe.transform(this.formProduct.get('date_release')?.value, 'yyyy-MM-dd'));
      this.formProduct.get('date_revision')?.setValue(this.datePipe.transform(this.formProduct.get('date_revision')?.value, 'yyyy-MM-dd'));

      if (this.productToEdit?.id) {
        this.httpReqs.editProduct(this.formProduct.getRawValue()).subscribe({
          next: (next) => {
            this.alertService.setAlert("Actialización Exitosa");
            this.alertService.btnSelected.pipe(first()).subscribe(
              res => { this.router.navigate(['products']); }
            );

          },     // nextHandler
          error: (error) => {
            this.alertService.setAlert(error.error)
          }    // errorHandler 
        });
      } else {
        this.httpReqs.sendProduct(this.formProduct.value).subscribe({
          next: (next) => {
            this.alertService.setAlert("Creación Exitosa");
            this.alertService.btnSelected.pipe(first()).subscribe(
              res => { this.router.navigate(['products']); }
            );

          },     // nextHandler
          error: (error) => {
            this.alertService.setAlert(error.error)
          }    // errorHandler 
        });
      }
    }
  }

}
