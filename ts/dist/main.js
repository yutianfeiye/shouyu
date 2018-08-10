(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../dictionary/item-input.module": [
		"./src/app/dictionary/item-input.module.ts",
		"dictionary-item-input-module~synonyms-synonyms-module",
		"dictionary-item-input-module"
	],
	"../grammar/grammar.module": [
		"./src/app/grammar/grammar.module.ts",
		"grammar-grammar-module~user-user-module",
		"grammar-grammar-module"
	],
	"../synonyms/synonyms.module": [
		"./src/app/synonyms/synonyms.module.ts",
		"dictionary-item-input-module~synonyms-synonyms-module",
		"synonyms-synonyms-module"
	],
	"../user/user.module": [
		"./src/app/user/user.module.ts",
		"grammar-grammar-module~user-user-module",
		"user-user-module"
	],
	"./layout/layout.module": [
		"./src/app/layout/layout.module.ts",
		"layout-layout-module"
	],
	"app/dictionary/item-input.module": [
		"./src/app/dictionary/item-input.module.ts",
		"dictionary-item-input-module~synonyms-synonyms-module",
		"dictionary-item-input-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- The content below is only a placeholder and can be replaced.\n<div style=\"text-align:center\">\n  <div>\n    <div>点击录音按钮开始说话，说完之后再次点击按钮结束说话</div>\n    <speech></speech>\n  </div>\n</div> -->\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
// import { Component } from '@angular/core';
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
// }

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routing.module */ "./src/app/routing.module.ts");
/* harmony import */ var _lib_speech2text_core_audio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/speech2text/core-audio */ "./src/lib/speech2text/core-audio/index.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _login_authenticated_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/authenticated.guard */ "./src/app/login/authenticated.guard.ts");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login/login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/auth */ "./src/lib/auth/index.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    wheelPropagation: true
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"]
            ],
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__["BrowserAnimationsModule"],
                _routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _lib_speech2text_core_audio__WEBPACK_IMPORTED_MODULE_3__["CoreAudioModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                _lib_auth__WEBPACK_IMPORTED_MODULE_10__["AuthModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_5__["PerfectScrollbarModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateModule"].forRoot()
            ],
            providers: [
                {
                    provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_5__["PERFECT_SCROLLBAR_CONFIG"],
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                _login_login_service__WEBPACK_IMPORTED_MODULE_9__["LoginService"],
                _login_authenticated_guard__WEBPACK_IMPORTED_MODULE_8__["AuthenticatedGuard"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/login/authenticated.guard.ts":
/*!**********************************************!*\
  !*** ./src/app/login/authenticated.guard.ts ***!
  \**********************************************/
/*! exports provided: AuthenticatedGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticatedGuard", function() { return AuthenticatedGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticatedGuard = /** @class */ (function () {
    function AuthenticatedGuard(_router, _loginService) {
        this._router = _router;
        this._loginService = _loginService;
    }
    AuthenticatedGuard.prototype.canActivate = function () {
        var _this = this;
        return this._loginService.authenticated()
            .map(function (result) {
            if (result.authenticated) {
                return true;
            }
            else {
                _this._router.navigate(['/login']);
                return false;
            }
        }).catch(function (error) {
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"].of(true);
        });
    };
    AuthenticatedGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]])
    ], AuthenticatedGuard);
    return AuthenticatedGuard;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"login\" fxLayout=\"column\" perfectScrollbar>\r\n    <div id=\"login-form-wrapper\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\r\n        <div id=\"login-form\"  [@animate]=\"{value:'*',params:{duration:'300ms',y:'100px'}}\">\r\n            <div *ngIf=\"logo!=''\" >\r\n                <img src='{{logo}}' style=\"display:block; margin-left: auto; margin-right: auto;\"  height=\"99\" width=\"488\">\r\n            </div>\r\n            <div  *ngIf=\"logo==''\" class=\"title\">{{title}}</div>\r\n\r\n            <form *ngIf=\"!submitted\" [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\"  novalidate>\r\n                <mat-form-field>\r\n                    <input matInput placeholder=\"{{'LOGIN.USERNAME'| translate }}\" formControlName=\"username\"  autocomplete=\"new-password\">\r\n                    <mat-error *ngIf=\"loginFormErrors.username.required\">\r\n                          {{'LOGIN.EmailRequired'| translate }}\r\n                    </mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <input matInput required type=\"password\"\r\n                    placeholder=\"{{'LOGIN.PASSWORD'| translate }}\"\r\n                    formControlName=\"password\"\r\n                    autocomplete=\"new-password\">\r\n                    <mat-error *ngIf=\"loginFormErrors.password.required\">\r\n                      \r\n                          {{'LOGIN.PasswordRequired'| translate }}\r\n                    </mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                  <mat-select *ngIf=\"languages.length!=0\"  placeholder=\"{{'LOGIN.LANGUAGE'| translate }}\" [formControl]=\"langControl\"  (change)=\"langSelect($event)\" style=\"width: 100%;\">\r\n                      <mat-option *ngFor=\"let lang of languages\" [value]=\"lang.value\"> {{lang.text }} </mat-option>\r\n                 </mat-select>\r\n                </mat-form-field>\r\n                <div class=\"remember-forgot-password\" fxLayout=\"row\" fxLayout.xs=\"column\"\r\n                     fxLayoutAlign=\"space-between center\">\r\n                    <mat-checkbox class=\"remember-me\" aria-label=\"Remember Me\">\r\n                        {{'LOGIN.REMEMBERME'| translate }}\r\n                    </mat-checkbox>\r\n                    <a class=\"forgot-password\" [routerLink]=\"'/forgot-password'\">\r\n                        {{'LOGIN.FORGOTPASSWORD'| translate }} ?\r\n                    </a>\r\n                </div>\r\n                <button mat-raised-button color=\"accent\" class=\"submit-button\" aria-label=\"LOG IN\"\r\n                        [disabled]=\"loginForm.invalid\">\r\n                        {{'LOGIN.LOGIN'| translate }}\r\n                </button>\r\n            </form>\r\n            <mat-spinner *ngIf=\"submitted\" mode=\"indeterminate\"></mat-spinner>\r\n            <p class=\"error\" *ngIf=\"errorDiagnostic\">{{errorDiagnostic}}</p>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n.mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-option:hover:not(.mat-option-disabled), .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ef6c00; }\n.mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #039be5; }\n.mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #e53935; }\n.mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.mat-pseudo-checkbox-checked,\n.mat-pseudo-checkbox-indeterminate,\n.mat-accent .mat-pseudo-checkbox-checked,\n.mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #039be5; }\n.mat-primary .mat-pseudo-checkbox-checked,\n.mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #ef6c00; }\n.mat-warn .mat-pseudo-checkbox-checked,\n.mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #e53935; }\n.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.mat-badge-content {\n  color: white;\n  background: #ef6c00; }\n.mat-badge-accent .mat-badge-content {\n  background: #039be5;\n  color: white; }\n.mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #e53935; }\n.mat-badge {\n  position: relative; }\n.mat-badge-hidden .mat-badge-content {\n  display: none; }\n.mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-button, .mat-icon-button, .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.mat-button.mat-primary, .mat-icon-button.mat-primary, .mat-stroked-button.mat-primary {\n    color: #ef6c00; }\n.mat-button.mat-accent, .mat-icon-button.mat-accent, .mat-stroked-button.mat-accent {\n    color: #039be5; }\n.mat-button.mat-warn, .mat-icon-button.mat-warn, .mat-stroked-button.mat-warn {\n    color: #e53935; }\n.mat-button.mat-primary[disabled], .mat-button.mat-accent[disabled], .mat-button.mat-warn[disabled], .mat-button[disabled][disabled], .mat-icon-button.mat-primary[disabled], .mat-icon-button.mat-accent[disabled], .mat-icon-button.mat-warn[disabled], .mat-icon-button[disabled][disabled], .mat-stroked-button.mat-primary[disabled], .mat-stroked-button.mat-accent[disabled], .mat-stroked-button.mat-warn[disabled], .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.mat-button.mat-primary .mat-button-focus-overlay, .mat-icon-button.mat-primary .mat-button-focus-overlay, .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(239, 108, 0, 0.12); }\n.mat-button.mat-accent .mat-button-focus-overlay, .mat-icon-button.mat-accent .mat-button-focus-overlay, .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(3, 155, 229, 0.12); }\n.mat-button.mat-warn .mat-button-focus-overlay, .mat-icon-button.mat-warn .mat-button-focus-overlay, .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(229, 57, 53, 0.12); }\n.mat-button[disabled] .mat-button-focus-overlay, .mat-icon-button[disabled] .mat-button-focus-overlay, .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.mat-button.mat-primary .mat-ripple-element, .mat-icon-button.mat-primary .mat-ripple-element, .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(239, 108, 0, 0.1); }\n.mat-button.mat-accent .mat-ripple-element, .mat-icon-button.mat-accent .mat-ripple-element, .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(3, 155, 229, 0.1); }\n.mat-button.mat-warn .mat-ripple-element, .mat-icon-button.mat-warn .mat-ripple-element, .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(229, 57, 53, 0.1); }\n.mat-flat-button, .mat-raised-button, .mat-fab, .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n    color: white; }\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n    color: white; }\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n    color: white; }\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-accent[disabled], .mat-flat-button.mat-warn[disabled], .mat-flat-button[disabled][disabled], .mat-raised-button.mat-primary[disabled], .mat-raised-button.mat-accent[disabled], .mat-raised-button.mat-warn[disabled], .mat-raised-button[disabled][disabled], .mat-fab.mat-primary[disabled], .mat-fab.mat-accent[disabled], .mat-fab.mat-warn[disabled], .mat-fab[disabled][disabled], .mat-mini-fab.mat-primary[disabled], .mat-mini-fab.mat-accent[disabled], .mat-mini-fab.mat-warn[disabled], .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n    background-color: #ef6c00; }\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n    background-color: #039be5; }\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n    background-color: #e53935; }\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-accent[disabled], .mat-flat-button.mat-warn[disabled], .mat-flat-button[disabled][disabled], .mat-raised-button.mat-primary[disabled], .mat-raised-button.mat-accent[disabled], .mat-raised-button.mat-warn[disabled], .mat-raised-button[disabled][disabled], .mat-fab.mat-primary[disabled], .mat-fab.mat-accent[disabled], .mat-fab.mat-warn[disabled], .mat-fab[disabled][disabled], .mat-mini-fab.mat-primary[disabled], .mat-mini-fab.mat-accent[disabled], .mat-mini-fab.mat-warn[disabled], .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.mat-flat-button.mat-primary .mat-ripple-element, .mat-raised-button.mat-primary .mat-ripple-element, .mat-fab.mat-primary .mat-ripple-element, .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-flat-button.mat-accent .mat-ripple-element, .mat-raised-button.mat-accent .mat-ripple-element, .mat-fab.mat-accent .mat-ripple-element, .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-flat-button.mat-warn .mat-ripple-element, .mat-raised-button.mat-warn .mat-ripple-element, .mat-fab.mat-warn .mat-ripple-element, .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.2); }\n.mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(3, 155, 229, 0.2); }\n.mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.2); }\n.mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.mat-checkbox-checkmark {\n  fill: #fafafa; }\n.mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #ef6c00; }\n.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #039be5; }\n.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #e53935; }\n.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .mat-checkbox-background {\n    background: none; } }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.26); }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(3, 155, 229, 0.26); }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #ef6c00;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #e53935;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #039be5;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-table {\n  background: white; }\n.mat-table thead, .mat-table tbody, .mat-table tfoot,\nmat-header-row, mat-row, mat-footer-row,\n[mat-header-row], [mat-row], [mat-footer-row],\n.mat-table-sticky {\n  background: inherit; }\nmat-row, mat-header-row, mat-footer-row,\nth.mat-header-cell, td.mat-cell, td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-cell, .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.mat-datepicker-toggle,\n.mat-datepicker-content .mat-calendar-next-button,\n.mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.mat-calendar-body-selected {\n  background-color: #ef6c00;\n  color: white; }\n.mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(239, 108, 0, 0.4); }\n.mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #039be5;\n    color: white; }\n.mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(3, 155, 229, 0.4); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #e53935;\n    color: white; }\n.mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(229, 57, 53, 0.4); }\n.mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-toggle-active {\n  color: #ef6c00; }\n.mat-datepicker-toggle-active.mat-accent {\n    color: #039be5; }\n.mat-datepicker-toggle-active.mat-warn {\n    color: #e53935; }\n.mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-expansion-panel-header-description,\n.mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.mat-form-field.mat-focused .mat-form-field-label {\n  color: #ef6c00; }\n.mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #039be5; }\n.mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #e53935; }\n.mat-focused .mat-form-field-required-marker {\n  color: #039be5; }\n.mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #ef6c00; }\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #039be5; }\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #e53935; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #e53935; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #e53935; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #e53935; }\n.mat-error {\n  color: #e53935; }\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #ef6c00; }\n.mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #039be5; }\n.mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #e53935; }\n.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #e53935; }\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.mat-icon.mat-primary {\n  color: #ef6c00; }\n.mat-icon.mat-accent {\n  color: #039be5; }\n.mat-icon.mat-warn {\n  color: #e53935; }\n.mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-input-element {\n  caret-color: #ef6c00; }\n.mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-accent .mat-input-element {\n  caret-color: #039be5; }\n.mat-warn .mat-input-element,\n.mat-form-field-invalid .mat-input-element {\n  caret-color: #e53935; }\n.mat-list .mat-list-item, .mat-nav-list .mat-list-item, .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-list .mat-list-option, .mat-nav-list .mat-list-option, .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-list .mat-subheader, .mat-nav-list .mat-subheader, .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-list-item-disabled {\n  background-color: #eeeeee; }\n.mat-list-option:hover, .mat-list-option.mat-list-item-focus,\n.mat-nav-list .mat-list-item:hover,\n.mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-menu-panel {\n  background: white; }\n.mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-menu-item[disabled], .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-menu-item .mat-icon:not([color]),\n.mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-menu-item:hover:not([disabled]),\n.mat-menu-item.cdk-program-focused:not([disabled]),\n.mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-paginator {\n  background: white; }\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-paginator-decrement,\n.mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.mat-paginator-first,\n.mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.mat-icon-button[disabled] .mat-paginator-decrement,\n.mat-icon-button[disabled] .mat-paginator-increment,\n.mat-icon-button[disabled] .mat-paginator-first,\n.mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-progress-bar-background {\n  fill: #ffe0b2; }\n.mat-progress-bar-buffer {\n  background-color: #ffe0b2; }\n.mat-progress-bar-fill::after {\n  background-color: #ef6c00; }\n.mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #80d8ff; }\n.mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #80d8ff; }\n.mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #039be5; }\n.mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #e53935; }\n.mat-progress-spinner circle, .mat-spinner circle {\n  stroke: #ef6c00; }\n.mat-progress-spinner.mat-accent circle, .mat-spinner.mat-accent circle {\n  stroke: #039be5; }\n.mat-progress-spinner.mat-warn circle, .mat-spinner.mat-warn circle {\n  stroke: #e53935; }\n.mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ef6c00; }\n.mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #ef6c00; }\n.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.26); }\n.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #039be5; }\n.mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #039be5; }\n.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(3, 155, 229, 0.26); }\n.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #e53935; }\n.mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #e53935; }\n.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-select-content, .mat-select-panel-done-animating {\n  background: white; }\n.mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #ef6c00; }\n.mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #039be5; }\n.mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #e53935; }\n.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #e53935; }\n.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-drawer.mat-drawer-push {\n    background-color: white; }\n.mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #03a9f4; }\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(3, 169, 244, 0.5); }\n.mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(3, 169, 244, 0.12); }\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ff9800; }\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 152, 0, 0.5); }\n.mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(255, 152, 0, 0.12); }\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-primary .mat-slider-track-fill,\n.mat-primary .mat-slider-thumb,\n.mat-primary .mat-slider-thumb-label {\n  background-color: #ef6c00; }\n.mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.mat-accent .mat-slider-track-fill,\n.mat-accent .mat-slider-thumb,\n.mat-accent .mat-slider-thumb-label {\n  background-color: #039be5; }\n.mat-accent .mat-slider-thumb-label-text {\n  color: white; }\n.mat-warn .mat-slider-track-fill,\n.mat-warn .mat-slider-thumb,\n.mat-warn .mat-slider-thumb-label {\n  background-color: #e53935; }\n.mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.mat-slider-focus-ring {\n  background-color: rgba(3, 155, 229, 0.2); }\n.mat-slider:hover .mat-slider-track-background,\n.cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-disabled .mat-slider-track-background,\n.mat-slider-disabled .mat-slider-track-fill,\n.mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.mat-step-header.cdk-keyboard-focused, .mat-step-header.cdk-program-focused, .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-step-header .mat-step-label,\n.mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-step-header .mat-step-icon {\n  background-color: #ef6c00;\n  color: white; }\n.mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-stepper-horizontal, .mat-stepper-vertical {\n  background-color: white; }\n.mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-sort-header-arrow {\n  color: #757575; }\n.mat-tab-nav-bar,\n.mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.mat-tab-group-inverted-header .mat-tab-nav-bar,\n.mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.mat-tab-label, .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-tab-label.mat-tab-disabled, .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.mat-tab-group.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-group.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 224, 178, 0.3); }\n.mat-tab-group.mat-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #ef6c00; }\n.mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-group.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(128, 216, 255, 0.3); }\n.mat-tab-group.mat-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #039be5; }\n.mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-group.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.mat-tab-group.mat-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #e53935; }\n.mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-group.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 224, 178, 0.3); }\n.mat-tab-group.mat-background-primary .mat-tab-header, .mat-tab-group.mat-background-primary .mat-tab-links, .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #ef6c00; }\n.mat-tab-group.mat-background-primary .mat-tab-label, .mat-tab-group.mat-background-primary .mat-tab-link, .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-primary .mat-ripple-element, .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-tab-group.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-group.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(128, 216, 255, 0.3); }\n.mat-tab-group.mat-background-accent .mat-tab-header, .mat-tab-group.mat-background-accent .mat-tab-links, .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #039be5; }\n.mat-tab-group.mat-background-accent .mat-tab-label, .mat-tab-group.mat-background-accent .mat-tab-link, .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-accent .mat-ripple-element, .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-tab-group.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-group.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.mat-tab-group.mat-background-warn .mat-tab-header, .mat-tab-group.mat-background-warn .mat-tab-links, .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #e53935; }\n.mat-tab-group.mat-background-warn .mat-tab-label, .mat-tab-group.mat-background-warn .mat-tab-link, .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-warn .mat-ripple-element, .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-toolbar.mat-primary {\n    background: #ef6c00;\n    color: white; }\n.mat-toolbar.mat-accent {\n    background: #039be5;\n    color: white; }\n.mat-toolbar.mat-warn {\n    background: #e53935;\n    color: white; }\n.mat-toolbar .mat-form-field-underline,\n  .mat-toolbar .mat-form-field-ripple,\n  .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.mat-toolbar .mat-form-field-label,\n  .mat-toolbar .mat-focused .mat-form-field-label,\n  .mat-toolbar .mat-select-value,\n  .mat-toolbar .mat-select-arrow,\n  .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.mat-tree {\n  background: white; }\n.mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.mat-simple-snackbar-action {\n  color: #039be5; }\n.theme-alt .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.theme-alt .mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-option:hover:not(.mat-option-disabled), .theme-alt .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ef6c00; }\n.theme-alt .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #0288d1; }\n.theme-alt .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #e53935; }\n.theme-alt .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.theme-alt .mat-pseudo-checkbox-checked,\n.theme-alt .mat-pseudo-checkbox-indeterminate,\n.theme-alt .mat-accent .mat-pseudo-checkbox-checked,\n.theme-alt .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #0288d1; }\n.theme-alt .mat-primary .mat-pseudo-checkbox-checked,\n.theme-alt .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #ef6c00; }\n.theme-alt .mat-warn .mat-pseudo-checkbox-checked,\n.theme-alt .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #e53935; }\n.theme-alt .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.theme-alt .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.theme-alt .mat-app-background, .theme-alt.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.theme-alt .mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.theme-alt .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-badge-content {\n  color: white;\n  background: #ef6c00; }\n.theme-alt .mat-badge-accent .mat-badge-content {\n  background: #0288d1;\n  color: white; }\n.theme-alt .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #e53935; }\n.theme-alt .mat-badge {\n  position: relative; }\n.theme-alt .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.theme-alt .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.theme-alt .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.theme-alt .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-alt .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-alt .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.theme-alt .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.theme-alt .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .theme-alt .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.theme-alt .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .theme-alt .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.theme-alt .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .theme-alt .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.theme-alt .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .theme-alt .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.theme-alt .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-alt .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-alt .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.theme-alt .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.theme-alt .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .theme-alt .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.theme-alt .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .theme-alt .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.theme-alt .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .theme-alt .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.theme-alt .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .theme-alt .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.theme-alt .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-alt .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-alt .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.theme-alt .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.theme-alt .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .theme-alt .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.theme-alt .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .theme-alt .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.theme-alt .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .theme-alt .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.theme-alt .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .theme-alt .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.theme-alt .mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-button, .theme-alt .mat-icon-button, .theme-alt .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.theme-alt .mat-button.mat-primary, .theme-alt .mat-icon-button.mat-primary, .theme-alt .mat-stroked-button.mat-primary {\n    color: #ef6c00; }\n.theme-alt .mat-button.mat-accent, .theme-alt .mat-icon-button.mat-accent, .theme-alt .mat-stroked-button.mat-accent {\n    color: #0288d1; }\n.theme-alt .mat-button.mat-warn, .theme-alt .mat-icon-button.mat-warn, .theme-alt .mat-stroked-button.mat-warn {\n    color: #e53935; }\n.theme-alt .mat-button.mat-primary[disabled], .theme-alt .mat-button.mat-accent[disabled], .theme-alt .mat-button.mat-warn[disabled], .theme-alt .mat-button[disabled][disabled], .theme-alt .mat-icon-button.mat-primary[disabled], .theme-alt .mat-icon-button.mat-accent[disabled], .theme-alt .mat-icon-button.mat-warn[disabled], .theme-alt .mat-icon-button[disabled][disabled], .theme-alt .mat-stroked-button.mat-primary[disabled], .theme-alt .mat-stroked-button.mat-accent[disabled], .theme-alt .mat-stroked-button.mat-warn[disabled], .theme-alt .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-button.mat-primary .mat-button-focus-overlay, .theme-alt .mat-icon-button.mat-primary .mat-button-focus-overlay, .theme-alt .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(239, 108, 0, 0.12); }\n.theme-alt .mat-button.mat-accent .mat-button-focus-overlay, .theme-alt .mat-icon-button.mat-accent .mat-button-focus-overlay, .theme-alt .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(2, 136, 209, 0.12); }\n.theme-alt .mat-button.mat-warn .mat-button-focus-overlay, .theme-alt .mat-icon-button.mat-warn .mat-button-focus-overlay, .theme-alt .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(229, 57, 53, 0.12); }\n.theme-alt .mat-button[disabled] .mat-button-focus-overlay, .theme-alt .mat-icon-button[disabled] .mat-button-focus-overlay, .theme-alt .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.theme-alt .mat-button.mat-primary .mat-ripple-element, .theme-alt .mat-icon-button.mat-primary .mat-ripple-element, .theme-alt .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(239, 108, 0, 0.1); }\n.theme-alt .mat-button.mat-accent .mat-ripple-element, .theme-alt .mat-icon-button.mat-accent .mat-ripple-element, .theme-alt .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(2, 136, 209, 0.1); }\n.theme-alt .mat-button.mat-warn .mat-ripple-element, .theme-alt .mat-icon-button.mat-warn .mat-ripple-element, .theme-alt .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(229, 57, 53, 0.1); }\n.theme-alt .mat-flat-button, .theme-alt .mat-raised-button, .theme-alt .mat-fab, .theme-alt .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.theme-alt .mat-flat-button.mat-primary, .theme-alt .mat-raised-button.mat-primary, .theme-alt .mat-fab.mat-primary, .theme-alt .mat-mini-fab.mat-primary {\n    color: white; }\n.theme-alt .mat-flat-button.mat-accent, .theme-alt .mat-raised-button.mat-accent, .theme-alt .mat-fab.mat-accent, .theme-alt .mat-mini-fab.mat-accent {\n    color: white; }\n.theme-alt .mat-flat-button.mat-warn, .theme-alt .mat-raised-button.mat-warn, .theme-alt .mat-fab.mat-warn, .theme-alt .mat-mini-fab.mat-warn {\n    color: white; }\n.theme-alt .mat-flat-button.mat-primary[disabled], .theme-alt .mat-flat-button.mat-accent[disabled], .theme-alt .mat-flat-button.mat-warn[disabled], .theme-alt .mat-flat-button[disabled][disabled], .theme-alt .mat-raised-button.mat-primary[disabled], .theme-alt .mat-raised-button.mat-accent[disabled], .theme-alt .mat-raised-button.mat-warn[disabled], .theme-alt .mat-raised-button[disabled][disabled], .theme-alt .mat-fab.mat-primary[disabled], .theme-alt .mat-fab.mat-accent[disabled], .theme-alt .mat-fab.mat-warn[disabled], .theme-alt .mat-fab[disabled][disabled], .theme-alt .mat-mini-fab.mat-primary[disabled], .theme-alt .mat-mini-fab.mat-accent[disabled], .theme-alt .mat-mini-fab.mat-warn[disabled], .theme-alt .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-flat-button.mat-primary, .theme-alt .mat-raised-button.mat-primary, .theme-alt .mat-fab.mat-primary, .theme-alt .mat-mini-fab.mat-primary {\n    background-color: #ef6c00; }\n.theme-alt .mat-flat-button.mat-accent, .theme-alt .mat-raised-button.mat-accent, .theme-alt .mat-fab.mat-accent, .theme-alt .mat-mini-fab.mat-accent {\n    background-color: #0288d1; }\n.theme-alt .mat-flat-button.mat-warn, .theme-alt .mat-raised-button.mat-warn, .theme-alt .mat-fab.mat-warn, .theme-alt .mat-mini-fab.mat-warn {\n    background-color: #e53935; }\n.theme-alt .mat-flat-button.mat-primary[disabled], .theme-alt .mat-flat-button.mat-accent[disabled], .theme-alt .mat-flat-button.mat-warn[disabled], .theme-alt .mat-flat-button[disabled][disabled], .theme-alt .mat-raised-button.mat-primary[disabled], .theme-alt .mat-raised-button.mat-accent[disabled], .theme-alt .mat-raised-button.mat-warn[disabled], .theme-alt .mat-raised-button[disabled][disabled], .theme-alt .mat-fab.mat-primary[disabled], .theme-alt .mat-fab.mat-accent[disabled], .theme-alt .mat-fab.mat-warn[disabled], .theme-alt .mat-fab[disabled][disabled], .theme-alt .mat-mini-fab.mat-primary[disabled], .theme-alt .mat-mini-fab.mat-accent[disabled], .theme-alt .mat-mini-fab.mat-warn[disabled], .theme-alt .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-flat-button.mat-primary .mat-ripple-element, .theme-alt .mat-raised-button.mat-primary .mat-ripple-element, .theme-alt .mat-fab.mat-primary .mat-ripple-element, .theme-alt .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-alt .mat-flat-button.mat-accent .mat-ripple-element, .theme-alt .mat-raised-button.mat-accent .mat-ripple-element, .theme-alt .mat-fab.mat-accent .mat-ripple-element, .theme-alt .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-alt .mat-flat-button.mat-warn .mat-ripple-element, .theme-alt .mat-raised-button.mat-warn .mat-ripple-element, .theme-alt .mat-fab.mat-warn .mat-ripple-element, .theme-alt .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-alt .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.2); }\n.theme-alt .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(2, 136, 209, 0.2); }\n.theme-alt .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.2); }\n.theme-alt .mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.theme-alt .mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-checkbox-checkmark {\n  fill: #fafafa; }\n.theme-alt .mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .theme-alt .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.theme-alt .mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.theme-alt .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .theme-alt .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #ef6c00; }\n.theme-alt .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .theme-alt .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #0288d1; }\n.theme-alt .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .theme-alt .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #e53935; }\n.theme-alt .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .theme-alt .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.theme-alt .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.theme-alt .mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .theme-alt .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .theme-alt .mat-checkbox-background {\n    background: none; } }\n.theme-alt .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.26); }\n.theme-alt .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(2, 136, 209, 0.26); }\n.theme-alt .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.theme-alt .mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.theme-alt .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #ef6c00;\n  color: white; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #e53935;\n  color: white; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #0288d1;\n  color: white; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-alt .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-alt .mat-table {\n  background: white; }\n.theme-alt .mat-table thead, .theme-alt .mat-table tbody, .theme-alt .mat-table tfoot,\n.theme-alt mat-header-row, .theme-alt mat-row, .theme-alt mat-footer-row,\n.theme-alt [mat-header-row], .theme-alt [mat-row], .theme-alt [mat-footer-row],\n.theme-alt .mat-table-sticky {\n  background: inherit; }\n.theme-alt mat-row, .theme-alt mat-header-row, .theme-alt mat-footer-row,\n.theme-alt th.mat-header-cell, .theme-alt td.mat-cell, .theme-alt td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-cell, .theme-alt .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-datepicker-toggle,\n.theme-alt .mat-datepicker-content .mat-calendar-next-button,\n.theme-alt .mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.theme-alt .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.theme-alt .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.theme-alt .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.theme-alt .mat-calendar-body-selected {\n  background-color: #ef6c00;\n  color: white; }\n.theme-alt .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(239, 108, 0, 0.4); }\n.theme-alt .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.theme-alt .mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #0288d1;\n    color: white; }\n.theme-alt .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(2, 136, 209, 0.4); }\n.theme-alt .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.theme-alt .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #e53935;\n    color: white; }\n.theme-alt .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(229, 57, 53, 0.4); }\n.theme-alt .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.theme-alt .mat-datepicker-toggle-active {\n  color: #ef6c00; }\n.theme-alt .mat-datepicker-toggle-active.mat-accent {\n    color: #0288d1; }\n.theme-alt .mat-datepicker-toggle-active.mat-warn {\n    color: #e53935; }\n.theme-alt .mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .theme-alt .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .theme-alt .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .theme-alt .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.theme-alt .mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-expansion-panel-header-description,\n.theme-alt .mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .theme-alt .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.theme-alt .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.theme-alt .mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.theme-alt .mat-form-field.mat-focused .mat-form-field-label {\n  color: #ef6c00; }\n.theme-alt .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #0288d1; }\n.theme-alt .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #e53935; }\n.theme-alt .mat-focused .mat-form-field-required-marker {\n  color: #0288d1; }\n.theme-alt .mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #ef6c00; }\n.theme-alt .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #0288d1; }\n.theme-alt .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #e53935; }\n.theme-alt .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #e53935; }\n.theme-alt .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .theme-alt .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #e53935; }\n.theme-alt .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.theme-alt .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #e53935; }\n.theme-alt .mat-error {\n  color: #e53935; }\n.theme-alt .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.theme-alt .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.theme-alt .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.theme-alt .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.theme-alt .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #ef6c00; }\n.theme-alt .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #0288d1; }\n.theme-alt .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #e53935; }\n.theme-alt .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #e53935; }\n.theme-alt .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.theme-alt .mat-icon.mat-primary {\n  color: #ef6c00; }\n.theme-alt .mat-icon.mat-accent {\n  color: #0288d1; }\n.theme-alt .mat-icon.mat-warn {\n  color: #e53935; }\n.theme-alt .mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-input-element {\n  caret-color: #ef6c00; }\n.theme-alt .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-accent .mat-input-element {\n  caret-color: #0288d1; }\n.theme-alt .mat-warn .mat-input-element,\n.theme-alt .mat-form-field-invalid .mat-input-element {\n  caret-color: #e53935; }\n.theme-alt .mat-list .mat-list-item, .theme-alt .mat-nav-list .mat-list-item, .theme-alt .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-list .mat-list-option, .theme-alt .mat-nav-list .mat-list-option, .theme-alt .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-list .mat-subheader, .theme-alt .mat-nav-list .mat-subheader, .theme-alt .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-list-item-disabled {\n  background-color: #eeeeee; }\n.theme-alt .mat-list-option:hover, .theme-alt .mat-list-option.mat-list-item-focus,\n.theme-alt .mat-nav-list .mat-list-item:hover,\n.theme-alt .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-menu-panel {\n  background: white; }\n.theme-alt .mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-menu-item[disabled], .theme-alt .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-menu-item .mat-icon:not([color]),\n.theme-alt .mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-menu-item:hover:not([disabled]),\n.theme-alt .mat-menu-item.cdk-program-focused:not([disabled]),\n.theme-alt .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.theme-alt .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-paginator {\n  background: white; }\n.theme-alt .mat-paginator,\n.theme-alt .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-paginator-decrement,\n.theme-alt .mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-paginator-first,\n.theme-alt .mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-icon-button[disabled] .mat-paginator-decrement,\n.theme-alt .mat-icon-button[disabled] .mat-paginator-increment,\n.theme-alt .mat-icon-button[disabled] .mat-paginator-first,\n.theme-alt .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-progress-bar-background {\n  fill: #ffe0b2; }\n.theme-alt .mat-progress-bar-buffer {\n  background-color: #ffe0b2; }\n.theme-alt .mat-progress-bar-fill::after {\n  background-color: #ef6c00; }\n.theme-alt .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #b3e5fc; }\n.theme-alt .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #b3e5fc; }\n.theme-alt .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #0288d1; }\n.theme-alt .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.theme-alt .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.theme-alt .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #e53935; }\n.theme-alt .mat-progress-spinner circle, .theme-alt .mat-spinner circle {\n  stroke: #ef6c00; }\n.theme-alt .mat-progress-spinner.mat-accent circle, .theme-alt .mat-spinner.mat-accent circle {\n  stroke: #0288d1; }\n.theme-alt .mat-progress-spinner.mat-warn circle, .theme-alt .mat-spinner.mat-warn circle {\n  stroke: #e53935; }\n.theme-alt .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ef6c00; }\n.theme-alt .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #ef6c00; }\n.theme-alt .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.26); }\n.theme-alt .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #0288d1; }\n.theme-alt .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #0288d1; }\n.theme-alt .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(2, 136, 209, 0.26); }\n.theme-alt .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #e53935; }\n.theme-alt .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #e53935; }\n.theme-alt .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.theme-alt .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.theme-alt .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.theme-alt .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-select-content, .theme-alt .mat-select-panel-done-animating {\n  background: white; }\n.theme-alt .mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.theme-alt .mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-alt .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #ef6c00; }\n.theme-alt .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #0288d1; }\n.theme-alt .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #e53935; }\n.theme-alt .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #e53935; }\n.theme-alt .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-drawer.mat-drawer-push {\n    background-color: white; }\n.theme-alt .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.theme-alt .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #03a9f4; }\n.theme-alt .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(3, 169, 244, 0.5); }\n.theme-alt .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.theme-alt .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(3, 169, 244, 0.12); }\n.theme-alt .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ff9800; }\n.theme-alt .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 152, 0, 0.5); }\n.theme-alt .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.theme-alt .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(255, 152, 0, 0.12); }\n.theme-alt .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.theme-alt .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.theme-alt .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.theme-alt .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.theme-alt .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.theme-alt .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.theme-alt .mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.theme-alt .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-primary .mat-slider-track-fill,\n.theme-alt .mat-primary .mat-slider-thumb,\n.theme-alt .mat-primary .mat-slider-thumb-label {\n  background-color: #ef6c00; }\n.theme-alt .mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.theme-alt .mat-accent .mat-slider-track-fill,\n.theme-alt .mat-accent .mat-slider-thumb,\n.theme-alt .mat-accent .mat-slider-thumb-label {\n  background-color: #0288d1; }\n.theme-alt .mat-accent .mat-slider-thumb-label-text {\n  color: white; }\n.theme-alt .mat-warn .mat-slider-track-fill,\n.theme-alt .mat-warn .mat-slider-thumb,\n.theme-alt .mat-warn .mat-slider-thumb-label {\n  background-color: #e53935; }\n.theme-alt .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.theme-alt .mat-slider-focus-ring {\n  background-color: rgba(2, 136, 209, 0.2); }\n.theme-alt .mat-slider:hover .mat-slider-track-background,\n.theme-alt .cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-slider-disabled .mat-slider-track-background,\n.theme-alt .mat-slider-disabled .mat-slider-track-fill,\n.theme-alt .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.theme-alt .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.theme-alt .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.theme-alt .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .theme-alt .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .theme-alt .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.theme-alt .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.theme-alt .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.theme-alt .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.theme-alt .mat-step-header.cdk-keyboard-focused, .theme-alt .mat-step-header.cdk-program-focused, .theme-alt .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.theme-alt .mat-step-header .mat-step-label,\n.theme-alt .mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-step-header .mat-step-icon {\n  background-color: #ef6c00;\n  color: white; }\n.theme-alt .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.theme-alt .mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-stepper-horizontal, .theme-alt .mat-stepper-vertical {\n  background-color: white; }\n.theme-alt .mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-sort-header-arrow {\n  color: #757575; }\n.theme-alt .mat-tab-nav-bar,\n.theme-alt .mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.theme-alt .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.theme-alt .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.theme-alt .mat-tab-label, .theme-alt .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-alt .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.theme-alt .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.theme-alt .mat-tab-group.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-group.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-alt .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 224, 178, 0.3); }\n.theme-alt .mat-tab-group.mat-primary .mat-ink-bar, .theme-alt .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #ef6c00; }\n.theme-alt .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .theme-alt .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.theme-alt .mat-tab-group.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-group.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-alt .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(179, 229, 252, 0.3); }\n.theme-alt .mat-tab-group.mat-accent .mat-ink-bar, .theme-alt .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #0288d1; }\n.theme-alt .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .theme-alt .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: white; }\n.theme-alt .mat-tab-group.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-group.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-alt .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.theme-alt .mat-tab-group.mat-warn .mat-ink-bar, .theme-alt .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #e53935; }\n.theme-alt .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .theme-alt .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 224, 178, 0.3); }\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-header, .theme-alt .mat-tab-group.mat-background-primary .mat-tab-links, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #ef6c00; }\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-label, .theme-alt .mat-tab-group.mat-background-primary .mat-tab-link, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-alt .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-alt .mat-tab-group.mat-background-primary .mat-ripple-element, .theme-alt .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(179, 229, 252, 0.3); }\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-header, .theme-alt .mat-tab-group.mat-background-accent .mat-tab-links, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #0288d1; }\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-label, .theme-alt .mat-tab-group.mat-background-accent .mat-tab-link, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: white; }\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-alt .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-alt .mat-tab-group.mat-background-accent .mat-ripple-element, .theme-alt .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-header, .theme-alt .mat-tab-group.mat-background-warn .mat-tab-links, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #e53935; }\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-label, .theme-alt .mat-tab-group.mat-background-warn .mat-tab-link, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-alt .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-alt .mat-tab-group.mat-background-warn .mat-ripple-element, .theme-alt .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-alt .mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-toolbar.mat-primary {\n    background: #ef6c00;\n    color: white; }\n.theme-alt .mat-toolbar.mat-accent {\n    background: #0288d1;\n    color: white; }\n.theme-alt .mat-toolbar.mat-warn {\n    background: #e53935;\n    color: white; }\n.theme-alt .mat-toolbar .mat-form-field-underline,\n  .theme-alt .mat-toolbar .mat-form-field-ripple,\n  .theme-alt .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.theme-alt .mat-toolbar .mat-form-field-label,\n  .theme-alt .mat-toolbar .mat-focused .mat-form-field-label,\n  .theme-alt .mat-toolbar .mat-select-value,\n  .theme-alt .mat-toolbar .mat-select-arrow,\n  .theme-alt .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.theme-alt .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.theme-alt .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.theme-alt .mat-tree {\n  background: white; }\n.theme-alt .mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-alt .mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.theme-alt .mat-simple-snackbar-action {\n  color: #0288d1; }\n.theme-alt .tc-primary {\n  color: #ef6c00; }\n.theme-alt .tc-accent,\n.theme-alt a {\n  color: #0288d1; }\n.theme-alt a:hover {\n  color: #02679e; }\n.theme-alt .tc-warn {\n  color: #e53935; }\n.theme-dark .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.1); }\n.theme-dark .mat-option {\n  color: white; }\n.theme-dark .mat-option:hover:not(.mat-option-disabled), .theme-dark .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(255, 255, 255, 0.04); }\n.theme-dark .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(255, 255, 255, 0.04); }\n.theme-dark .mat-option.mat-active {\n    background: rgba(255, 255, 255, 0.04);\n    color: white; }\n.theme-dark .mat-option.mat-option-disabled {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #263238; }\n.theme-dark .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ff3d00; }\n.theme-dark .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #e53935; }\n.theme-dark .mat-optgroup-label {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-pseudo-checkbox {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-pseudo-checkbox::after {\n    color: #303030; }\n.theme-dark .mat-pseudo-checkbox-checked,\n.theme-dark .mat-pseudo-checkbox-indeterminate,\n.theme-dark .mat-accent .mat-pseudo-checkbox-checked,\n.theme-dark .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ff3d00; }\n.theme-dark .mat-primary .mat-pseudo-checkbox-checked,\n.theme-dark .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #263238; }\n.theme-dark .mat-warn .mat-pseudo-checkbox-checked,\n.theme-dark .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #e53935; }\n.theme-dark .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.theme-dark .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #686868; }\n.theme-dark .mat-app-background, .theme-dark.mat-app-background {\n  background-color: #303030;\n  color: white; }\n.mat-theme-loaded-marker {\n  display: none; }\n.theme-dark .mat-autocomplete-panel {\n  background: #424242;\n  color: white; }\n.theme-dark .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: #424242; }\n.theme-dark .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: white; }\n.theme-dark .mat-badge-content {\n  color: white;\n  background: #263238; }\n.theme-dark .mat-badge-accent .mat-badge-content {\n  background: #ff3d00;\n  color: white; }\n.theme-dark .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #e53935; }\n.theme-dark .mat-badge {\n  position: relative; }\n.theme-dark .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.theme-dark .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.theme-dark .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.theme-dark .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-dark .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-dark .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.theme-dark .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.theme-dark .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .theme-dark .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.theme-dark .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .theme-dark .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.theme-dark .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .theme-dark .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.theme-dark .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .theme-dark .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.theme-dark .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-dark .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-dark .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.theme-dark .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.theme-dark .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .theme-dark .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.theme-dark .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .theme-dark .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.theme-dark .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .theme-dark .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.theme-dark .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .theme-dark .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.theme-dark .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-dark .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-dark .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.theme-dark .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.theme-dark .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .theme-dark .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.theme-dark .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .theme-dark .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.theme-dark .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .theme-dark .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.theme-dark .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .theme-dark .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.theme-dark .mat-bottom-sheet-container {\n  background: #424242;\n  color: white; }\n.theme-dark .mat-button, .theme-dark .mat-icon-button, .theme-dark .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.theme-dark .mat-button.mat-primary, .theme-dark .mat-icon-button.mat-primary, .theme-dark .mat-stroked-button.mat-primary {\n    color: #263238; }\n.theme-dark .mat-button.mat-accent, .theme-dark .mat-icon-button.mat-accent, .theme-dark .mat-stroked-button.mat-accent {\n    color: #ff3d00; }\n.theme-dark .mat-button.mat-warn, .theme-dark .mat-icon-button.mat-warn, .theme-dark .mat-stroked-button.mat-warn {\n    color: #e53935; }\n.theme-dark .mat-button.mat-primary[disabled], .theme-dark .mat-button.mat-accent[disabled], .theme-dark .mat-button.mat-warn[disabled], .theme-dark .mat-button[disabled][disabled], .theme-dark .mat-icon-button.mat-primary[disabled], .theme-dark .mat-icon-button.mat-accent[disabled], .theme-dark .mat-icon-button.mat-warn[disabled], .theme-dark .mat-icon-button[disabled][disabled], .theme-dark .mat-stroked-button.mat-primary[disabled], .theme-dark .mat-stroked-button.mat-accent[disabled], .theme-dark .mat-stroked-button.mat-warn[disabled], .theme-dark .mat-stroked-button[disabled][disabled] {\n    color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-button.mat-primary .mat-button-focus-overlay, .theme-dark .mat-icon-button.mat-primary .mat-button-focus-overlay, .theme-dark .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(38, 50, 56, 0.12); }\n.theme-dark .mat-button.mat-accent .mat-button-focus-overlay, .theme-dark .mat-icon-button.mat-accent .mat-button-focus-overlay, .theme-dark .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(255, 61, 0, 0.12); }\n.theme-dark .mat-button.mat-warn .mat-button-focus-overlay, .theme-dark .mat-icon-button.mat-warn .mat-button-focus-overlay, .theme-dark .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(229, 57, 53, 0.12); }\n.theme-dark .mat-button[disabled] .mat-button-focus-overlay, .theme-dark .mat-icon-button[disabled] .mat-button-focus-overlay, .theme-dark .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.theme-dark .mat-button.mat-primary .mat-ripple-element, .theme-dark .mat-icon-button.mat-primary .mat-ripple-element, .theme-dark .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(38, 50, 56, 0.1); }\n.theme-dark .mat-button.mat-accent .mat-ripple-element, .theme-dark .mat-icon-button.mat-accent .mat-ripple-element, .theme-dark .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 61, 0, 0.1); }\n.theme-dark .mat-button.mat-warn .mat-ripple-element, .theme-dark .mat-icon-button.mat-warn .mat-ripple-element, .theme-dark .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(229, 57, 53, 0.1); }\n.theme-dark .mat-flat-button, .theme-dark .mat-raised-button, .theme-dark .mat-fab, .theme-dark .mat-mini-fab {\n  color: white;\n  background-color: #424242; }\n.theme-dark .mat-flat-button.mat-primary, .theme-dark .mat-raised-button.mat-primary, .theme-dark .mat-fab.mat-primary, .theme-dark .mat-mini-fab.mat-primary {\n    color: white; }\n.theme-dark .mat-flat-button.mat-accent, .theme-dark .mat-raised-button.mat-accent, .theme-dark .mat-fab.mat-accent, .theme-dark .mat-mini-fab.mat-accent {\n    color: white; }\n.theme-dark .mat-flat-button.mat-warn, .theme-dark .mat-raised-button.mat-warn, .theme-dark .mat-fab.mat-warn, .theme-dark .mat-mini-fab.mat-warn {\n    color: white; }\n.theme-dark .mat-flat-button.mat-primary[disabled], .theme-dark .mat-flat-button.mat-accent[disabled], .theme-dark .mat-flat-button.mat-warn[disabled], .theme-dark .mat-flat-button[disabled][disabled], .theme-dark .mat-raised-button.mat-primary[disabled], .theme-dark .mat-raised-button.mat-accent[disabled], .theme-dark .mat-raised-button.mat-warn[disabled], .theme-dark .mat-raised-button[disabled][disabled], .theme-dark .mat-fab.mat-primary[disabled], .theme-dark .mat-fab.mat-accent[disabled], .theme-dark .mat-fab.mat-warn[disabled], .theme-dark .mat-fab[disabled][disabled], .theme-dark .mat-mini-fab.mat-primary[disabled], .theme-dark .mat-mini-fab.mat-accent[disabled], .theme-dark .mat-mini-fab.mat-warn[disabled], .theme-dark .mat-mini-fab[disabled][disabled] {\n    color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-flat-button.mat-primary, .theme-dark .mat-raised-button.mat-primary, .theme-dark .mat-fab.mat-primary, .theme-dark .mat-mini-fab.mat-primary {\n    background-color: #263238; }\n.theme-dark .mat-flat-button.mat-accent, .theme-dark .mat-raised-button.mat-accent, .theme-dark .mat-fab.mat-accent, .theme-dark .mat-mini-fab.mat-accent {\n    background-color: #ff3d00; }\n.theme-dark .mat-flat-button.mat-warn, .theme-dark .mat-raised-button.mat-warn, .theme-dark .mat-fab.mat-warn, .theme-dark .mat-mini-fab.mat-warn {\n    background-color: #e53935; }\n.theme-dark .mat-flat-button.mat-primary[disabled], .theme-dark .mat-flat-button.mat-accent[disabled], .theme-dark .mat-flat-button.mat-warn[disabled], .theme-dark .mat-flat-button[disabled][disabled], .theme-dark .mat-raised-button.mat-primary[disabled], .theme-dark .mat-raised-button.mat-accent[disabled], .theme-dark .mat-raised-button.mat-warn[disabled], .theme-dark .mat-raised-button[disabled][disabled], .theme-dark .mat-fab.mat-primary[disabled], .theme-dark .mat-fab.mat-accent[disabled], .theme-dark .mat-fab.mat-warn[disabled], .theme-dark .mat-fab[disabled][disabled], .theme-dark .mat-mini-fab.mat-primary[disabled], .theme-dark .mat-mini-fab.mat-accent[disabled], .theme-dark .mat-mini-fab.mat-warn[disabled], .theme-dark .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-flat-button.mat-primary .mat-ripple-element, .theme-dark .mat-raised-button.mat-primary .mat-ripple-element, .theme-dark .mat-fab.mat-primary .mat-ripple-element, .theme-dark .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-dark .mat-flat-button.mat-accent .mat-ripple-element, .theme-dark .mat-raised-button.mat-accent .mat-ripple-element, .theme-dark .mat-fab.mat-accent .mat-ripple-element, .theme-dark .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-dark .mat-flat-button.mat-warn .mat-ripple-element, .theme-dark .mat-raised-button.mat-warn .mat-ripple-element, .theme-dark .mat-fab.mat-warn .mat-ripple-element, .theme-dark .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-dark .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(38, 50, 56, 0.2); }\n.theme-dark .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(255, 61, 0, 0.2); }\n.theme-dark .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.2); }\n.theme-dark .mat-button-toggle {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-button-toggle-checked {\n  background-color: #212121;\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-button-toggle-disabled {\n  background-color: black;\n  color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #424242; }\n.theme-dark .mat-card {\n  background: #424242;\n  color: white; }\n.theme-dark .mat-card-subtitle {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-checkbox-frame {\n  border-color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-checkbox-checkmark {\n  fill: #303030; }\n.theme-dark .mat-checkbox-checkmark-path {\n  stroke: #303030 !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .theme-dark .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.theme-dark .mat-checkbox-mixedmark {\n  background-color: #303030; }\n.theme-dark .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .theme-dark .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #263238; }\n.theme-dark .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .theme-dark .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ff3d00; }\n.theme-dark .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .theme-dark .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #e53935; }\n.theme-dark .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .theme-dark .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #686868; }\n.theme-dark .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #686868; }\n.theme-dark .mat-checkbox-disabled .mat-checkbox-label {\n  color: #686868; }\n@media screen and (-ms-high-contrast: active) {\n  .theme-dark .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .theme-dark .mat-checkbox-background {\n    background: none; } }\n.theme-dark .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(38, 50, 56, 0.26); }\n.theme-dark .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(255, 61, 0, 0.26); }\n.theme-dark .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.theme-dark .mat-chip.mat-standard-chip {\n  background-color: #616161;\n  color: white; }\n.theme-dark .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-dark .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #263238;\n  color: white; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #e53935;\n  color: white; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ff3d00;\n  color: white; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-dark .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-dark .mat-table {\n  background: #424242; }\n.theme-dark .mat-table thead, .theme-dark .mat-table tbody, .theme-dark .mat-table tfoot,\n.theme-dark mat-header-row, .theme-dark mat-row, .theme-dark mat-footer-row,\n.theme-dark [mat-header-row], .theme-dark [mat-row], .theme-dark [mat-footer-row],\n.theme-dark .mat-table-sticky {\n  background: inherit; }\n.theme-dark mat-row, .theme-dark mat-header-row, .theme-dark mat-footer-row,\n.theme-dark th.mat-header-cell, .theme-dark td.mat-cell, .theme-dark td.mat-footer-cell {\n  border-bottom-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-header-cell {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-cell, .theme-dark .mat-footer-cell {\n  color: white; }\n.theme-dark .mat-calendar-arrow {\n  border-top-color: white; }\n.theme-dark .mat-datepicker-toggle,\n.theme-dark .mat-datepicker-content .mat-calendar-next-button,\n.theme-dark .mat-datepicker-content .mat-calendar-previous-button {\n  color: white; }\n.theme-dark .mat-calendar-table-header {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-calendar-table-header-divider::after {\n  background: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-calendar-body-label {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-calendar-body-cell-content {\n  color: white;\n  border-color: transparent; }\n.theme-dark .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.theme-dark .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.theme-dark .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(255, 255, 255, 0.04); }\n.theme-dark .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-calendar-body-selected {\n  background-color: #263238;\n  color: white; }\n.theme-dark .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(38, 50, 56, 0.4); }\n.theme-dark .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.theme-dark .mat-datepicker-content {\n  background-color: #424242;\n  color: white; }\n.theme-dark .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #ff3d00;\n    color: white; }\n.theme-dark .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(255, 61, 0, 0.4); }\n.theme-dark .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.theme-dark .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #e53935;\n    color: white; }\n.theme-dark .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(229, 57, 53, 0.4); }\n.theme-dark .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.theme-dark .mat-datepicker-toggle-active {\n  color: #263238; }\n.theme-dark .mat-datepicker-toggle-active.mat-accent {\n    color: #ff3d00; }\n.theme-dark .mat-datepicker-toggle-active.mat-warn {\n    color: #e53935; }\n.theme-dark .mat-dialog-container {\n  background: #424242;\n  color: white; }\n.theme-dark .mat-divider {\n  border-top-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-divider-vertical {\n  border-right-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-expansion-panel {\n  background: #424242;\n  color: white; }\n.theme-dark .mat-action-row {\n  border-top-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .theme-dark .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .theme-dark .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(255, 255, 255, 0.04); }\n@media (hover: none) {\n  .theme-dark .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: #424242; } }\n.theme-dark .mat-expansion-panel-header-title {\n  color: white; }\n.theme-dark .mat-expansion-panel-header-description,\n.theme-dark .mat-expansion-indicator::after {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .theme-dark .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.theme-dark .mat-form-field-label {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-hint {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-form-field.mat-focused .mat-form-field-label {\n  color: #263238; }\n.theme-dark .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #ff3d00; }\n.theme-dark .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #e53935; }\n.theme-dark .mat-focused .mat-form-field-required-marker {\n  color: #ff3d00; }\n.theme-dark .mat-form-field-ripple {\n  background-color: white; }\n.theme-dark .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #263238; }\n.theme-dark .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #ff3d00; }\n.theme-dark .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #e53935; }\n.theme-dark .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #e53935; }\n.theme-dark .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .theme-dark .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #e53935; }\n.theme-dark .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.theme-dark .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #e53935; }\n.theme-dark .mat-error {\n  color: #e53935; }\n.theme-dark .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.theme-dark .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.theme-dark .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(255, 255, 255, 0.1); }\n.theme-dark .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(255, 255, 255, 0.05); }\n.theme-dark .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.theme-dark .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: white; }\n.theme-dark .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #263238; }\n.theme-dark .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ff3d00; }\n.theme-dark .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #e53935; }\n.theme-dark .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #e53935; }\n.theme-dark .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(255, 255, 255, 0.15); }\n.theme-dark .mat-icon.mat-primary {\n  color: #263238; }\n.theme-dark .mat-icon.mat-accent {\n  color: #ff3d00; }\n.theme-dark .mat-icon.mat-warn {\n  color: #e53935; }\n.theme-dark .mat-input-element:disabled {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element {\n  caret-color: #263238; }\n.theme-dark .mat-input-element::-webkit-input-placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element:-ms-input-placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element::-ms-input-placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element::placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element::-moz-placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element::-webkit-input-placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-input-element:-ms-input-placeholder {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-accent .mat-input-element {\n  caret-color: #ff3d00; }\n.theme-dark .mat-warn .mat-input-element,\n.theme-dark .mat-form-field-invalid .mat-input-element {\n  caret-color: #e53935; }\n.theme-dark .mat-list .mat-list-item, .theme-dark .mat-nav-list .mat-list-item, .theme-dark .mat-selection-list .mat-list-item {\n  color: white; }\n.theme-dark .mat-list .mat-list-option, .theme-dark .mat-nav-list .mat-list-option, .theme-dark .mat-selection-list .mat-list-option {\n  color: white; }\n.theme-dark .mat-list .mat-subheader, .theme-dark .mat-nav-list .mat-subheader, .theme-dark .mat-selection-list .mat-subheader {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-list-item-disabled {\n  background-color: black; }\n.theme-dark .mat-list-option:hover, .theme-dark .mat-list-option.mat-list-item-focus,\n.theme-dark .mat-nav-list .mat-list-item:hover,\n.theme-dark .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(255, 255, 255, 0.04); }\n.theme-dark .mat-menu-panel {\n  background: #424242; }\n.theme-dark .mat-menu-item {\n  background: transparent;\n  color: white; }\n.theme-dark .mat-menu-item[disabled], .theme-dark .mat-menu-item[disabled]::after {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-menu-item .mat-icon:not([color]),\n.theme-dark .mat-menu-item-submenu-trigger::after {\n  color: white; }\n.theme-dark .mat-menu-item:hover:not([disabled]),\n.theme-dark .mat-menu-item.cdk-program-focused:not([disabled]),\n.theme-dark .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.theme-dark .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(255, 255, 255, 0.04); }\n.theme-dark .mat-paginator {\n  background: #424242; }\n.theme-dark .mat-paginator,\n.theme-dark .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-paginator-decrement,\n.theme-dark .mat-paginator-increment {\n  border-top: 2px solid white;\n  border-right: 2px solid white; }\n.theme-dark .mat-paginator-first,\n.theme-dark .mat-paginator-last {\n  border-top: 2px solid white; }\n.theme-dark .mat-icon-button[disabled] .mat-paginator-decrement,\n.theme-dark .mat-icon-button[disabled] .mat-paginator-increment,\n.theme-dark .mat-icon-button[disabled] .mat-paginator-first,\n.theme-dark .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-progress-bar-background {\n  fill: #cfd8dc; }\n.theme-dark .mat-progress-bar-buffer {\n  background-color: #cfd8dc; }\n.theme-dark .mat-progress-bar-fill::after {\n  background-color: #263238; }\n.theme-dark .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #ffccbc; }\n.theme-dark .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #ffccbc; }\n.theme-dark .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ff3d00; }\n.theme-dark .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.theme-dark .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.theme-dark .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #e53935; }\n.theme-dark .mat-progress-spinner circle, .theme-dark .mat-spinner circle {\n  stroke: #263238; }\n.theme-dark .mat-progress-spinner.mat-accent circle, .theme-dark .mat-spinner.mat-accent circle {\n  stroke: #ff3d00; }\n.theme-dark .mat-progress-spinner.mat-warn circle, .theme-dark .mat-spinner.mat-warn circle {\n  stroke: #e53935; }\n.theme-dark .mat-radio-outer-circle {\n  border-color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #263238; }\n.theme-dark .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #263238; }\n.theme-dark .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(38, 50, 56, 0.26); }\n.theme-dark .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ff3d00; }\n.theme-dark .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #ff3d00; }\n.theme-dark .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(255, 61, 0, 0.26); }\n.theme-dark .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #e53935; }\n.theme-dark .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #e53935; }\n.theme-dark .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.theme-dark .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.theme-dark .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.theme-dark .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-select-content, .theme-dark .mat-select-panel-done-animating {\n  background: #424242; }\n.theme-dark .mat-select-value {\n  color: white; }\n.theme-dark .mat-select-placeholder {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-select-disabled .mat-select-value {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-select-arrow {\n  color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #263238; }\n.theme-dark .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ff3d00; }\n.theme-dark .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #e53935; }\n.theme-dark .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #e53935; }\n.theme-dark .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-drawer-container {\n  background-color: #303030;\n  color: white; }\n.theme-dark .mat-drawer {\n  background-color: #424242;\n  color: white; }\n.theme-dark .mat-drawer.mat-drawer-push {\n    background-color: #424242; }\n.theme-dark .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(189, 189, 189, 0.6); }\n.theme-dark .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ffab91; }\n.theme-dark .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 171, 145, 0.5); }\n.theme-dark .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 171, 145, 0.12); }\n.theme-dark .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #b0bec5; }\n.theme-dark .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(176, 190, 197, 0.5); }\n.theme-dark .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(176, 190, 197, 0.12); }\n.theme-dark .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ef9a9a; }\n.theme-dark .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(239, 154, 154, 0.5); }\n.theme-dark .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(239, 154, 154, 0.12); }\n.theme-dark .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #424242; }\n.theme-dark .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.theme-dark .mat-slide-toggle-bar {\n  background-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-slider-track-background {\n  background-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-primary .mat-slider-track-fill,\n.theme-dark .mat-primary .mat-slider-thumb,\n.theme-dark .mat-primary .mat-slider-thumb-label {\n  background-color: #263238; }\n.theme-dark .mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.theme-dark .mat-accent .mat-slider-track-fill,\n.theme-dark .mat-accent .mat-slider-thumb,\n.theme-dark .mat-accent .mat-slider-thumb-label {\n  background-color: #ff3d00; }\n.theme-dark .mat-accent .mat-slider-thumb-label-text {\n  color: white; }\n.theme-dark .mat-warn .mat-slider-track-fill,\n.theme-dark .mat-warn .mat-slider-thumb,\n.theme-dark .mat-warn .mat-slider-thumb-label {\n  background-color: #e53935; }\n.theme-dark .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.theme-dark .mat-slider-focus-ring {\n  background-color: rgba(255, 61, 0, 0.2); }\n.theme-dark .mat-slider:hover .mat-slider-track-background,\n.theme-dark .cdk-focused .mat-slider-track-background {\n  background-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-slider-disabled .mat-slider-track-background,\n.theme-dark .mat-slider-disabled .mat-slider-track-fill,\n.theme-dark .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.theme-dark .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: white; }\n.theme-dark .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.theme-dark .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(255, 255, 255, 0.3);\n  background-color: transparent; }\n.theme-dark .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .theme-dark .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .theme-dark .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(255, 255, 255, 0.3); }\n.theme-dark .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(255, 255, 255, 0.7); }\n.theme-dark .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7) 2px, transparent 0, transparent); }\n.theme-dark .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7) 2px, transparent 0, transparent); }\n.theme-dark .mat-step-header.cdk-keyboard-focused, .theme-dark .mat-step-header.cdk-program-focused, .theme-dark .mat-step-header:hover {\n  background-color: rgba(255, 255, 255, 0.04); }\n.theme-dark .mat-step-header .mat-step-label,\n.theme-dark .mat-step-header .mat-step-optional {\n  color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-step-header .mat-step-icon {\n  background-color: #263238;\n  color: white; }\n.theme-dark .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(255, 255, 255, 0.5);\n  color: white; }\n.theme-dark .mat-step-header .mat-step-label.mat-step-label-active {\n  color: white; }\n.theme-dark .mat-stepper-horizontal, .theme-dark .mat-stepper-vertical {\n  background-color: #424242; }\n.theme-dark .mat-stepper-vertical-line::before {\n  border-left-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-stepper-horizontal-line {\n  border-top-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-sort-header-arrow {\n  color: #c6c6c6; }\n.theme-dark .mat-tab-nav-bar,\n.theme-dark .mat-tab-header {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.theme-dark .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(255, 255, 255, 0.12);\n  border-bottom: none; }\n.theme-dark .mat-tab-label, .theme-dark .mat-tab-link {\n  color: white; }\n.theme-dark .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-dark .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.5); }\n.theme-dark .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.theme-dark .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.theme-dark .mat-tab-group.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-group.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-dark .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(207, 216, 220, 0.3); }\n.theme-dark .mat-tab-group.mat-primary .mat-ink-bar, .theme-dark .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #263238; }\n.theme-dark .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .theme-dark .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.theme-dark .mat-tab-group.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-group.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-dark .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 204, 188, 0.3); }\n.theme-dark .mat-tab-group.mat-accent .mat-ink-bar, .theme-dark .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ff3d00; }\n.theme-dark .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .theme-dark .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: white; }\n.theme-dark .mat-tab-group.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-group.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-dark .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.theme-dark .mat-tab-group.mat-warn .mat-ink-bar, .theme-dark .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #e53935; }\n.theme-dark .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .theme-dark .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(207, 216, 220, 0.3); }\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-header, .theme-dark .mat-tab-group.mat-background-primary .mat-tab-links, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #263238; }\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-label, .theme-dark .mat-tab-group.mat-background-primary .mat-tab-link, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-dark .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-dark .mat-tab-group.mat-background-primary .mat-ripple-element, .theme-dark .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 204, 188, 0.3); }\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-header, .theme-dark .mat-tab-group.mat-background-accent .mat-tab-links, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #ff3d00; }\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-label, .theme-dark .mat-tab-group.mat-background-accent .mat-tab-link, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: white; }\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-dark .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-dark .mat-tab-group.mat-background-accent .mat-ripple-element, .theme-dark .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-header, .theme-dark .mat-tab-group.mat-background-warn .mat-tab-links, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #e53935; }\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-label, .theme-dark .mat-tab-group.mat-background-warn .mat-tab-link, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-dark .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-dark .mat-tab-group.mat-background-warn .mat-ripple-element, .theme-dark .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-dark .mat-toolbar {\n  background: #212121;\n  color: white; }\n.theme-dark .mat-toolbar.mat-primary {\n    background: #263238;\n    color: white; }\n.theme-dark .mat-toolbar.mat-accent {\n    background: #ff3d00;\n    color: white; }\n.theme-dark .mat-toolbar.mat-warn {\n    background: #e53935;\n    color: white; }\n.theme-dark .mat-toolbar .mat-form-field-underline,\n  .theme-dark .mat-toolbar .mat-form-field-ripple,\n  .theme-dark .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.theme-dark .mat-toolbar .mat-form-field-label,\n  .theme-dark .mat-toolbar .mat-focused .mat-form-field-label,\n  .theme-dark .mat-toolbar .mat-select-value,\n  .theme-dark .mat-toolbar .mat-select-arrow,\n  .theme-dark .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.theme-dark .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.theme-dark .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.theme-dark .mat-tree {\n  background: #424242; }\n.theme-dark .mat-tree-node {\n  color: white; }\n.theme-dark .mat-snack-bar-container {\n  background: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-dark .mat-simple-snackbar-action {\n  color: inherit; }\n.theme-dark .tc-primary {\n  color: #263238; }\n.theme-dark .tc-accent,\n.theme-dark a {\n  color: #ff3d00; }\n.theme-dark a:hover {\n  color: #cc3100; }\n.theme-dark .tc-warn {\n  color: #e53935; }\n.theme-docs .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.theme-docs .mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-option:hover:not(.mat-option-disabled), .theme-docs .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #512da8; }\n.theme-docs .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #00e5ff; }\n.theme-docs .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #e53935; }\n.theme-docs .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.theme-docs .mat-pseudo-checkbox-checked,\n.theme-docs .mat-pseudo-checkbox-indeterminate,\n.theme-docs .mat-accent .mat-pseudo-checkbox-checked,\n.theme-docs .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #00e5ff; }\n.theme-docs .mat-primary .mat-pseudo-checkbox-checked,\n.theme-docs .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #512da8; }\n.theme-docs .mat-warn .mat-pseudo-checkbox-checked,\n.theme-docs .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #e53935; }\n.theme-docs .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.theme-docs .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.theme-docs .mat-app-background, .theme-docs.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.theme-docs .mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.theme-docs .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-badge-content {\n  color: white;\n  background: #512da8; }\n.theme-docs .mat-badge-accent .mat-badge-content {\n  background: #00e5ff;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #e53935; }\n.theme-docs .mat-badge {\n  position: relative; }\n.theme-docs .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.theme-docs .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.theme-docs .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.theme-docs .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-docs .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-docs .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.theme-docs .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.theme-docs .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .theme-docs .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.theme-docs .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .theme-docs .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.theme-docs .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .theme-docs .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.theme-docs .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .theme-docs .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.theme-docs .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-docs .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-docs .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.theme-docs .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.theme-docs .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .theme-docs .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.theme-docs .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .theme-docs .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.theme-docs .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .theme-docs .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.theme-docs .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .theme-docs .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.theme-docs .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .theme-docs .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.theme-docs .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.theme-docs .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.theme-docs .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .theme-docs .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.theme-docs .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .theme-docs .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.theme-docs .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .theme-docs .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.theme-docs .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .theme-docs .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.theme-docs .mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-button, .theme-docs .mat-icon-button, .theme-docs .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.theme-docs .mat-button.mat-primary, .theme-docs .mat-icon-button.mat-primary, .theme-docs .mat-stroked-button.mat-primary {\n    color: #512da8; }\n.theme-docs .mat-button.mat-accent, .theme-docs .mat-icon-button.mat-accent, .theme-docs .mat-stroked-button.mat-accent {\n    color: #00e5ff; }\n.theme-docs .mat-button.mat-warn, .theme-docs .mat-icon-button.mat-warn, .theme-docs .mat-stroked-button.mat-warn {\n    color: #e53935; }\n.theme-docs .mat-button.mat-primary[disabled], .theme-docs .mat-button.mat-accent[disabled], .theme-docs .mat-button.mat-warn[disabled], .theme-docs .mat-button[disabled][disabled], .theme-docs .mat-icon-button.mat-primary[disabled], .theme-docs .mat-icon-button.mat-accent[disabled], .theme-docs .mat-icon-button.mat-warn[disabled], .theme-docs .mat-icon-button[disabled][disabled], .theme-docs .mat-stroked-button.mat-primary[disabled], .theme-docs .mat-stroked-button.mat-accent[disabled], .theme-docs .mat-stroked-button.mat-warn[disabled], .theme-docs .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-button.mat-primary .mat-button-focus-overlay, .theme-docs .mat-icon-button.mat-primary .mat-button-focus-overlay, .theme-docs .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(81, 45, 168, 0.12); }\n.theme-docs .mat-button.mat-accent .mat-button-focus-overlay, .theme-docs .mat-icon-button.mat-accent .mat-button-focus-overlay, .theme-docs .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(0, 229, 255, 0.12); }\n.theme-docs .mat-button.mat-warn .mat-button-focus-overlay, .theme-docs .mat-icon-button.mat-warn .mat-button-focus-overlay, .theme-docs .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(229, 57, 53, 0.12); }\n.theme-docs .mat-button[disabled] .mat-button-focus-overlay, .theme-docs .mat-icon-button[disabled] .mat-button-focus-overlay, .theme-docs .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.theme-docs .mat-button.mat-primary .mat-ripple-element, .theme-docs .mat-icon-button.mat-primary .mat-ripple-element, .theme-docs .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(81, 45, 168, 0.1); }\n.theme-docs .mat-button.mat-accent .mat-ripple-element, .theme-docs .mat-icon-button.mat-accent .mat-ripple-element, .theme-docs .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(0, 229, 255, 0.1); }\n.theme-docs .mat-button.mat-warn .mat-ripple-element, .theme-docs .mat-icon-button.mat-warn .mat-ripple-element, .theme-docs .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(229, 57, 53, 0.1); }\n.theme-docs .mat-flat-button, .theme-docs .mat-raised-button, .theme-docs .mat-fab, .theme-docs .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.theme-docs .mat-flat-button.mat-primary, .theme-docs .mat-raised-button.mat-primary, .theme-docs .mat-fab.mat-primary, .theme-docs .mat-mini-fab.mat-primary {\n    color: white; }\n.theme-docs .mat-flat-button.mat-accent, .theme-docs .mat-raised-button.mat-accent, .theme-docs .mat-fab.mat-accent, .theme-docs .mat-mini-fab.mat-accent {\n    color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-flat-button.mat-warn, .theme-docs .mat-raised-button.mat-warn, .theme-docs .mat-fab.mat-warn, .theme-docs .mat-mini-fab.mat-warn {\n    color: white; }\n.theme-docs .mat-flat-button.mat-primary[disabled], .theme-docs .mat-flat-button.mat-accent[disabled], .theme-docs .mat-flat-button.mat-warn[disabled], .theme-docs .mat-flat-button[disabled][disabled], .theme-docs .mat-raised-button.mat-primary[disabled], .theme-docs .mat-raised-button.mat-accent[disabled], .theme-docs .mat-raised-button.mat-warn[disabled], .theme-docs .mat-raised-button[disabled][disabled], .theme-docs .mat-fab.mat-primary[disabled], .theme-docs .mat-fab.mat-accent[disabled], .theme-docs .mat-fab.mat-warn[disabled], .theme-docs .mat-fab[disabled][disabled], .theme-docs .mat-mini-fab.mat-primary[disabled], .theme-docs .mat-mini-fab.mat-accent[disabled], .theme-docs .mat-mini-fab.mat-warn[disabled], .theme-docs .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-flat-button.mat-primary, .theme-docs .mat-raised-button.mat-primary, .theme-docs .mat-fab.mat-primary, .theme-docs .mat-mini-fab.mat-primary {\n    background-color: #512da8; }\n.theme-docs .mat-flat-button.mat-accent, .theme-docs .mat-raised-button.mat-accent, .theme-docs .mat-fab.mat-accent, .theme-docs .mat-mini-fab.mat-accent {\n    background-color: #00e5ff; }\n.theme-docs .mat-flat-button.mat-warn, .theme-docs .mat-raised-button.mat-warn, .theme-docs .mat-fab.mat-warn, .theme-docs .mat-mini-fab.mat-warn {\n    background-color: #e53935; }\n.theme-docs .mat-flat-button.mat-primary[disabled], .theme-docs .mat-flat-button.mat-accent[disabled], .theme-docs .mat-flat-button.mat-warn[disabled], .theme-docs .mat-flat-button[disabled][disabled], .theme-docs .mat-raised-button.mat-primary[disabled], .theme-docs .mat-raised-button.mat-accent[disabled], .theme-docs .mat-raised-button.mat-warn[disabled], .theme-docs .mat-raised-button[disabled][disabled], .theme-docs .mat-fab.mat-primary[disabled], .theme-docs .mat-fab.mat-accent[disabled], .theme-docs .mat-fab.mat-warn[disabled], .theme-docs .mat-fab[disabled][disabled], .theme-docs .mat-mini-fab.mat-primary[disabled], .theme-docs .mat-mini-fab.mat-accent[disabled], .theme-docs .mat-mini-fab.mat-warn[disabled], .theme-docs .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-flat-button.mat-primary .mat-ripple-element, .theme-docs .mat-raised-button.mat-primary .mat-ripple-element, .theme-docs .mat-fab.mat-primary .mat-ripple-element, .theme-docs .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-docs .mat-flat-button.mat-accent .mat-ripple-element, .theme-docs .mat-raised-button.mat-accent .mat-ripple-element, .theme-docs .mat-fab.mat-accent .mat-ripple-element, .theme-docs .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.theme-docs .mat-flat-button.mat-warn .mat-ripple-element, .theme-docs .mat-raised-button.mat-warn .mat-ripple-element, .theme-docs .mat-fab.mat-warn .mat-ripple-element, .theme-docs .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.theme-docs .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(81, 45, 168, 0.2); }\n.theme-docs .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(0, 229, 255, 0.2); }\n.theme-docs .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.2); }\n.theme-docs .mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.theme-docs .mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-checkbox-checkmark {\n  fill: #fafafa; }\n.theme-docs .mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .theme-docs .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.theme-docs .mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.theme-docs .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .theme-docs .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #512da8; }\n.theme-docs .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .theme-docs .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #00e5ff; }\n.theme-docs .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .theme-docs .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #e53935; }\n.theme-docs .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .theme-docs .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.theme-docs .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.theme-docs .mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .theme-docs .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .theme-docs .mat-checkbox-background {\n    background: none; } }\n.theme-docs .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(81, 45, 168, 0.26); }\n.theme-docs .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(0, 229, 255, 0.26); }\n.theme-docs .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.theme-docs .mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.theme-docs .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #512da8;\n  color: white; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #e53935;\n  color: white; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #00e5ff;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.theme-docs .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.theme-docs .mat-table {\n  background: white; }\n.theme-docs .mat-table thead, .theme-docs .mat-table tbody, .theme-docs .mat-table tfoot,\n.theme-docs mat-header-row, .theme-docs mat-row, .theme-docs mat-footer-row,\n.theme-docs [mat-header-row], .theme-docs [mat-row], .theme-docs [mat-footer-row],\n.theme-docs .mat-table-sticky {\n  background: inherit; }\n.theme-docs mat-row, .theme-docs mat-header-row, .theme-docs mat-footer-row,\n.theme-docs th.mat-header-cell, .theme-docs td.mat-cell, .theme-docs td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-cell, .theme-docs .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-datepicker-toggle,\n.theme-docs .mat-datepicker-content .mat-calendar-next-button,\n.theme-docs .mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.theme-docs .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.theme-docs .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.theme-docs .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.theme-docs .mat-calendar-body-selected {\n  background-color: #512da8;\n  color: white; }\n.theme-docs .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(81, 45, 168, 0.4); }\n.theme-docs .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.theme-docs .mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #00e5ff;\n    color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(0, 229, 255, 0.4); }\n.theme-docs .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #e53935;\n    color: white; }\n.theme-docs .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(229, 57, 53, 0.4); }\n.theme-docs .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.theme-docs .mat-datepicker-toggle-active {\n  color: #512da8; }\n.theme-docs .mat-datepicker-toggle-active.mat-accent {\n    color: #00e5ff; }\n.theme-docs .mat-datepicker-toggle-active.mat-warn {\n    color: #e53935; }\n.theme-docs .mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .theme-docs .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .theme-docs .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .theme-docs .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.theme-docs .mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-expansion-panel-header-description,\n.theme-docs .mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .theme-docs .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.theme-docs .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.theme-docs .mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.theme-docs .mat-form-field.mat-focused .mat-form-field-label {\n  color: #512da8; }\n.theme-docs .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #00e5ff; }\n.theme-docs .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #e53935; }\n.theme-docs .mat-focused .mat-form-field-required-marker {\n  color: #00e5ff; }\n.theme-docs .mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #512da8; }\n.theme-docs .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #00e5ff; }\n.theme-docs .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #e53935; }\n.theme-docs .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #e53935; }\n.theme-docs .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .theme-docs .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #e53935; }\n.theme-docs .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.theme-docs .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #e53935; }\n.theme-docs .mat-error {\n  color: #e53935; }\n.theme-docs .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.theme-docs .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.theme-docs .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.theme-docs .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.theme-docs .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #512da8; }\n.theme-docs .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #00e5ff; }\n.theme-docs .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #e53935; }\n.theme-docs .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #e53935; }\n.theme-docs .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.theme-docs .mat-icon.mat-primary {\n  color: #512da8; }\n.theme-docs .mat-icon.mat-accent {\n  color: #00e5ff; }\n.theme-docs .mat-icon.mat-warn {\n  color: #e53935; }\n.theme-docs .mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-input-element {\n  caret-color: #512da8; }\n.theme-docs .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-accent .mat-input-element {\n  caret-color: #00e5ff; }\n.theme-docs .mat-warn .mat-input-element,\n.theme-docs .mat-form-field-invalid .mat-input-element {\n  caret-color: #e53935; }\n.theme-docs .mat-list .mat-list-item, .theme-docs .mat-nav-list .mat-list-item, .theme-docs .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-list .mat-list-option, .theme-docs .mat-nav-list .mat-list-option, .theme-docs .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-list .mat-subheader, .theme-docs .mat-nav-list .mat-subheader, .theme-docs .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-list-item-disabled {\n  background-color: #eeeeee; }\n.theme-docs .mat-list-option:hover, .theme-docs .mat-list-option.mat-list-item-focus,\n.theme-docs .mat-nav-list .mat-list-item:hover,\n.theme-docs .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-menu-panel {\n  background: white; }\n.theme-docs .mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-menu-item[disabled], .theme-docs .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-menu-item .mat-icon:not([color]),\n.theme-docs .mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-menu-item:hover:not([disabled]),\n.theme-docs .mat-menu-item.cdk-program-focused:not([disabled]),\n.theme-docs .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.theme-docs .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-paginator {\n  background: white; }\n.theme-docs .mat-paginator,\n.theme-docs .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-paginator-decrement,\n.theme-docs .mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-paginator-first,\n.theme-docs .mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-icon-button[disabled] .mat-paginator-decrement,\n.theme-docs .mat-icon-button[disabled] .mat-paginator-increment,\n.theme-docs .mat-icon-button[disabled] .mat-paginator-first,\n.theme-docs .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-progress-bar-background {\n  fill: #d1c4e9; }\n.theme-docs .mat-progress-bar-buffer {\n  background-color: #d1c4e9; }\n.theme-docs .mat-progress-bar-fill::after {\n  background-color: #512da8; }\n.theme-docs .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #b2ebf2; }\n.theme-docs .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #b2ebf2; }\n.theme-docs .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #00e5ff; }\n.theme-docs .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.theme-docs .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.theme-docs .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #e53935; }\n.theme-docs .mat-progress-spinner circle, .theme-docs .mat-spinner circle {\n  stroke: #512da8; }\n.theme-docs .mat-progress-spinner.mat-accent circle, .theme-docs .mat-spinner.mat-accent circle {\n  stroke: #00e5ff; }\n.theme-docs .mat-progress-spinner.mat-warn circle, .theme-docs .mat-spinner.mat-warn circle {\n  stroke: #e53935; }\n.theme-docs .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #512da8; }\n.theme-docs .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #512da8; }\n.theme-docs .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(81, 45, 168, 0.26); }\n.theme-docs .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #00e5ff; }\n.theme-docs .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #00e5ff; }\n.theme-docs .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(0, 229, 255, 0.26); }\n.theme-docs .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #e53935; }\n.theme-docs .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #e53935; }\n.theme-docs .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.theme-docs .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.theme-docs .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.theme-docs .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-select-content, .theme-docs .mat-select-panel-done-animating {\n  background: white; }\n.theme-docs .mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.theme-docs .mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.theme-docs .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #512da8; }\n.theme-docs .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #00e5ff; }\n.theme-docs .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #e53935; }\n.theme-docs .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #e53935; }\n.theme-docs .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-drawer.mat-drawer-push {\n    background-color: white; }\n.theme-docs .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.theme-docs .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #00bcd4; }\n.theme-docs .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(0, 188, 212, 0.5); }\n.theme-docs .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.theme-docs .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(0, 188, 212, 0.12); }\n.theme-docs .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #673ab7; }\n.theme-docs .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(103, 58, 183, 0.5); }\n.theme-docs .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.theme-docs .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(103, 58, 183, 0.12); }\n.theme-docs .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.theme-docs .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.theme-docs .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.theme-docs .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.theme-docs .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.theme-docs .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.theme-docs .mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.theme-docs .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-primary .mat-slider-track-fill,\n.theme-docs .mat-primary .mat-slider-thumb,\n.theme-docs .mat-primary .mat-slider-thumb-label {\n  background-color: #512da8; }\n.theme-docs .mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.theme-docs .mat-accent .mat-slider-track-fill,\n.theme-docs .mat-accent .mat-slider-thumb,\n.theme-docs .mat-accent .mat-slider-thumb-label {\n  background-color: #00e5ff; }\n.theme-docs .mat-accent .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-warn .mat-slider-track-fill,\n.theme-docs .mat-warn .mat-slider-thumb,\n.theme-docs .mat-warn .mat-slider-thumb-label {\n  background-color: #e53935; }\n.theme-docs .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.theme-docs .mat-slider-focus-ring {\n  background-color: rgba(0, 229, 255, 0.2); }\n.theme-docs .mat-slider:hover .mat-slider-track-background,\n.theme-docs .cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-slider-disabled .mat-slider-track-background,\n.theme-docs .mat-slider-disabled .mat-slider-track-fill,\n.theme-docs .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.theme-docs .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.theme-docs .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.theme-docs .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .theme-docs .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .theme-docs .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.theme-docs .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.theme-docs .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.theme-docs .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.theme-docs .mat-step-header.cdk-keyboard-focused, .theme-docs .mat-step-header.cdk-program-focused, .theme-docs .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.theme-docs .mat-step-header .mat-step-label,\n.theme-docs .mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-step-header .mat-step-icon {\n  background-color: #512da8;\n  color: white; }\n.theme-docs .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.theme-docs .mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-stepper-horizontal, .theme-docs .mat-stepper-vertical {\n  background-color: white; }\n.theme-docs .mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-sort-header-arrow {\n  color: #757575; }\n.theme-docs .mat-tab-nav-bar,\n.theme-docs .mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.theme-docs .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.theme-docs .mat-tab-label, .theme-docs .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.theme-docs .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.theme-docs .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.theme-docs .mat-tab-group.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-group.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-docs .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(209, 196, 233, 0.3); }\n.theme-docs .mat-tab-group.mat-primary .mat-ink-bar, .theme-docs .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #512da8; }\n.theme-docs .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .theme-docs .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.theme-docs .mat-tab-group.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-group.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-docs .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(178, 235, 242, 0.3); }\n.theme-docs .mat-tab-group.mat-accent .mat-ink-bar, .theme-docs .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #00e5ff; }\n.theme-docs .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .theme-docs .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-tab-group.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-group.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-docs .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.theme-docs .mat-tab-group.mat-warn .mat-ink-bar, .theme-docs .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #e53935; }\n.theme-docs .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .theme-docs .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(209, 196, 233, 0.3); }\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-header, .theme-docs .mat-tab-group.mat-background-primary .mat-tab-links, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #512da8; }\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-label, .theme-docs .mat-tab-group.mat-background-primary .mat-tab-link, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-docs .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-docs .mat-tab-group.mat-background-primary .mat-ripple-element, .theme-docs .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(178, 235, 242, 0.3); }\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-header, .theme-docs .mat-tab-group.mat-background-accent .mat-tab-links, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #00e5ff; }\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-label, .theme-docs .mat-tab-group.mat-background-accent .mat-tab-link, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.theme-docs .mat-tab-group.mat-background-accent .mat-ripple-element, .theme-docs .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-header, .theme-docs .mat-tab-group.mat-background-warn .mat-tab-links, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #e53935; }\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-label, .theme-docs .mat-tab-group.mat-background-warn .mat-tab-link, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.theme-docs .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.theme-docs .mat-tab-group.mat-background-warn .mat-ripple-element, .theme-docs .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.theme-docs .mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-toolbar.mat-primary {\n    background: #512da8;\n    color: white; }\n.theme-docs .mat-toolbar.mat-accent {\n    background: #00e5ff;\n    color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-toolbar.mat-warn {\n    background: #e53935;\n    color: white; }\n.theme-docs .mat-toolbar .mat-form-field-underline,\n  .theme-docs .mat-toolbar .mat-form-field-ripple,\n  .theme-docs .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.theme-docs .mat-toolbar .mat-form-field-label,\n  .theme-docs .mat-toolbar .mat-focused .mat-form-field-label,\n  .theme-docs .mat-toolbar .mat-select-value,\n  .theme-docs .mat-toolbar .mat-select-arrow,\n  .theme-docs .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.theme-docs .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.theme-docs .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.theme-docs .mat-tree {\n  background: white; }\n.theme-docs .mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.theme-docs .mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.theme-docs .mat-simple-snackbar-action {\n  color: #00e5ff; }\n.theme-docs .tc-primary {\n  color: #512da8; }\n.theme-docs .tc-accent,\n.theme-docs a {\n  color: #00e5ff; }\n.theme-docs a:hover {\n  color: #00b7cc; }\n.theme-docs .tc-warn {\n  color: #e53935; }\n.blue-orange .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.blue-orange .mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-option:hover:not(.mat-option-disabled), .blue-orange .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #1976d2; }\n.blue-orange .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ef6c00; }\n.blue-orange .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #e53935; }\n.blue-orange .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.blue-orange .mat-pseudo-checkbox-checked,\n.blue-orange .mat-pseudo-checkbox-indeterminate,\n.blue-orange .mat-accent .mat-pseudo-checkbox-checked,\n.blue-orange .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ef6c00; }\n.blue-orange .mat-primary .mat-pseudo-checkbox-checked,\n.blue-orange .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #1976d2; }\n.blue-orange .mat-warn .mat-pseudo-checkbox-checked,\n.blue-orange .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #e53935; }\n.blue-orange .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.blue-orange .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.blue-orange .mat-app-background, .blue-orange.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.blue-orange .mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.blue-orange .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-badge-content {\n  color: white;\n  background: #1976d2; }\n.blue-orange .mat-badge-accent .mat-badge-content {\n  background: #ef6c00;\n  color: white; }\n.blue-orange .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #e53935; }\n.blue-orange .mat-badge {\n  position: relative; }\n.blue-orange .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.blue-orange .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.blue-orange .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.blue-orange .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .blue-orange .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.blue-orange .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.blue-orange .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.blue-orange .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .blue-orange .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.blue-orange .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .blue-orange .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.blue-orange .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .blue-orange .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.blue-orange .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .blue-orange .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.blue-orange .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .blue-orange .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.blue-orange .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.blue-orange .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.blue-orange .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .blue-orange .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.blue-orange .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .blue-orange .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.blue-orange .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .blue-orange .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.blue-orange .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .blue-orange .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.blue-orange .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .blue-orange .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.blue-orange .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.blue-orange .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.blue-orange .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .blue-orange .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.blue-orange .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .blue-orange .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.blue-orange .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .blue-orange .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.blue-orange .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .blue-orange .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.blue-orange .mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-button, .blue-orange .mat-icon-button, .blue-orange .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.blue-orange .mat-button.mat-primary, .blue-orange .mat-icon-button.mat-primary, .blue-orange .mat-stroked-button.mat-primary {\n    color: #1976d2; }\n.blue-orange .mat-button.mat-accent, .blue-orange .mat-icon-button.mat-accent, .blue-orange .mat-stroked-button.mat-accent {\n    color: #ef6c00; }\n.blue-orange .mat-button.mat-warn, .blue-orange .mat-icon-button.mat-warn, .blue-orange .mat-stroked-button.mat-warn {\n    color: #e53935; }\n.blue-orange .mat-button.mat-primary[disabled], .blue-orange .mat-button.mat-accent[disabled], .blue-orange .mat-button.mat-warn[disabled], .blue-orange .mat-button[disabled][disabled], .blue-orange .mat-icon-button.mat-primary[disabled], .blue-orange .mat-icon-button.mat-accent[disabled], .blue-orange .mat-icon-button.mat-warn[disabled], .blue-orange .mat-icon-button[disabled][disabled], .blue-orange .mat-stroked-button.mat-primary[disabled], .blue-orange .mat-stroked-button.mat-accent[disabled], .blue-orange .mat-stroked-button.mat-warn[disabled], .blue-orange .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-button.mat-primary .mat-button-focus-overlay, .blue-orange .mat-icon-button.mat-primary .mat-button-focus-overlay, .blue-orange .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(25, 118, 210, 0.12); }\n.blue-orange .mat-button.mat-accent .mat-button-focus-overlay, .blue-orange .mat-icon-button.mat-accent .mat-button-focus-overlay, .blue-orange .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(239, 108, 0, 0.12); }\n.blue-orange .mat-button.mat-warn .mat-button-focus-overlay, .blue-orange .mat-icon-button.mat-warn .mat-button-focus-overlay, .blue-orange .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(229, 57, 53, 0.12); }\n.blue-orange .mat-button[disabled] .mat-button-focus-overlay, .blue-orange .mat-icon-button[disabled] .mat-button-focus-overlay, .blue-orange .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.blue-orange .mat-button.mat-primary .mat-ripple-element, .blue-orange .mat-icon-button.mat-primary .mat-ripple-element, .blue-orange .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(25, 118, 210, 0.1); }\n.blue-orange .mat-button.mat-accent .mat-ripple-element, .blue-orange .mat-icon-button.mat-accent .mat-ripple-element, .blue-orange .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(239, 108, 0, 0.1); }\n.blue-orange .mat-button.mat-warn .mat-ripple-element, .blue-orange .mat-icon-button.mat-warn .mat-ripple-element, .blue-orange .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(229, 57, 53, 0.1); }\n.blue-orange .mat-flat-button, .blue-orange .mat-raised-button, .blue-orange .mat-fab, .blue-orange .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.blue-orange .mat-flat-button.mat-primary, .blue-orange .mat-raised-button.mat-primary, .blue-orange .mat-fab.mat-primary, .blue-orange .mat-mini-fab.mat-primary {\n    color: white; }\n.blue-orange .mat-flat-button.mat-accent, .blue-orange .mat-raised-button.mat-accent, .blue-orange .mat-fab.mat-accent, .blue-orange .mat-mini-fab.mat-accent {\n    color: white; }\n.blue-orange .mat-flat-button.mat-warn, .blue-orange .mat-raised-button.mat-warn, .blue-orange .mat-fab.mat-warn, .blue-orange .mat-mini-fab.mat-warn {\n    color: white; }\n.blue-orange .mat-flat-button.mat-primary[disabled], .blue-orange .mat-flat-button.mat-accent[disabled], .blue-orange .mat-flat-button.mat-warn[disabled], .blue-orange .mat-flat-button[disabled][disabled], .blue-orange .mat-raised-button.mat-primary[disabled], .blue-orange .mat-raised-button.mat-accent[disabled], .blue-orange .mat-raised-button.mat-warn[disabled], .blue-orange .mat-raised-button[disabled][disabled], .blue-orange .mat-fab.mat-primary[disabled], .blue-orange .mat-fab.mat-accent[disabled], .blue-orange .mat-fab.mat-warn[disabled], .blue-orange .mat-fab[disabled][disabled], .blue-orange .mat-mini-fab.mat-primary[disabled], .blue-orange .mat-mini-fab.mat-accent[disabled], .blue-orange .mat-mini-fab.mat-warn[disabled], .blue-orange .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-flat-button.mat-primary, .blue-orange .mat-raised-button.mat-primary, .blue-orange .mat-fab.mat-primary, .blue-orange .mat-mini-fab.mat-primary {\n    background-color: #1976d2; }\n.blue-orange .mat-flat-button.mat-accent, .blue-orange .mat-raised-button.mat-accent, .blue-orange .mat-fab.mat-accent, .blue-orange .mat-mini-fab.mat-accent {\n    background-color: #ef6c00; }\n.blue-orange .mat-flat-button.mat-warn, .blue-orange .mat-raised-button.mat-warn, .blue-orange .mat-fab.mat-warn, .blue-orange .mat-mini-fab.mat-warn {\n    background-color: #e53935; }\n.blue-orange .mat-flat-button.mat-primary[disabled], .blue-orange .mat-flat-button.mat-accent[disabled], .blue-orange .mat-flat-button.mat-warn[disabled], .blue-orange .mat-flat-button[disabled][disabled], .blue-orange .mat-raised-button.mat-primary[disabled], .blue-orange .mat-raised-button.mat-accent[disabled], .blue-orange .mat-raised-button.mat-warn[disabled], .blue-orange .mat-raised-button[disabled][disabled], .blue-orange .mat-fab.mat-primary[disabled], .blue-orange .mat-fab.mat-accent[disabled], .blue-orange .mat-fab.mat-warn[disabled], .blue-orange .mat-fab[disabled][disabled], .blue-orange .mat-mini-fab.mat-primary[disabled], .blue-orange .mat-mini-fab.mat-accent[disabled], .blue-orange .mat-mini-fab.mat-warn[disabled], .blue-orange .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-flat-button.mat-primary .mat-ripple-element, .blue-orange .mat-raised-button.mat-primary .mat-ripple-element, .blue-orange .mat-fab.mat-primary .mat-ripple-element, .blue-orange .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.blue-orange .mat-flat-button.mat-accent .mat-ripple-element, .blue-orange .mat-raised-button.mat-accent .mat-ripple-element, .blue-orange .mat-fab.mat-accent .mat-ripple-element, .blue-orange .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.blue-orange .mat-flat-button.mat-warn .mat-ripple-element, .blue-orange .mat-raised-button.mat-warn .mat-ripple-element, .blue-orange .mat-fab.mat-warn .mat-ripple-element, .blue-orange .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.blue-orange .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(25, 118, 210, 0.2); }\n.blue-orange .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.2); }\n.blue-orange .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.2); }\n.blue-orange .mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.blue-orange .mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-checkbox-checkmark {\n  fill: #fafafa; }\n.blue-orange .mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .blue-orange .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.blue-orange .mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.blue-orange .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .blue-orange .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #1976d2; }\n.blue-orange .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .blue-orange .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ef6c00; }\n.blue-orange .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .blue-orange .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #e53935; }\n.blue-orange .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .blue-orange .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.blue-orange .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.blue-orange .mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .blue-orange .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .blue-orange .mat-checkbox-background {\n    background: none; } }\n.blue-orange .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(25, 118, 210, 0.26); }\n.blue-orange .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.26); }\n.blue-orange .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.blue-orange .mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.blue-orange .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #1976d2;\n  color: white; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #e53935;\n  color: white; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ef6c00;\n  color: white; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.blue-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-orange .mat-table {\n  background: white; }\n.blue-orange .mat-table thead, .blue-orange .mat-table tbody, .blue-orange .mat-table tfoot,\n.blue-orange mat-header-row, .blue-orange mat-row, .blue-orange mat-footer-row,\n.blue-orange [mat-header-row], .blue-orange [mat-row], .blue-orange [mat-footer-row],\n.blue-orange .mat-table-sticky {\n  background: inherit; }\n.blue-orange mat-row, .blue-orange mat-header-row, .blue-orange mat-footer-row,\n.blue-orange th.mat-header-cell, .blue-orange td.mat-cell, .blue-orange td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-cell, .blue-orange .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-datepicker-toggle,\n.blue-orange .mat-datepicker-content .mat-calendar-next-button,\n.blue-orange .mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.blue-orange .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.blue-orange .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.blue-orange .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.blue-orange .mat-calendar-body-selected {\n  background-color: #1976d2;\n  color: white; }\n.blue-orange .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(25, 118, 210, 0.4); }\n.blue-orange .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.blue-orange .mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #ef6c00;\n    color: white; }\n.blue-orange .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(239, 108, 0, 0.4); }\n.blue-orange .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.blue-orange .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #e53935;\n    color: white; }\n.blue-orange .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(229, 57, 53, 0.4); }\n.blue-orange .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.blue-orange .mat-datepicker-toggle-active {\n  color: #1976d2; }\n.blue-orange .mat-datepicker-toggle-active.mat-accent {\n    color: #ef6c00; }\n.blue-orange .mat-datepicker-toggle-active.mat-warn {\n    color: #e53935; }\n.blue-orange .mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .blue-orange .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .blue-orange .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .blue-orange .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.blue-orange .mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-expansion-panel-header-description,\n.blue-orange .mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .blue-orange .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.blue-orange .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.blue-orange .mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.blue-orange .mat-form-field.mat-focused .mat-form-field-label {\n  color: #1976d2; }\n.blue-orange .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #ef6c00; }\n.blue-orange .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #e53935; }\n.blue-orange .mat-focused .mat-form-field-required-marker {\n  color: #ef6c00; }\n.blue-orange .mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #1976d2; }\n.blue-orange .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #ef6c00; }\n.blue-orange .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #e53935; }\n.blue-orange .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #e53935; }\n.blue-orange .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .blue-orange .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #e53935; }\n.blue-orange .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.blue-orange .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #e53935; }\n.blue-orange .mat-error {\n  color: #e53935; }\n.blue-orange .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.blue-orange .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.blue-orange .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.blue-orange .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.blue-orange .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #1976d2; }\n.blue-orange .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ef6c00; }\n.blue-orange .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #e53935; }\n.blue-orange .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #e53935; }\n.blue-orange .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.blue-orange .mat-icon.mat-primary {\n  color: #1976d2; }\n.blue-orange .mat-icon.mat-accent {\n  color: #ef6c00; }\n.blue-orange .mat-icon.mat-warn {\n  color: #e53935; }\n.blue-orange .mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-input-element {\n  caret-color: #1976d2; }\n.blue-orange .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-accent .mat-input-element {\n  caret-color: #ef6c00; }\n.blue-orange .mat-warn .mat-input-element,\n.blue-orange .mat-form-field-invalid .mat-input-element {\n  caret-color: #e53935; }\n.blue-orange .mat-list .mat-list-item, .blue-orange .mat-nav-list .mat-list-item, .blue-orange .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-list .mat-list-option, .blue-orange .mat-nav-list .mat-list-option, .blue-orange .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-list .mat-subheader, .blue-orange .mat-nav-list .mat-subheader, .blue-orange .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-list-item-disabled {\n  background-color: #eeeeee; }\n.blue-orange .mat-list-option:hover, .blue-orange .mat-list-option.mat-list-item-focus,\n.blue-orange .mat-nav-list .mat-list-item:hover,\n.blue-orange .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-menu-panel {\n  background: white; }\n.blue-orange .mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-menu-item[disabled], .blue-orange .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-menu-item .mat-icon:not([color]),\n.blue-orange .mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-menu-item:hover:not([disabled]),\n.blue-orange .mat-menu-item.cdk-program-focused:not([disabled]),\n.blue-orange .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.blue-orange .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-paginator {\n  background: white; }\n.blue-orange .mat-paginator,\n.blue-orange .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-paginator-decrement,\n.blue-orange .mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-paginator-first,\n.blue-orange .mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-icon-button[disabled] .mat-paginator-decrement,\n.blue-orange .mat-icon-button[disabled] .mat-paginator-increment,\n.blue-orange .mat-icon-button[disabled] .mat-paginator-first,\n.blue-orange .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-progress-bar-background {\n  fill: #bbdefb; }\n.blue-orange .mat-progress-bar-buffer {\n  background-color: #bbdefb; }\n.blue-orange .mat-progress-bar-fill::after {\n  background-color: #1976d2; }\n.blue-orange .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #ffe0b2; }\n.blue-orange .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #ffe0b2; }\n.blue-orange .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ef6c00; }\n.blue-orange .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.blue-orange .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.blue-orange .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #e53935; }\n.blue-orange .mat-progress-spinner circle, .blue-orange .mat-spinner circle {\n  stroke: #1976d2; }\n.blue-orange .mat-progress-spinner.mat-accent circle, .blue-orange .mat-spinner.mat-accent circle {\n  stroke: #ef6c00; }\n.blue-orange .mat-progress-spinner.mat-warn circle, .blue-orange .mat-spinner.mat-warn circle {\n  stroke: #e53935; }\n.blue-orange .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #1976d2; }\n.blue-orange .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #1976d2; }\n.blue-orange .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(25, 118, 210, 0.26); }\n.blue-orange .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ef6c00; }\n.blue-orange .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #ef6c00; }\n.blue-orange .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(239, 108, 0, 0.26); }\n.blue-orange .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #e53935; }\n.blue-orange .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #e53935; }\n.blue-orange .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.blue-orange .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.blue-orange .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.blue-orange .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-select-content, .blue-orange .mat-select-panel-done-animating {\n  background: white; }\n.blue-orange .mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.blue-orange .mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-orange .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #1976d2; }\n.blue-orange .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ef6c00; }\n.blue-orange .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #e53935; }\n.blue-orange .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #e53935; }\n.blue-orange .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-drawer.mat-drawer-push {\n    background-color: white; }\n.blue-orange .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.blue-orange .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ff9800; }\n.blue-orange .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 152, 0, 0.5); }\n.blue-orange .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.blue-orange .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 152, 0, 0.12); }\n.blue-orange .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #2196f3; }\n.blue-orange .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(33, 150, 243, 0.5); }\n.blue-orange .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.blue-orange .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(33, 150, 243, 0.12); }\n.blue-orange .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.blue-orange .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.blue-orange .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.blue-orange .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.blue-orange .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.blue-orange .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.blue-orange .mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.blue-orange .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-primary .mat-slider-track-fill,\n.blue-orange .mat-primary .mat-slider-thumb,\n.blue-orange .mat-primary .mat-slider-thumb-label {\n  background-color: #1976d2; }\n.blue-orange .mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.blue-orange .mat-accent .mat-slider-track-fill,\n.blue-orange .mat-accent .mat-slider-thumb,\n.blue-orange .mat-accent .mat-slider-thumb-label {\n  background-color: #ef6c00; }\n.blue-orange .mat-accent .mat-slider-thumb-label-text {\n  color: white; }\n.blue-orange .mat-warn .mat-slider-track-fill,\n.blue-orange .mat-warn .mat-slider-thumb,\n.blue-orange .mat-warn .mat-slider-thumb-label {\n  background-color: #e53935; }\n.blue-orange .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.blue-orange .mat-slider-focus-ring {\n  background-color: rgba(239, 108, 0, 0.2); }\n.blue-orange .mat-slider:hover .mat-slider-track-background,\n.blue-orange .cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-slider-disabled .mat-slider-track-background,\n.blue-orange .mat-slider-disabled .mat-slider-track-fill,\n.blue-orange .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.blue-orange .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.blue-orange .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.blue-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .blue-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .blue-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.blue-orange .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.blue-orange .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.blue-orange .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.blue-orange .mat-step-header.cdk-keyboard-focused, .blue-orange .mat-step-header.cdk-program-focused, .blue-orange .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.blue-orange .mat-step-header .mat-step-label,\n.blue-orange .mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-step-header .mat-step-icon {\n  background-color: #1976d2;\n  color: white; }\n.blue-orange .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.blue-orange .mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-stepper-horizontal, .blue-orange .mat-stepper-vertical {\n  background-color: white; }\n.blue-orange .mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-sort-header-arrow {\n  color: #757575; }\n.blue-orange .mat-tab-nav-bar,\n.blue-orange .mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.blue-orange .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.blue-orange .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.blue-orange .mat-tab-label, .blue-orange .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-orange .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.blue-orange .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.blue-orange .mat-tab-group.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-group.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-orange .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(187, 222, 251, 0.3); }\n.blue-orange .mat-tab-group.mat-primary .mat-ink-bar, .blue-orange .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #1976d2; }\n.blue-orange .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .blue-orange .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.blue-orange .mat-tab-group.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-group.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-orange .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 224, 178, 0.3); }\n.blue-orange .mat-tab-group.mat-accent .mat-ink-bar, .blue-orange .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ef6c00; }\n.blue-orange .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .blue-orange .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: white; }\n.blue-orange .mat-tab-group.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-group.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-orange .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.blue-orange .mat-tab-group.mat-warn .mat-ink-bar, .blue-orange .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #e53935; }\n.blue-orange .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .blue-orange .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(187, 222, 251, 0.3); }\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-header, .blue-orange .mat-tab-group.mat-background-primary .mat-tab-links, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #1976d2; }\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-label, .blue-orange .mat-tab-group.mat-background-primary .mat-tab-link, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.blue-orange .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.blue-orange .mat-tab-group.mat-background-primary .mat-ripple-element, .blue-orange .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 224, 178, 0.3); }\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-header, .blue-orange .mat-tab-group.mat-background-accent .mat-tab-links, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #ef6c00; }\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-label, .blue-orange .mat-tab-group.mat-background-accent .mat-tab-link, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: white; }\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.blue-orange .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.blue-orange .mat-tab-group.mat-background-accent .mat-ripple-element, .blue-orange .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-header, .blue-orange .mat-tab-group.mat-background-warn .mat-tab-links, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #e53935; }\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-label, .blue-orange .mat-tab-group.mat-background-warn .mat-tab-link, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.blue-orange .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.blue-orange .mat-tab-group.mat-background-warn .mat-ripple-element, .blue-orange .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.blue-orange .mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-toolbar.mat-primary {\n    background: #1976d2;\n    color: white; }\n.blue-orange .mat-toolbar.mat-accent {\n    background: #ef6c00;\n    color: white; }\n.blue-orange .mat-toolbar.mat-warn {\n    background: #e53935;\n    color: white; }\n.blue-orange .mat-toolbar .mat-form-field-underline,\n  .blue-orange .mat-toolbar .mat-form-field-ripple,\n  .blue-orange .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.blue-orange .mat-toolbar .mat-form-field-label,\n  .blue-orange .mat-toolbar .mat-focused .mat-form-field-label,\n  .blue-orange .mat-toolbar .mat-select-value,\n  .blue-orange .mat-toolbar .mat-select-arrow,\n  .blue-orange .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.blue-orange .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.blue-orange .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.blue-orange .mat-tree {\n  background: white; }\n.blue-orange .mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-orange .mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.blue-orange .mat-simple-snackbar-action {\n  color: #ef6c00; }\n.blue-grey-deep-orange .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.blue-grey-deep-orange .mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-option:hover:not(.mat-option-disabled), .blue-grey-deep-orange .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #455a64; }\n.blue-grey-deep-orange .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ff5722; }\n.blue-grey-deep-orange .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.blue-grey-deep-orange .mat-pseudo-checkbox-checked,\n.blue-grey-deep-orange .mat-pseudo-checkbox-indeterminate,\n.blue-grey-deep-orange .mat-accent .mat-pseudo-checkbox-checked,\n.blue-grey-deep-orange .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ff5722; }\n.blue-grey-deep-orange .mat-primary .mat-pseudo-checkbox-checked,\n.blue-grey-deep-orange .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #455a64; }\n.blue-grey-deep-orange .mat-warn .mat-pseudo-checkbox-checked,\n.blue-grey-deep-orange .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #e53935; }\n.blue-grey-deep-orange .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.blue-grey-deep-orange .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.blue-grey-deep-orange .mat-app-background, .blue-grey-deep-orange.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.blue-grey-deep-orange .mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.blue-grey-deep-orange .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-badge-content {\n  color: white;\n  background: #455a64; }\n.blue-grey-deep-orange .mat-badge-accent .mat-badge-content {\n  background: #ff5722;\n  color: white; }\n.blue-grey-deep-orange .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #e53935; }\n.blue-grey-deep-orange .mat-badge {\n  position: relative; }\n.blue-grey-deep-orange .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.blue-grey-deep-orange .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.blue-grey-deep-orange .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.blue-grey-deep-orange .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .blue-grey-deep-orange .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.blue-grey-deep-orange .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.blue-grey-deep-orange .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.blue-grey-deep-orange .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.blue-grey-deep-orange .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.blue-grey-deep-orange .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.blue-grey-deep-orange .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.blue-grey-deep-orange .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .blue-grey-deep-orange .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.blue-grey-deep-orange .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.blue-grey-deep-orange .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.blue-grey-deep-orange .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.blue-grey-deep-orange .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.blue-grey-deep-orange .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.blue-grey-deep-orange .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.blue-grey-deep-orange .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .blue-grey-deep-orange .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.blue-grey-deep-orange .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.blue-grey-deep-orange .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.blue-grey-deep-orange .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.blue-grey-deep-orange .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.blue-grey-deep-orange .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.blue-grey-deep-orange .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .blue-grey-deep-orange .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.blue-grey-deep-orange .mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-button, .blue-grey-deep-orange .mat-icon-button, .blue-grey-deep-orange .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.blue-grey-deep-orange .mat-button.mat-primary, .blue-grey-deep-orange .mat-icon-button.mat-primary, .blue-grey-deep-orange .mat-stroked-button.mat-primary {\n    color: #455a64; }\n.blue-grey-deep-orange .mat-button.mat-accent, .blue-grey-deep-orange .mat-icon-button.mat-accent, .blue-grey-deep-orange .mat-stroked-button.mat-accent {\n    color: #ff5722; }\n.blue-grey-deep-orange .mat-button.mat-warn, .blue-grey-deep-orange .mat-icon-button.mat-warn, .blue-grey-deep-orange .mat-stroked-button.mat-warn {\n    color: #e53935; }\n.blue-grey-deep-orange .mat-button.mat-primary[disabled], .blue-grey-deep-orange .mat-button.mat-accent[disabled], .blue-grey-deep-orange .mat-button.mat-warn[disabled], .blue-grey-deep-orange .mat-button[disabled][disabled], .blue-grey-deep-orange .mat-icon-button.mat-primary[disabled], .blue-grey-deep-orange .mat-icon-button.mat-accent[disabled], .blue-grey-deep-orange .mat-icon-button.mat-warn[disabled], .blue-grey-deep-orange .mat-icon-button[disabled][disabled], .blue-grey-deep-orange .mat-stroked-button.mat-primary[disabled], .blue-grey-deep-orange .mat-stroked-button.mat-accent[disabled], .blue-grey-deep-orange .mat-stroked-button.mat-warn[disabled], .blue-grey-deep-orange .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-button.mat-primary .mat-button-focus-overlay, .blue-grey-deep-orange .mat-icon-button.mat-primary .mat-button-focus-overlay, .blue-grey-deep-orange .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(69, 90, 100, 0.12); }\n.blue-grey-deep-orange .mat-button.mat-accent .mat-button-focus-overlay, .blue-grey-deep-orange .mat-icon-button.mat-accent .mat-button-focus-overlay, .blue-grey-deep-orange .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(255, 87, 34, 0.12); }\n.blue-grey-deep-orange .mat-button.mat-warn .mat-button-focus-overlay, .blue-grey-deep-orange .mat-icon-button.mat-warn .mat-button-focus-overlay, .blue-grey-deep-orange .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(229, 57, 53, 0.12); }\n.blue-grey-deep-orange .mat-button[disabled] .mat-button-focus-overlay, .blue-grey-deep-orange .mat-icon-button[disabled] .mat-button-focus-overlay, .blue-grey-deep-orange .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.blue-grey-deep-orange .mat-button.mat-primary .mat-ripple-element, .blue-grey-deep-orange .mat-icon-button.mat-primary .mat-ripple-element, .blue-grey-deep-orange .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(69, 90, 100, 0.1); }\n.blue-grey-deep-orange .mat-button.mat-accent .mat-ripple-element, .blue-grey-deep-orange .mat-icon-button.mat-accent .mat-ripple-element, .blue-grey-deep-orange .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 87, 34, 0.1); }\n.blue-grey-deep-orange .mat-button.mat-warn .mat-ripple-element, .blue-grey-deep-orange .mat-icon-button.mat-warn .mat-ripple-element, .blue-grey-deep-orange .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(229, 57, 53, 0.1); }\n.blue-grey-deep-orange .mat-flat-button, .blue-grey-deep-orange .mat-raised-button, .blue-grey-deep-orange .mat-fab, .blue-grey-deep-orange .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.blue-grey-deep-orange .mat-flat-button.mat-primary, .blue-grey-deep-orange .mat-raised-button.mat-primary, .blue-grey-deep-orange .mat-fab.mat-primary, .blue-grey-deep-orange .mat-mini-fab.mat-primary {\n    color: white; }\n.blue-grey-deep-orange .mat-flat-button.mat-accent, .blue-grey-deep-orange .mat-raised-button.mat-accent, .blue-grey-deep-orange .mat-fab.mat-accent, .blue-grey-deep-orange .mat-mini-fab.mat-accent {\n    color: white; }\n.blue-grey-deep-orange .mat-flat-button.mat-warn, .blue-grey-deep-orange .mat-raised-button.mat-warn, .blue-grey-deep-orange .mat-fab.mat-warn, .blue-grey-deep-orange .mat-mini-fab.mat-warn {\n    color: white; }\n.blue-grey-deep-orange .mat-flat-button.mat-primary[disabled], .blue-grey-deep-orange .mat-flat-button.mat-accent[disabled], .blue-grey-deep-orange .mat-flat-button.mat-warn[disabled], .blue-grey-deep-orange .mat-flat-button[disabled][disabled], .blue-grey-deep-orange .mat-raised-button.mat-primary[disabled], .blue-grey-deep-orange .mat-raised-button.mat-accent[disabled], .blue-grey-deep-orange .mat-raised-button.mat-warn[disabled], .blue-grey-deep-orange .mat-raised-button[disabled][disabled], .blue-grey-deep-orange .mat-fab.mat-primary[disabled], .blue-grey-deep-orange .mat-fab.mat-accent[disabled], .blue-grey-deep-orange .mat-fab.mat-warn[disabled], .blue-grey-deep-orange .mat-fab[disabled][disabled], .blue-grey-deep-orange .mat-mini-fab.mat-primary[disabled], .blue-grey-deep-orange .mat-mini-fab.mat-accent[disabled], .blue-grey-deep-orange .mat-mini-fab.mat-warn[disabled], .blue-grey-deep-orange .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-flat-button.mat-primary, .blue-grey-deep-orange .mat-raised-button.mat-primary, .blue-grey-deep-orange .mat-fab.mat-primary, .blue-grey-deep-orange .mat-mini-fab.mat-primary {\n    background-color: #455a64; }\n.blue-grey-deep-orange .mat-flat-button.mat-accent, .blue-grey-deep-orange .mat-raised-button.mat-accent, .blue-grey-deep-orange .mat-fab.mat-accent, .blue-grey-deep-orange .mat-mini-fab.mat-accent {\n    background-color: #ff5722; }\n.blue-grey-deep-orange .mat-flat-button.mat-warn, .blue-grey-deep-orange .mat-raised-button.mat-warn, .blue-grey-deep-orange .mat-fab.mat-warn, .blue-grey-deep-orange .mat-mini-fab.mat-warn {\n    background-color: #e53935; }\n.blue-grey-deep-orange .mat-flat-button.mat-primary[disabled], .blue-grey-deep-orange .mat-flat-button.mat-accent[disabled], .blue-grey-deep-orange .mat-flat-button.mat-warn[disabled], .blue-grey-deep-orange .mat-flat-button[disabled][disabled], .blue-grey-deep-orange .mat-raised-button.mat-primary[disabled], .blue-grey-deep-orange .mat-raised-button.mat-accent[disabled], .blue-grey-deep-orange .mat-raised-button.mat-warn[disabled], .blue-grey-deep-orange .mat-raised-button[disabled][disabled], .blue-grey-deep-orange .mat-fab.mat-primary[disabled], .blue-grey-deep-orange .mat-fab.mat-accent[disabled], .blue-grey-deep-orange .mat-fab.mat-warn[disabled], .blue-grey-deep-orange .mat-fab[disabled][disabled], .blue-grey-deep-orange .mat-mini-fab.mat-primary[disabled], .blue-grey-deep-orange .mat-mini-fab.mat-accent[disabled], .blue-grey-deep-orange .mat-mini-fab.mat-warn[disabled], .blue-grey-deep-orange .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-flat-button.mat-primary .mat-ripple-element, .blue-grey-deep-orange .mat-raised-button.mat-primary .mat-ripple-element, .blue-grey-deep-orange .mat-fab.mat-primary .mat-ripple-element, .blue-grey-deep-orange .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.blue-grey-deep-orange .mat-flat-button.mat-accent .mat-ripple-element, .blue-grey-deep-orange .mat-raised-button.mat-accent .mat-ripple-element, .blue-grey-deep-orange .mat-fab.mat-accent .mat-ripple-element, .blue-grey-deep-orange .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.blue-grey-deep-orange .mat-flat-button.mat-warn .mat-ripple-element, .blue-grey-deep-orange .mat-raised-button.mat-warn .mat-ripple-element, .blue-grey-deep-orange .mat-fab.mat-warn .mat-ripple-element, .blue-grey-deep-orange .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.blue-grey-deep-orange .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(69, 90, 100, 0.2); }\n.blue-grey-deep-orange .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(255, 87, 34, 0.2); }\n.blue-grey-deep-orange .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.2); }\n.blue-grey-deep-orange .mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.blue-grey-deep-orange .mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-checkbox-checkmark {\n  fill: #fafafa; }\n.blue-grey-deep-orange .mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .blue-grey-deep-orange .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.blue-grey-deep-orange .mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.blue-grey-deep-orange .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .blue-grey-deep-orange .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .blue-grey-deep-orange .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .blue-grey-deep-orange .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .blue-grey-deep-orange .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.blue-grey-deep-orange .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.blue-grey-deep-orange .mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .blue-grey-deep-orange .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .blue-grey-deep-orange .mat-checkbox-background {\n    background: none; } }\n.blue-grey-deep-orange .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(69, 90, 100, 0.26); }\n.blue-grey-deep-orange .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(255, 87, 34, 0.26); }\n.blue-grey-deep-orange .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #455a64;\n  color: white; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #e53935;\n  color: white; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ff5722;\n  color: white; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.blue-grey-deep-orange .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.blue-grey-deep-orange .mat-table {\n  background: white; }\n.blue-grey-deep-orange .mat-table thead, .blue-grey-deep-orange .mat-table tbody, .blue-grey-deep-orange .mat-table tfoot,\n.blue-grey-deep-orange mat-header-row, .blue-grey-deep-orange mat-row, .blue-grey-deep-orange mat-footer-row,\n.blue-grey-deep-orange [mat-header-row], .blue-grey-deep-orange [mat-row], .blue-grey-deep-orange [mat-footer-row],\n.blue-grey-deep-orange .mat-table-sticky {\n  background: inherit; }\n.blue-grey-deep-orange mat-row, .blue-grey-deep-orange mat-header-row, .blue-grey-deep-orange mat-footer-row,\n.blue-grey-deep-orange th.mat-header-cell, .blue-grey-deep-orange td.mat-cell, .blue-grey-deep-orange td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-cell, .blue-grey-deep-orange .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-datepicker-toggle,\n.blue-grey-deep-orange .mat-datepicker-content .mat-calendar-next-button,\n.blue-grey-deep-orange .mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.blue-grey-deep-orange .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.blue-grey-deep-orange .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.blue-grey-deep-orange .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.blue-grey-deep-orange .mat-calendar-body-selected {\n  background-color: #455a64;\n  color: white; }\n.blue-grey-deep-orange .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(69, 90, 100, 0.4); }\n.blue-grey-deep-orange .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.blue-grey-deep-orange .mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #ff5722;\n    color: white; }\n.blue-grey-deep-orange .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(255, 87, 34, 0.4); }\n.blue-grey-deep-orange .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.blue-grey-deep-orange .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #e53935;\n    color: white; }\n.blue-grey-deep-orange .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(229, 57, 53, 0.4); }\n.blue-grey-deep-orange .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.blue-grey-deep-orange .mat-datepicker-toggle-active {\n  color: #455a64; }\n.blue-grey-deep-orange .mat-datepicker-toggle-active.mat-accent {\n    color: #ff5722; }\n.blue-grey-deep-orange .mat-datepicker-toggle-active.mat-warn {\n    color: #e53935; }\n.blue-grey-deep-orange .mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .blue-grey-deep-orange .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .blue-grey-deep-orange .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .blue-grey-deep-orange .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.blue-grey-deep-orange .mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-expansion-panel-header-description,\n.blue-grey-deep-orange .mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .blue-grey-deep-orange .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.blue-grey-deep-orange .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.blue-grey-deep-orange .mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.blue-grey-deep-orange .mat-form-field.mat-focused .mat-form-field-label {\n  color: #455a64; }\n.blue-grey-deep-orange .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #ff5722; }\n.blue-grey-deep-orange .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #e53935; }\n.blue-grey-deep-orange .mat-focused .mat-form-field-required-marker {\n  color: #ff5722; }\n.blue-grey-deep-orange .mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #ff5722; }\n.blue-grey-deep-orange .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #e53935; }\n.blue-grey-deep-orange .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .blue-grey-deep-orange .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #e53935; }\n.blue-grey-deep-orange .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.blue-grey-deep-orange .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-error {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.blue-grey-deep-orange .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.blue-grey-deep-orange .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.blue-grey-deep-orange .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.blue-grey-deep-orange .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #455a64; }\n.blue-grey-deep-orange .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ff5722; }\n.blue-grey-deep-orange .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.blue-grey-deep-orange .mat-icon.mat-primary {\n  color: #455a64; }\n.blue-grey-deep-orange .mat-icon.mat-accent {\n  color: #ff5722; }\n.blue-grey-deep-orange .mat-icon.mat-warn {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-input-element {\n  caret-color: #455a64; }\n.blue-grey-deep-orange .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-accent .mat-input-element {\n  caret-color: #ff5722; }\n.blue-grey-deep-orange .mat-warn .mat-input-element,\n.blue-grey-deep-orange .mat-form-field-invalid .mat-input-element {\n  caret-color: #e53935; }\n.blue-grey-deep-orange .mat-list .mat-list-item, .blue-grey-deep-orange .mat-nav-list .mat-list-item, .blue-grey-deep-orange .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-list .mat-list-option, .blue-grey-deep-orange .mat-nav-list .mat-list-option, .blue-grey-deep-orange .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-list .mat-subheader, .blue-grey-deep-orange .mat-nav-list .mat-subheader, .blue-grey-deep-orange .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-list-item-disabled {\n  background-color: #eeeeee; }\n.blue-grey-deep-orange .mat-list-option:hover, .blue-grey-deep-orange .mat-list-option.mat-list-item-focus,\n.blue-grey-deep-orange .mat-nav-list .mat-list-item:hover,\n.blue-grey-deep-orange .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-menu-panel {\n  background: white; }\n.blue-grey-deep-orange .mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-menu-item[disabled], .blue-grey-deep-orange .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-menu-item .mat-icon:not([color]),\n.blue-grey-deep-orange .mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-menu-item:hover:not([disabled]),\n.blue-grey-deep-orange .mat-menu-item.cdk-program-focused:not([disabled]),\n.blue-grey-deep-orange .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.blue-grey-deep-orange .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-paginator {\n  background: white; }\n.blue-grey-deep-orange .mat-paginator,\n.blue-grey-deep-orange .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-paginator-decrement,\n.blue-grey-deep-orange .mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-paginator-first,\n.blue-grey-deep-orange .mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-icon-button[disabled] .mat-paginator-decrement,\n.blue-grey-deep-orange .mat-icon-button[disabled] .mat-paginator-increment,\n.blue-grey-deep-orange .mat-icon-button[disabled] .mat-paginator-first,\n.blue-grey-deep-orange .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-progress-bar-background {\n  fill: #cfd8dc; }\n.blue-grey-deep-orange .mat-progress-bar-buffer {\n  background-color: #cfd8dc; }\n.blue-grey-deep-orange .mat-progress-bar-fill::after {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #ffccbc; }\n.blue-grey-deep-orange .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #ffccbc; }\n.blue-grey-deep-orange .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.blue-grey-deep-orange .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.blue-grey-deep-orange .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-progress-spinner circle, .blue-grey-deep-orange .mat-spinner circle {\n  stroke: #455a64; }\n.blue-grey-deep-orange .mat-progress-spinner.mat-accent circle, .blue-grey-deep-orange .mat-spinner.mat-accent circle {\n  stroke: #ff5722; }\n.blue-grey-deep-orange .mat-progress-spinner.mat-warn circle, .blue-grey-deep-orange .mat-spinner.mat-warn circle {\n  stroke: #e53935; }\n.blue-grey-deep-orange .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #455a64; }\n.blue-grey-deep-orange .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(69, 90, 100, 0.26); }\n.blue-grey-deep-orange .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ff5722; }\n.blue-grey-deep-orange .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(255, 87, 34, 0.26); }\n.blue-grey-deep-orange .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #e53935; }\n.blue-grey-deep-orange .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(229, 57, 53, 0.26); }\n.blue-grey-deep-orange .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.blue-grey-deep-orange .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.blue-grey-deep-orange .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-select-content, .blue-grey-deep-orange .mat-select-panel-done-animating {\n  background: white; }\n.blue-grey-deep-orange .mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.blue-grey-deep-orange .mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.blue-grey-deep-orange .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #455a64; }\n.blue-grey-deep-orange .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ff5722; }\n.blue-grey-deep-orange .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #e53935; }\n.blue-grey-deep-orange .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-drawer.mat-drawer-push {\n    background-color: white; }\n.blue-grey-deep-orange .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 87, 34, 0.5); }\n.blue-grey-deep-orange .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.blue-grey-deep-orange .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 87, 34, 0.12); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #607d8b; }\n.blue-grey-deep-orange .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(96, 125, 139, 0.5); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(96, 125, 139, 0.12); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.blue-grey-deep-orange .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.blue-grey-deep-orange .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.blue-grey-deep-orange .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.blue-grey-deep-orange .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.blue-grey-deep-orange .mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.blue-grey-deep-orange .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-primary .mat-slider-track-fill,\n.blue-grey-deep-orange .mat-primary .mat-slider-thumb,\n.blue-grey-deep-orange .mat-primary .mat-slider-thumb-label {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.blue-grey-deep-orange .mat-accent .mat-slider-track-fill,\n.blue-grey-deep-orange .mat-accent .mat-slider-thumb,\n.blue-grey-deep-orange .mat-accent .mat-slider-thumb-label {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-accent .mat-slider-thumb-label-text {\n  color: white; }\n.blue-grey-deep-orange .mat-warn .mat-slider-track-fill,\n.blue-grey-deep-orange .mat-warn .mat-slider-thumb,\n.blue-grey-deep-orange .mat-warn .mat-slider-thumb-label {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.blue-grey-deep-orange .mat-slider-focus-ring {\n  background-color: rgba(255, 87, 34, 0.2); }\n.blue-grey-deep-orange .mat-slider:hover .mat-slider-track-background,\n.blue-grey-deep-orange .cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-slider-disabled .mat-slider-track-background,\n.blue-grey-deep-orange .mat-slider-disabled .mat-slider-track-fill,\n.blue-grey-deep-orange .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.blue-grey-deep-orange .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.blue-grey-deep-orange .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.blue-grey-deep-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .blue-grey-deep-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .blue-grey-deep-orange .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.blue-grey-deep-orange .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.blue-grey-deep-orange .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.blue-grey-deep-orange .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.blue-grey-deep-orange .mat-step-header.cdk-keyboard-focused, .blue-grey-deep-orange .mat-step-header.cdk-program-focused, .blue-grey-deep-orange .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.blue-grey-deep-orange .mat-step-header .mat-step-label,\n.blue-grey-deep-orange .mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-step-header .mat-step-icon {\n  background-color: #455a64;\n  color: white; }\n.blue-grey-deep-orange .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.blue-grey-deep-orange .mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-stepper-horizontal, .blue-grey-deep-orange .mat-stepper-vertical {\n  background-color: white; }\n.blue-grey-deep-orange .mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-sort-header-arrow {\n  color: #757575; }\n.blue-grey-deep-orange .mat-tab-nav-bar,\n.blue-grey-deep-orange .mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.blue-grey-deep-orange .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.blue-grey-deep-orange .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.blue-grey-deep-orange .mat-tab-label, .blue-grey-deep-orange .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.blue-grey-deep-orange .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.blue-grey-deep-orange .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.blue-grey-deep-orange .mat-tab-group.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-group.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-grey-deep-orange .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(207, 216, 220, 0.3); }\n.blue-grey-deep-orange .mat-tab-group.mat-primary .mat-ink-bar, .blue-grey-deep-orange .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .blue-grey-deep-orange .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-group.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-grey-deep-orange .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 204, 188, 0.3); }\n.blue-grey-deep-orange .mat-tab-group.mat-accent .mat-ink-bar, .blue-grey-deep-orange .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .blue-grey-deep-orange .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-group.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-grey-deep-orange .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.blue-grey-deep-orange .mat-tab-group.mat-warn .mat-ink-bar, .blue-grey-deep-orange .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .blue-grey-deep-orange .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(207, 216, 220, 0.3); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-header, .blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-links, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #455a64; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-label, .blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-link, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-primary .mat-ripple-element, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 204, 188, 0.3); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-header, .blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-links, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #ff5722; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-label, .blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-link, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-accent .mat-ripple-element, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled), .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled),\n.blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-focused:not(.cdk-mouse-focused):not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-header, .blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-links, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #e53935; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-label, .blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-link, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.blue-grey-deep-orange .mat-tab-group.mat-background-warn .mat-ripple-element, .blue-grey-deep-orange .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.blue-grey-deep-orange .mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-toolbar.mat-primary {\n    background: #455a64;\n    color: white; }\n.blue-grey-deep-orange .mat-toolbar.mat-accent {\n    background: #ff5722;\n    color: white; }\n.blue-grey-deep-orange .mat-toolbar.mat-warn {\n    background: #e53935;\n    color: white; }\n.blue-grey-deep-orange .mat-toolbar .mat-form-field-underline,\n  .blue-grey-deep-orange .mat-toolbar .mat-form-field-ripple,\n  .blue-grey-deep-orange .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.blue-grey-deep-orange .mat-toolbar .mat-form-field-label,\n  .blue-grey-deep-orange .mat-toolbar .mat-focused .mat-form-field-label,\n  .blue-grey-deep-orange .mat-toolbar .mat-select-value,\n  .blue-grey-deep-orange .mat-toolbar .mat-select-arrow,\n  .blue-grey-deep-orange .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.blue-grey-deep-orange .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.blue-grey-deep-orange .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.blue-grey-deep-orange .mat-tree {\n  background: white; }\n.blue-grey-deep-orange .mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.blue-grey-deep-orange .mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.blue-grey-deep-orange .mat-simple-snackbar-action {\n  color: #ff5722; }\nmat-nav-list [mat-list-item].active mat-icon[matListAvatar] {\n  background-color: #039be5;\n  color: white; }\nmat-nav-list [mat-list-item].active mat-icon[matListIcon] {\n  color: #039be5; }\nnav a {\n  line-height: 4;\n  display: block; }\nnav a:not(.active) {\n    color: rgba(255, 255, 255, 0.56); }\nnav a.active {\n    color: #039be5;\n    border-bottom: 1px solid #039be5; }\na {\n  text-decoration: none; }\n.mat-progress-spinner {\n  display: inline-block; }\n:host #login {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background: url(\"/assets/images/backgrounds/march.jpg\") no-repeat;\n  background-size: cover;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n:host #login #login-form-wrapper {\n    flex: 1 0 auto;\n    padding: 32px; }\n@media screen and (max-width: 599px) {\n      :host #login #login-form-wrapper {\n        padding: 16px; } }\n:host #login #login-form-wrapper #login-form {\n      width: 534px;\n      max-width: 534px;\n      padding: 32px;\n      background: #FFFFFF;\n      text-align: center;\n      box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12); }\n@media screen and (max-width: 599px) {\n        :host #login #login-form-wrapper #login-form {\n          padding: 24px;\n          width: 100%; } }\n:host #login #login-form-wrapper #login-form .logo {\n        width: 128px;\n        margin: 32px auto; }\n:host #login #login-form-wrapper #login-form .title {\n        font-size: 20px;\n        margin: 16px 0 32px 0; }\n:host #login #login-form-wrapper #login-form form {\n        width: 100%;\n        text-align: left; }\n:host #login #login-form-wrapper #login-form form mat-form-field {\n          width: 100%; }\n:host #login #login-form-wrapper #login-form form mat-checkbox {\n          margin: 0; }\n:host #login #login-form-wrapper #login-form form .remember-forgot-password {\n          font-size: 13px;\n          margin-top: 8px; }\n:host #login #login-form-wrapper #login-form form .remember-forgot-password .remember-me {\n            margin-bottom: 16px; }\n:host #login #login-form-wrapper #login-form form .remember-forgot-password .forgot-password {\n            font-size: 13px;\n            font-weight: 500;\n            margin-bottom: 16px; }\n:host #login #login-form-wrapper #login-form form .submit-button {\n          width: 420px;\n          margin: 16px auto;\n          display: block; }\n@media screen and (max-width: 599px) {\n            :host #login #login-form-wrapper #login-form form .submit-button {\n              width: 90%; } }\n:host #login #login-form-wrapper #login-form .register {\n        margin: 32px auto 24px auto;\n        font-weight: 500; }\n:host #login #login-form-wrapper #login-form .register .text {\n          margin-right: 8px; }\n:host #login #login-form-wrapper #login-form .separator {\n        font-size: 15px;\n        font-weight: 600;\n        margin: 24px auto;\n        position: relative;\n        overflow: hidden;\n        width: 100px;\n        color: rgba(0, 0, 0, 0.54); }\n:host #login #login-form-wrapper #login-form .separator .text {\n          display: inline-flex;\n          position: relative;\n          padding: 0 8px;\n          z-index: 9999; }\n:host #login #login-form-wrapper #login-form .separator .text:before, :host #login #login-form-wrapper #login-form .separator .text:after {\n            content: '';\n            display: block;\n            width: 30px;\n            position: absolute;\n            top: 10px;\n            border-top: 1px solid rgba(0, 0, 0, 0.12); }\n:host #login #login-form-wrapper #login-form .separator .text:before {\n            right: 100%; }\n:host #login #login-form-wrapper #login-form .separator .text:after {\n            left: 100%; }\n@media screen and (max-width: 599px) {\n        :host #login #login-form-wrapper #login-form button {\n          width: 80%; } }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: USER_STATUS_CODES, LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_STATUS_CODES", function() { return USER_STATUS_CODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _lib_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/animations */ "./src/lib/animations/index.ts");
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/auth */ "./src/lib/auth/index.ts");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../login/login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var USER_STATUS_CODES = {
    400: 'User already exists',
    401: 'Invalid credentials',
    500: 'Something went wrong...'
};
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, 
    // private readonly i18nStore: Store<I18NState>,
    translate, _cd, _loginService, _router, formBuilder) {
        this.auth = auth;
        this.translate = translate;
        this._cd = _cd;
        this._loginService = _loginService;
        this._router = _router;
        this.formBuilder = formBuilder;
        this.title = 'Login';
        this.usrPwd = '';
        this.username = '';
        this.password = '';
        this.lt = '';
        this.logo = '';
        this.authType = '';
        this.jsDebug = '';
        this.openRegister = false;
        this.languages = [];
        /**
         * Boolean used in telling the UI
         * that the form has been submitted
         * and is awaiting a response
         */
        this.submitted = false;
        translate.setDefaultLang('en');
        translate.use('en');
        this.loginFormErrors = {
            username: {},
            password: {}
        };
        // this.translatePipe=new TranslatePipe(translate,_cd);
        //  console.log(this.translatePipe.transform('LOGIN.USERNAME'));
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.auth.isAuthenticated) {
            this._router.navigateByUrl(this.auth.defaultUrl);
        }
        else {
            this.loginForm = this.formBuilder.group({
                username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(64)])],
                password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(32)])]
            });
            this.loginForm.valueChanges.subscribe(function () {
                _this.onLoginFormValuesChanged();
            });
        }
    };
    LoginComponent.prototype.authenticated = function () {
        if (this.authenticatedObs) {
            return this.authenticatedObs;
        }
        this.authenticatedObs = this._loginService.authenticated()
            .map(function (data) { return data.authenticated; });
        return this.authenticatedObs;
    };
    LoginComponent.prototype.register = function () {
        this._router.navigate(['/register']);
    };
    LoginComponent.prototype.langSelect = function (selected) {
        var _this = this;
        var val = selected.value;
        // const i18n=this._config.getSettings('i18n');
        // i18n.currentLanguage=val;
        this._loginService.getConfig().subscribe(function (result) {
            //   i18n.languages= result.i18n.languages;
            _this.languages = result.i18n.languages;
        }, function (error) {
            _this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
        });
        // this.i18nStore.dispatch(new LANGUAGE_ACTIONS.Init(val));
        // this.i18nStore.dispatch(new LANGUAGE_ACTIONS.UseLanguage(val));
        //  this.i18nStore.dispatch(new LANGUAGE_ACTIONS.LoadLanguage('login'));
        this._router.navigate(['/login']);
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.errorDiagnostic = null;
        var usrPwd = this.loginForm.value.password;
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["URLSearchParams"]();
        params.append('usrMail', this.loginForm.value.username);
        params.append('usrPwd', usrPwd);
        params.append('lt', this.lt);
        this._loginService.login(params).subscribe(function (data) {
            if (data.success) {
                _this._router.initialNavigation();
                _this._router.navigate(['/']);
            }
            else {
                _this.submitted = false;
                _this.errorDiagnostic = data.message;
            }
        }, function (error) {
            _this.submitted = false;
            _this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.loginServiceSub) {
            this.loginServiceSub.unsubscribe();
        }
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    };
    LoginComponent.prototype.onLoginFormValuesChanged = function () {
        for (var field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }
            this.loginFormErrors[field] = {};
            var control = this.loginForm.get(field);
            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dotos-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")],
            animations: _lib_animations__WEBPACK_IMPORTED_MODULE_4__["extAnimations"]
        }),
        __metadata("design:paramtypes", [_lib_auth__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _login_login_service__WEBPACK_IMPORTED_MODULE_6__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.service.ts":
/*!****************************************!*\
  !*** ./src/app/login/login.service.ts ***!
  \****************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_add_observable_throw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/observable/throw */ "./node_modules/rxjs-compat/_esm5/add/observable/throw.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginService = /** @class */ (function () {
    //  private _userExistsApi = this._apiBase + '/api/users/exists';
    function LoginService(http) {
        this.http = http;
        this._loginApi = '/api/login';
        this._logoutApi = '/api/logout';
        this._authenticatedApi = '/api/login';
        this._configApi = '/api/login/config';
        this._registerApi = '/api/register';
    }
    LoginService.prototype.login = function (params) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this._loginApi, params, { headers: headers, withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.getConfig = function () {
        return this.http.get(this._configApi, { withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.authenticated = function () {
        return this.http.get(this._authenticatedApi, { withCredentials: true })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LoginService.prototype.logout = function () {
        return this.http.get(this._logoutApi, { withCredentials: true })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LoginService.prototype.register = function (user) {
        var body = JSON.stringify(user);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._registerApi, body, { headers: headers, withCredentials: true })
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    LoginService.prototype.handleError = function (error) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error || 'Server Error');
    };
    LoginService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], LoginService);
    return LoginService;
}());



/***/ }),

/***/ "./src/app/routing.module.ts":
/*!***********************************!*\
  !*** ./src/app/routing.module.ts ***!
  \***********************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _login_authenticated_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/authenticated.guard */ "./src/app/login/authenticated.guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'home', loadChildren: './layout/layout.module#LayoutModule' },
    {
        path: 'apps',
        loadChildren: 'app/dictionary/item-input.module#ItemInputModule',
        canActivate: [_login_authenticated_guard__WEBPACK_IMPORTED_MODULE_3__["AuthenticatedGuard"]],
        data: {
            i18n: {
                isRoot: true
            }
        }
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
        data: {
            meta: {
                title: 'PUBLIC.LOGIN.PAGE_TITLE'
            }
        }
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _lib_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/i18n */ "./src/lib/i18n/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// angular







var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]
            ],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _lib_i18n__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_2__["HttpModule"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/lib/animations/animations.ts":
/*!******************************************!*\
  !*** ./src/lib/animations/animations.ts ***!
  \******************************************/
/*! exports provided: extAnimations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extAnimations", function() { return extAnimations; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
// tslint:disable-next-line:max-line-length

var customAnimation = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animation"])([
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: '{{opacity}}',
        transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])('*'))
], {
    params: {
        duration: '200ms',
        delay: '0ms',
        opacity: '0',
        scale: '1',
        x: '0',
        y: '0',
        z: '0'
    }
});
var extAnimations = [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('animate', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["useAnimation"])(customAnimation)])]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('animateStagger', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('50', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])('*')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('100', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])('*')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('200', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])('*')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => 50', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('@*', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["stagger"])('50ms', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()
            ])
        ], { optional: true })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => 100', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('@*', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["stagger"])('100ms', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()
            ])
        ], { optional: true })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => 200', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('@*', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["stagger"])('200ms', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()
            ])
        ], { optional: true }))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('fadeInOut', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('0', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            display: 'none',
            opacity: 0
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('1', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            display: 'block',
            opacity: 1
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('1 => 0', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms ease-out')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('0 => 1', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms ease-in'))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('slideInOut', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('0', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            height: '0px',
            display: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('1', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            height: '*',
            display: 'block'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('1 => 0', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms ease-out')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('0 => 1', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms ease-in'))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('slideInLeft', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateX(-100%)',
            display: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateX(0)',
            display: 'flex'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms'))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('slideInRight', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateX(100%)',
            display: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateX(0)',
            display: 'flex'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms'))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('slideInTop', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateY(-100%)',
            display: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateY(0)',
            display: 'flex'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms'))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('slideInBottom', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateY(100%)',
            display: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            transform: 'translateY(0)',
            display: 'flex'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms')),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms'))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransitionLeft', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => *', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter, dotos-content > :leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'translateX(100%)',
                    opacity: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["sequence"])([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateX(0)',
                            opacity: 1
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateX(-100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateX(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true })
            ])
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransitionRight', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => *', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter, dotos-content > :leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'translateX(-100%)',
                    opacity: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["sequence"])([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateX(0)',
                            opacity: 1
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateX(100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateX(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true })
            ])
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransitionUp', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => *', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter, dotos-content > :leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'translateY(100%)',
                    opacity: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                        transform: 'translateY(0)',
                        opacity: 1
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                        transform: 'translateY(-100%)',
                        opacity: 0
                    }))
                ], { optional: true }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(100%)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                        transform: 'translateY(0%)',
                        opacity: 1
                    }))
                ], { optional: true })
            ]),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true })
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransitionDown', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => *', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter, dotos-content > :leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    transform: 'translateY(-100%)',
                    opacity: 0
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["sequence"])([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateY(0)',
                            opacity: 1
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateY(100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(-100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                            transform: 'translateY(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true })
            ])
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransitionFade', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter, dotos-content > :leave ', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    opacity: 0,
                })
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    opacity: 1
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    opacity: 0
                }))
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    opacity: 0
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms cubic-bezier(0.0, 0.0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    opacity: 1
                }))
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('dotos-content > :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])(), { optional: true })
        ]))
    ])
];


/***/ }),

/***/ "./src/lib/animations/index.ts":
/*!*************************************!*\
  !*** ./src/lib/animations/index.ts ***!
  \*************************************/
/*! exports provided: extAnimations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations */ "./src/lib/animations/animations.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extAnimations", function() { return _animations__WEBPACK_IMPORTED_MODULE_0__["extAnimations"]; });




/***/ }),

/***/ "./src/lib/auth/auth-server.guard.ts":
/*!*******************************************!*\
  !*** ./src/lib/auth/auth-server.guard.ts ***!
  \*******************************************/
/*! exports provided: AuthServerGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthServerGuard", function() { return AuthServerGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// angular

var AuthServerGuard = /** @class */ (function () {
    function AuthServerGuard() {
    }
    AuthServerGuard.prototype.canActivate = function (route, state) {
        return false;
    };
    AuthServerGuard.prototype.canActivateChild = function (route, state) {
        return false;
    };
    AuthServerGuard.prototype.canLoad = function (route) {
        return false;
    };
    AuthServerGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], AuthServerGuard);
    return AuthServerGuard;
}());



/***/ }),

/***/ "./src/lib/auth/auth-server.service.ts":
/*!*********************************************!*\
  !*** ./src/lib/auth/auth-server.service.ts ***!
  \*********************************************/
/*! exports provided: AuthServerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthServerService", function() { return AuthServerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// angular

// libs



var AuthServerService = /** @class */ (function () {
    function AuthServerService() {
    }
    Object.defineProperty(AuthServerService.prototype, "token", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthServerService.prototype, "redirectUrl", {
        get: function () {
            return undefined;
        },
        set: function (value) {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthServerService.prototype, "defaultUrl", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthServerService.prototype, "isAuthenticated", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AuthServerService.prototype.authenticate = function (username, password) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(false);
    };
    AuthServerService.prototype.invalidate = function () {
        return;
    };
    AuthServerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], AuthServerService);
    return AuthServerService;
}());



/***/ }),

/***/ "./src/lib/auth/auth.guard.ts":
/*!************************************!*\
  !*** ./src/lib/auth/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.loader */ "./src/lib/auth/auth.loader.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/lib/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// angular


// module


var AuthGuard = /** @class */ (function () {
    function AuthGuard(loader, auth, router) {
        this.loader = loader;
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.handleAuth(url);
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AuthGuard.prototype.canLoad = function (route) {
        var url = "/" + route.path;
        return this.handleAuth(url);
    };
    AuthGuard.prototype.handleAuth = function (url) {
        if (this.auth.isAuthenticated) {
            return true;
        }
        this.auth.redirectUrl = url;
        this.router.navigate(this.loader.loginRoute);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_loader__WEBPACK_IMPORTED_MODULE_2__["AuthLoader"],
            _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/lib/auth/auth.loader.ts":
/*!*************************************!*\
  !*** ./src/lib/auth/auth.loader.ts ***!
  \*************************************/
/*! exports provided: AuthLoader, AuthStaticLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLoader", function() { return AuthLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthStaticLoader", function() { return AuthStaticLoader; });
var AuthLoader = /** @class */ (function () {
    function AuthLoader() {
    }
    return AuthLoader;
}());

var AuthStaticLoader = /** @class */ (function () {
    function AuthStaticLoader(providedSettings) {
        if (providedSettings === void 0) { providedSettings = {
            backend: {
                endpoint: '/api/authenticate',
                params: []
            },
            storage: localStorage,
            storageKey: 'currentUser',
            loginRoute: ['login'],
            defaultUrl: ''
        }; }
        this.providedSettings = providedSettings;
    }
    Object.defineProperty(AuthStaticLoader.prototype, "backend", {
        get: function () {
            return this.providedSettings.backend;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthStaticLoader.prototype, "storage", {
        get: function () {
            return this.providedSettings.storage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthStaticLoader.prototype, "storageKey", {
        get: function () {
            return this.providedSettings.storageKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthStaticLoader.prototype, "loginRoute", {
        get: function () {
            return this.providedSettings.loginRoute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthStaticLoader.prototype, "defaultUrl", {
        get: function () {
            return this.providedSettings.defaultUrl;
        },
        enumerable: true,
        configurable: true
    });
    return AuthStaticLoader;
}());



/***/ }),

/***/ "./src/lib/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/lib/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _auth_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.loader */ "./src/lib/auth/auth.loader.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// angular




// module

var AuthService = /** @class */ (function () {
    function AuthService(loader, router, http) {
        this.loader = loader;
        this.router = router;
        this.http = http;
        this.getUrlSearchParams = function (params) {
            var res = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var item = params_1[_i];
                res.append(item.key, item.value);
            }
            return res;
        };
        var currentUser = JSON.parse(this.loader.storage.getItem(this.loader.storageKey) || '{}');
        this._token = currentUser && currentUser.token;
    }
    Object.defineProperty(AuthService.prototype, "token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "redirectUrl", {
        get: function () {
            return this._redirectUrl;
        },
        set: function (value) {
            this._redirectUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "defaultUrl", {
        get: function () {
            return this.loader.defaultUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return !!this.loader.storage.getItem(this.loader.storageKey);
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.authenticate = function (username, password) {
        var _this = this;
        var params = this.getUrlSearchParams(this.loader.backend.params);
        return this.http.post(this.loader.backend.endpoint, JSON.stringify({
            username: username,
            password: password
        }), { search: params })
            .map(function (response) {
            var token = response.json() && response.json().token;
            if (token) {
                _this._token = token;
                _this.loader.storage.setItem(_this.loader.storageKey, JSON.stringify({
                    username: username,
                    token: token
                }));
                _this.router.navigateByUrl(_this._redirectUrl || _this.loader.defaultUrl);
                return true;
            }
            return false;
        });
    };
    AuthService.prototype.invalidate = function () {
        this._token = undefined;
        this.loader.storage.removeItem(this.loader.storageKey);
        this.router.navigate(this.loader.loginRoute);
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_loader__WEBPACK_IMPORTED_MODULE_4__["AuthLoader"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/lib/auth/index.ts":
/*!*******************************!*\
  !*** ./src/lib/auth/index.ts ***!
  \*******************************/
/*! exports provided: AUTH_FORROOT_GUARD, authFactory, AuthModule, provideForRootGuard, AuthGuard, AuthLoader, AuthStaticLoader, AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTH_FORROOT_GUARD", function() { return AUTH_FORROOT_GUARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authFactory", function() { return authFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provideForRootGuard", function() { return provideForRootGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.guard */ "./src/lib/auth/auth.guard.ts");
/* harmony import */ var _auth_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.loader */ "./src/lib/auth/auth.loader.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/lib/auth/auth.service.ts");
/* harmony import */ var _auth_server_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-server.guard */ "./src/lib/auth/auth-server.guard.ts");
/* harmony import */ var _auth_server_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-server.service */ "./src/lib/auth/auth-server.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthLoader", function() { return _auth_loader__WEBPACK_IMPORTED_MODULE_2__["AuthLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthStaticLoader", function() { return _auth_loader__WEBPACK_IMPORTED_MODULE_2__["AuthStaticLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]; });

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// angular









var AUTH_FORROOT_GUARD = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('AUTH_FORROOT_GUARD');
// for AoT compilation
function authFactory() {
    return new _auth_loader__WEBPACK_IMPORTED_MODULE_2__["AuthStaticLoader"]();
}
var AuthModule = /** @class */ (function () {
    function AuthModule(guard) {
        // NOTE: inject token
    }
    AuthModule_1 = AuthModule;
    AuthModule.forRoot = function (configuredProvider) {
        if (configuredProvider === void 0) { configuredProvider = {
            provide: _auth_loader__WEBPACK_IMPORTED_MODULE_2__["AuthLoader"],
            useFactory: (authFactory)
        }; }
        return {
            ngModule: AuthModule_1,
            providers: [
                configuredProvider
            ]
        };
    };
    AuthModule.forChild = function () {
        return {
            ngModule: AuthModule_1
        };
    };
    AuthModule.forServer = function () {
        return {
            ngModule: AuthModule_1,
            providers: [
                {
                    provide: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
                    useClass: _auth_server_service__WEBPACK_IMPORTED_MODULE_5__["AuthServerService"]
                },
                {
                    provide: _auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"],
                    useClass: _auth_server_guard__WEBPACK_IMPORTED_MODULE_4__["AuthServerGuard"]
                }
            ]
        };
    };
    AuthModule = AuthModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            providers: [
                _auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"],
                _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
                {
                    provide: _auth_loader__WEBPACK_IMPORTED_MODULE_2__["AuthLoader"],
                    useFactory: (authFactory)
                }
            ]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()), __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(AUTH_FORROOT_GUARD)),
        __metadata("design:paramtypes", [Object])
    ], AuthModule);
    return AuthModule;
    var AuthModule_1;
}());

function provideForRootGuard(settings) {
    if (settings) {
        throw new Error('AuthModule.forRoot() already called. Child modules should use AuthModule.forChild() instead.');
    }
    return 'guarded';
}


/***/ }),

/***/ "./src/lib/i18n/index.ts":
/*!*******************************!*\
  !*** ./src/lib/i18n/index.ts ***!
  \*******************************/
/*! exports provided: TranslateModule, TranslateLoader, TranslateFakeLoader, USE_STORE, USE_DEFAULT_LANG, TranslateService, MissingTranslationHandler, FakeMissingTranslationHandler, TranslateParser, TranslateDefaultParser, TranslateCompiler, TranslateFakeCompiler, TranslateDirective, TranslatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateModule", function() { return TranslateModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _translate_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translate.loader */ "./src/lib/i18n/translate.loader.ts");
/* harmony import */ var _translate_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translate.service */ "./src/lib/i18n/translate.service.ts");
/* harmony import */ var _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./missing-translation-handler */ "./src/lib/i18n/missing-translation-handler.ts");
/* harmony import */ var _translate_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translate.parser */ "./src/lib/i18n/translate.parser.ts");
/* harmony import */ var _translate_compiler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./translate.compiler */ "./src/lib/i18n/translate.compiler.ts");
/* harmony import */ var _translate_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./translate.directive */ "./src/lib/i18n/translate.directive.ts");
/* harmony import */ var _translate_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./translate.pipe */ "./src/lib/i18n/translate.pipe.ts");
/* harmony import */ var _translate_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./translate.store */ "./src/lib/i18n/translate.store.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateLoader", function() { return _translate_loader__WEBPACK_IMPORTED_MODULE_1__["TranslateLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateFakeLoader", function() { return _translate_loader__WEBPACK_IMPORTED_MODULE_1__["TranslateFakeLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "USE_STORE", function() { return _translate_service__WEBPACK_IMPORTED_MODULE_2__["USE_STORE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "USE_DEFAULT_LANG", function() { return _translate_service__WEBPACK_IMPORTED_MODULE_2__["USE_DEFAULT_LANG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateService", function() { return _translate_service__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MissingTranslationHandler", function() { return _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__["MissingTranslationHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FakeMissingTranslationHandler", function() { return _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__["FakeMissingTranslationHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateParser", function() { return _translate_parser__WEBPACK_IMPORTED_MODULE_4__["TranslateParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateDefaultParser", function() { return _translate_parser__WEBPACK_IMPORTED_MODULE_4__["TranslateDefaultParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateCompiler", function() { return _translate_compiler__WEBPACK_IMPORTED_MODULE_5__["TranslateCompiler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateFakeCompiler", function() { return _translate_compiler__WEBPACK_IMPORTED_MODULE_5__["TranslateFakeCompiler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslateDirective", function() { return _translate_directive__WEBPACK_IMPORTED_MODULE_6__["TranslateDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TranslatePipe", function() { return _translate_pipe__WEBPACK_IMPORTED_MODULE_7__["TranslatePipe"]; });

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var TranslateModule = /** @class */ (function () {
    function TranslateModule() {
    }
    TranslateModule_1 = TranslateModule;
    /**
     * Use this method in your root module to provide the TranslateService
     * @param {TranslateModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    TranslateModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TranslateModule_1,
            providers: [
                config.loader || { provide: _translate_loader__WEBPACK_IMPORTED_MODULE_1__["TranslateLoader"], useClass: _translate_loader__WEBPACK_IMPORTED_MODULE_1__["TranslateFakeLoader"] },
                config.compiler || { provide: _translate_compiler__WEBPACK_IMPORTED_MODULE_5__["TranslateCompiler"], useClass: _translate_compiler__WEBPACK_IMPORTED_MODULE_5__["TranslateFakeCompiler"] },
                config.parser || { provide: _translate_parser__WEBPACK_IMPORTED_MODULE_4__["TranslateParser"], useClass: _translate_parser__WEBPACK_IMPORTED_MODULE_4__["TranslateDefaultParser"] },
                config.missingTranslationHandler || { provide: _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__["MissingTranslationHandler"], useClass: _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__["FakeMissingTranslationHandler"] },
                _translate_store__WEBPACK_IMPORTED_MODULE_8__["TranslateStore"],
                { provide: _translate_service__WEBPACK_IMPORTED_MODULE_2__["USE_STORE"], useValue: config.isolate },
                { provide: _translate_service__WEBPACK_IMPORTED_MODULE_2__["USE_DEFAULT_LANG"], useValue: config.useDefaultLang },
                _translate_service__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]
            ]
        };
    };
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {TranslateModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    TranslateModule.forChild = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TranslateModule_1,
            providers: [
                config.loader || { provide: _translate_loader__WEBPACK_IMPORTED_MODULE_1__["TranslateLoader"], useClass: _translate_loader__WEBPACK_IMPORTED_MODULE_1__["TranslateFakeLoader"] },
                config.compiler || { provide: _translate_compiler__WEBPACK_IMPORTED_MODULE_5__["TranslateCompiler"], useClass: _translate_compiler__WEBPACK_IMPORTED_MODULE_5__["TranslateFakeCompiler"] },
                config.parser || { provide: _translate_parser__WEBPACK_IMPORTED_MODULE_4__["TranslateParser"], useClass: _translate_parser__WEBPACK_IMPORTED_MODULE_4__["TranslateDefaultParser"] },
                config.missingTranslationHandler || { provide: _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__["MissingTranslationHandler"], useClass: _missing_translation_handler__WEBPACK_IMPORTED_MODULE_3__["FakeMissingTranslationHandler"] },
                { provide: _translate_service__WEBPACK_IMPORTED_MODULE_2__["USE_STORE"], useValue: config.isolate },
                { provide: _translate_service__WEBPACK_IMPORTED_MODULE_2__["USE_DEFAULT_LANG"], useValue: config.useDefaultLang },
                _translate_service__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]
            ]
        };
    };
    TranslateModule = TranslateModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _translate_pipe__WEBPACK_IMPORTED_MODULE_7__["TranslatePipe"],
                _translate_directive__WEBPACK_IMPORTED_MODULE_6__["TranslateDirective"]
            ],
            exports: [
                _translate_pipe__WEBPACK_IMPORTED_MODULE_7__["TranslatePipe"],
                _translate_directive__WEBPACK_IMPORTED_MODULE_6__["TranslateDirective"]
            ]
        })
    ], TranslateModule);
    return TranslateModule;
    var TranslateModule_1;
}());



/***/ }),

/***/ "./src/lib/i18n/missing-translation-handler.ts":
/*!*****************************************************!*\
  !*** ./src/lib/i18n/missing-translation-handler.ts ***!
  \*****************************************************/
/*! exports provided: MissingTranslationHandler, FakeMissingTranslationHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissingTranslationHandler", function() { return MissingTranslationHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeMissingTranslationHandler", function() { return FakeMissingTranslationHandler; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MissingTranslationHandler = /** @class */ (function () {
    function MissingTranslationHandler() {
    }
    return MissingTranslationHandler;
}());

/**
 * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
 */
var FakeMissingTranslationHandler = /** @class */ (function () {
    function FakeMissingTranslationHandler() {
    }
    FakeMissingTranslationHandler.prototype.handle = function (params) {
        return params.key;
    };
    FakeMissingTranslationHandler = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], FakeMissingTranslationHandler);
    return FakeMissingTranslationHandler;
}());



/***/ }),

/***/ "./src/lib/i18n/translate.compiler.ts":
/*!********************************************!*\
  !*** ./src/lib/i18n/translate.compiler.ts ***!
  \********************************************/
/*! exports provided: TranslateCompiler, TranslateFakeCompiler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateCompiler", function() { return TranslateCompiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateFakeCompiler", function() { return TranslateFakeCompiler; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TranslateCompiler = /** @class */ (function () {
    function TranslateCompiler() {
    }
    return TranslateCompiler;
}());

/**
 * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
 */
var TranslateFakeCompiler = /** @class */ (function (_super) {
    __extends(TranslateFakeCompiler, _super);
    function TranslateFakeCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateFakeCompiler.prototype.compile = function (value, lang) {
        return value;
    };
    TranslateFakeCompiler.prototype.compileTranslations = function (translations, lang) {
        return translations;
    };
    TranslateFakeCompiler = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], TranslateFakeCompiler);
    return TranslateFakeCompiler;
}(TranslateCompiler));



/***/ }),

/***/ "./src/lib/i18n/translate.directive.ts":
/*!*********************************************!*\
  !*** ./src/lib/i18n/translate.directive.ts ***!
  \*********************************************/
/*! exports provided: TranslateDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateDirective", function() { return TranslateDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/lib/i18n/util.ts");
/* harmony import */ var _translate_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translate.service */ "./src/lib/i18n/translate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TranslateDirective = /** @class */ (function () {
    function TranslateDirective(translateService, element, _ref) {
        var _this = this;
        this.translateService = translateService;
        this.element = element;
        this._ref = _ref;
        // subscribe to onTranslationChange event, in case the translations of the current lang change
        if (!this.onTranslationChangeSub) {
            this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe(function (event) {
                if (event.lang === _this.translateService.currentLang) {
                    _this.checkNodes(true, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChangeSub) {
            this.onLangChangeSub = this.translateService.onLangChange.subscribe(function (event) {
                _this.checkNodes(true, event.translations);
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe(function (event) {
                _this.checkNodes(true);
            });
        }
    }
    Object.defineProperty(TranslateDirective.prototype, "translate", {
        set: function (key) {
            if (key) {
                this.key = key;
                this.checkNodes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateDirective.prototype, "translateParams", {
        set: function (params) {
            if (!Object(_util__WEBPACK_IMPORTED_MODULE_1__["equals"])(this.currentParams, params)) {
                this.currentParams = params;
                this.checkNodes(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    TranslateDirective.prototype.ngAfterViewChecked = function () {
        this.checkNodes();
    };
    TranslateDirective.prototype.checkNodes = function (forceUpdate, translations) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        var nodes = this.element.nativeElement.childNodes;
        // if the element is empty
        if (!nodes.length) {
            // we add the key as content
            this.setContent(this.element.nativeElement, this.key);
            nodes = this.element.nativeElement.childNodes;
        }
        for (var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            if (node.nodeType === 3) {
                var key = void 0;
                if (this.key) {
                    key = this.key;
                    if (forceUpdate) {
                        node.lastKey = null;
                    }
                }
                else {
                    var content = this.getContent(node).trim();
                    if (content.length) {
                        // we want to use the content as a key, not the translation value
                        if (content !== node.currentValue) {
                            key = content;
                            // the content was changed from the user, we'll use it as a reference if needed
                            node.originalContent = this.getContent(node);
                        }
                        else if (node.originalContent && forceUpdate) {
                            node.lastKey = null;
                            // the current content is the translation, not the key, use the last real content as key
                            key = node.originalContent.trim();
                        }
                    }
                }
                this.updateValue(key, node, translations);
            }
        }
    };
    TranslateDirective.prototype.updateValue = function (key, node, translations) {
        var _this = this;
        if (key) {
            if (node.lastKey === key && this.lastParams === this.currentParams) {
                return;
            }
            this.lastParams = this.currentParams;
            var onTranslation = function (res) {
                if (res !== key) {
                    node.lastKey = key;
                }
                if (!node.originalContent) {
                    node.originalContent = _this.getContent(node);
                }
                node.currentValue = Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(res) ? res : (node.originalContent || key);
                // we replace in the original content to preserve spaces that we might have trimmed
                _this.setContent(node, _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                _this._ref.markForCheck();
            };
            if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(translations)) {
                var res = this.translateService.getParsedResult(translations, key, this.currentParams);
                if (typeof res.subscribe === 'function') {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            else {
                this.translateService.get(key, this.currentParams).subscribe(onTranslation);
            }
        }
    };
    TranslateDirective.prototype.getContent = function (node) {
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(node.textContent) ? node.textContent : node.data;
    };
    TranslateDirective.prototype.setContent = function (node, content) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(node.textContent)) {
            node.textContent = content;
        }
        else {
            node.data = content;
        }
    };
    TranslateDirective.prototype.ngOnDestroy = function () {
        if (this.onLangChangeSub) {
            this.onLangChangeSub.unsubscribe();
        }
        if (this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub.unsubscribe();
        }
        if (this.onTranslationChangeSub) {
            this.onTranslationChangeSub.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TranslateDirective.prototype, "translate", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TranslateDirective.prototype, "translateParams", null);
    TranslateDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[translate],[ngx-translate]'
        }),
        __metadata("design:paramtypes", [_translate_service__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], TranslateDirective);
    return TranslateDirective;
}());



/***/ }),

/***/ "./src/lib/i18n/translate.loader.ts":
/*!******************************************!*\
  !*** ./src/lib/i18n/translate.loader.ts ***!
  \******************************************/
/*! exports provided: TranslateLoader, TranslateFakeLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateLoader", function() { return TranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateFakeLoader", function() { return TranslateFakeLoader; });
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TranslateLoader = /** @class */ (function () {
    function TranslateLoader() {
    }
    return TranslateLoader;
}());

/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
var TranslateFakeLoader = /** @class */ (function (_super) {
    __extends(TranslateFakeLoader, _super);
    function TranslateFakeLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateFakeLoader.prototype.getTranslation = function (lang, dir) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"].of({});
    };
    TranslateFakeLoader = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], TranslateFakeLoader);
    return TranslateFakeLoader;
}(TranslateLoader));



/***/ }),

/***/ "./src/lib/i18n/translate.parser.ts":
/*!******************************************!*\
  !*** ./src/lib/i18n/translate.parser.ts ***!
  \******************************************/
/*! exports provided: TranslateParser, TranslateDefaultParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateParser", function() { return TranslateParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateDefaultParser", function() { return TranslateDefaultParser; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/lib/i18n/util.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TranslateParser = /** @class */ (function () {
    function TranslateParser() {
    }
    return TranslateParser;
}());

var TranslateDefaultParser = /** @class */ (function (_super) {
    __extends(TranslateDefaultParser, _super);
    function TranslateDefaultParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
        return _this;
    }
    TranslateDefaultParser.prototype.interpolate = function (expr, params) {
        var result;
        if (typeof expr === 'string') {
            result = this.interpolateString(expr, params);
        }
        else if (typeof expr === 'function') {
            result = this.interpolateFunction(expr, params);
        }
        else {
            // this should not happen, but an unrelated TranslateService test depends on it
            result = expr;
        }
        return result;
    };
    TranslateDefaultParser.prototype.getValue = function (target, key) {
        var keys = key.split('.');
        key = '';
        do {
            key += keys.shift();
            if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(target) && Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            }
            else if (!keys.length) {
                target = undefined;
            }
            else {
                key += '.';
            }
        } while (keys.length);
        return target;
    };
    TranslateDefaultParser.prototype.interpolateFunction = function (fn, params) {
        return fn(params);
    };
    TranslateDefaultParser.prototype.interpolateString = function (expr, params) {
        var _this = this;
        if (!params) {
            return expr;
        }
        return expr.replace(this.templateMatcher, function (substring, b) {
            var r = _this.getValue(params, b);
            return Object(_util__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(r) ? r : substring;
        });
    };
    TranslateDefaultParser = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], TranslateDefaultParser);
    return TranslateDefaultParser;
}(TranslateParser));



/***/ }),

/***/ "./src/lib/i18n/translate.pipe.ts":
/*!****************************************!*\
  !*** ./src/lib/i18n/translate.pipe.ts ***!
  \****************************************/
/*! exports provided: TranslatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslatePipe", function() { return TranslatePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _translate_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translate.service */ "./src/lib/i18n/translate.service.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/lib/i18n/util.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
    }
    TranslatePipe.prototype.updateValue = function (key, interpolateParams, translations) {
        var _this = this;
        var onTranslation = function (res) {
            _this.value = res !== undefined ? res : key;
            _this.lastKey = key;
            _this._ref.markForCheck();
        };
        if (translations) {
            var res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    };
    TranslatePipe.prototype.transform = function (query) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!query || query.length === 0) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["equals"])(query, this.lastKey) && Object(_util__WEBPACK_IMPORTED_MODULE_2__["equals"])(args, this.lastParams)) {
            return this.value;
        }
        var interpolateParams;
        if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                var validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        // store the query, in case it changes
        this.lastKey = query;
        // store the params, in case they change
        this.lastParams = args;
        // set the value
        this.updateValue(query, interpolateParams);
        // if there is a subscription to onLangChange, clean it
        this._dispose();
        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                if (_this.lastKey && event.lang === _this.translate.currentLang) {
                    _this.lastKey = null;
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams);
                }
            });
        }
        return this.value;
    };
    /**
     * Clean any existing subscription to change events
     * @private
     */
    TranslatePipe.prototype._dispose = function () {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
        if (typeof this.onLangChange !== 'undefined') {
            this.onLangChange.unsubscribe();
            this.onLangChange = undefined;
        }
        if (typeof this.onDefaultLangChange !== 'undefined') {
            this.onDefaultLangChange.unsubscribe();
            this.onDefaultLangChange = undefined;
        }
    };
    TranslatePipe.prototype.ngOnDestroy = function () {
        this._dispose();
    };
    TranslatePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'translate',
            pure: false // required to update the value when the promise is resolved
        }),
        __metadata("design:paramtypes", [_translate_service__WEBPACK_IMPORTED_MODULE_1__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], TranslatePipe);
    return TranslatePipe;
}());



/***/ }),

/***/ "./src/lib/i18n/translate.service.ts":
/*!*******************************************!*\
  !*** ./src/lib/i18n/translate.service.ts ***!
  \*******************************************/
/*! exports provided: USE_STORE, USE_DEFAULT_LANG, TranslateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USE_STORE", function() { return USE_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USE_DEFAULT_LANG", function() { return USE_DEFAULT_LANG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateService", function() { return TranslateService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var rxjs_add_operator_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/concat */ "./node_modules/rxjs-compat/_esm5/add/operator/concat.js");
/* harmony import */ var rxjs_add_operator_share__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/share */ "./node_modules/rxjs-compat/_esm5/add/operator/share.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_merge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/merge */ "./node_modules/rxjs-compat/_esm5/add/operator/merge.js");
/* harmony import */ var rxjs_add_operator_switchMap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/add/operator/switchMap */ "./node_modules/rxjs-compat/_esm5/add/operator/switchMap.js");
/* harmony import */ var rxjs_add_operator_toArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/add/operator/toArray */ "./node_modules/rxjs-compat/_esm5/add/operator/toArray.js");
/* harmony import */ var rxjs_add_operator_take__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/add/operator/take */ "./node_modules/rxjs-compat/_esm5/add/operator/take.js");
/* harmony import */ var _translate_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./translate.store */ "./src/lib/i18n/translate.store.ts");
/* harmony import */ var _translate_loader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./translate.loader */ "./src/lib/i18n/translate.loader.ts");
/* harmony import */ var _translate_compiler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./translate.compiler */ "./src/lib/i18n/translate.compiler.ts");
/* harmony import */ var _missing_translation_handler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./missing-translation-handler */ "./src/lib/i18n/missing-translation-handler.ts");
/* harmony import */ var _translate_parser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./translate.parser */ "./src/lib/i18n/translate.parser.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./util */ "./src/lib/i18n/util.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
















var USE_STORE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('USE_STORE');
var USE_DEFAULT_LANG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('USE_DEFAULT_LANG');
var TranslateService = /** @class */ (function () {
    /**
     *
     * @param store an instance of the store (that is supposed to be unique)
     * @param currentLoader An instance of the loader currently used
     * @param compiler An instance of the compiler currently used
     * @param parser An instance of the parser currently used
     * @param missingTranslationHandler A handler for missing translations.
     * @param isolate whether this service should use the store or not
     * @param useDefaultLang whether we should use default language translation when current language translation is missing.
     */
    function TranslateService(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang, isolate) {
        if (useDefaultLang === void 0) { useDefaultLang = true; }
        if (isolate === void 0) { isolate = false; }
        this.store = store;
        this.currentLoader = currentLoader;
        this.compiler = compiler;
        this.parser = parser;
        this.missingTranslationHandler = missingTranslationHandler;
        this.useDefaultLang = useDefaultLang;
        this.isolate = isolate;
        this.pending = false;
        this._onTranslationChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._onLangChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._onDefaultLangChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._langs = [];
        this._translations = {};
        this._translationRequests = {};
    }
    Object.defineProperty(TranslateService.prototype, "onTranslationChange", {
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<TranslationChangeEvent>}
         */
        get: function () {
            return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "onLangChange", {
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<LangChangeEvent>}
         */
        get: function () {
            return this.isolate ? this._onLangChange : this.store.onLangChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "onDefaultLangChange", {
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<DefaultLangChangeEvent>}
         */
        get: function () {
            return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "defaultLang", {
        /**
         * The default lang to fallback when translations are missing on the current lang
         */
        get: function () {
            return this.isolate ? this._defaultLang : this.store.defaultLang;
        },
        set: function (defaultLang) {
            if (this.isolate) {
                this._defaultLang = defaultLang;
            }
            else {
                this.store.defaultLang = defaultLang;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "currentLang", {
        /**
         * The lang currently used
         * @type {string}
         */
        get: function () {
            return this.isolate ? this._currentLang : this.store.currentLang;
        },
        set: function (currentLang) {
            if (this.isolate) {
                this._currentLang = currentLang;
            }
            else {
                this.store.currentLang = currentLang;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "langs", {
        /**
         * an array of langs
         * @type {Array}
         */
        get: function () {
            return this.isolate ? this._langs : this.store.langs;
        },
        set: function (langs) {
            if (this.isolate) {
                this._langs = langs;
            }
            else {
                this.store.langs = langs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "translations", {
        /**
         * a list of translations per lang
         * @type {{}}
         */
        get: function () {
            return this.isolate ? this._translations : this.store.translations;
        },
        set: function (translations) {
            if (this.isolate) {
                this._currentLang = translations;
            }
            else {
                this.store.translations = translations;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    TranslateService.prototype.setDefaultLang = function (lang) {
        var _this = this;
        if (lang === this.defaultLang) {
            return;
        }
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== 'undefined') {
            // on init set the defaultLang immediately
            if (!this.defaultLang) {
                this.defaultLang = lang;
            }
            pending.take(1)
                .subscribe(function (res) {
                _this.changeDefaultLang(lang);
            });
        }
        else {
            this.changeDefaultLang(lang);
        }
    };
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    TranslateService.prototype.load = function (lang, dir) {
        this.retrieveTranslations(lang, dir);
    };
    /**
     * Gets the default language used
     * @returns string
     */
    TranslateService.prototype.getDefaultLang = function () {
        return this.defaultLang;
    };
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.use = function (lang) {
        var _this = this;
        // don't change the language if the language given is already selected
        if (lang === this.currentLang) {
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(this.translations[lang]);
        }
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== 'undefined') {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.take(1)
                .subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else {
            this.changeLang(lang);
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(this.translations[lang]);
        }
    };
    /**
     * Retrieves the given translations
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.retrieveTranslations = function (lang, dir) {
        var pending;
        if (typeof this.translations[lang] === 'undefined') {
            this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
            pending = this._translationRequests[lang];
        }
        if (Object(_util__WEBPACK_IMPORTED_MODULE_15__["isDefined"])(dir)) {
            this._translationRequests[lang] = this.getTranslation(lang, dir);
            pending = this._translationRequests[lang];
        }
        return pending;
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.getTranslation = function (lang, dir) {
        var _this = this;
        this.pending = true;
        this.loadingTranslations = this.currentLoader.getTranslation(lang, dir).share();
        if (Object(_util__WEBPACK_IMPORTED_MODULE_15__["isDefined"])(dir)) {
            this.loadingTranslations.take(1)
                .subscribe(function (res) {
                if (typeof res.json === 'function') {
                    res = res.json();
                }
                _this.translations[lang] = Object.assign(_this.translations[lang], res);
                _this.updateLangs();
                _this.pending = false;
                _this.onTranslationChange.emit({ lang: lang, translations: _this.translations[lang] });
            }, function (err) {
                _this.pending = false;
            });
        }
        else {
            this.loadingTranslations.take(1)
                .subscribe(function (res) {
                if (typeof res.json === 'function') {
                    res = res.json();
                }
                _this.translations[lang] = _this.compiler.compileTranslations(res, lang);
                _this.updateLangs();
                _this.pending = false;
            }, function (err) {
                _this.pending = false;
            });
        }
        return this.loadingTranslations;
    };
    /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     * @param lang
     * @param translations
     * @param shouldMerge
     */
    TranslateService.prototype.setTranslation = function (lang, translations, shouldMerge) {
        if (shouldMerge === void 0) { shouldMerge = false; }
        translations = this.compiler.compileTranslations(translations, lang);
        if (shouldMerge && this.translations[lang]) {
            this.translations[lang] = Object(_util__WEBPACK_IMPORTED_MODULE_15__["mergeDeep"])(this.translations[lang], translations);
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    TranslateService.prototype.getLangs = function () {
        return this.langs;
    };
    /**
     * @param langs
     * Add available langs
     */
    TranslateService.prototype.addLangs = function (langs) {
        var _this = this;
        langs.forEach(function (lang) {
            if (_this.langs.indexOf(lang) === -1) {
                _this.langs.push(lang);
            }
        });
    };
    /**
     * Update the list of available langs
     */
    TranslateService.prototype.updateLangs = function () {
        this.addLangs(Object.keys(this.translations));
    };
    /**
     * Returns the parsed result of the translations
     * @param translations
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    TranslateService.prototype.getParsedResult = function (translations, key, interpolateParams) {
        var res;
        if (key instanceof Array) {
            // tslint:disable-next-line:prefer-const
            var result = {}, observables = false;
            for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                var k = key_1[_i];
                result[k] = this.getParsedResult(translations, k, interpolateParams);
                if (typeof result[k].subscribe === 'function') {
                    observables = true;
                }
            }
            if (observables) {
                var mergedObs = void 0;
                for (var _a = 0, key_2 = key; _a < key_2.length; _a++) {
                    var k = key_2[_a];
                    var obs = typeof result[k].subscribe === 'function' ? result[k] : rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(result[k]);
                    if (typeof mergedObs === 'undefined') {
                        mergedObs = obs;
                    }
                    else {
                        mergedObs = mergedObs.merge(obs);
                    }
                }
                return mergedObs.toArray().map(function (arr) {
                    var obj = {};
                    arr.forEach(function (value, index) {
                        obj[key[index]] = value;
                    });
                    return obj;
                });
            }
            return result;
        }
        if (translations) {
            res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
        }
        if (typeof res === 'undefined' && this.defaultLang && this.defaultLang !== this.currentLang && this.useDefaultLang) {
            res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
        }
        if (typeof res === 'undefined') {
            var params = { key: key, translateService: this };
            if (typeof interpolateParams !== 'undefined') {
                params.interpolateParams = interpolateParams;
            }
            res = this.missingTranslationHandler.handle(params);
        }
        return typeof res !== 'undefined' ? res : key;
    };
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param key
     * @param interpolateParams
     * @returns {any} the translated key, or an object of translated keys
     */
    TranslateService.prototype.get = function (key, interpolateParams) {
        var _this = this;
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_15__["isDefined"])(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(function (observer) {
                var onComplete = function (res) {
                    observer.next(res);
                    observer.complete();
                };
                var onError = function (err) {
                    observer.error(err);
                };
                _this.loadingTranslations.subscribe(function (res) {
                    res = _this.getParsedResult(res, key, interpolateParams);
                    if (typeof res.subscribe === 'function') {
                        res.subscribe(onComplete, onError);
                    }
                    else {
                        onComplete(res);
                    }
                }, onError);
            });
        }
        else {
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                return res;
            }
            else {
                return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(res);
            }
        }
    };
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @param key
     * @param interpolateParams
     * @returns {any} A stream of the translated key, or an object of translated keys
     */
    TranslateService.prototype.stream = function (key, interpolateParams) {
        var _this = this;
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_15__["isDefined"])(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        return this
            .get(key, interpolateParams)
            .concat(this.onLangChange.switchMap(function (event) {
            var res = _this.getParsedResult(event.translations, key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                return res;
            }
            else {
                return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(res);
            }
        }));
    };
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param key
     * @param interpolateParams
     * @returns {string}
     */
    TranslateService.prototype.instant = function (key, interpolateParams) {
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_15__["isDefined"])(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (typeof res.subscribe !== 'undefined') {
            if (key instanceof Array) {
                var obj_1 = {};
                key.forEach(function (value, index) {
                    obj_1[key[index]] = key[index];
                });
                return obj_1;
            }
            return key;
        }
        else {
            return res;
        }
    };
    /**
     * Sets the translated value of a key, after compiling it
     * @param key
     * @param value
     * @param lang
     */
    TranslateService.prototype.set = function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = this.compiler.compile(value, lang);
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Changes the current lang
     * @param lang
     */
    TranslateService.prototype.changeLang = function (lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
        // if there is no default lang, use the one that we just set
        if (!this.defaultLang) {
            this.changeDefaultLang(lang);
        }
    };
    /**
     * Changes the default lang
     * @param lang
     */
    TranslateService.prototype.changeDefaultLang = function (lang) {
        this.defaultLang = lang;
        this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Allows to reload the lang file from the file
     * @param lang
     * @returns {Observable<any>}
     */
    TranslateService.prototype.reloadLang = function (lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    };
    /**
     * Deletes inner translation
     * @param lang
     */
    TranslateService.prototype.resetLang = function (lang) {
        this._translationRequests[lang] = undefined;
        this.translations[lang] = undefined;
    };
    /**
     * Returns the language code name from the browser, e.g. "de"
     *
     * @returns string
     */
    TranslateService.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    };
    /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     *
     * @returns string
     */
    TranslateService.prototype.getBrowserCultureLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
        // tslint:disable-next-line:max-line-length
        browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        return browserCultureLang;
    };
    TranslateService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(USE_DEFAULT_LANG)),
        __param(6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(USE_STORE)),
        __metadata("design:paramtypes", [_translate_store__WEBPACK_IMPORTED_MODULE_10__["TranslateStore"],
            _translate_loader__WEBPACK_IMPORTED_MODULE_11__["TranslateLoader"],
            _translate_compiler__WEBPACK_IMPORTED_MODULE_12__["TranslateCompiler"],
            _translate_parser__WEBPACK_IMPORTED_MODULE_14__["TranslateParser"],
            _missing_translation_handler__WEBPACK_IMPORTED_MODULE_13__["MissingTranslationHandler"], Boolean, Boolean])
    ], TranslateService);
    return TranslateService;
}());



/***/ }),

/***/ "./src/lib/i18n/translate.store.ts":
/*!*****************************************!*\
  !*** ./src/lib/i18n/translate.store.ts ***!
  \*****************************************/
/*! exports provided: TranslateStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateStore", function() { return TranslateStore; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var TranslateStore = /** @class */ (function () {
    function TranslateStore() {
        /**
         * The lang currently used
         * @type {string}
         */
        this.currentLang = this.defaultLang;
        /**
         * a list of translations per lang
         * @type {{}}
         */
        this.translations = {};
        /**
         * an array of langs
         * @type {Array}
         */
        this.langs = [];
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<TranslationChangeEvent>}
         */
        this.onTranslationChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<LangChangeEvent>}
         */
        this.onLangChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<DefaultLangChangeEvent>}
         */
        this.onDefaultLangChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    return TranslateStore;
}());



/***/ }),

/***/ "./src/lib/i18n/util.ts":
/*!******************************!*\
  !*** ./src/lib/i18n/util.ts ***!
  \******************************/
/*! exports provided: equals, isDefined, isObject, mergeDeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeep", function() { return mergeDeep; });
/* tslint:disable */
/**
 * @name equals
 *
 * @description
 * Determines if two objects or two values are equivalent.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `equals`.
 *
 * @param {*} o1 Object or value to compare.
 * @param {*} o2 Object or value to compare.
 * @returns {boolean} True if arguments are equal.
 */
function equals(o1, o2) {
    if (o1 === o2)
        return true;
    if (o1 === null || o2 === null)
        return false;
    if (o1 !== o1 && o2 !== o2)
        return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2 && t1 == 'object') {
        if (Array.isArray(o1)) {
            if (!Array.isArray(o2))
                return false;
            if ((length = o1.length) == o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key]))
                        return false;
                }
                return true;
            }
        }
        else {
            if (Array.isArray(o2)) {
                return false;
            }
            keySet = Object.create(null);
            for (key in o1) {
                if (!equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
/* tslint:enable */
function isDefined(value) {
    return typeof value !== 'undefined' && value !== null;
}
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function mergeDeep(target, source) {
    target = JSON.parse(JSON.stringify(target));
    source = JSON.parse(JSON.stringify(source));
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                }
                else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
            var _a, _b;
        });
    }
    return output;
}


/***/ }),

/***/ "./src/lib/speech2text/core-audio/core-audio.module.ts":
/*!*************************************************************!*\
  !*** ./src/lib/speech2text/core-audio/core-audio.module.ts ***!
  \*************************************************************/
/*! exports provided: CoreAudioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreAudioModule", function() { return CoreAudioModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _recorder_recorder_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recorder/recorder.service */ "./src/lib/speech2text/core-audio/recorder/recorder.service.ts");
/* harmony import */ var _worker_worker_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worker/worker.service */ "./src/lib/speech2text/core-audio/worker/worker.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CoreAudioModule = /** @class */ (function () {
    function CoreAudioModule() {
    }
    CoreAudioModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [],
            declarations: [],
            providers: [
                _recorder_recorder_service__WEBPACK_IMPORTED_MODULE_1__["RecorderService"],
                _worker_worker_service__WEBPACK_IMPORTED_MODULE_2__["WorkerService"]
            ]
        })
    ], CoreAudioModule);
    return CoreAudioModule;
}());



/***/ }),

/***/ "./src/lib/speech2text/core-audio/index.ts":
/*!*************************************************!*\
  !*** ./src/lib/speech2text/core-audio/index.ts ***!
  \*************************************************/
/*! exports provided: CoreAudioModule, RecorderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _recorder_recorder_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./recorder/recorder.service */ "./src/lib/speech2text/core-audio/recorder/recorder.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecorderService", function() { return _recorder_recorder_service__WEBPACK_IMPORTED_MODULE_0__["RecorderService"]; });

/* harmony import */ var _core_audio_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core-audio.module */ "./src/lib/speech2text/core-audio/core-audio.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoreAudioModule", function() { return _core_audio_module__WEBPACK_IMPORTED_MODULE_1__["CoreAudioModule"]; });





/***/ }),

/***/ "./src/lib/speech2text/core-audio/recorder/recorder.service.ts":
/*!*********************************************************************!*\
  !*** ./src/lib/speech2text/core-audio/recorder/recorder.service.ts ***!
  \*********************************************************************/
/*! exports provided: RecorderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecorderService", function() { return RecorderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/BehaviorSubject */ "./node_modules/rxjs-compat/_esm5/BehaviorSubject.js");
/* harmony import */ var _worker_worker_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../worker/worker.service */ "./src/lib/speech2text/core-audio/worker/worker.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RecorderService = /** @class */ (function () {
    function RecorderService(workerService) {
        this.workerService = workerService;
        this.bufferSize = 4096;
        this.sampleRate = 44100;
        this.recordingLength = 0;
        this.audioChannel = [];
        this.recording = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.onAudioProcess = this.onAudioProcess.bind(this);
    }
    RecorderService.prototype.onAudioProcess = function (event) {
        if (!this.recording.value) {
            return;
        }
        var audioData = event.inputBuffer.getChannelData(0);
        this.audioChannel.push(new Float32Array(audioData));
        this.recordingLength += this.bufferSize;
    };
    RecorderService.prototype.getAudioBuffer = function (config, callback) {
        function processAudioBuffer(config, cb) {
            function mergeBuffer(channelBuffer, rLength) {
                var result = new Float64Array(rLength);
                var offset = 0;
                var lng = channelBuffer.length;
                for (var i = 0; i < lng; i++) {
                    var buffer_1 = channelBuffer[i];
                    result.set(buffer_1, offset);
                    offset += buffer_1.length;
                }
                return result;
            }
            function writeUTFBytes(view, offset, string) {
                var lng = string.length;
                for (var i = 0; i < lng; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            }
            function interleave(inputL, inputR) {
                var compression = 44100 / 11025; // 计算压缩率
                var length = inputL.length / compression;
                var result = new Float32Array(length);
                var index = 0, inputIndex = 0;
                while (index < length) {
                    result[index] = inputL[inputIndex];
                    inputIndex += compression; // 每次都跳过3个数据
                    index++;
                }
                return result;
            }
            function floatTo8BitPCM(output, offset, input) {
                for (var i = 0; i < input.length; i++, offset++) {
                    var s = Math.max(-1, Math.min(1, input[i]));
                    var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                    // tslint:disable-next-line:radix
                    val = 255 / (65535 / (val + 32768));
                    output.setInt8(offset, val, true);
                }
            }
            function floatTo16BitPCM(output, offset, input) {
                for (var i = 0; i < input.length; i++, offset += 2) {
                    var s = Math.max(-1, Math.min(1, input[i]));
                    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                }
            }
            // function encodeWAV(config, samples) {
            //     const sampleRate = config.sampleRate;
            //     const dataLength = samples.length;
            //     const buffer = new ArrayBuffer(44 + dataLength * 2);
            //     const view = new DataView(buffer);
            //     const sampleRateTmp = sampleRate; // sampleRate;//写入新的采样率
            //     const sampleBits = 8;
            //     const channelCount = 1;
            //     let offset = 0;  /* 资源交换文件标识符 */
            //     writeUTFBytes(view, offset, 'RIFF'); offset += 4;   /* 下个地址开始到文件尾总字节数,即文件大小-8 */
            //     view.setUint32(offset, 44 + dataLength, true); offset += 4;   /* WAV文件标志 */
            //     writeUTFBytes(view, offset, 'WAVE'); offset += 4;  /* 波形格式标志 */
            //     writeUTFBytes(view, offset, 'fmt '); offset += 4;  /* 过滤字节,一般为 0x10 = 16 */
            //     view.setUint32(offset, 16, true); offset += 4;   /* 格式类别 (PCM形式采样数据) */
            //     view.setUint16(offset, 1, true); offset += 2;   /* 通道数 */
            //     view.setUint16(offset, channelCount, true); offset += 2;  /* 采样率,每秒样本数,表示每个通道的播放速度 */
            //     view.setUint32(offset, sampleRateTmp, true); offset += 4; /* 波形数据传输率 (每秒平均字节数) 通道数×每秒数据位数×每样本数据位/8 */
            //     view.setUint32(offset, sampleRateTmp * 2, true); offset += 4; /* 快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8 */
            //     view.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;  /* 每样本数据位数 */
            //     view.setUint16(offset, sampleBits, true); offset += 2;  /* 数据标识符 */
            //     writeUTFBytes(view, offset, 'data'); offset += 4;
            //     /* 采样数据总数,即数据总大小-44 */
            //     view.setUint32(offset, dataLength, true); offset += 4;
            //     /* 采样数据 */
            //     floatTo16BitPCM(view, 44, samples);
            //     return [buffer, view];
            //   }
            var audioBuffer = config.audioBuffer.slice(0);
            audioBuffer = mergeBuffer(audioBuffer, config.internalInterleavedLength);
            var audioBufferLength = audioBuffer.length;
            // create wav file
            var resultingBufferLength = 44 + audioBufferLength * 2;
            var buffer = new ArrayBuffer(resultingBufferLength);
            var view = new DataView(buffer);
            var sampleRate = 44100;
            writeUTFBytes(view, 0, 'RIFF');
            view.setUint32(4, 44 + audioBufferLength * 2, true);
            writeUTFBytes(view, 8, 'WAVE');
            writeUTFBytes(view, 12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, 1, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * 2, true);
            view.setUint16(32, 2, true);
            view.setUint16(34, 16, true);
            writeUTFBytes(view, 36, 'data');
            view.setUint32(40, audioBufferLength * 2, true);
            // write the PCM samples
            var index = 44;
            var volume = 1;
            for (var i = 0; i < audioBufferLength; i++) {
                view.setInt16(index, audioBuffer[i] * (0x7FFF * volume), true);
                index += 2;
            }
            if (cb) {
                return cb({
                    buffer: buffer,
                    view: view
                });
            }
            this.postMessage({
                buffer: buffer,
                view: view
            });
        }
        var webWorker = this.workerService.execute(processAudioBuffer);
        webWorker.onmessage(function (event) {
            callback(event.data.buffer, event.data.view);
        });
        webWorker.postMessage(config);
    };
    RecorderService.prototype.stopRecording = function (callback) {
        var _this = this;
        this.recording.next(false);
        this.audioInput.disconnect();
        this.jsAudioNode.disconnect();
        var config = {
            sampleRate: this.sampleRate,
            internalInterleavedLength: this.recordingLength,
            audioBuffer: this.audioChannel
        };
        this.getAudioBuffer(config, function (view) {
            _this.blob = new Blob([view], {
                type: 'audio/wav'
            });
            // tslint:disable-next-line:no-unused-expression
            callback && callback(_this.blob);
        });
    };
    RecorderService.prototype.isRecording = function () {
        return this.recording.asObservable();
    };
    RecorderService.prototype.start = function () {
        var _this = this;
        console.log('start recording');
        // tslint:disable-next-line:max-line-length
        var AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext
            || window.oAudioContext || window.msAudioContext);
        this.context = new AudioContext();
        if (this.context.createJavaScriptNode) {
            this.jsAudioNode = this.context.createJavaScriptNode(this.bufferSize, 1, 1);
        }
        else if (this.context.createScriptProcessor) {
            this.jsAudioNode = this.context.createScriptProcessor(this.bufferSize, 1, 1);
        }
        else {
            console.error('WebAudio API has no support on this browser');
        }
        this.jsAudioNode.connect(this.context.destination);
        this.stream = navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (microphone) {
            _this.recording.next(true);
            _this.mediaStream = microphone;
            _this.audioInput = _this.context.createMediaStreamSource(microphone);
            _this.audioInput.connect(_this.jsAudioNode);
            console.log('microphone captured');
            _this.jsAudioNode.onaudioprocess = _this.onAudioProcess;
        })
            .catch(function (err) { return console.error(err); });
    };
    RecorderService.prototype.stop = function () {
        console.log('stop recording');
        this.mediaStream.getAudioTracks()[0].stop();
        this.stopRecording(function (blob) {
            var url = URL.createObjectURL(blob);
            var audio = document.querySelector('audio');
            audio.src = url;
        });
    };
    RecorderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_worker_worker_service__WEBPACK_IMPORTED_MODULE_2__["WorkerService"]])
    ], RecorderService);
    return RecorderService;
}());



/***/ }),

/***/ "./src/lib/speech2text/core-audio/worker/web-worker.ts":
/*!*************************************************************!*\
  !*** ./src/lib/speech2text/core-audio/worker/web-worker.ts ***!
  \*************************************************************/
/*! exports provided: WebWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebWorker", function() { return WebWorker; });
var WebWorker = /** @class */ (function () {
    function WebWorker(url) {
        this.worker = new Worker(url);
        this.url = url;
    }
    WebWorker.prototype.onmessage = function (func) {
        this.worker.onmessage = func;
        // release memory
        URL.revokeObjectURL(this.url);
    };
    WebWorker.prototype.onerror = function (func) {
        this.worker.onerror = func;
    };
    WebWorker.prototype.postMessage = function (message, transferlist) {
        this.worker.postMessage(message, transferlist);
    };
    WebWorker.prototype.terminate = function () {
        this.worker.terminate();
    };
    return WebWorker;
}());



/***/ }),

/***/ "./src/lib/speech2text/core-audio/worker/worker.service.ts":
/*!*****************************************************************!*\
  !*** ./src/lib/speech2text/core-audio/worker/worker.service.ts ***!
  \*****************************************************************/
/*! exports provided: WorkerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerService", function() { return WorkerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _web_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-worker */ "./src/lib/speech2text/core-audio/worker/web-worker.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkerService = /** @class */ (function () {
    function WorkerService() {
    }
    WorkerService.prototype.execute = function (func) {
        var blobContent = [func.toString(), ";this.onmessage = function(e) {" + func.name + "(e.data);}"];
        var blob = new Blob(blobContent, { type: 'application/javascript' });
        var url = URL.createObjectURL(blob);
        return new _web_worker__WEBPACK_IMPORTED_MODULE_1__["WebWorker"](url);
    };
    WorkerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], WorkerService);
    return WorkerService;
}());



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]).catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\shouyu\ts\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map