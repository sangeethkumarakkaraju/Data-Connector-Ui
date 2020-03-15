import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultComponent } from './layouts/default/default.component';
import { CustomComponent } from './layouts/custom/custom.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';



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
    MaterialModule
  ],
  exports: [
    DefaultComponent,
    CustomComponent,
    NavbarComponent,
    FooterComponent,
    MaterialModule
  ],
  providers: [],
})
export class SharedModule { }
