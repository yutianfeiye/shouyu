// angular
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';

// module
import { AuthSettings } from './models/auth-settings';
import { AuthGuard } from './auth.guard';
import { AuthLoader, AuthStaticLoader } from './auth.loader';
import { AuthService } from './auth.service';
import { AuthServerGuard } from './auth-server.guard';
import { AuthServerService } from './auth-server.service';

export * from './models/auth-settings';
export * from './models/backend';
export * from './auth.guard';
export * from './auth.loader';
export * from './auth.service';

export const AUTH_FORROOT_GUARD = new InjectionToken('AUTH_FORROOT_GUARD');

// for AoT compilation
export function authFactory(): AuthLoader {
  return new AuthStaticLoader();
}

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: AuthLoader,
      useFactory: (authFactory)
    }
  ]
})
export class AuthModule {
  static forRoot(configuredProvider: any = {
    provide: AuthLoader,
    useFactory: (authFactory)
  }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        configuredProvider
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AuthModule
    };
  }

  static forServer(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AuthService,
          useClass: AuthServerService
        },
        {
          provide: AuthGuard,
          useClass: AuthServerGuard
        }
      ]
    };
  }

  constructor(@Optional() @Inject(AUTH_FORROOT_GUARD) guard: any) {
    // NOTE: inject token
  }
}

export function provideForRootGuard(settings: AuthSettings): any {
  if (settings) {
    throw new Error(
      'AuthModule.forRoot() already called. Child modules should use AuthModule.forChild() instead.');
  }

  return 'guarded';
}
