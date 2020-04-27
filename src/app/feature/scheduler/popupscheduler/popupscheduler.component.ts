import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupdataConnection } from 'src/app/feature/data-connection/popupdata-connection/popupdataconnection.component';
import { UsersData, PopupdatapointComponent } from '../../data-point/popupdatapoint/popupdatapoint.component';
import { ValidationService } from 'src/app/shared/services/validation.service';
// import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-popupscheduler',
  templateUrl: './popupscheduler.component.html',
  styleUrls: ['./popupscheduler.component.scss']
})
export class PopupschedulerComponent implements OnInit {
  datapointform: FormGroup;
  local_data: any;
  action: string;
  datapointvalues: string;
  startDate = new Date();
  showfield: boolean;
  typesOfShoes = ['All Day', 'Repeat'];

  // @ViewChild(MatSelectionList, { static: false }) repeatfreq: MatSelectionList;
  repeatfrequency: string;
  repeatradiobuttons: any[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  weekday: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupdataConnection>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private validateservice: ValidationService) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;

  }

  ngOnInit() {
    // // this.repeatfreq.selectionChange.subscribe((s: MatSelectionListChange) => {

    // //   this.repeatfreq.deselectAll();
    // //   s.option.selected = true;
    // });
    console.log(this.repeatradiobuttons[0])
    //this.datapointform.get('sType').setValue('Daily');
    let dataval = localStorage.getItem('dataconnections')
    this.datapointvalues = JSON.parse((dataval));
    this.datapointform = this.fb.group({
      jobname: ['', Validators.required],
      startdate: ['', Validators.required],
      allday: [''],
      repeat: [],
      sType: [],
      daily: [''],
      noOftimes: [''],
      noofhours: [''],
      weekly: [''],
      monthly: [''],
      yearly: [''],
      enddate: [''],
    });

  }
  check(e) {
    console.log(e)
    if (e.checked === true) {
      this.showfield = true;
    } else {
      this.showfield = false;
    }
  }

  get jobname() { return this.datapointform.get('jobname') }
  get startdate() { return this.datapointform.get('startdate') }
  get allday() { return this.datapointform.get('allday') }
  get repeat() { return this.datapointform.get('repeat') }
  get sType() { return this.datapointform.get('sType') }
  get daily() { return this.datapointform.get('daily') }
  get noOftimes() { return this.datapointform.get('noOftimes') }
  get noofhours() { return this.datapointform.get('noofhours') }
  get weekly() { return this.datapointform.get('weekly') }
  get monthly() { return this.datapointform.get('monthly') }
  get yearly() { return this.datapointform.get('yearly') }
  get enddate() { return this.datapointform.get('enddate') }


  items = [{ selected: true, label: 'Monday' }, { selected: false, label: 'Tuesday' },
  { selected: false, label: 'Wednesday' }, { selected: false, label: 'Thursday' }, { selected: false, label: 'Friday' }, { selected: false, label: 'Saturday' }, { selected: false, label: 'Sunday' }];
  getScheduleType() {
    //Get the value of your stypeControl
    return this.datapointform.controls['sType'].value;
  }
  doAction() {
    console.log(this.datapointform.value)
    if (this.action !== 'Delete') {
      // console.log(this.datapointform.invalid);
      if (!this.datapointform.invalid) {
        this.dialogRef.close({ event: this.action, data: this.local_data });
      } else {
        this.validateservice.markAllFormFieldsAsTouched(this.datapointform);
      }
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    // this.dialogRef.close({ event: this.action, data: this.datapointform.value });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
