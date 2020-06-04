import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Validators, FormBuilder } from '@angular/forms';
import { SalesforceapiService } from 'src/app/shared/services/salesforceapi.service';
import { AuthtokenService } from 'src/app/shared/services/authtoken.service';
import { DataService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];
  datapointvalues: any;
  local_data: any;
  dataPointMappingform: any;
  accessToken: any;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  constructor(private fb: FormBuilder, private authTokenService: AuthtokenService,
    private sharedservice: DataService,
    private Salesforceapiservice: SalesforceapiService, ) { }

  ngOnInit() {
    this.dataPointMappingform = this.fb.group({
      datapointlist: ['']
    })
    let dataval = localStorage.getItem('datapoint')
    this.datapointvalues = JSON.parse((dataval));
  }
  getdatapointlist() {
    return this.dataPointMappingform.get('datapointlist');
  }
  onselection(e) {
    let selectedval = e.value
    console.log(e);
    this.getAccessToken();
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
    let selectedval = localStorage.getItem('selectedval')
    this.Salesforceapiservice.getselectedObjlist(selectedval).subscribe((res) => {

      this.todo = res;
      console.log(this.todo)

    }, (err) => {
      console.log(err)
    })
  }


}
