import { Inject, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { extAnimations } from '../../lib/animations';
import { AuthService } from '../../lib/auth';
import { LoginService } from './login.service';
import {MatDialog} from '@angular/material';
import {LoginDialog} from './login.dialog';
import {SetupDialog} from './setup.dialog';
import {TranslateService} from '@ngx-translate/core';
import { RecorderService } from '../../lib/speech2text/core-audio/recorder/recorder.service';

import { Cookie,CookieStorage} from '../../lib/cookie';

export interface SetupData {
  avatar: string;
  speed: number;
}

@Component({
  selector: 'dotos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: extAnimations
})
export class LoginComponent implements OnInit {

  authenticatedObs: Observable<boolean>;

  form: FormGroup;

  props: any = {
    lang: 'cmn-Hans-CN',
    onChange: (value) => console.log(value + '====') ,
    onEnd: (value) => console.log(value + '#####')
  };


  data:SetupData;

  constructor(
    private readonly auth: AuthService,
    private _cd:ChangeDetectorRef,
    private _loginService: LoginService,
    private _router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private translate:TranslateService
  ) {
    this.data={
      avatar:'luna',
      speed:0.0
    };
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang('en');
    if(CookieStorage.hasCookie('lang')){
      const lang = CookieStorage.getCookie('lang').value;
      this.translate.use(lang);
    }else{
      const browserLang = translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|zh/) ?browserLang : 'en');
    }
  }
  setTranlate(lang){
    const langCookie: Cookie = new Cookie();
    langCookie.key = 'lang';
    langCookie.value = lang;
    langCookie.maxAge = 100;
    langCookie.path = '/';
    CookieStorage.addCookie(langCookie);
    this.translate.use(lang);
  }
  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this._router.navigateByUrl(this.auth.defaultUrl);
    } else {
      CWASA.init();
      this.buildForm();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      'text': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]]
    });
  }

  login(){
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '650px'
    });
  }

  setup(){
    const dialogRef = this.dialog.open(SetupDialog, {
      width: '650px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.avatar=result.avatar;
        this.data.speed=result.speed;
        CWASA.init({
          initAv:this.data.avatar,
          speed:this.data.speed
        });
      }
    });
  }

  authenticated(): Observable<boolean> {
    if (this.authenticatedObs) {
      return this.authenticatedObs;
    }
    this.authenticatedObs = this._loginService.authenticated()
      .map(data => data.authenticated);
    return this.authenticatedObs;
  }

  save(element: HTMLElement) {
    console.log(this.form.value);
  }
}
