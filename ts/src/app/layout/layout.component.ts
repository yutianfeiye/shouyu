import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import {TranslateService} from '@ngx-translate/core';
import { CookieStorage} from '../../lib/cookie';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles : [`
  :host {
     flex: 1 1 auto;
    display: flex;
    height: 100%;
   }
`],
})
export class LayoutComponent implements OnInit {
  maTheme: string = this.sharedService.maTheme;

  constructor(private sharedService: SharedService,
    private translate:TranslateService) {
      sharedService.maThemeSubject.subscribe((value) => {
        this.maTheme = value;
      });
      translate.addLangs(['en', 'zh']);
      translate.setDefaultLang('en');
      if(CookieStorage.hasCookie('lang')){
        const lang = CookieStorage.getCookie('lang').value;
        this.translate.use(lang);
      }else{
        const browserLang = translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|zh/) ?browserLang : 'en');
      }
  }
  ngOnInit() {
  }
}
