import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ENV_CONFIG } from '../../env.config'
@Injectable({
  providedIn: 'root'
})
export class AdddataconnectionService {

  constructor(private http: HttpClient) { }
  configUrl = ENV_CONFIG.API_URLS.DATA_CONNECTION;


  adddatapoints(data): Observable<any> {
    console.log(data);
    var formData: any = new FormData();
    formData.append("name", data.name);
    formData.append("method", 'post');
    formData.append("direction", data.inbound);
    formData.append("createdon", new Date().getTime());
    formData.append("updatedon", new Date().getTime());
    formData.append("scheduledon", new Date().getTime());
    formData.append("data", data.outbound);
    return this.http
      .post(this.configUrl + '/dataConnectInsert', formData, {
        headers: new HttpHeaders(),
      }).pipe(map(this.extractData), catchError(this.handleError));
  }

  updatedatapoints(data): Observable<any> {
    console.log(data);
    var formData: any = new FormData();
    formData.append("name", data.name);
    formData.append("method", 'post');
    formData.append("direction", data.inbound);
    formData.append("createdon", new Date().getTime());
    formData.append("updatedon", new Date().getTime());
    formData.append("scheduledon", new Date().getTime());
    formData.append("data", data.outbound);
    formData.append("uniquid", data.uniqueId);

    return this.http
      .post(this.configUrl + '/dataconnectionUpdate', formData, {
        headers: new HttpHeaders(),
      }).pipe(map(this.extractData), catchError(this.handleError));
  }

  deletedatapoints(data): Observable<any> {
    console.log(data);
    var formData: any = new FormData();

    formData.append("uniquid", data.uniqueId);

    return this.http
      .post(this.configUrl + '/deleteconnection', formData).pipe(map((res) => {
        return res;
      }), catchError(this.handleError));
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
