import {NgModule, ModuleWithProviders, Provider} from '@angular/core';

import {TranslateLoader, TranslateFakeLoader} from './translate.loader';
import {TranslateService} from './translate.service';
import {MissingTranslationHandler, FakeMissingTranslationHandler} from './missing-translation-handler';
import {TranslateParser, TranslateDefaultParser} from './translate.parser';
import {TranslateCompiler, TranslateFakeCompiler} from './translate.compiler';
import {TranslateDirective} from './translate.directive';
import {TranslatePipe} from './translate.pipe';
import {TranslateStore} from './translate.store';
import {USE_STORE} from './translate.service';
import {USE_DEFAULT_LANG} from './translate.service';

export * from './translate.loader';
export * from './translate.service';
export * from './missing-translation-handler';
export * from './translate.parser';
export * from './translate.compiler';
export * from './translate.directive';
export * from './translate.pipe';


export interface TranslateModuleConfig {
    loader?: Provider;
    compiler?: Provider;
    parser?: Provider;
    missingTranslationHandler?: Provider;
    // isolate the service instance, only works for lazy loaded modules or components with the "providers" property
    isolate?: boolean;
    useDefaultLang?: boolean;
}

@NgModule({
    declarations: [
        TranslatePipe,
        TranslateDirective
    ],

    exports: [
        TranslatePipe,
        TranslateDirective
    ]
})
export class TranslateModule {
    /**
     * Use this method in your root module to provide the TranslateService
     * @param {TranslateModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    static forRoot(config: TranslateModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: TranslateModule,
            providers: [
                config.loader || {provide: TranslateLoader, useClass: TranslateFakeLoader},
                config.compiler || {provide: TranslateCompiler, useClass: TranslateFakeCompiler},
                config.parser || {provide: TranslateParser, useClass: TranslateDefaultParser},
                config.missingTranslationHandler || {provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler},
                TranslateStore,
                {provide: USE_STORE, useValue: config.isolate},
                {provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang},
                TranslateService
            ]
        };
    }

    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {TranslateModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    static forChild(config: TranslateModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: TranslateModule,
            providers: [
                config.loader || {provide: TranslateLoader, useClass: TranslateFakeLoader},
                config.compiler || {provide: TranslateCompiler, useClass: TranslateFakeCompiler},
                config.parser || {provide: TranslateParser, useClass: TranslateDefaultParser},
                config.missingTranslationHandler || {provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler},
                {provide: USE_STORE, useValue: config.isolate},
                {provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang},
                TranslateService
            ]
        };
    }
}
