import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-connection',
  templateUrl: './data-connection.component.html',
  styleUrls: ['./data-connection.component.scss']
})
export class DataConnectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  connectionType = [
    { value: 'sales Force', viewValue: 'Sales Force' },
    { value: 'SAP', viewValue: 'SAP' },
    { value: 'NoSQL', viewValue: 'NoSQL' },
    { value: 'PID', viewValue: 'PID' }
  ];
}
