import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ENV_CONFIG } from 'src/app/env.config';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SalesforceapiService {
  accessToken: any;

  constructor(private http: HttpClient, private sharedService: DataService) { }
  configUrl = ENV_CONFIG.API_URLS.AUTH_TOKEN;

  getDataObjectslist(): Observable<any> {
    this.accessToken = this.sharedService.getAccessToken();
    console.log(this.accessToken)
    return this.http
      .get(this.configUrl, {
        headers: new HttpHeaders().set('Authorization', 'Bearer  ' + this.accessToken),
      }).pipe(map(this.extractData)).pipe(catchError(this.handleError));
  }

  getselectedObjlist(data): Observable<any> {
    this.accessToken = this.sharedService.getAccessToken();
    console.log(this.accessToken)
    return this.http
      .get(this.configUrl + data, {
        headers: new HttpHeaders().set('Authorization', 'Bearer  ' + this.accessToken),
      }).pipe(map(this.extractData)).pipe(catchError(this.handleError));
  }

  extractData(res: HttpResponse<object>) {
    return res;
  }

  handleError(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      return throwError(error);
    }
  }
}
