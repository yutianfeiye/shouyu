import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams,HttpResponse} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserData } from './user.component';

const INTERNAL_DOCS_URL = '/api';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {

  }

  queryUsers(): Observable<any[]> {
    return this._http.get<any[]>(INTERNAL_DOCS_URL + '/dictionary/listUser')
      .pipe(
        catchError(() => {
          return new Observable((subscriber: Subscriber<any[]>) => {
            subscriber.next([]);
          });
        }),
      );
  }

  deleteUser(id) {
    const url = INTERNAL_DOCS_URL +'/dictionary/getUser';
    const httpParams = new HttpParams()
        .set('id', id)
        .set('type', 'delete');

    const httpOptions = {
      params: httpParams
    };
    return this._http.get(url, httpOptions).map((res: HttpResponse<any>) => res);
  }

  getUser(id) {
    const url = INTERNAL_DOCS_URL +'/dictionary/getUser';
    const httpParams = new HttpParams()
        .set('id', id);
    const httpOptions = {
      params: httpParams
    };
    return this._http.get(url, httpOptions).map((res: HttpResponse<UserData>) => res);
  }

  postUser(params) {
    const postUrl = INTERNAL_DOCS_URL +'/dictionary/postUser';
    const httpParams = new HttpParams()
        .set('id', params.id)
        .set('type', params.type)
        .set('user_name', params.user_name)
        .set('real_name', params.real_name)
        .set('password', params.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this._http.post(postUrl, httpParams.toString(), httpOptions).map((res: HttpResponse<any>) => res);
  }
}
