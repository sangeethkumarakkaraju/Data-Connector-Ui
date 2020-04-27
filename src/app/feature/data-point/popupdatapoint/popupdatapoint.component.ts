import { Component, OnInit, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material';

import { MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from 'src/app/shared/services/validation.service';

export interface UsersData {
  name: string;
  id: number;
}
@Component({
  selector: 'app-popupdatapoint',
  templateUrl: './popupdatapoint.component.html',
  styleUrls: ['./popupdatapoint.component.scss']
})
export class PopupdatapointComponent implements OnInit {


  hidefields: boolean;
  hideoraclefields: boolean;
  hidenosqlfields: boolean;
  hidefilesystem: boolean;
  secondFormGroup: FormGroup;



  action: string;
  local_data: any;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupdatapointComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, private validateservice: ValidationService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.action === 'Add') {
      this.hidefields = false;
      this.hidenosqlfields = false;
      this.hideoraclefields = false;
      this.hidefilesystem = false;
    } else {
      this.hidefields = true;
      this.hidenosqlfields = true;
      this.hideoraclefields = true;
      this.hidefilesystem = true;
    }
  }

  datapointform: FormGroup;
  datapointarray: Array<any> = [];
  ngOnInit() {
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
      filename: []
      // uplaodfile: []
    });

  }
  doAction() {


    if (this.action !== 'Delete') {
      if (!this.datapointform.invalid) {
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
  onSelection(e) {
    let typevalues = this.datapointform.controls.type.value;
    if (typevalues === "nosql") {
      this.hidenosqlfields = true;
      this.hidefields = false;
      this.hideoraclefields = false;
      this.hidefilesystem = false;
    } else if (typevalues === "oracle") {
      this.hideoraclefields = true;
      this.hidefilesystem = false;
      this.hidefields = false;
      this.hidenosqlfields = false;
    } else if (typevalues === "filesystem") {
      this.hidefilesystem = true;
      this.hidefields = false;
      this.hidenosqlfields = false;
      this.hideoraclefields = false;
    } else if (typevalues === "salesforce" || typevalues === "sap") {
      this.hidefields = true;
      this.hidenosqlfields = false;
      this.hideoraclefields = false;
      this.hidefilesystem = false;
    }
  }
  myUploader(event) {
    //event.files == files to upload
  }

}
