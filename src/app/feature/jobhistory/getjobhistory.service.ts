import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ENV_CONFIG } from 'src/app/env.config';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetjobhistoryService {

  constructor(private http: HttpClient) { }
  configUrl = ENV_CONFIG.API_URLS.DATA_CONNECTION;
  getjobscheduler(): Observable<any> {

    return this.http
      .get(this.configUrl + '/getschedulerhistory', {
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
