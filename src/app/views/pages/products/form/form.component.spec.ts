import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from './form.component';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/data/service/Alert.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/data/schema/Product';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let httpReqsService: jasmine.SpyObj<HttpReqsService>;
  let alertService: jasmine.SpyObj<AlertService>;
  let router: Router;

  beforeEach(async () => {
    const httpReqsSpy = jasmine.createSpyObj('HttpReqsService', ['editProduct', 'sendProduct']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['setAlert', 'btnSelected']);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        DatePipe,
        FormBuilder,
        { provide: HttpReqsService, useValue: httpReqsSpy },
        { provide: AlertService, useValue: alertServiceSpy },
      ],
    }).compileComponents();

    httpReqsService = TestBed.inject(HttpReqsService) as jasmine.SpyObj<HttpReqsService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form for editing product', () => {
    const mockProduct = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
      // Add more fields as needed
    };

    // Simulate receiving data from previous state
    component.productToEdit = mockProduct;
    component.ngOnInit();

    expect(component.formProduct.get('id')?.value).toBe(mockProduct.id);
    expect(component.formProduct.get('name')?.value).toBe(mockProduct.name);
    expect(component.formProduct.get('description')?.value).toBe(mockProduct.description);
    // Add assertions for other fields
    expect(component.formProduct.get('id')?.disabled).toBeTrue();
  });

  it('should send product data', () => {
    // Simulate form being valid and sending product data
    spyOnProperty(component.formProduct, 'valid', 'get').and.returnValue(false);


    const mockProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: '2023-12-01',
      date_revision: '2023-12-05'
      // Add more fields as needed
    };

    component.productToEdit = mockProduct;
    component.sendDataProduct();

    // Check if the service method is called with the correct data
    expect(httpReqsService.editProduct).toHaveBeenCalledWith(mockProduct);
    // Add more expectations or assertions as needed
  });

  it('should not send invalid product data', () => {
    // Simulate form being invalid
    spyOnProperty(component.formProduct, 'valid', 'get').and.returnValue(false);


    // Call sendDataProduct
    component.sendDataProduct();

    // Verify that the service method was not called
    expect(httpReqsService.editProduct).not.toHaveBeenCalled();
    // Add more expectations or assertions as needed
  });

  it('should send new product data when not editing', () => {
    // Simulate form being valid and not editing an existing product
    spyOnProperty(component.formProduct, 'valid', 'get').and.returnValue(false);

    component.productToEdit =
    {
      id: "",
      name: "",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    };

    const mockProduct = {
      id: '2',
      name: 'New Product',
      description: 'New Description',
      logo: 'new_logo.png',
      date_release: '2023-12-02',
      date_revision: '2023-12-06'
      // Add more fields as needed
    };

    component.formProduct.setValue(mockProduct);
    component.sendDataProduct();

    // Check if the service method is called with the correct data
    expect(httpReqsService.sendProduct).toHaveBeenCalledWith(mockProduct);
    // Add more expectations or assertions as needed
  });

  // Test cases for handling service responses, alert messages, and navigation after successful or failed requests
  it('should handle successful product update', () => {
    // Simulate form being valid and editing an existing product
    spyOnProperty(component.formProduct, 'valid', 'get').and.returnValue(false);

    const mockProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: '2023-12-01',
      date_revision: '2023-12-05'
      // Add more fields as needed
    };
    component.productToEdit = mockProduct;

    spyOn(httpReqsService, 'editProduct').and.returnValue(of(new Product(
      '1',
      'Product 1',
      'Description 1',
      'logo1.png',
      '2023-12-01',
      '2023-12-05'
    ))); // Simulate successful edit
    expect(httpReqsService.editProduct).toHaveBeenCalled();

    spyOn(alertService.btnSelected, 'pipe').and.returnValue(of('acept')); // Simulate button acceptance

    spyOn(router, 'navigate'); // Spy on router navigation

    component.sendDataProduct();

    // Check if the service method is called with the correct data
    httpReqsService.editProduct = jasmine.createSpy().and.returnValue(mockProduct);
    expect(httpReqsService.editProduct).toHaveBeenCalled();

    // Check if appropriate alert message was set
    expect(alertService.setAlert).toHaveBeenCalledWith('Actialización Exitosa');

    // Check if navigation occurred after successful update
    expect(router.navigate).toHaveBeenCalledWith(['products']);
    // Add more expectations or assertions as needed
  });

  // Add more test cases to cover error scenarios, button rejection, and other edge cases in the component's functionality
});