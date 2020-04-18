import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopupdataConnection } from './popupdata-connection/popupdataconnection.component';
import { TableUtil } from '../scheduler/scheduler.util';
import { AdddataconnectionService } from './adddataconnection.service';
import { GetdataconnectionService } from './getdataconnection.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
const ELEMENT_DATA: any = [];

export interface PeriodicElement {
  id: any, jobname: string, inbound: string, outbound: string, createdby: string, createdon: any, lastchangedby: string, lastchangedon: any
}

@Component({
  selector: 'app-data-connection',
  templateUrl: './data-connection.component.html',
  styleUrls: ['./data-connection.component.scss']
})


export class DataConnectionComponent implements OnInit {

  action = "Add";
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataArray = [];

  displayedColumns: string[] = ['id', 'name', 'inbound', 'outbound', 'createdby', 'createdon', 'lastchangedby', 'lastchangedon', 'action'];
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));

  currtentTime: Date;
  index: any;
  pipe: DatePipe;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    fromDate1: new FormControl(),
    toDate1: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }
  get fromDate1() { return this.filterForm.get('fromDate1').value; }
  get toDate1() { return this.filterForm.get('toDate1').value; }


  constructor(private dialog: MatDialog, private addservice: AdddataconnectionService,
    private getservice: GetdataconnectionService) { }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getDataConnectionPoints();
  }
  openDialog(action, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(PopupdataConnection, {
      width: '700px',
      data: obj,
      disableClose: true,
      panelClass: 'my-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        // console.log(result);
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });

  }


  addRowData(row_obj) {
    this.addservice.adddatapoints(row_obj).subscribe(
      (res) => {
        console.log(res);
        this.getDataConnectionPoints();

      }, (err) => {
        console.log(err)
      }
    )

  }

  updateRowData(row_obj) {
    this.dataArray.filter((value, key) => {
      if (value.uniqueId == row_obj.uniqueId) {
        this.addservice.updatedatapoints(row_obj).subscribe(
          (res) => {
            console.log(res);
            this.getDataConnectionPoints();

          }, (err) => {
            console.log(err)
          }
        )
      }

    });
    //this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
  }
  exportTable() {
    TableUtil.exportToExcel("dataconnectTable");
  }
  deleteRowData(row_obj) {
    // let index: number = this.dataArray.findIndex(d => d.name === row_obj.name);
    // this.dataArray.splice(index, 1);
    this.dataArray.filter((value, key) => {
      if (value.uniqueId == row_obj.uniqueId) {
        this.addservice.deletedatapoints(row_obj).subscribe(
          (res) => {
            console.log(res);
            this.getDataConnectionPoints();

          }, (err) => {
            console.log(err)
          }
        )
      }

    });
    // this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
  }
  getDataConnectionPoints() {
    this.dataArray = [];
    this.getservice.getdataConnections().subscribe((res) => {
      console.log(res);
      res.data.forEach((element, index = 1) => {
        console.log(element)
        this.dataArray.push({
          id: (index + 1).toString(),
          uniqueId: element.UniqueId,
          createdon: new Date(element.Created),
          createdby: 'sangeeth',
          name: element.Name,
          inbound: element.direction,
          outbound: element.Data,
          lastchangedby: 'sangeeth',
          lastchangedon: new Date(element.Updated)


        });
      });


      this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
      localStorage.setItem('dataconnections', JSON.stringify(this.dataArray));
      console.log(this.dataSource)
    }, (err) => {

    })
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
      console.log(data)
      if (new Date(this.fromDate).getTime() && new Date(this.toDate).getTime()) {
        return new Date(data.lastchangedon).getTime() >= this.fromDate && new Date(data.lastchangedon).getTime() <= this.toDate;
      }
      return true;
    }
    this.applyDatefilter();
  }
  setUpDateFilter1(column: string) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PeriodicElement, filter) => {
      console.log(data)
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





}






