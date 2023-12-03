import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProductsModule } from './views/pages/products/products.module';
import { TopBarComponent } from './views/partials/top-bar/top-bar.component';
import { FooterComponent } from './views/partials/footer/footer.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TopBarComponent,
        FooterComponent,
        DashboardComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'pichincha-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('pichincha-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('pichincha-app app is running!');
  // });

  describe('ProductsModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]), // Simula el enrutador sin rutas para evitar errores de carga
          ProductsModule
        ]
      }).compileComponents();
    }));

    it('should create the lazy module', () => {
      const module = TestBed.inject(ProductsModule);
      expect(module).toBeTruthy();
    });
  });

});
