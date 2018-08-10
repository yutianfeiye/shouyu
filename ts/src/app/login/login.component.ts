import { Inject, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { extAnimations } from '../../lib/animations';
import { AuthService } from '../../lib/auth';
import { LoginService } from '../login/login.service';
import {TranslateService,TranslatePipe} from '@ngx-translate/core';

export let USER_STATUS_CODES = {
  400: 'User already exists',
  401: 'Invalid credentials',
  500: 'Something went wrong...'
};

@Component({
  selector: 'dotos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: extAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  title = '手语管理系统';
  usrPwd = '';
  username = '';
  password = '';

  isProcessing: boolean;
  note$: Observable<string>;
  warn$: Observable<string>;

  authenticatedObs: Observable<boolean>;
  loginServiceSub: Subscription;
  authSub: Subscription;
  lt = '';
  logo = '';
  authType = '';
  jsDebug = '';
  openRegister = false;
  selectedValue: string;
  langControl: FormControl;
  languages = [];

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  translatePipe:TranslatePipe;

  constructor(
    private readonly auth: AuthService,
   // private readonly i18nStore: Store<I18NState>,
    private readonly translate: TranslateService,
    private _cd:ChangeDetectorRef,
    private _loginService: LoginService,
    private _router: Router,
    private formBuilder: FormBuilder,
   // @Inject('apiBase') private _apiBase: string

  ) {
     translate.setDefaultLang('en');
     translate.use('en');
    this.loginFormErrors = {
      username: {},
      password: {}
    };
    // this.translatePipe=new TranslatePipe(translate,_cd);
   //  console.log(this.translatePipe.transform('LOGIN.USERNAME'));
  }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this._router.navigateByUrl(this.auth.defaultUrl);
    } else {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
      });
      this.loginForm.valueChanges.subscribe(() => {
        this.onLoginFormValuesChanged();
      });
    }
  }


  authenticated(): Observable<boolean> {
    if (this.authenticatedObs) {
      return this.authenticatedObs;
    }
    this.authenticatedObs = this._loginService.authenticated()
      .map(data => data.authenticated);
    return this.authenticatedObs;
  }

  langSelect(selected) {
    const val = selected.value;
   // const i18n=this._config.getSettings('i18n');
    // i18n.currentLanguage=val;
    this._loginService.getConfig().subscribe(result => {
        //   i18n.languages= result.i18n.languages;
          this.languages=result.i18n.languages;
      },
      error => {
          this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
      }
    );
   // this.i18nStore.dispatch(new LANGUAGE_ACTIONS.Init(val));
    // this.i18nStore.dispatch(new LANGUAGE_ACTIONS.UseLanguage(val));
  //  this.i18nStore.dispatch(new LANGUAGE_ACTIONS.LoadLanguage('login'));
    this._router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    this.errorDiagnostic = null;

    const usrPwd = this.loginForm.value.password;

    const params = new URLSearchParams();
    params.append('usrMail', this.loginForm.value.username);
    params.append('usrPwd', usrPwd);

    this._loginService.login(params).subscribe(data => {
      if (data.success) {
        this._router.initialNavigation();
        this._router.navigate(['/home']);
      } else {
        this.submitted = false;
        this.errorDiagnostic = data.message;
      }
    },
      error => {
        this.submitted = false;
        this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
      });
  }
  ngOnDestroy() {
    if (this.loginServiceSub) {
      this.loginServiceSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }
      this.loginFormErrors[field] = {};
      const control = this.loginForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }
}
