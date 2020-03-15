import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { DataConnectionComponent } from './feature/data-connection/data-connection.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { shownavbar: false }
  },
  {
    path: 'data-connector', component: DataConnectionComponent,
    data: { shownavbar: true }
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
