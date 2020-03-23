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
  configUrl = "http://3.208.113.126:8000/sap/bc/srt/wsdl/flv_10002P111AD1/sdef_url/Z_READ_CUST1?sap-client=800'"

  // getConfig(val) {
  //   return this.http.post(this.configUrl);
  // }


  addDataconnector(data: any): Observable<any> {
    return this.http
      .post(this.configUrl, {
        headers: new HttpHeaders().set('Username', 'sreddy').set('Password', 'Data11'),
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
