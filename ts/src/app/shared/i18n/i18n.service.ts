// angular
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// libs
import { Store } from '../../../lib/store';
import { Observable } from 'rxjs/Observable';
import { MetaService } from '../../../lib/meta';
import { TranslateService } from '../../../lib/i18n';
import { WindowService } from './window.service';

// module
import { CATEGORY } from './models/category';
import { I18NState } from './models/i18n-state';
import { initialLanguage, Language } from './models/language';
import * as language from './language.actions';
import { getWorkingLanguage } from './reducers';

@Injectable()
export class I18NService  {
  defaultLanguage: string;
  availableLanguages: Array<Language>;
  useLocalizedRoutes: boolean;
  category: string;

  constructor(
    private readonly store: Store<I18NState>,
    private readonly translate: TranslateService,
    private readonly injector: Injector,
    private readonly win: WindowService,
    @Inject(PLATFORM_ID) private readonly platformId: any) {
    // super(analytics);
    this.category = CATEGORY;
    this.store.select(getWorkingLanguage)
      .subscribe((state: Language) => {
        if (state && state.value) {

          this.translate.use(state.value)
            .subscribe(() => {
              // set og:locale
              const meta = this.injector.get(MetaService);
              meta.setTag('og:locale', state.value);
            });

          this.translate.use(state.value);

          // TODO: ngx-i18n-router
          // if (this.availableLanguages.length > 1)
          //   this.i18nRouter.useLanguage(state.code);
        }
      });
  }

  init(settings?: any): Observable<Language> {

    if (settings) {
      this.defaultLanguage = settings.currentLanguage;
      this.availableLanguages = settings.languages;
      this.useLocalizedRoutes = settings.useLocalizedRoutes;

      // add available languages & set default language
      this.translate.addLangs(this.availableLanguages
        .map(cur => cur.value));
      this.translate.setDefaultLang(this.defaultLanguage);

    } else {

      // TODO: ngx-i18n-router
      // detect language from location/browser (if applicable)
      // let detectedLanguage;
      //
      // if (this.useLocalizedRoutes)
      //   detectedLanguage = this.getLanguageFromLocation();
      //
      // if (!detectedLanguage)
      this.availableLanguages = [];
      this.defaultLanguage = this.getLanguageFromBrowser();
      this.availableLanguages.push({text:this.defaultLanguage, value:this.defaultLanguage});
      this.useLocalizedRoutes = false;
      this.translate.addLangs([this.defaultLanguage, this.defaultLanguage]);
      this.translate.setDefaultLang(this.defaultLanguage);

    }

    // TODO: ngx-i18n-router
    // this.i18nRouter.init(this.useLocalizedRoutes);
    // set og:locale

    const meta = this.injector.get(MetaService);
    meta.setTag('og:locale', this.defaultLanguage);

    this.store.dispatch(new language.UseLanguage(this.defaultLanguage));
    return this.getLanguageByCode(this.defaultLanguage);
  }

  getLanguageByCode(languageCode: string): Observable<Language> {
    let res;
    if (this.availableLanguages && Array.isArray(this.availableLanguages)) {
      res = this.availableLanguages
        .find(cur => cur.value === languageCode);
    }

    return Observable.of(res || {
      ...({
        ...initialLanguage,
        value: languageCode
      })
    });
  }

  loadTranslations(dir: string): Observable<Language> {
      this.translate.load(this.defaultLanguage,dir);
      return this.getLanguageByCode(this.defaultLanguage);
  }

  private getLanguageFromBrowser(): string {
    let res;
    if (isPlatformBrowser(this.platformId)) {
      res = this.win.navigator.language;
    }
    //  res = this.win.navigator.language && this.win.navigator.language.split('-')[0];
    return res || this.defaultLanguage;
  }

  // TODO: ngx-i18n-router
  // private getLanguageFromLocation(url?: string): string {
  //   let res;
  //
  //   if (isPlatformBrowser(this.platformId))
  //     if (this.useLocalizedRoutes) {
  //       const pathSlices = (url || location.pathname).split('/');
  //
  //       if (pathSlices.length > 1 && this.availableLanguages
  //           .map(cur => cur.code)
  //           .find(code => code === pathSlices[1]))
  //         res = pathSlices[1];
  //
  //       if (pathSlices.length && this.availableLanguages
  //           .map(cur => cur.code)
  //           .find(code => code === pathSlices[0]))
  //         res = pathSlices[0];
  //     }
  //
  //   return res || this.defaultLanguage.code;
  // }
}
