import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, /* RequestOptions,*/ RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  private _loginApi ='/api/login';
  private _logoutApi = '/api/logout';
  private _authenticatedApi = '/api/login';
  private _configApi = '/api/login/config';
  private _registerApi = '/api/register';
//  private _userExistsApi = this._apiBase + '/api/users/exists';
  constructor (private http: Http) {

  }
  login(params) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this._loginApi, params, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res.json());
  }
  getConfig() {
    return this.http.get(this._configApi,<RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json());
  }
  authenticated() {
    return this.http.get(this._authenticatedApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  register(user) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._registerApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error || 'Server Error');
  }
}
