import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';
import { DatePipe } from '@angular/common';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports:[
        HttpClientModule,
        SharedModule,
        RouterTestingModule.withRoutes([{ path: 'form', component: ListComponent }])
      ],
      providers:[HttpReqsService,DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
