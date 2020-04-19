import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultComponent } from './layouts/default/default.component';
import { CustomComponent } from './layouts/custom/custom.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { CredentialsService } from './services/credentials.service';
import { DataService } from './services/shared.service';



@NgModule({
  declarations: [
    DefaultComponent,
    CustomComponent,
    NavbarComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    DefaultComponent,
    CustomComponent,
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    ReactiveFormsModule,

  ],
  providers: [CredentialsService, DataService],
})
export class SharedModule { }
