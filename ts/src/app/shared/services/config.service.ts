import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class DotosConfigService {
  settings: any;
  defaultSettings: any;
  onSettingsChanged: BehaviorSubject<any>;

  /**
   * @param router
   * @param platform
   */
  constructor(
    private router: Router,
    public platform: Platform
  ) {
    // Set the default settings
    this.defaultSettings = {
      layout: {
        navigation: 'top', // 'right', 'left', 'top', 'none'
        toolbar: 'above', // 'above', 'below', 'none'
        footer: 'none', // 'above', 'below', 'none'
        mode: 'fullwidth' // 'boxed', 'fullwidth'
      },
      colorClasses: {
        toolbar: 'mat-white-500-bg',
        navbar: 'mat-ext-dark-700-bg',
        footer: 'mat-ext-dark-900-bg'
      },
      customScrollbars: true,
      routerAnimation: 'fadeIn' // fadeIn, slideUp, slideDown, slideRight, slideLeft
    };

    /**
     * Disable Custom Scrollbars if Browser is Mobile
     */
    if (this.platform.ANDROID || this.platform.IOS) {
      this.defaultSettings.customScrollbars = false;
    }

    this.settings = Object.assign({}, this.defaultSettings);

    // Reload the default settings on every navigation start
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.setSettings({ layout: this.defaultSettings.layout });
        }
      }
    );

    // Create the behavior subject
    this.onSettingsChanged = new BehaviorSubject(this.settings);
  }

  /**
   * Sets settings
   * @param settings
   */
  setSettings(settings) {
    this.settings = Object.assign({}, this.settings, settings);
    this.onSettingsChanged.next(this.settings);
  }
}
