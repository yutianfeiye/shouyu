// angular
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// module
import { ConfigLoader, ConfigStaticLoader } from './config.loader';
import { ConfigPipe } from './config.pipe';
import { ConfigService } from './config.service';

export * from './config.loader';
export * from './config.pipe';
export * from './config.service';
export * from './universal.config-loader';

// for AoT compilation
export function configFactory(): ConfigLoader {
  return new ConfigStaticLoader();
}


export function initializerFactory(config: ConfigService): any {

  const res = () => config.init();
  return res;
}

@NgModule({
  declarations: [ConfigPipe],
  exports: [ConfigPipe]
})
export class ConfigModule {
  static forRoot(configuredProvider: any = {
    provide: ConfigLoader,
    useFactory: (configFactory)
  }): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        configuredProvider,
        ConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: initializerFactory,
          deps: [ConfigService],
          multi: true
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ConfigModule) {
    if (parentModule) {
      throw new Error('ConfigModule already loaded; import in root module only.');
    }
  }
}
