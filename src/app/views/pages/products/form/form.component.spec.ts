import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        HttpClientModule,
        SharedModule,
        RouterTestingModule.withRoutes([{ path: 'form', component: FormComponent }]),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [HttpReqsService, DatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Form component template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Formulario de registro');
  });
});
