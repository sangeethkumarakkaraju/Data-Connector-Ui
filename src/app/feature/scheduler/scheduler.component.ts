import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { DataService } from '../../shared/services/shared.service';
import { map, scan } from 'rxjs/operators';
import { MatTableDataSource, MatDialog, MatSort, MatTable } from '@angular/material';
import { PopupdatapointComponent } from '../data-point/popupdatapoint/popupdatapoint.component';
import { PopupschedulerComponent } from './popupscheduler/popupscheduler.component';
import { TableUtil } from './scheduler.util';
import { AddschedulerService } from './addscheduler.service';
import { GetschedulerService } from './getscheduler.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

const ELEMENT_DATA: any = [];

export interface PeriodicElement {
  id: any, jobname: string, Starttime: string, nextrunon: string, createdby: any, pause: any, status: string
}
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataArray = [];

  displayedColumns: string[] = ['id', 'jobname', 'Starttime', 'nextrunon', 'createdby', 'pause', 'status'];
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));

  currtentTime: Date;
  index: any;
  abc: any;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    fromDate1: new FormControl(),
    toDate1: new FormControl(),
  });
  dateRange1: boolean = false;
  pipe: DatePipe;
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }
  get fromDate1() { return this.filterForm.get('fromDate1').value; }
  get toDate1() { return this.filterForm.get('toDate1').value; }

  constructor(private dialog: MatDialog, private addservice: AddschedulerService, private getscheduler: GetschedulerService, private addscheduler: AddschedulerService) {

  }

  ngOnInit() {
    this.getScheduler();
    this.dataSource.sort = this.sort;
    // localStorage.getItem('datapoint')
  }

  exportTable() {
    TableUtil.exportToExcel("jobsscheduler");
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
        return new Date(data.nextrunon).getTime() >= this.fromDate && new Date(data.nextrunon).getTime() <= this.toDate;
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
        return new Date(data.Starttime).getTime() >= this.fromDate1 && new Date(data.Starttime).getTime() <= this.toDate1;
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

  deleteRowData(row_obj) {
    // let index: number = this.dataArray.findIndex(d => d.name === row_obj.name);
    // this.dataArray.splice(index, 1)
    // this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);

    this.dataArray.filter((value, key) => {

      if (value.uniqueId == row_obj.uniqueId) {
        this.addscheduler.deletejobscheduler(row_obj).subscribe(
          (res) => {
            console.log(res);

            this.getScheduler();
          }, (err) => {
            console.log(err);
          })
      }

    });


  }
  getScheduler() {
    this.dataArray = [];
    this.getscheduler.getScheduler().subscribe((res) => {
      if (res.data.length > 0) {
        res.data.forEach((element, index = 1) => {

          let val = JSON.parse(element.Scheduleoptions);

          this.dataArray.push({
            id: (index + 1).toString(),
            uniqueId: element.UniqueId,
            jobname: element.Name,
            Starttime: val['startdate'],
            nextrunon: element.nextrunTime ? element.nextrunTime : new Date().getTime(),
            createdby: 'sangeeth',
            pause: element.PausedOn,
            status: element.status,


          });
        });
      }


      this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
      // localStorage.setItem('dataconnections', JSON.stringify(this.dataArray));
      console.log(this.dataSource)
    }, (err) => {

    })
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
  openDialog(action, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(PopupschedulerComponent, {
      width: '650px',
      maxHeight: '650px',
      data: obj,
      disableClose: true,
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        // console.log(result);
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        // this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
        // console.log(result.data);


      }
    });

  }
  addRowData(row_obj) {
    this.addservice.addscheduler(row_obj).subscribe(
      (res) => {
        console.log(res);
        this.getScheduler();

      }, (err) => {
        console.log(err)
      }
    )

  }


  updateRowData(row_obj) {
    this.dataArray.filter((value, key) => {
      if (value.uniqueId == row_obj.uniqueId) {
        value.name = row_obj.name,
          value.url = row_obj.url,
          value.type = row_obj.type,
          value.InBound = row_obj.InBound,
          value.param = row_obj.param,
          value.auth = row_obj.auth,
          value.headers = row_obj.headers
      }
      return true;
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
  }
  action(data, id) {
    this.dataArray.filter((value, key) => {
      console.log(value);
      console.log(data);

      if (value.uniqueId == id) {
        this.addservice.actionperform(data, value.uniqueId).subscribe(
          (res) => {
            console.log(res);
            this.getScheduler();
          }, (err) => {
            console.log(err);
          })
      }

    });
  }



}




