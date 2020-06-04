import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ENV_CONFIG } from 'src/app/env.config';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthtokenService {

  constructor(private httpClient: HttpClient) { }

  private configUrl = ENV_CONFIG.API_URLS.Access_Token_URL;
  getToken(): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', ENV_CONFIG.API_URLS.Client_ID);
    body.set('client_secret', ENV_CONFIG.API_URLS.Consumer_Secret);
    body.set('username', ENV_CONFIG.API_URLS.Username);
    body.set('password', ENV_CONFIG.API_URLS.Password);

    return this.httpClient
      .post(this.configUrl, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
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
