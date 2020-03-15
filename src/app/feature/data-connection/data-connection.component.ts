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
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Sales Force' },
    { value: 'pizza-1', viewValue: 'SAP' },
    { value: 'tacos-2', viewValue: 'NoSQL' },
    { value: 'tacos-2', viewValue: 'PID' }
  ];
}
