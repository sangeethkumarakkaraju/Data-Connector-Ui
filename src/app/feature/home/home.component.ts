import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMsg: string;
  // username: FormControl;
  // password: FormControl;

  hide: boolean = true;
  constructor(private router: Router, private httpClient: HttpClient,
    private Validationservice: ValidationService,
    private fb: FormBuilder, private credentialsservice: CredentialsService) { }

  loginForm: FormGroup;

  showError: boolean = false;
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
    // this.router.navigate(['/data-point'])
    // this.httpClient.get('./assets/credentials.json').subscribe((res) => {
    //   console.log(res);

    // });
    if (this.loginForm.valid) {
      this.showError = false
      this.credentialsservice.dologin(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('data', res.data.last_name)
        this.router.navigate(['/data-point'])
      }, (err) => {
        this.showError = true;
        this.errorMsg = "Login Failed, Please try again";
      })
    } else {
      this.Validationservice.markAllFormFieldsAsTouched(this.loginForm)
    }






  }

}
