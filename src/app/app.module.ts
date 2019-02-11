import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ContactService } from './contacts/contact.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataStorageService } from './shared/data-storage.service';
import { YearValidateDirective } from './shared/yearValidate.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    YearValidateDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    NgbDropdownModule,
  ],
  providers: [
    AuthService,
    ContactService,
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
