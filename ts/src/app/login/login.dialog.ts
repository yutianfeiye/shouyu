import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { URLSearchParams } from '@angular/http';

import { LoginComponent } from './login.component';
import { extAnimations } from '../../lib/animations';
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export let USER_STATUS_CODES = {
  400: 'User already exists',
  401: 'Invalid credentials',
  500: 'Something went wrong...'
};

@Component({
  selector: 'login-dialog',
  templateUrl: 'login.dialog.html',
  styleUrls: ['./login.dialog.scss'],
  animations: extAnimations
})
export class LoginDialog implements OnInit {

  loginForm: FormGroup;
  loginFormErrors: any;

  loginServiceSub: Subscription;

  submitted = false;

  errorDiagnostic: string;

  authSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private _loginService: LoginService,
    private _router: Router,
    private formBuilder: FormBuilder) {
    this.loginFormErrors = {
      username: {},
      password: {}
    };
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
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
        this.dialogRef.close();
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
  cancel(): void {
    this.dialogRef.close();
  }
}
