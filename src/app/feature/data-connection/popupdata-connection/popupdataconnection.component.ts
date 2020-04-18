import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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



  datapointform: FormGroup;
  secondFormGroup: FormGroup;

  filteredvalues: any = [];


  action: string;
  datapointvalues: any;
  local_data: any;
  inbound: any[];
  outbound: any[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupdataConnection>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  createTableForm: FormGroup;
  ngOnInit() {
    let dataval = localStorage.getItem('datapoint')
    this.datapointvalues = JSON.parse((dataval));
    console.log(this.datapointvalues);
    this.filterValues();
    this.createTableForm = this.fb.group({
      // title: [],
      tablerow: this.fb.array([this.fb.group({ position: '', header: '', datatype: '', sorting: '', filtering: '' })]),

    })

    this.datapointform = this.fb.group({
      name: [''],
      datapointnames1: ['', Validators.required],
      datapointnames2: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });

  }



  filterValues() {
    this.inbound = [];
    this.outbound = [];
    this.datapointvalues.forEach(element => {
      if (element.InBound === 'Inbound') {
        this.inbound.push(element.name);
        console.log(this.inbound);
      } else {
        this.outbound.push(element.name)
        console.log(this.outbound);
      }

    });
  }



  get tablerow() {
    return this.createTableForm.get('tablerow') as FormArray;
  }

  getname() {
    return this.datapointform.get('name');
  }
  getdatapointnames1() {
    return this.datapointform.get('datapointnames1');
  }
  getdatapointnames2() {
    return this.datapointform.get('datapointnames2');
  }
  // getsecondCtrl() {
  //   return this.datapointform.get('secondCtrl');
  // }




  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  // closeDialog() {
  //   this.dialogRef.close({ event: 'Cancel' });
  // }

}
