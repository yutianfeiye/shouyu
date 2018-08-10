import {HttpClient} from '@angular/common/http';
import { TranslateLoader } from './translate.loader';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


export class TranslateHttpLoader implements TranslateLoader {
    constructor(private http: HttpClient,
                 public prefix: string = '/assets/i18n/',
                 public suffix: string = '.json') {}

    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    public getTranslation(lang: string,dir?:string): Observable<any> {
        if(dir!==undefined){
          return this.http.get(`${this.prefix}/${dir}/${lang}${this.suffix}`);
        }else{
            return this.http.get(`${this.prefix}${lang}${this.suffix}`);
        }
    }
}
