import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PopupdatapointComponent } from './popupdatapoint/popupdatapoint.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TableUtil } from "./datapoint.util";


import { MatDialog, MatTable, MatPaginator, MatInput } from '@angular/material';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GetdatapointService } from './getdatapoint.service';
import { AdddatapointService } from './adddatapoint.service';
import { AuthtokenService } from 'src/app/shared/services/authtoken.service';
import { DataService } from 'src/app/shared/services/shared.service';
import { SalesforceapiService } from 'src/app/shared/services/salesforceapi.service';

export interface PeriodicElement {
  id: any, name: string, InBound: string, url: string, param: string, auth: string, headers: string, type: string, createdby: string, createdon: any, updatedby: string, updatedon: any
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {
  //   id: '1', name: 'ssa7', InBound: 'Inbound', url: 'ssd', param: 'ssd', auth: 'ssd', headers: 'ssd', type: 'ssd', createdby: 'ssd', createdon: new Date(2020, 11, 24), updatedby: 'ssd', updatedon: new Date(2020, 11, 24)
  // },
  // {
  //   id: '2', name: 'ssa4', InBound: 'Outbound', url: 'ssd', param: 'ssd', auth: 'ssd', headers: 'ssd', type: 'sales', createdby: 'ssd', createdon: new Date(2020, 3, 24), updatedby: 'ssd', updatedon: new Date(2020, 11, 24)
  // }
];


@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.scss']
})


export class DataPointComponent implements OnInit {
  action = "Add";
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('frominput', { static: true }) fromInput: MatInput;

  // @ViewChild('toinput', { static: true }) toInput: MatInput;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  positionFilter = new FormControl();
  nameFilter = new FormControl();
  dataArray: any = [];
  displayedColumns: string[] = ['id', 'name', 'InBound', 'type', 'createdby', 'createdon', 'updatedby', 'updatedon', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  noData = this.dataSource.connect().pipe(map(data => {
    data.length === 0
  }));
  currtentTime: Date;
  dataSubject = new BehaviorSubject<Element[]>([]);
  index: any;
  objectValue: any;
  pipe: DatePipe;
  dateRange: boolean = false;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    fromDate1: new FormControl(),
    toDate1: new FormControl(),
  });
  dateRange1: boolean = false;
  accessToken: any;
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }
  get fromDate1() { return this.filterForm.get('fromDate1').value; }
  get toDate1() { return this.filterForm.get('toDate1').value; }

  constructor(private dialog: MatDialog, private getservice: GetdatapointService,

    private adddatapointService: AdddatapointService,
  ) {
    this.pipe = new DatePipe('en');

  }


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getDataPoints();

  }


  openDialog(action, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(PopupdatapointComponent, {
      width: '500px',
      maxHeight: '700px',
      data: obj,
      disableClose: true,
      panelClass: 'my-dialog',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        console.log("enter add");

        this.addRowData(result.data);
      } else if (result.event == 'Update') {

        console.log("enter update");


        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });

  }
  addRowData(row_obj) {
    this.adddatapointService.adddatapoints(row_obj).subscribe(

      (res) => {
        console.log(res)

        this.getDataPoints();

      }, (err) => {
        console.log(err)
      }
    )


  }


  updateRowData(row_obj) {

    this.dataArray.filter((value, key) => {

      console.log(row_obj);
      if (value.uniqueId == row_obj.uniqueId) {
        this.adddatapointService.updatedatapoints(row_obj).subscribe(
          (res) => {
            this.getDataPoints();
          }, (err) => {
            console.log(err);
          })
      }
      // return true;
    });
    // this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
  }
  reset() {
    this.filterForm.controls.fromDate.setValue('');
    this.filterForm.controls.toDate.setValue('');
    this.dataSource.filter = '';

  }
  resetForm1() {
    this.filterForm.controls.fromDate1.setValue('');
    this.filterForm.controls.toDate1.setValue('');
    this.dataSource.filter = ''
  }

  getDataPoints() {
    this.dataArray = [];
    this.getservice.getDatapoints().subscribe((res) => {
      console.log(res);
      if (res.data.length > 0) {
        res.data.forEach((element, index = 1) => {
          console.log(element)
          let val = (element.Data);

          this.dataArray.push({

            portnumber: val['portnumber'],
            ipaddress: val['ipaddress'],
            database: val['database'],

            username: val['username'],

            password: val['password'],

            pathname: val['pathname'],
            filename: val['filename'],
            objectValue: val['objectValue'],


            createdon: new Date(element.Created),
            createdby: 'sangeeth',
            name: element.Name,
            url: element.Url,
            type: element.Type,
            InBound: element.direction,
            param: element.UrlParams,
            auth: element.Auth,
            headers: element.Header,
            id: (index + 1).toString(),
            uniqueId: element.UniqueId,
            updatedby: 'sangeeth',
            updatedon: new Date(element.Updated),


          });
        });
      }


      this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);

      localStorage.setItem('datapoint', JSON.stringify(this.dataArray));
    }, (err) => {

    })
  }
  exportTable() {
    TableUtil.exportToExcel("dataconnectTable");
  }
  deleteRowData(row_obj) {
    // let index: number = this.dataArray.findIndex(d => d.name === row_obj.name);
    // this.dataArray.splice(index, 1)
    // this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);

    this.dataArray.filter((value, key) => {

      if (value.uniqueId == row_obj.uniqueId) {
        this.adddatapointService.deletedatapoints(row_obj).subscribe(
          (res) => {

            this.getDataPoints();
          }, (err) => {
            console.log(err);
          })
      }

    });


  }


  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: PeriodicElement, filter: string) => {
      const textToSearch = d[column] && d[column].toString().toLowerCase() || '';

      return textToSearch.indexOf(filter) !== -1;
    };

  }

  setUpDateFilter(column: string) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PeriodicElement, filter) => {

      if (new Date(this.fromDate).getTime() && new Date(this.toDate).getTime()) {
        return new Date(data.updatedon).getTime() >= this.fromDate && new Date(data.updatedon).getTime() <= this.toDate;
      }
      return true;
    }
    this.applyDatefilter();
  }
  setUpDateFilter1(column: string) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PeriodicElement, filter) => {

      if (new Date(this.fromDate1).getTime() && new Date(this.toDate1).getTime()) {
        return new Date(data.createdon).getTime() >= this.fromDate1 && new Date(data.createdon).getTime() <= this.toDate1;
      }
      return true;
    }
    this.applyDatefilter();
  }
  sorted() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.toString();

  }
  applyDatefilter() {
    this.dataSource.filter = '' + Math.random();
  }
  connectionType = [
    { value: 'sales Force', viewValue: 'Sales Force' },
    { value: 'SAP', viewValue: 'SAP' },
    { value: 'NoSQL', viewValue: 'NoSQL' },
    { value: 'PID', viewValue: 'PID' }
  ];
  authorization = [
    { value: 'tokaen', viewValue: 'Token' },
    { value: 'userName', viewValue: 'User Name' }
  ];

  showdiv(index) {

    this.dateRange = true;
  }
  hidediv(index) {

    this.dateRange = false;
  }
  showdiv1(index) {

    this.dateRange1 = true;
  }
  hidediv1(index) {

    this.dateRange1 = false;
  }
}
