import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private _router: Router, private _loginService: LoginService) {}
  canActivate(): Observable<boolean> | boolean {
    return this._loginService.authenticated()
      .map(
        result => {
          if (result.authenticated) {
            return true;
          } else {
            this._router.navigate(['/login']);
            return false;
          }
        }
      ).catch(error => {
        return Observable.of(true);
      });
  }
}
