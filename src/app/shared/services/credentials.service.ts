import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http: HttpClient
  ) { }
  configUrl = "http://localhost/EzPet/authentication/login"

  // getConfig(val) {
  //   return this.http.post(this.configUrl);
  // }


  dologin(data: any): Observable<any> {
    const reqdata = {
      email: data.username,
      password: data.password
    }
    return this.http
      .post(this.configUrl, reqdata, {
        headers: new HttpHeaders(),
      }).pipe(map(this.extractData), catchError(this.handleError));
  }

  extractData(res: HttpResponse<object>) {
    return res;
  }

  handleError(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      return Observable.throw(error);
    }
  }


}
