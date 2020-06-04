import { Component, OnInit, Input, Output, EventEmitter, Inject, Optional, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material';

import { MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthtokenService } from 'src/app/shared/services/authtoken.service';
import { DataService } from 'src/app/shared/services/shared.service';
import { SalesforceapiService } from 'src/app/shared/services/salesforceapi.service';

export interface UsersData {
  name: string;
  id: number;
}
@Component({
  selector: 'app-popupdatapoint',
  templateUrl: './popupdatapoint.component.html',
  styleUrls: ['./popupdatapoint.component.scss']
})
export class PopupdatapointComponent implements OnInit, OnChanges {


  hidefields: boolean;
  hideoraclefields: boolean;
  hidenosqlfields: boolean;
  hidefilesystem: boolean;
  secondFormGroup: FormGroup;



  action: string;
  local_data: any;
  selectedType: string;
  accessToken: any;
  objectValue: any;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupdatapointComponent>,
    private authTokenService: AuthtokenService,
    private sharedservice: DataService,
    private Salesforceapiservice: SalesforceapiService,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, private validateservice: ValidationService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.action === 'Add') {
      this.hidefields = false;
      this.hidenosqlfields = false;
      this.hideoraclefields = false;
      this.hidefilesystem = false;
    } else {
      console.log("entered else block");
      // this.onSelection();
    }
  }

  datapointform: FormGroup;
  datapointarray: Array<any> = [];
  ngOnInit() {
    this.getAccessToken();


    this.datapointform = this.fb.group({
      name: ['', Validators.required],

      type: ['', Validators.required],
      url: ['', Validators.required],
      InBound: ['', Validators.required],
      param: [],
      auth: [],
      headers: [],

      portnumber: [],
      ipaddress: [],
      database: [],
      username: [],
      password: [],
      pathname: [],
      filename: [],
      // uplaodfile: [],
      objectValue: []
    });

  }
  doAction() {
    if (this.action !== 'Delete') {
      console.log(this.datapointform.invalid);
      if (!this.datapointform.invalid) {
        localStorage.setItem('selectedval', this.datapointform.controls.objectValue.value)
        this.dialogRef.close({ event: this.action, data: this.local_data });

      } else {
        this.validateservice.markAllFormFieldsAsTouched(this.datapointform);
      }
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  myUploader(event) {


  }

  getAccessToken() {
    this.authTokenService.getToken().subscribe((res) => {
      this.accessToken = res.access_token;
      console.log(this.accessToken)
      this.sharedservice.setAcessToken(this.accessToken);
      this.getDataObjects();
    }, (err) => {

    })
  }
  getDataObjects() {
    this.Salesforceapiservice.getDataObjectslist().subscribe((res) => {

      this.objectValue = res;

    }, (err) => {
      console.log(err)
    })
  }
  onChange(event) {
    this.selectedType = event.value;
    console.log(this.selectedType);
    console.log(event.value);
    if (this.selectedType === event.value) {
      console.log("true");

    } else {
      console.log("false")
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
