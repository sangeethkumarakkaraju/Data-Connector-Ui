import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatTable, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { TableUtil } from './jobhistory.util';

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
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));

  currtentTime: Date;
  index: any;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    localStorage.getItem('datapoint')
  }

  exportTable() {
    TableUtil.exportToExcel("jobhistory");
  }
  sorted() {
    this.dataSource.sort = this.sort;
  }
  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: PeriodicElement, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase() || '';

  }


}
