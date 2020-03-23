import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // username: FormControl;
  // password: FormControl;

  constructor(private router: Router, private httpClient: HttpClient,
    private fb: FormBuilder) { }
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  // getusername() {
  //   return this.loginForm.get("username");
  // }
  get f() { return this.loginForm.controls; }

  navigateToDataConnector() {
    //this.router.navigate(['/data-connector'])
    this.httpClient.get('./assets/credentials.json').subscribe((res) => {
      console.log(res);

    });



  }

}
