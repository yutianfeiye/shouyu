// angular
import { isPlatformServer } from '@angular/common';

// libs
import { ConfigLoader } from '../config.loader';
import { Cached } from '../../cache';

export class UniversalConfigLoader implements ConfigLoader {
  constructor(private readonly platformId: any,
              private readonly serverLoader: ConfigLoader,
              private readonly browserLoader: ConfigLoader) {
  }

  @Cached('ngx-config__settings')
  loadSettings(): any {
    return isPlatformServer(this.platformId)
      ? this.serverLoader.loadSettings()
      : this.browserLoader.loadSettings();
  }
}
