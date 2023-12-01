import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './views/partials/top-bar/top-bar.component';
import { FooterComponent } from './views/partials/footer/footer.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpAuthorInterceptor } from './core/config/httpAuthor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpAuthorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
