import {
  InjectionToken, Injector, ModuleWithProviders, NgModule, Optional, PLATFORM_ID, SkipSelf
} from '@angular/core';

// module
import { CacheLoader, CacheStaticLoader } from './cache.loader';
import { CacheService } from './cache.service';
import { Storage } from './storage';


export const STORAGE = new InjectionToken<Storage>('STORAGE');

// for AoT compilation
export function cacheFactory(): CacheLoader {
  return new CacheStaticLoader();
}

export function cacheServiceFactory(loader: CacheLoader, platformId: any, injector: Injector): CacheService {
  return new CacheService(loader, platformId, injector);
}

@NgModule()
export class CacheModule {
  static forRoot(configuredProvider: any = {
    provide: CacheLoader,
    useFactory: (cacheFactory)
  }): ModuleWithProviders {
    return {
      ngModule: CacheModule,
      providers: [
        configuredProvider,
        {
          provide: CacheService,
          useFactory: (cacheServiceFactory),
          deps: [
            CacheLoader,
            PLATFORM_ID,
            Injector
          ]
        }
      ]
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CacheModule) {
    if (parentModule) {
      throw new Error('CacheModule already loaded; import in root module only.');
    }
  }
}
