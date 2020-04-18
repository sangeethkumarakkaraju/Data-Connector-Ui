import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SchedulerComponent } from './feature/scheduler/scheduler.component';
import { PopupdatapointComponent } from './feature/data-point/popupdatapoint/popupdatapoint.component';
import { PopupdataConnection } from './feature/data-connection/popupdata-connection/popupdataconnection.component';
import { DataConnectorService } from './shared/dataconnector/data-connector.service';
import { DataPointComponent } from './feature/data-point/data-point.component';
import { DataConnectionComponent } from './feature/data-connection/data-connection.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PopupschedulerComponent } from './feature/scheduler/popupscheduler/popupscheduler.component';
import { JobhistoryComponent } from './feature/jobhistory/jobhistory.component';


@NgModule({
  declarations: [
    DataConnectionComponent,
    AppComponent,
    HomeComponent,
    SchedulerComponent,
    PopupdatapointComponent,
    PopupdataConnection,
    DataPointComponent,
    PopupschedulerComponent,
    JobhistoryComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,

  ],
  entryComponents: [
    PopupdataConnection,
    PopupdatapointComponent,
    PopupschedulerComponent
  ],
  providers: [DataConnectorService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
