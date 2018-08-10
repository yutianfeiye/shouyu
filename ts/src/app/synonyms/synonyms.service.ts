import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SynonymsData } from './synonyms.component';

const INTERNAL_DOCS_URL = '/api';

@Injectable()
export class SynonymsService {
  constructor(private _http: HttpClient) {
  }
  querySynonyms(id): Observable<any[]> {
    const httpParams = new HttpParams().set('word', id);
    return this._http.get<any[]>(INTERNAL_DOCS_URL + '/dictionary/listSynonym',{
      params: httpParams
    }).pipe(catchError(() => {
        return new Observable((subscriber: Subscriber<any[]>) => {
          subscriber.next([]);
        });
      }));
  }
  deleteSynonyms(id) {
    const url = INTERNAL_DOCS_URL + '/dictionary/getSynonym';
    const httpParams = new HttpParams()
      .set('id', id)
      .set('type', 'delete');
    const httpOptions = {
      params: httpParams
    };
    return this._http.get(url, httpOptions).map((res: HttpResponse<any>) => res.body.json());
  }
  getSynonyms(id) {
    const url = INTERNAL_DOCS_URL + '/dictionary/getSynonym';
    const httpParams = new HttpParams()
      .set('id', id);
    const httpOptions = {
      params: httpParams
    };
    return this._http.get(url, httpOptions).map((res: HttpResponse<SynonymsData>) => res);
  }
  postSynonyms(params) {
    const postUrl = INTERNAL_DOCS_URL + '/dictionary/postSynonym';
    const httpParams = new HttpParams()
      .set('id', params.id)
      .set('type', params.type)
      .set('word', params.word)
      .set('synonyms', params.synonyms);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
    return this._http.post(postUrl, httpParams.toString(), httpOptions).map((res: HttpResponse<any>) => res.body.json());
  }
}
