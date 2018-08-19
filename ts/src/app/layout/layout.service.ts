import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class LayoutService {
  private _logoutApi = '/api/logout';
  constructor (private http: Http,
                private activatedRoute: ActivatedRoute) {

  }
  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    return Observable.throw(error || 'Server Error');
  }
}
