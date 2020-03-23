import { Component, OnInit } from '@angular/core';
import { DataConnectorService } from 'src/app/shared/dataconnector/data-connector.service';

@Component({
  selector: 'app-data-connection',
  templateUrl: './data-connection.component.html',
  styleUrls: ['./data-connection.component.scss']
})
export class DataConnectionComponent implements OnInit {

  constructor(private datconnectorService: DataConnectorService) { }

  ngOnInit() {
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

  submit() {
    this.datconnectorService.addDataconnector().subscribe((resp) => {
      console.log(resp)
    })
  }
}
