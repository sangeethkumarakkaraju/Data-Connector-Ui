import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ENV_CONFIG } from 'src/app/env.config';

@Injectable({
  providedIn: 'root'
})
export class AdddatapointService {

  constructor(private http: HttpClient) { }
  // configUrl = "http://localhost/api-dataconnector/V1/dataconnectorApi/datapointInsert";
  configUrl = ENV_CONFIG.API_URLS.DATA_CONNECTION;

  adddatapoints(data): Observable<any> {
    console.log(data);
    var formData: any = new FormData();
    formData.append("Url", data.url);
    formData.append("name", data.name);
    formData.append("UrlParams", data.param);

    formData.append("method", 'post');
    formData.append("direction", data.InBound);
    formData.append("createdon", new Date().getTime());
    formData.append("updatedon", new Date().getTime());
    formData.append("scheduledon", new Date().getTime());
    formData.append("Auth", data.auth);
    formData.append("Type", data.type);
    formData.append("Header", data.headers);

    return this.http
      .post(this.configUrl + '/datapointInsert', formData, {
        headers: new HttpHeaders(),
      }).pipe(map(this.extractData), catchError(this.handleError));
  }
  configUrlUpdate = "http://localhost/api-dataconnector/V1/dataconnectorApi/datapointUpdate";

  updatedatapoints(data): Observable<any> {
    console.log(data);
    var formData: any = new FormData();
    formData.append("url", data.url);
    formData.append("name", data.name);
    formData.append("urldata", data.param);

    formData.append("method", 'post');
    formData.append("direction", data.InBound);
    formData.append("createdon", new Date().getTime());
    formData.append("updatedon", new Date().getTime());
    formData.append("scheduledon", new Date().getTime());
    formData.append("Auth", data.auth);
    formData.append("Type", data.type);
    formData.append("Header", data.headers);
    formData.append("uniquid", data.uniqueId);

    return this.http.post(this.configUrl + '/datapointUpdate', formData, {
      headers: new HttpHeaders(),

    }).pipe(map(this.extractData), catchError(this.handleError))
  }
  configUrldelete = "http://localhost/api-dataconnector/V1/dataconnectorApi/deletedatapoint";

  deletedatapoints(data): Observable<any> {
    var formData: any = new FormData();

    formData.append("uniquid", data.uniqueId);

    return this.http
      .post(this.configUrl + '/deletedatapoint', formData).pipe(map((res) => {
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
