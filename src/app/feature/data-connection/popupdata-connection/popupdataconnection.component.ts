import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';

export interface UsersData {
  name: string;
  id: number;
}
@Component({
  selector: 'app-popupdataconnection',
  templateUrl: './popupdataconnection.component.html',
  styleUrls: ['./popupdataconnection.component.scss']
})

export class PopupdataConnection implements OnInit {



  dataconnectionform: FormGroup;
  secondFormGroup: FormGroup;

  filteredvalues: any = [];


  action: string;
  datapointvalues: any;
  local_data: any;
  inbound: any[];
  outbound: any[];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupdataConnection>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, private validateservice: ValidationService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  createTableForm: FormGroup;
  ngOnInit() {
    let dataval = localStorage.getItem('datapoint')
    this.datapointvalues = JSON.parse((dataval));
    this.filterValues();
    this.createTableForm = this.fb.group({
      // title: [],
      tablerow: this.fb.array([this.fb.group({ position: '', header: '', datatype: '', sorting: '', filtering: '' })]),

    })

    this.dataconnectionform = this.fb.group({
      name: ['', Validators.required],
      datapointnames1: ['', Validators.required],
      datapointnames2: ['', Validators.required],
    });

  }



  filterValues() {
    this.inbound = [];
    this.outbound = [];
    this.datapointvalues.forEach(element => {
      if (element.InBound === 'Inbound') {
        this.inbound.push(element.name);

      } else {
        this.outbound.push(element.name)

      }

    });
  }



  get tablerow() {
    return this.createTableForm.get('tablerow') as FormArray;
  }

  getname() {
    return this.dataconnectionform.get('name');
  }
  getdatapointnames1() {
    return this.dataconnectionform.get('datapointnames1');
  }
  getdatapointnames2() {
    return this.dataconnectionform.get('datapointnames2');
  }
  // getsecondCtrl() {
  //   return this.dataconnectionform.get('secondCtrl');
  // }




  doAction() {
    console.log(this.action);

    if (this.action !== 'Delete') {
      console.log(this.dataconnectionform.invalid);
      if (!this.dataconnectionform.invalid) {
        this.dialogRef.close({ event: this.action, data: this.local_data });
      } else {
        this.validateservice.markAllFormFieldsAsTouched(this.dataconnectionform);
      }
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }

  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


}
