import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ENV_CONFIG } from 'src/app/env.config';

@Injectable({
  providedIn: 'root'
})
export class AddschedulerService {

  constructor(private http: HttpClient) { }
  // configUrl = "http://localhost/api-dataconnector/V1/dataconnectorApi/jobscheduler";
  configUrl = ENV_CONFIG.API_URLS.DATA_CONNECTION;

  addscheduler(data) {
    //console.log(data);
    let obj = {
      "jobname": data.jobname,
      "startdate": data.startdate,
      "allday": data.allday,
      "repeat": data.repeat,
      "repeatfreq": data.sType,
      "noOftimes": data.noOftimes,
      "repeatat": data.repeatat,
      "daily": data.daily,
      "noofhours": data.noofhours,
      "weekly": data.weekly,
      "monthly": data.monthly,
      "yearly": data.yearly,
      "enddate": data.enddate
    }



    let formData: any = new FormData();
    formData.append("Scheduleoptions", JSON.stringify(obj));
    formData.append("name", data.jobname);
    formData.append("status", "sccheduled");
    formData.append("scheduledon", data.startdate);
    formData.append("method", 'get');

    return this.http
      .post(this.configUrl + '/jobscheduler', formData, {
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
