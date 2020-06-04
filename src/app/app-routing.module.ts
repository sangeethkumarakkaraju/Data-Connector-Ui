import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { DataPointComponent } from './feature/data-point/data-point.component';
import { HomeComponent } from './feature/home/home.component';
import { PopupdatapointComponent } from './feature/data-point/popupdatapoint/popupdatapoint.component';
import { PopupdataConnection } from './feature/data-connection/popupdata-connection/popupdataconnection.component';
import { SchedulerComponent } from './feature/scheduler/scheduler.component';
import { DataConnectionComponent } from './feature/data-connection/data-connection.component';
import { JobhistoryComponent } from './feature/jobhistory/jobhistory.component';
import { MappingComponent } from './feature/mapping/mapping.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { shownavbar: false }
  },
  {
    path: 'data-point', component: DataPointComponent,
    data: { shownavbar: true }
  },
  {
    path: 'data-connector', component: DataConnectionComponent,
    data: { shownavbar: true }
  },
  {
    path: 'mapping', component: MappingComponent,
    data: { shownavbar: true }
  },
  {
    path: 'jobs-scheduler', component: SchedulerComponent,
    data: { shownavbar: true }
  },
  {
    path: 'job-history', component: JobhistoryComponent,
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
