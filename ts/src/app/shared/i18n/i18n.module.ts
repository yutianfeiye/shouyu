// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// libs
import { StoreModule } from '../../../lib/store';
import { EffectsModule } from '../../../lib/effects';
import { TranslateLoader, TranslateModule } from '../../../lib/i18n';
import { TranslateHttpLoader } from '../../../lib/i18n/http-loader';


// module
import { ChangeLanguageComponent } from './change-language.component';
import { I18NService } from './i18n.service';
import * as _languageActions from './language.actions';
import { LanguageEffects } from './language.effects';
import { reducers } from './reducers';

export * from './models/i18n-state';
export * from './models/language';
export * from './change-language.component';
export * from './i18n.service';
export * from './reducers';
export { _languageActions as LANGUAGE_ACTIONS };

export const I18N_COMPONENTS: Array<any> = [
  ChangeLanguageComponent
];


@NgModule({
  imports: [
    TranslateModule.forRoot(),
    StoreModule.forFeature('i18n', reducers),
    EffectsModule.forFeature([LanguageEffects])
  ],
  declarations: [I18N_COMPONENTS],
  providers: [
    I18NService
  ],
  entryComponents: [ChangeLanguageComponent],
  exports: [
    TranslateModule
  ]
})
export class I18NModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders {
    return {
      ngModule: I18NModule,
      providers: configuredProviders
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: I18NModule) {
    if (parentModule) {
      throw new Error('I18NModule already loaded. Import in root module only.');
    }
  }
}
