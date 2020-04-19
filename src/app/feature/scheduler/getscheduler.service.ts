import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ENV_CONFIG } from 'src/app/env.config';

@Injectable({
  providedIn: 'root'
})
export class GetschedulerService {

  constructor(private http: HttpClient) { }
  // configUrl = "http://localhost/api-dataconnector/V1/dataconnectorApi/getscheduler"
  configUrl = ENV_CONFIG.API_URLS.DATA_CONNECTION;
  getScheduler(): Observable<any> {

    return this.http
      .get(this.configUrl + '/getscheduler', {
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
