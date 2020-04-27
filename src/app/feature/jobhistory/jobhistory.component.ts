import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatTable, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { TableUtil } from './jobhistory.util';
import { GetjobhistoryService } from './getjobhistory.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

const ELEMENT_DATA: any = [];

export interface PeriodicElement {
  id: any, jobname: string, Starttime: string, endtime: string, lastrunon: string, duration: any, createdby: any, status: string
}

@Component({
  selector: 'app-jobhistory',
  templateUrl: './jobhistory.component.html',
  styleUrls: ['./jobhistory.component.scss']
})
export class JobhistoryComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataArray = [];

  displayedColumns: string[] = ['id', 'jobname', 'Starttime', 'endtime', 'lastrunon', 'duration', 'createdby', 'status'];
  noData = this.dataSource.connect().pipe(map(data => {
    data.length === 0
  }));
  filterForm = new FormGroup({
    fromDate2: new FormControl(),
    toDate2: new FormControl(),
    fromDate1: new FormControl(),
    toDate1: new FormControl(),
    fromDate3: new FormControl(),
    toDate3: new FormControl()
  });
  dateRange1: boolean = false;
  pipe: DatePipe;
  get fromDate1() { return this.filterForm.get('fromDate1').value; }
  get toDate1() { return this.filterForm.get('toDate1').value; }
  get fromDate2() { return this.filterForm.get('fromDate2').value; }
  get toDate2() { return this.filterForm.get('toDate2').value; }
  get fromDate3() { return this.filterForm.get('fromDate3').value; }
  get toDate3() { return this.filterForm.get('toDate3').value; }




  currtentTime: Date;
  index: any;
  constructor(private dialog: MatDialog, private getservice: GetjobhistoryService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    localStorage.getItem('datapoint')



    //  this.dataSource.paginator = this.paginator;
    this.getjobscheduler();
    Observable.interval(60000).subscribe(x => {
      this.getjobscheduler();
    });


  }

  exportTable() {
    TableUtil.exportToExcel("jobhistory");
  }
  sorted() {
    this.dataSource.sort = this.sort;
  }
  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: PeriodicElement, filter: string) => {
      const textToSearch = d[column] && d[column].toString().toLowerCase() || '';

      return textToSearch.indexOf(filter) !== -1;
    };

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
  applyDatefilter() {
    this.dataSource.filter = '' + Math.random();
  }
  setUpDateFilter2(column: string) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PeriodicElement, filter) => {
      console.log(data)
      if (new Date(this.fromDate2).getTime() && new Date(this.toDate2).getTime()) {
        return new Date(data.endtime).getTime() >= this.fromDate2 && new Date(data.endtime).getTime() <= this.toDate2;
      }
      return true;
    }
    this.applyDatefilter();
  }
  setUpDateFilter3(column: string) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PeriodicElement, filter) => {
      console.log(data)
      if (new Date(this.fromDate3).getTime() && new Date(this.toDate3).getTime()) {
        return new Date(data.lastrunon).getTime() >= this.fromDate3 && new Date(data.lastrunon).getTime() <= this.toDate3;
      }
      return true;
    }
    this.applyDatefilter();
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase() || '';

  }

  getjobscheduler() {
    this.dataArray = [];
    this.getservice.getjobscheduler().subscribe((res) => {
      let index = 1;
      if (res.data.length > 0) {
        res.data.forEach((element, index) => {
          this.dataArray.push({

            id: (index + 1).toString(),
            uniqueId: element.uniquid,
            jobname: element.name,
            Starttime: element.start_time,
            endtime: element.end_time,
            lastrunon: element.last_run,
            duration: element.duration,
            createdby: 'sangeeth',
            status: element.status


          });
        });
      }


      this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);

      localStorage.setItem('datapoint', JSON.stringify(this.dataArray));
    }, (err) => {

    })
  }

  reset1() {
    this.filterForm.controls.fromDate1.setValue('');
    this.filterForm.controls.toDate1.setValue('');
    this.dataSource.filter = '';

  }
  reset2() {
    this.filterForm.controls.fromDate2.setValue('');
    this.filterForm.controls.toDate2.setValue('');
    this.dataSource.filter = ''
  }
  reset3() {
    this.filterForm.controls.fromDate3.setValue('');
    this.filterForm.controls.toDate3.setValue('');
    this.dataSource.filter = '';

  }


}
