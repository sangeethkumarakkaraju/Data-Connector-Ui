import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataConnectorService {

  constructor(private http: HttpClient
  ) { }
  configUrl = "http://3.208.113.126:8000/sap/bc/srt/wsdl/flv_10002P111AD1/sdef_url/Z_READ_CUST2?sap-client=800"



  addDataconnector() {
    let currentUser = {
      Username: 'sreddy',
      Password: 'Data11'
    };
    return this.http
      .post(this.configUrl, {
        headers: new HttpHeaders().set('Authorization', 'Basic' + currentUser)
      }).pipe(map(this.extractData));
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
