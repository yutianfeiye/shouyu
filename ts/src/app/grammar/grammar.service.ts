import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams,HttpResponse} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GrammarData } from './grammar.component';

const INTERNAL_DOCS_URL = '/api';

@Injectable()
export class InternalDocsService {
  constructor(private _http: HttpClient) {

  }

  queryData(): Observable<any[]> {
    return this._http.get<any[]>(INTERNAL_DOCS_URL + '/dictionary/listGrammar')
      .pipe(
        catchError(() => {
          return new Observable((subscriber: Subscriber<any[]>) => {
            subscriber.next([]);
          });
        }),
      );
  }

  deleteGrammar(id) {
    const url = INTERNAL_DOCS_URL +'/dictionary/getGrammar';
    const httpParams = new HttpParams()
        .set('id', id)
        .set('type', 'delete');

    const httpOptions = {
      params: httpParams
    };
    return this._http.get(url, httpOptions).map((res: HttpResponse<any>) => res);
  }

  getGrammar(id) {
    const url = INTERNAL_DOCS_URL +'/dictionary/getGrammar';
    const httpParams = new HttpParams()
        .set('id', id);
    const httpOptions = {
      params: httpParams
    };
    return this._http.get(url, httpOptions).map((res: HttpResponse<GrammarData>) => res);
  }

  postGrammar(params) {
    const postUrl = INTERNAL_DOCS_URL +'/dictionary/postGrammar';
    const httpParams = new HttpParams()
        .set('lang', params.lang)
        .set('nl_grammar', params.nl_grammar)
        .set('id', params.id)
        .set('type', params.type)
        .set('sl_grammer', params.sl_grammer);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this._http.post(postUrl, httpParams.toString(), httpOptions).map((res: HttpResponse<any>) => res);
  }
}
