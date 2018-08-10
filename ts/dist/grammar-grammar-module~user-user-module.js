(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grammar-grammar-module~user-user-module"],{

/***/ "./src/lib/common/behaviors/control-value-accesor.mixin.ts":
/*!*****************************************************************!*\
  !*** ./src/lib/common/behaviors/control-value-accesor.mixin.ts ***!
  \*****************************************************************/
/*! exports provided: mixinControlValueAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixinControlValueAccessor", function() { return mixinControlValueAccessor; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
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

var noop = function () {
    // empty method
};
/** Mixin to augment a component with ngModel support. */
function mixinControlValueAccessor(base, initialValue) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._value = initialValue;
            _this.onChange = function (_) { return noop; };
            _this.onTouched = function () { return noop; };
            _this._subjectValueChanges = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
            _this.valueChanges = _this._subjectValueChanges.asObservable();
            return _this;
        }
        Object.defineProperty(class_1.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (v) {
                if (v !== this._value) {
                    this._value = v;
                    this.onChange(v);
                    this._changeDetectorRef.markForCheck();
                    this._subjectValueChanges.next(v);
                }
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.writeValue = function (value) {
            this.value = value;
            this._changeDetectorRef.markForCheck();
        };
        class_1.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        class_1.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        return class_1;
    }(base));
}


/***/ }),

/***/ "./src/lib/common/behaviors/disable-ripple.mixin.ts":
/*!**********************************************************!*\
  !*** ./src/lib/common/behaviors/disable-ripple.mixin.ts ***!
  \**********************************************************/
/*! exports provided: mixinDisableRipple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixinDisableRipple", function() { return mixinDisableRipple; });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
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

/** Mixin to augment a component or directive with a `disabled` property. */
function mixinDisableRipple(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._disableRipple = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disableRipple", {
            get: function () {
                return this._disableRipple;
            },
            set: function (value) {
                var newValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
                if (this._disableRipple !== newValue) {
                    this._disableRipple = newValue;
                    this.onDisableRippleChange(this._disableRipple);
                }
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.onDisableRippleChange = function (v) {
            /** NOT IMPLEMENTED, this needs to be overriden by subclasses if needed */
        };
        return class_1;
    }(base));
}


/***/ }),

/***/ "./src/lib/common/behaviors/disabled.mixin.ts":
/*!****************************************************!*\
  !*** ./src/lib/common/behaviors/disabled.mixin.ts ***!
  \****************************************************/
/*! exports provided: mixinDisabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixinDisabled", function() { return mixinDisabled; });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
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

/** Mixin to augment a component or directive with a `disabled` property. */
function mixinDisabled(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                var newValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
                if (this._disabled !== newValue) {
                    this._disabled = newValue;
                    this.onDisabledChange(this._disabled);
                }
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.onDisabledChange = function (v) {
            /** NOT IMPLEMENTED, this needs to be overriden by subclasses if needed */
        };
        return class_1;
    }(base));
}


/***/ }),

/***/ "./src/lib/common/index.ts":
/*!*********************************!*\
  !*** ./src/lib/common/index.ts ***!
  \*********************************/
/*! exports provided: mixinControlValueAccessor, mixinDisabled, mixinDisableRipple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "./src/lib/common/public-api.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixinControlValueAccessor", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["mixinControlValueAccessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixinDisabled", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["mixinDisabled"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixinDisableRipple", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["mixinDisableRipple"]; });




/***/ }),

/***/ "./src/lib/common/public-api.ts":
/*!**************************************!*\
  !*** ./src/lib/common/public-api.ts ***!
  \**************************************/
/*! exports provided: mixinControlValueAccessor, mixinDisabled, mixinDisableRipple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _behaviors_control_value_accesor_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./behaviors/control-value-accesor.mixin */ "./src/lib/common/behaviors/control-value-accesor.mixin.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixinControlValueAccessor", function() { return _behaviors_control_value_accesor_mixin__WEBPACK_IMPORTED_MODULE_0__["mixinControlValueAccessor"]; });

/* harmony import */ var _behaviors_disabled_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./behaviors/disabled.mixin */ "./src/lib/common/behaviors/disabled.mixin.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixinDisabled", function() { return _behaviors_disabled_mixin__WEBPACK_IMPORTED_MODULE_1__["mixinDisabled"]; });

/* harmony import */ var _behaviors_disable_ripple_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./behaviors/disable-ripple.mixin */ "./src/lib/common/behaviors/disable-ripple.mixin.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mixinDisableRipple", function() { return _behaviors_disable_ripple_mixin__WEBPACK_IMPORTED_MODULE_2__["mixinDisableRipple"]; });






/***/ }),

/***/ "./src/lib/data-table/data-table-cell/data-table-cell.component.html":
/*!***************************************************************************!*\
  !*** ./src/lib/data-table/data-table-cell/data-table-cell.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"td-data-table-cell-content-wrapper\"\n     [class.td-data-table-cell-numeric]=\"numeric\">\n  <ng-content></ng-content>\n</div>"

/***/ }),

/***/ "./src/lib/data-table/data-table-cell/data-table-cell.component.scss":
/*!***************************************************************************!*\
  !*** ./src/lib/data-table/data-table-cell/data-table-cell.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  vertical-align: middle;\n  text-align: left;\n  padding: 0; }\n  html[dir=rtl] :host {\n    text-align: right;\n    unicode-bidi: embed; }\n  body[dir=rtl] :host {\n    text-align: right;\n    unicode-bidi: embed; }\n  [dir=rtl] :host {\n    text-align: right;\n    unicode-bidi: embed; }\n  :host bdo[dir=rtl] {\n    direction: rtl;\n    unicode-bidi: bidi-override; }\n  :host bdo[dir=ltr] {\n    direction: ltr;\n    unicode-bidi: bidi-override; }\n  :host > .td-data-table-cell-content-wrapper {\n    padding: 0 28px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n    justify-content: start; }\n  :host > .td-data-table-cell-content-wrapper.td-data-table-cell-numeric {\n      justify-content: flex-end; }\n  :host:first-child > .td-data-table-cell-content-wrapper {\n    padding-left: 24px;\n    padding-right: initial; }\n  html[dir=rtl] :host:first-child > .td-data-table-cell-content-wrapper {\n      padding-left: initial;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:first-child > .td-data-table-cell-content-wrapper {\n      padding-left: initial;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:first-child > .td-data-table-cell-content-wrapper {\n      padding-left: initial;\n      unicode-bidi: embed; }\n  :host:first-child > .td-data-table-cell-content-wrapper bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:first-child > .td-data-table-cell-content-wrapper bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  html[dir=rtl] :host:first-child > .td-data-table-cell-content-wrapper {\n      padding-right: 24px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:first-child > .td-data-table-cell-content-wrapper {\n      padding-right: 24px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:first-child > .td-data-table-cell-content-wrapper {\n      padding-right: 24px;\n      unicode-bidi: embed; }\n  :host:first-child > .td-data-table-cell-content-wrapper bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:first-child > .td-data-table-cell-content-wrapper bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  :host:last-child > .td-data-table-cell-content-wrapper {\n    padding-left: 28px;\n    padding-right: 24px; }\n  html[dir=rtl] :host:last-child > .td-data-table-cell-content-wrapper {\n      padding-left: 24px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:last-child > .td-data-table-cell-content-wrapper {\n      padding-left: 24px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:last-child > .td-data-table-cell-content-wrapper {\n      padding-left: 24px;\n      unicode-bidi: embed; }\n  :host:last-child > .td-data-table-cell-content-wrapper bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:last-child > .td-data-table-cell-content-wrapper bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  html[dir=rtl] :host:last-child > .td-data-table-cell-content-wrapper {\n      padding-right: 28px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:last-child > .td-data-table-cell-content-wrapper {\n      padding-right: 28px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:last-child > .td-data-table-cell-content-wrapper {\n      padding-right: 28px;\n      unicode-bidi: embed; }\n  :host:last-child > .td-data-table-cell-content-wrapper bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:last-child > .td-data-table-cell-content-wrapper bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  :host > * {\n    vertical-align: middle; }\n  :host.mat-clickable {\n    cursor: pointer; }\n  :host.mat-clickable:focus {\n      outline: none; }\n  :host.mat-numeric {\n    text-align: right; }\n  html[dir=rtl] :host.mat-numeric {\n      text-align: left;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host.mat-numeric {\n      text-align: left;\n      unicode-bidi: embed; }\n  [dir=rtl] :host.mat-numeric {\n      text-align: left;\n      unicode-bidi: embed; }\n  :host.mat-numeric bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host.mat-numeric bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n"

/***/ }),

/***/ "./src/lib/data-table/data-table-cell/data-table-cell.component.ts":
/*!*************************************************************************!*\
  !*** ./src/lib/data-table/data-table-cell/data-table-cell.component.ts ***!
  \*************************************************************************/
/*! exports provided: TdDataTableCellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableCellComponent", function() { return TdDataTableCellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TdDataTableCellComponent = /** @class */ (function () {
    function TdDataTableCellComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * numeric?: boolean
         * Makes cell follow the numeric data-table specs.
         * Defaults to 'false'
         */
        // tslint:disable-next-line:no-input-rename
        this.numeric = false;
        this._renderer.addClass(this._elementRef.nativeElement, 'td-data-table-cell');
    }
    Object.defineProperty(TdDataTableCellComponent.prototype, "bindNumeric", {
        get: function () {
            return this.numeric;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('numeric'),
        __metadata("design:type", Object)
    ], TdDataTableCellComponent.prototype, "numeric", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class.mat-numeric'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], TdDataTableCellComponent.prototype, "bindNumeric", null);
    TdDataTableCellComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            /* tslint:disable-next-line */
            selector: 'td[td-data-table-cell]',
            styles: [__webpack_require__(/*! ./data-table-cell.component.scss */ "./src/lib/data-table/data-table-cell/data-table-cell.component.scss")],
            template: __webpack_require__(/*! ./data-table-cell.component.html */ "./src/lib/data-table/data-table-cell/data-table-cell.component.html"),
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], TdDataTableCellComponent);
    return TdDataTableCellComponent;
}());



/***/ }),

/***/ "./src/lib/data-table/data-table-column/data-table-column.component.html":
/*!*******************************************************************************!*\
  !*** ./src/lib/data-table/data-table-column/data-table-column.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span #columnContent class=\"td-data-table-heading\">\n  <mat-icon \n    class=\"td-data-table-sort-icon\" \n    *ngIf=\"sortable && numeric\"\n    [class.mat-asc]=\"(!(active) || isAscending())\"\n    [class.mat-desc]=\"(active && isDescending())\">\n    arrow_upward\n  </mat-icon>\n  <span>\n    <ng-content></ng-content>\n  </span>\n  <mat-icon \n    class=\"td-data-table-sort-icon\" \n    *ngIf=\"sortable && !numeric\"\n    [class.mat-asc]=\"(!(active) || isAscending())\"\n    [class.mat-desc]=\"(active && isDescending())\">\n    arrow_upward\n  </mat-icon>\n</span>\n"

/***/ }),

/***/ "./src/lib/data-table/data-table-column/data-table-column.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/lib/data-table/data-table-column/data-table-column.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  white-space: nowrap;\n  position: relative;\n  padding: 0;\n  vertical-align: middle;\n  text-align: left; }\n  :host > .td-data-table-heading {\n    padding: 0 28px; }\n  :host:first-child > .td-data-table-heading {\n    padding-left: 24px;\n    padding-right: initial; }\n  html[dir=rtl] :host:first-child > .td-data-table-heading {\n      padding-left: initial;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:first-child > .td-data-table-heading {\n      padding-left: initial;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:first-child > .td-data-table-heading {\n      padding-left: initial;\n      unicode-bidi: embed; }\n  :host:first-child > .td-data-table-heading bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:first-child > .td-data-table-heading bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  html[dir=rtl] :host:first-child > .td-data-table-heading {\n      padding-right: 24px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:first-child > .td-data-table-heading {\n      padding-right: 24px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:first-child > .td-data-table-heading {\n      padding-right: 24px;\n      unicode-bidi: embed; }\n  :host:first-child > .td-data-table-heading bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:first-child > .td-data-table-heading bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  :host:last-child > .td-data-table-heading {\n    padding-left: 28px;\n    padding-right: 24px; }\n  html[dir=rtl] :host:last-child > .td-data-table-heading {\n      padding-left: 24px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:last-child > .td-data-table-heading {\n      padding-left: 24px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:last-child > .td-data-table-heading {\n      padding-left: 24px;\n      unicode-bidi: embed; }\n  :host:last-child > .td-data-table-heading bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:last-child > .td-data-table-heading bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  html[dir=rtl] :host:last-child > .td-data-table-heading {\n      padding-right: 28px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:last-child > .td-data-table-heading {\n      padding-right: 28px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:last-child > .td-data-table-heading {\n      padding-right: 28px;\n      unicode-bidi: embed; }\n  :host:last-child > .td-data-table-heading bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:last-child > .td-data-table-heading bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  :host mat-icon {\n    height: 16px;\n    width: 16px;\n    font-size: 16px !important;\n    line-height: 16px !important; }\n  :host mat-icon.td-data-table-sort-icon {\n      opacity: 0;\n      transition: -webkit-transform 0.25s;\n      transition: transform 0.25s;\n      transition: transform 0.25s, -webkit-transform 0.25s;\n      position: absolute;\n      top: 0; }\n  :host mat-icon.td-data-table-sort-icon.mat-asc {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg); }\n  :host mat-icon.td-data-table-sort-icon.mat-desc {\n        -webkit-transform: rotate(180deg);\n                transform: rotate(180deg); }\n  :host:hover.mat-sortable mat-icon.td-data-table-sort-icon,\n  :host.mat-active.mat-sortable mat-icon.td-data-table-sort-icon {\n    opacity: 1; }\n  html[dir=rtl] :host {\n    text-align: right;\n    unicode-bidi: embed; }\n  body[dir=rtl] :host {\n    text-align: right;\n    unicode-bidi: embed; }\n  [dir=rtl] :host {\n    text-align: right;\n    unicode-bidi: embed; }\n  :host bdo[dir=rtl] {\n    direction: rtl;\n    unicode-bidi: bidi-override; }\n  :host bdo[dir=ltr] {\n    direction: ltr;\n    unicode-bidi: bidi-override; }\n  :host > * {\n    vertical-align: middle; }\n  :host.mat-clickable {\n    cursor: pointer; }\n  :host.mat-clickable:focus {\n      outline: none; }\n  :host .td-data-table-heading {\n    display: inline-block;\n    position: relative; }\n  :host.mat-numeric {\n    text-align: right; }\n  html[dir=rtl] :host.mat-numeric {\n      text-align: left;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host.mat-numeric {\n      text-align: left;\n      unicode-bidi: embed; }\n  [dir=rtl] :host.mat-numeric {\n      text-align: left;\n      unicode-bidi: embed; }\n  :host.mat-numeric bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host.mat-numeric bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  :host.mat-numeric mat-icon.td-data-table-sort-icon {\n      margin-left: -22px;\n      margin-right: initial; }\n  html[dir=rtl] :host.mat-numeric mat-icon.td-data-table-sort-icon {\n        margin-left: initial;\n        unicode-bidi: embed; }\n  body[dir=rtl] :host.mat-numeric mat-icon.td-data-table-sort-icon {\n        margin-left: initial;\n        unicode-bidi: embed; }\n  [dir=rtl] :host.mat-numeric mat-icon.td-data-table-sort-icon {\n        margin-left: initial;\n        unicode-bidi: embed; }\n  :host.mat-numeric mat-icon.td-data-table-sort-icon bdo[dir=rtl] {\n        direction: rtl;\n        unicode-bidi: bidi-override; }\n  :host.mat-numeric mat-icon.td-data-table-sort-icon bdo[dir=ltr] {\n        direction: ltr;\n        unicode-bidi: bidi-override; }\n  html[dir=rtl] :host.mat-numeric mat-icon.td-data-table-sort-icon {\n        margin-right: -22px;\n        unicode-bidi: embed; }\n  body[dir=rtl] :host.mat-numeric mat-icon.td-data-table-sort-icon {\n        margin-right: -22px;\n        unicode-bidi: embed; }\n  [dir=rtl] :host.mat-numeric mat-icon.td-data-table-sort-icon {\n        margin-right: -22px;\n        unicode-bidi: embed; }\n  :host.mat-numeric mat-icon.td-data-table-sort-icon bdo[dir=rtl] {\n        direction: rtl;\n        unicode-bidi: bidi-override; }\n  :host.mat-numeric mat-icon.td-data-table-sort-icon bdo[dir=ltr] {\n        direction: ltr;\n        unicode-bidi: bidi-override; }\n  :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n    margin-left: 6px;\n    margin-right: initial; }\n  html[dir=rtl] :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n      margin-left: initial;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n      margin-left: initial;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n      margin-left: initial;\n      unicode-bidi: embed; }\n  :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n  html[dir=rtl] :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n      margin-right: 6px;\n      unicode-bidi: embed; }\n  body[dir=rtl] :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n      margin-right: 6px;\n      unicode-bidi: embed; }\n  [dir=rtl] :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon {\n      margin-right: 6px;\n      unicode-bidi: embed; }\n  :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon bdo[dir=rtl] {\n      direction: rtl;\n      unicode-bidi: bidi-override; }\n  :host:not(.mat-numeric) mat-icon.td-data-table-sort-icon bdo[dir=ltr] {\n      direction: ltr;\n      unicode-bidi: bidi-override; }\n"

/***/ }),

/***/ "./src/lib/data-table/data-table-column/data-table-column.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/lib/data-table/data-table-column/data-table-column.component.ts ***!
  \*****************************************************************************/
/*! exports provided: TdDataTableColumnComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableColumnComponent", function() { return TdDataTableColumnComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-table.component */ "./src/lib/data-table/data-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TdDataTableColumnComponent = /** @class */ (function () {
    function TdDataTableColumnComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._sortOrder = _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Ascending;
        /**
         * name?: string
         * Sets unique column [name] for [sortable] events.
         */
        // tslint:disable-next-line:no-input-rename
        this.name = '';
        /**
         * sortable?: boolean
         * Enables sorting events, sort icons and active column states.
         * Defaults to 'false'
         */
        // tslint:disable-next-line:no-input-rename
        this.sortable = false;
        /**
         * active?: boolean
         * Sets column to active state when 'true'.
         * Defaults to 'false'
         */
        // tslint:disable-next-line:no-input-rename
        this.active = false;
        /**
         * numeric?: boolean
         * Makes column follow the numeric data-table specs and sort icon.
         * Defaults to 'false'
         */
        // tslint:disable-next-line:no-input-rename
        this.numeric = false;
        /**
         * sortChange?: function
         * Event emitted when the column headers are clicked. [sortable] needs to be enabled.
         * Emits an [ITdDataTableSortChangeEvent] implemented object.
         */
        this.onSortChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._renderer.addClass(this._elementRef.nativeElement, 'td-data-table-column');
    }
    Object.defineProperty(TdDataTableColumnComponent.prototype, "projectedWidth", {
        get: function () {
            if (this._columnContent && this._columnContent.nativeElement) {
                return this._columnContent.nativeElement.getBoundingClientRect().width;
            }
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableColumnComponent.prototype, "sortOrder", {
        /**
         * sortOrder?: ['ASC' | 'DESC'] or TdDataTableSortingOrder
         * Sets the sort order of column.
         * Defaults to 'ASC' or TdDataTableSortingOrder.Ascending
         */
        set: function (order) {
            var sortOrder = order ? order.toUpperCase() : 'ASC';
            if (sortOrder !== 'DESC' && sortOrder !== 'ASC') {
                throw new Error('[sortOrder] must be empty, ASC or DESC');
            }
            this._sortOrder = sortOrder === 'ASC' ?
                _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Ascending : _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Descending;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableColumnComponent.prototype, "bindClickable", {
        get: function () {
            return this.sortable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableColumnComponent.prototype, "bingSortable", {
        get: function () {
            return this.sortable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableColumnComponent.prototype, "bindActive", {
        get: function () {
            return this.active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableColumnComponent.prototype, "bindNumeric", {
        get: function () {
            return this.numeric;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Listening to click event on host to throw a sort event
     */
    TdDataTableColumnComponent.prototype.handleClick = function () {
        if (this.sortable) {
            this.onSortChange.emit({ name: this.name, order: this._sortOrder });
        }
    };
    TdDataTableColumnComponent.prototype.isAscending = function () {
        return this._sortOrder === _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Ascending;
    };
    TdDataTableColumnComponent.prototype.isDescending = function () {
        return this._sortOrder === _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Descending;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('columnContent', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TdDataTableColumnComponent.prototype, "_columnContent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('name'),
        __metadata("design:type", Object)
    ], TdDataTableColumnComponent.prototype, "name", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sortable'),
        __metadata("design:type", Object)
    ], TdDataTableColumnComponent.prototype, "sortable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('active'),
        __metadata("design:type", Object)
    ], TdDataTableColumnComponent.prototype, "active", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('numeric'),
        __metadata("design:type", Object)
    ], TdDataTableColumnComponent.prototype, "numeric", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sortOrder'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TdDataTableColumnComponent.prototype, "sortOrder", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('sortChange'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TdDataTableColumnComponent.prototype, "onSortChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class.mat-clickable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], TdDataTableColumnComponent.prototype, "bindClickable", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class.mat-sortable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], TdDataTableColumnComponent.prototype, "bingSortable", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class.mat-active'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], TdDataTableColumnComponent.prototype, "bindActive", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class.mat-numeric'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], TdDataTableColumnComponent.prototype, "bindNumeric", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TdDataTableColumnComponent.prototype, "handleClick", null);
    TdDataTableColumnComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            /* tslint:disable-next-line */
            selector: 'th[td-data-table-column]',
            styles: [__webpack_require__(/*! ./data-table-column.component.scss */ "./src/lib/data-table/data-table-column/data-table-column.component.scss")],
            template: __webpack_require__(/*! ./data-table-column.component.html */ "./src/lib/data-table/data-table-column/data-table-column.component.html"),
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], TdDataTableColumnComponent);
    return TdDataTableColumnComponent;
}());



/***/ }),

/***/ "./src/lib/data-table/data-table-row/data-table-row.component.html":
/*!*************************************************************************!*\
  !*** ./src/lib/data-table/data-table-row/data-table-row.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>"

/***/ }),

/***/ "./src/lib/data-table/data-table-row/data-table-row.component.scss":
/*!*************************************************************************!*\
  !*** ./src/lib/data-table/data-table-row/data-table-row.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  border-bottom-style: solid;\n  border-bottom-width: 1px; }\n\n:host.td-data-table-row {\n  height: 48px; }\n\n:host.td-data-table-column-row {\n  height: 56px; }\n"

/***/ }),

/***/ "./src/lib/data-table/data-table-row/data-table-row.component.ts":
/*!***********************************************************************!*\
  !*** ./src/lib/data-table/data-table-row/data-table-row.component.ts ***!
  \***********************************************************************/
/*! exports provided: TdDataTableColumnRowComponent, TdDataTableRowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableColumnRowComponent", function() { return TdDataTableColumnRowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableRowComponent", function() { return TdDataTableRowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TdDataTableColumnRowComponent = /** @class */ (function () {
    function TdDataTableColumnRowComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._renderer.addClass(this._elementRef.nativeElement, 'td-data-table-column-row');
    }
    TdDataTableColumnRowComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            /* tslint:disable-next-line */
            selector: 'tr[td-data-table-column-row]',
            styles: [__webpack_require__(/*! ./data-table-row.component.scss */ "./src/lib/data-table/data-table-row/data-table-row.component.scss")],
            template: __webpack_require__(/*! ./data-table-row.component.html */ "./src/lib/data-table/data-table-row/data-table-row.component.html"),
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], TdDataTableColumnRowComponent);
    return TdDataTableColumnRowComponent;
}());

var TdDataTableRowComponent = /** @class */ (function () {
    function TdDataTableRowComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._selected = false;
        this._renderer.addClass(this._elementRef.nativeElement, 'td-data-table-row');
    }
    Object.defineProperty(TdDataTableRowComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            if (selected) {
                this._renderer.addClass(this._elementRef.nativeElement, 'td-selected');
            }
            else {
                this._renderer.removeClass(this._elementRef.nativeElement, 'td-selected');
            }
            this._selected = selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableRowComponent.prototype, "height", {
        get: function () {
            var height = 48;
            if (this._elementRef.nativeElement) {
                height = this._elementRef.nativeElement.getBoundingClientRect().height;
            }
            return height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Listening to click event to explicitly focus the row element.
     */
    TdDataTableRowComponent.prototype.clickListener = function () {
        this.focus();
    };
    TdDataTableRowComponent.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('selected'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TdDataTableRowComponent.prototype, "selected", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TdDataTableRowComponent.prototype, "clickListener", null);
    TdDataTableRowComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            /* tslint:disable-next-line */
            selector: 'tr[td-data-table-row]',
            styles: [__webpack_require__(/*! ./data-table-row.component.scss */ "./src/lib/data-table/data-table-row/data-table-row.component.scss")],
            template: __webpack_require__(/*! ./data-table-row.component.html */ "./src/lib/data-table/data-table-row/data-table-row.component.html"),
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], TdDataTableRowComponent);
    return TdDataTableRowComponent;
}());



/***/ }),

/***/ "./src/lib/data-table/data-table-table/data-table-table.component.html":
/*!*****************************************************************************!*\
  !*** ./src/lib/data-table/data-table-table/data-table-table.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>"

/***/ }),

/***/ "./src/lib/data-table/data-table-table/data-table-table.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/lib/data-table/data-table-table/data-table-table.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  position: relative;\n  border-spacing: 0;\n  overflow: hidden;\n  border-collapse: collapse; }\n"

/***/ }),

/***/ "./src/lib/data-table/data-table-table/data-table-table.component.ts":
/*!***************************************************************************!*\
  !*** ./src/lib/data-table/data-table-table/data-table-table.component.ts ***!
  \***************************************************************************/
/*! exports provided: TdDataTableTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableTableComponent", function() { return TdDataTableTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TdDataTableTableComponent = /** @class */ (function () {
    function TdDataTableTableComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._renderer.addClass(this._elementRef.nativeElement, 'td-data-table');
    }
    TdDataTableTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            /* tslint:disable-next-line */
            selector: 'table[td-data-table]',
            styles: [__webpack_require__(/*! ./data-table-table.component.scss */ "./src/lib/data-table/data-table-table/data-table-table.component.scss")],
            template: __webpack_require__(/*! ./data-table-table.component.html */ "./src/lib/data-table/data-table-table/data-table-table.component.html"),
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], TdDataTableTableComponent);
    return TdDataTableTableComponent;
}());



/***/ }),

/***/ "./src/lib/data-table/data-table.component.html":
/*!******************************************************!*\
  !*** ./src/lib/data-table/data-table.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table td-data-table\n        [style.left.px]=\"columnsLeftScroll\"\n        [class.mat-selectable]=\"selectable\">\n  <thead class=\"td-data-table-head\">\n    <tr td-data-table-column-row>\n      <th td-data-table-column class=\"mat-checkbox-column\" *ngIf=\"selectable\">\n        <mat-checkbox\n          #checkBoxAll\n          *ngIf=\"multiple\"\n          [disabled]=\"!hasData\"\n          [indeterminate]=\"indeterminate && !allSelected && hasData\"\n          [checked]=\"allSelected && hasData\"\n          (click)=\"blockEvent($event); selectAll(!checkBoxAll.checked)\"\n          (keyup.enter)=\"selectAll(!checkBoxAll.checked)\"\n          (keyup.space)=\"selectAll(!checkBoxAll.checked)\"\n          (keydown.space)=\"blockEvent($event)\">\n        </mat-checkbox>\n      </th>\n      <th td-data-table-column\n          #columnElement\n          *ngFor=\"let column of columns; let i = index;\"\n          [style.min-width.px]=\"getColumnWidth(i)\"\n          [style.max-width.px]=\"getColumnWidth(i)\"\n          [name]=\"column.name\"\n          [numeric]=\"column.numeric\"\n          [active]=\"(column.sortable || sortable) && column === sortByColumn\"\n          [sortable]=\"column.sortable || (sortable && column.sortable !== false)\"\n          [sortOrder]=\"sortOrderEnum\"\n          [hidden]=\"column.hidden\"\n          (sortChange)=\"handleSort(column)\">\n          <span [matTooltip]=\"column.tooltip\">{{column.label}}</span>\n      </th>\n    </tr>\n  </thead>\n</table>\n<div #scrollableDiv class=\"td-data-table-scrollable\"\n      (scroll)=\"handleScroll($event)\">\n  <div [style.height.px]=\"totalHeight\"></div>\n  <table td-data-table\n          [style.transform]=\"offsetTransform\"\n          [style.position]=\"'absolute'\"\n          [class.mat-selectable]=\"selectable\"\n          [class.mat-clickable]=\"clickable\">\n    <tbody class=\"td-data-table-body\">\n      <tr td-data-table-row\n          #dtRow\n          [tabIndex]=\"selectable ? 0 : -1\"\n          [selected]=\"(clickable || selectable) && isRowSelected(row)\"\n          *ngFor=\"let row of virtualData; let rowIndex = index\"\n          (click)=\"handleRowClick(row, fromRow + rowIndex, $event)\"\n          (keyup)=\"selectable && _rowKeyup($event, row, rowIndex)\"\n          (keydown.space)=\"blockEvent($event)\"\n          (keydown.shift.space)=\"blockEvent($event)\"\n          (keydown.shift)=\"disableTextSelection()\"\n          (keyup.shift)=\"enableTextSelection()\">\n        <td td-data-table-cell class=\"mat-checkbox-cell\" *ngIf=\"selectable\">\n          <mat-pseudo-checkbox\n            [state]=\"dtRow.selected ? 'checked' : 'unchecked'\"\n            (mousedown)=\"disableTextSelection()\"\n            (mouseup)=\"enableTextSelection()\"\n            stopRowClick\n            (click)=\"select(row, $event, fromRow + rowIndex)\">\n          </mat-pseudo-checkbox>\n        </td>\n        <td td-data-table-cell\n            [numeric]=\"column.numeric\"\n            [hidden]=\"column.hidden\"\n            *ngFor=\"let column of columns; let i = index\"\n            [style.min-width.px]=\"getColumnWidth(i)\"\n            [style.max-width.px]=\"getColumnWidth(i)\">\n          <span *ngIf=\"!getTemplateRef(column.name)\">{{column.format ? column.format(getCellValue(column, row)) : getCellValue(column, row)}}</span>\n          <ng-template\n            *ngIf=\"getTemplateRef(column.name)\"\n            [ngTemplateOutlet]=\"getTemplateRef(column.name)\"\n            [ngTemplateOutletContext]=\"{ value: getCellValue(column, row), row: row, column: column.name }\">\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n<ng-content></ng-content>\n"

/***/ }),

/***/ "./src/lib/data-table/data-table.component.scss":
/*!******************************************************!*\
  !*** ./src/lib/data-table/data-table.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  overflow: hidden; }\n  :host .td-data-table-scrollable {\n    position: relative;\n    overflow: auto;\n    height: calc(100% - 56px); }\n  table.td-data-table {\n  width: auto !important; }\n  table.td-data-table.mat-selectable tbody > tr.td-data-table-row {\n    transition: background-color 0.2s; }\n  table.td-data-table.mat-selectable .td-data-table-column:first-child > .td-data-table-column-content-wrapper,\n  table.td-data-table.mat-selectable th.td-data-table-column:first-child > .td-data-table-column-content-wrapper,\n  table.td-data-table.mat-selectable td.td-data-table-cell:first-child > .td-data-table-column-content-wrapper {\n    width: 18px;\n    min-width: 18px;\n    padding: 0 24px; }\n  table.td-data-table.mat-selectable .td-data-table-column:nth-child(2) > .td-data-table-column-content-wrapper,\n  table.td-data-table.mat-selectable th.td-data-table-column:nth-child(2) > .td-data-table-column-content-wrapper,\n  table.td-data-table.mat-selectable td.td-data-table-cell:nth-child(2) > .td-data-table-column-content-wrapper {\n    padding-left: 0; }\n  [dir='rtl'] table.td-data-table.mat-selectable .td-data-table-column:nth-child(2) > .td-data-table-column-content-wrapper, [dir='rtl']\n  table.td-data-table.mat-selectable th.td-data-table-column:nth-child(2) > .td-data-table-column-content-wrapper, [dir='rtl']\n  table.td-data-table.mat-selectable td.td-data-table-cell:nth-child(2) > .td-data-table-column-content-wrapper {\n    padding-right: 0;\n    padding-left: 28px; }\n  table.td-data-table td.mat-checkbox-cell,\n  table.td-data-table th.mat-checkbox-column {\n    min-width: 42px;\n    width: 42px;\n    font-size: 0 !important; }\n  table.td-data-table td.mat-checkbox-cell mat-pseudo-checkbox,\n    table.td-data-table th.mat-checkbox-column mat-pseudo-checkbox {\n      width: 18px;\n      height: 18px; }\n  ::ng-deep table.td-data-table td.mat-checkbox-cell mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after, ::ng-deep\n      table.td-data-table th.mat-checkbox-column mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after {\n        width: 11px !important;\n        height: 4px !important; }\n  table.td-data-table td.mat-checkbox-cell mat-checkbox ::ng-deep .mat-checkbox-inner-container,\n    table.td-data-table th.mat-checkbox-column mat-checkbox ::ng-deep .mat-checkbox-inner-container {\n      width: 18px;\n      height: 18px;\n      margin: 0; }\n"

/***/ }),

/***/ "./src/lib/data-table/data-table.component.ts":
/*!****************************************************!*\
  !*** ./src/lib/data-table/data-table.component.ts ***!
  \****************************************************/
/*! exports provided: TdDataTableSortingOrder, TdDataTableBase, _TdDataTableMixinBase, TdDataTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableSortingOrder", function() { return TdDataTableSortingOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableBase", function() { return TdDataTableBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_TdDataTableMixinBase", function() { return _TdDataTableMixinBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableComponent", function() { return TdDataTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data-table-row/data-table-row.component */ "./src/lib/data-table/data-table-row/data-table-row.component.ts");
/* harmony import */ var _directives_data_table_template_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directives/data-table-template.directive */ "./src/lib/data-table/directives/data-table-template.directive.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common */ "./src/lib/common/index.ts");
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
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var TdDataTableSortingOrder;
(function (TdDataTableSortingOrder) {
    TdDataTableSortingOrder["Ascending"] = "ASC";
    TdDataTableSortingOrder["Descending"] = "DESC";
})(TdDataTableSortingOrder || (TdDataTableSortingOrder = {}));
/**
 * Constant to set the rows offset before and after the viewport
 */
var TD_VIRTUAL_OFFSET = 2;
/**
 * Constant to set default row height if none is provided
 */
var TD_VIRTUAL_DEFAULT_ROW_HEIGHT = 48;
var TdDataTableBase = /** @class */ (function () {
    function TdDataTableBase(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
    return TdDataTableBase;
}());

/* tslint:disable-next-line */
var _TdDataTableMixinBase = Object(_common__WEBPACK_IMPORTED_MODULE_9__["mixinControlValueAccessor"])(TdDataTableBase, []);
var TdDataTableComponent = /** @class */ (function (_super) {
    __extends(TdDataTableComponent, _super);
    function TdDataTableComponent(_document, _elementRef, _domSanitizer, _changeDetectorRef) {
        var _this = _super.call(this, _changeDetectorRef) || this;
        _this._document = _document;
        _this._elementRef = _elementRef;
        _this._domSanitizer = _domSanitizer;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._hostWidth = 0;
        _this._widths = [];
        _this._onResize = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        _this._scrollHorizontalOffset = 0;
        _this._onHorizontalScroll = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        _this._onVerticalScroll = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        // Array of cached row heights to allow dynamic row heights
        _this._rowHeightCache = [];
        // Total pseudo height of all the elements
        _this._totalHeight = 0;
        // Total host height for the viewport
        _this._hostHeight = 0;
        // Scrolled vertical pixels
        _this._scrollVerticalOffset = 0;
        // Variables that set from and to which rows will be rendered
        _this._fromRow = 0;
        _this._toRow = 0;
        _this._selectable = false;
        _this._clickable = false;
        _this._multiple = true;
        _this._allSelected = false;
        _this._indeterminate = false;
        /** sorting */
        _this._sortable = false;
        _this._sortOrder = TdDataTableSortingOrder.Ascending;
        /** shift select */
        _this._shiftPreviouslyPressed = false;
        _this._lastSelectedIndex = -1;
        _this._firstSelectedIndex = -1;
        _this._firstCheckboxValue = false;
        /** template fetching support */
        _this._templateMap = new Map();
        /**
         * sortChange?: function
         * Event emitted when the column headers are clicked. [sortable] needs to be enabled.
         * Emits an [ITdDataTableSortChangeEvent] implemented object.
         */
        _this.onSortChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * rowSelect?: function
         * Event emitted when a row is selected/deselected. [selectable] needs to be enabled.
         * Emits an [ITdDataTableSelectEvent] implemented object.
         */
        _this.onRowSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * rowClick?: function
         * Event emitted when a row is clicked.
         * Emits an [ITdDataTableRowClickEvent] implemented object.
         */
        _this.onRowClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * selectAll?: function
         * Event emitted when all rows are selected/deselected by the all checkbox. [selectable] needs to be enabled.
         * Emits an [ITdDataTableSelectAllEvent] implemented object.
         */
        _this.onSelectAll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * compareWith?: function(row, model): boolean
         * Allows custom comparison between row and model to see if row is selected or not
         * Default comparation is by reference
         */
        // tslint:disable-next-line:no-input-rename
        _this.compareWith = function (row, model) {
            return row === model;
        };
        return _this;
    }
    TdDataTableComponent_1 = TdDataTableComponent;
    Object.defineProperty(TdDataTableComponent.prototype, "hostWidth", {
        get: function () {
            // if the checkboxes are rendered, we need to remove their width
            // from the total width to calculate properly
            if (this.selectable) {
                return this._hostWidth - 42;
            }
            return this._hostWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "offsetTransform", {
        /**
         * Returns the offset style with a proper calculation on how much it should move
         * over the y axis of the total height
         */
        get: function () {
            return this._offsetTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "totalHeight", {
        /**
         * Returns the assumed total height of the rows
         */
        get: function () {
            return this._totalHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "fromRow", {
        /**
         * Returns the initial row to render in the viewport
         */
        get: function () {
            return this._fromRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "toRow", {
        /**
         * Returns the last row to render in the viewport
         */
        get: function () {
            return this._toRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "columnsLeftScroll", {
        /**
         * Returns scroll position to reposition column headers
         */
        get: function () {
            return this._scrollHorizontalOffset * -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "allSelected", {
        /**
         * Returns true if all values are selected.
         */
        get: function () {
            return this._allSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "indeterminate", {
        /**
         * Returns true if all values are not deselected
         * and at least one is.
         */
        get: function () {
            return this._indeterminate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * data?: {[key: string]: any}[]
         * Sets the data to be rendered as rows.
         */
        set: function (data) {
            var _this = this;
            this._data = data;
            this._rowHeightCache = [];
            Promise.resolve().then(function () {
                _this.refresh();
                // scroll back to the top if the data has changed
                _this._scrollableDiv.nativeElement.scrollTop = 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "virtualData", {
        get: function () {
            return this._virtualData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "columns", {
        get: function () {
            var _this = this;
            if (this._columns) {
                return this._columns;
            }
            if (this.hasData) {
                this._columns = [];
                // if columns is undefined, use key in [data] rows as name and label for column headers.
                var row = this._data[0];
                Object.keys(row).forEach(function (k) {
                    if (!_this._columns.find(function (c) { return c.name === k; })) {
                        _this._columns.push({ name: k, label: k });
                    }
                });
                return this._columns;
            }
            else {
                return [];
            }
        },
        /**
         * columns?: ITdDataTableColumn[]
         * Sets additional column configuration. [ITdDataTableColumn.name] has to exist in [data] as key.
         * Defaults to [data] keys.
         */
        set: function (cols) {
            this._columns = cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        /**
         * selectable?: boolean
         * Enables row selection events, hover and selected row states.
         * Defaults to 'false'
         */
        set: function (selectable) {
            this._selectable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(selectable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "clickable", {
        get: function () {
            return this._clickable;
        },
        /**
         * clickable?: boolean
         * Enables row click events, hover.
         * Defaults to 'false'
         */
        set: function (clickable) {
            this._clickable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(clickable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        /**
         * multiple?: boolean
         * Enables multiple row selection. [selectable] needs to be enabled.
         * Defaults to 'false'
         */
        set: function (multiple) {
            this._multiple = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(multiple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "sortable", {
        get: function () {
            return this._sortable;
        },
        /**
         * sortable?: boolean
         * Enables sorting events, sort icons and active column states.
         * Defaults to 'false'
         */
        set: function (sortable) {
            this._sortable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(sortable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "sortBy", {
        /**
         * sortBy?: string
         * Sets the active sort column. [sortable] needs to be enabled.
         */
        set: function (columnName) {
            if (!columnName) {
                return;
            }
            var column = this.columns.find(function (c) { return c.name === columnName; });
            if (!column) {
                throw new Error('[sortBy] must be a valid column name');
            }
            this._sortBy = column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "sortByColumn", {
        get: function () {
            return this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "sortOrder", {
        /**
         * sortOrder?: ['ASC' | 'DESC'] or TdDataTableSortingOrder
         * Sets the sort order of the [sortBy] column. [sortable] needs to be enabled.
         * Defaults to 'ASC' or TdDataTableSortingOrder.Ascending
         */
        set: function (order) {
            var sortOrder = order ? order.toUpperCase() : 'ASC';
            if (sortOrder !== 'DESC' && sortOrder !== 'ASC') {
                throw new Error('[sortOrder] must be empty, ASC or DESC');
            }
            this._sortOrder = sortOrder === 'ASC' ?
                TdDataTableSortingOrder.Ascending : TdDataTableSortingOrder.Descending;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "sortOrderEnum", {
        get: function () {
            return this._sortOrder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdDataTableComponent.prototype, "hasData", {
        get: function () {
            return this._data && this._data.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize observable for resize and scroll events
     */
    TdDataTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        // initialize observable for resize calculations
        this._resizeSubs = this._onResize.asObservable().subscribe(function () {
            if (_this._rows) {
                _this._rows.toArray().forEach(function (row, index) {
                    _this._rowHeightCache[_this.fromRow + index] = row.height + 1;
                });
            }
            _this._calculateWidths();
            _this._calculateVirtualRows();
        });
        // initialize observable for scroll column header reposition
        this._horizontalScrollSubs = this._onHorizontalScroll.asObservable()
            .subscribe(function (horizontalScroll) {
            _this._scrollHorizontalOffset = horizontalScroll;
            _this._changeDetectorRef.markForCheck();
        });
        // initialize observable for virtual scroll rendering
        this._verticalScrollSubs = this._onVerticalScroll.asObservable()
            .subscribe(function (verticalScroll) {
            _this._scrollVerticalOffset = verticalScroll;
            _this._calculateVirtualRows();
            _this._changeDetectorRef.markForCheck();
        });
        this._valueChangesSubs = this.valueChanges.subscribe(function (value) {
            _this.refresh();
        });
    };
    /**
     * Loads templates and sets them in a map for faster access.
     */
    TdDataTableComponent.prototype.ngAfterContentInit = function () {
        for (var i = 0; i < this._templates.toArray().length; i++) {
            this._templateMap.set(this._templates.toArray()[i].tdDataTableTemplate, this._templates.toArray()[i].templateRef);
        }
    };
    /**
     * Checks hosts native elements widths to see if it has changed (resize check)
     */
    TdDataTableComponent.prototype.ngAfterContentChecked = function () {
        if (this._elementRef.nativeElement) {
            var newHostWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
            // if the width has changed then we throw a resize event.
            if (this._hostWidth !== newHostWidth) {
                this._hostWidth = newHostWidth;
                this._onResize.next();
            }
        }
        if (this._scrollableDiv.nativeElement) {
            var newHostHeight = this._scrollableDiv.nativeElement.getBoundingClientRect().height;
            // if the height of the viewport has changed, then we mark for check
            if (this._hostHeight !== newHostHeight) {
                this._hostHeight = newHostHeight;
                this._calculateVirtualRows();
                this._changeDetectorRef.markForCheck();
            }
        }
    };
    /**
     * Registers to an observable that checks if all rows have been rendered
     * so we can start calculating the widths
     */
    TdDataTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._rowsChangedSubs = this._rows.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(0)).subscribe(function () {
            _this._onResize.next();
        });
        this._calculateVirtualRows();
    };
    /**
     * Unsubscribes observables when data table is destroyed
     */
    TdDataTableComponent.prototype.ngOnDestroy = function () {
        if (this._resizeSubs) {
            this._resizeSubs.unsubscribe();
        }
        if (this._horizontalScrollSubs) {
            this._horizontalScrollSubs.unsubscribe();
        }
        if (this._verticalScrollSubs) {
            this._verticalScrollSubs.unsubscribe();
        }
        if (this._rowsChangedSubs) {
            this._rowsChangedSubs.unsubscribe();
        }
        if (this._valueChangesSubs) {
            this._valueChangesSubs.unsubscribe();
        }
    };
    /**
     * Method that gets executed every time there is a scroll event
     * Calls the scroll observable
     */
    TdDataTableComponent.prototype.handleScroll = function (event) {
        var element = event.target;
        if (element) {
            var horizontalScroll = element.scrollLeft;
            if (this._scrollHorizontalOffset !== horizontalScroll) {
                this._onHorizontalScroll.next(horizontalScroll);
            }
            var verticalScroll = element.scrollTop;
            if (this._scrollVerticalOffset !== verticalScroll) {
                this._onVerticalScroll.next(verticalScroll);
            }
        }
    };
    /**
     * Returns the width needed for the columns via index
     */
    TdDataTableComponent.prototype.getColumnWidth = function (index) {
        if (this._widths[index]) {
            return this._widths[index].value;
        }
        return undefined;
    };
    TdDataTableComponent.prototype.getCellValue = function (column, value) {
        if (column.nested === undefined || column.nested) {
            return this._getNestedValue(column.name, value);
        }
        return value[column.name];
    };
    /**
     * Getter method for template references
     */
    TdDataTableComponent.prototype.getTemplateRef = function (name) {
        return this._templateMap.get(name);
    };
    /**
     * Clears model (ngModel) of component by removing all values in array.
     */
    TdDataTableComponent.prototype.clearModel = function () {
        this.value.splice(0, this.value.length);
    };
    /**
     * Refreshes data table and rerenders [data] and [columns]
     */
    TdDataTableComponent.prototype.refresh = function () {
        this._calculateVirtualRows();
        this._calculateWidths();
        this._calculateCheckboxState();
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Selects or clears all rows depending on 'checked' value.
     */
    TdDataTableComponent.prototype.selectAll = function (checked) {
        var _this = this;
        var toggledRows = [];
        if (checked) {
            this._data.forEach(function (row) {
                // skiping already selected rows
                if (!_this.isRowSelected(row)) {
                    _this.value.push(row);
                    // checking which ones are being toggled
                    toggledRows.push(row);
                }
            });
            this._allSelected = true;
            this._indeterminate = true;
        }
        else {
            this._data.forEach(function (row) {
                // checking which ones are being toggled
                if (_this.isRowSelected(row)) {
                    toggledRows.push(row);
                    var modelRow = _this.value.filter(function (val) {
                        return _this.compareWith(row, val);
                    })[0];
                    var index = _this.value.indexOf(modelRow);
                    if (index > -1) {
                        _this.value.splice(index, 1);
                    }
                }
            });
            this._allSelected = false;
            this._indeterminate = false;
        }
        this.onSelectAll.emit({ rows: toggledRows, selected: checked });
        this.onChange(this.value);
    };
    /**
     * Checks if row is selected
     */
    TdDataTableComponent.prototype.isRowSelected = function (row) {
        var _this = this;
        // compare items by [compareWith] function
        return this.value ? this.value.filter(function (val) {
            return _this.compareWith(row, val);
        }).length > 0 : false;
    };
    /**
     * Selects or clears a row depending on 'checked' value if the row 'isSelectable'
     * handles cntrl clicks and shift clicks for multi-select
     */
    TdDataTableComponent.prototype.select = function (row, event, currentSelected) {
        if (this.selectable) {
            this.blockEvent(event);
            // Check to see if Shift key is selected and need to select everything in between
            var mouseEvent = event;
            if (this.multiple && mouseEvent && mouseEvent.shiftKey && this._lastSelectedIndex > -1) {
                var firstIndex = currentSelected;
                var lastIndex = this._lastSelectedIndex;
                if (currentSelected > this._lastSelectedIndex) {
                    firstIndex = this._lastSelectedIndex;
                    lastIndex = currentSelected;
                }
                // if clicking a checkbox behind the initial check, then toggle all selections expect the initial checkbox
                // else the checkboxes clicked are all after the initial one
                if ((this._firstSelectedIndex >= currentSelected && this._lastSelectedIndex > this._firstSelectedIndex) ||
                    (this._firstSelectedIndex <= currentSelected && this._lastSelectedIndex < this._firstSelectedIndex)) {
                    for (var i = firstIndex; i <= lastIndex; i++) {
                        if (this._firstSelectedIndex !== i) {
                            this._doSelection(this._data[i], i);
                        }
                    }
                }
                else if ((this._firstSelectedIndex > currentSelected) || (this._firstSelectedIndex < currentSelected)) {
                    // change indexes depending on where the next checkbox is selected (before or after)
                    if (this._firstSelectedIndex > currentSelected) {
                        lastIndex--;
                    }
                    else if (this._firstSelectedIndex < currentSelected) {
                        firstIndex++;
                    }
                    for (var i = firstIndex; i <= lastIndex; i++) {
                        var rowSelected = this.isRowSelected(this._data[i]);
                        // if row is selected and first checkbox was selected
                        // or if row was unselected and first checkbox was unselected
                        // we ignore the toggle
                        if ((this._firstCheckboxValue && !rowSelected) ||
                            (!this._firstCheckboxValue && rowSelected)) {
                            this._doSelection(this._data[i], i);
                        }
                        else if (this._shiftPreviouslyPressed) {
                            // else if the checkbox selected was in the middle of the last selection and the first selection
                            // then we undo the selections
                            if ((currentSelected >= this._firstSelectedIndex && currentSelected <= this._lastSelectedIndex) ||
                                (currentSelected <= this._firstSelectedIndex && currentSelected >= this._lastSelectedIndex)) {
                                this._doSelection(this._data[i], i);
                            }
                        }
                    }
                }
                this._shiftPreviouslyPressed = true;
                // if shift wasnt pressed, then we take the element checked as the first row
                // incase the next click uses shift
            }
            else if (mouseEvent && !mouseEvent.shiftKey) {
                this._firstCheckboxValue = this._doSelection(row, currentSelected);
                this._shiftPreviouslyPressed = false;
                this._firstSelectedIndex = currentSelected;
            }
            this._lastSelectedIndex = currentSelected;
        }
    };
    /**
     * Overrides the onselectstart method of the document so other text on the page
     * doesn't get selected when doing shift selections.
     */
    TdDataTableComponent.prototype.disableTextSelection = function () {
        if (this._document) {
            this._document.onselectstart = function () {
                return false;
            };
        }
    };
    /**
     * Resets the original onselectstart method.
     */
    TdDataTableComponent.prototype.enableTextSelection = function () {
        if (this._document) {
            this._document.onselectstart = undefined;
        }
    };
    /**
     * emits the onRowClickEvent when a row is clicked
     * if clickable is true and selectable is false then select the row
     */
    TdDataTableComponent.prototype.handleRowClick = function (row, index, event) {
        if (this.clickable) {
            // ignoring linting rules here because attribute it actually null or not there
            // can't check for undefined
            var srcElement = event.srcElement || event.currentTarget;
            var element = event.target;
            /* tslint:disable-next-line */
            if (srcElement.getAttribute('stopRowClick') === null && element.tagName.toLowerCase() !== 'mat-pseudo-checkbox') {
                this.onRowClick.emit({
                    row: row,
                    index: index,
                });
            }
        }
    };
    /**
     * Method handle for sort click event in column headers.
     */
    TdDataTableComponent.prototype.handleSort = function (column) {
        if (this._sortBy === column) {
            this._sortOrder = this._sortOrder === TdDataTableSortingOrder.Ascending ?
                TdDataTableSortingOrder.Descending : TdDataTableSortingOrder.Ascending;
        }
        else {
            this._sortBy = column;
            this._sortOrder = TdDataTableSortingOrder.Ascending;
        }
        this.onSortChange.next({ name: this._sortBy.name, order: this._sortOrder });
    };
    /**
     * Handle all keyup events when focusing a data table row
     */
    TdDataTableComponent.prototype._rowKeyup = function (event, row, index) {
        switch (event.keyCode) {
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__["ENTER"]:
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__["SPACE"]:
                /** if user presses enter or space, the row should be selected */
                if (this.selectable) {
                    this._doSelection(this._data[this.fromRow + index], this.fromRow + index);
                }
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__["UP_ARROW"]:
                /**
                 * if users presses the up arrow, we focus the prev row
                 * unless its the first row
                 */
                if (index > 0) {
                    this._rows.toArray()[index - 1].focus();
                }
                this.blockEvent(event);
                if (this.selectable && this.multiple && event.shiftKey && this.fromRow + index >= 0) {
                    this._doSelection(this._data[this.fromRow + index], this.fromRow + index);
                }
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__["DOWN_ARROW"]:
                /**
                 * if users presses the down arrow, we focus the next row
                 * unless its the last row
                 */
                if (index < (this._rows.toArray().length - 1)) {
                    this._rows.toArray()[index + 1].focus();
                }
                this.blockEvent(event);
                if (this.selectable && this.multiple && event.shiftKey && this.fromRow + index < this._data.length) {
                    this._doSelection(this._data[this.fromRow + index], this.fromRow + index);
                }
                break;
            default:
        }
    };
    /**
     * Method to prevent the default events
     */
    TdDataTableComponent.prototype.blockEvent = function (event) {
        event.preventDefault();
    };
    TdDataTableComponent.prototype._getNestedValue = function (name, value) {
        if (!(value instanceof Object) || !name) {
            return value;
        }
        if (name.indexOf('.') > -1) {
            var splitName = name.split(/\.(.+)/, 2);
            return this._getNestedValue(splitName[1], value[splitName[0]]);
        }
        else {
            return value[name];
        }
    };
    /**
     * Does the actual Row Selection
     */
    TdDataTableComponent.prototype._doSelection = function (row, rowIndex) {
        var _this = this;
        var wasSelected = this.isRowSelected(row);
        if (!wasSelected) {
            if (!this._multiple) {
                this.clearModel();
            }
            this.value.push(row);
        }
        else {
            // compare items by [compareWith] function
            row = this.value.filter(function (val) {
                return _this.compareWith(row, val);
            })[0];
            var index = this.value.indexOf(row);
            if (index > -1) {
                this.value.splice(index, 1);
            }
        }
        this._calculateCheckboxState();
        this.onRowSelect.emit({ row: row, index: rowIndex, selected: !wasSelected });
        this.onChange(this.value);
        return !wasSelected;
    };
    /**
     * Calculate all the state of all checkboxes
     */
    TdDataTableComponent.prototype._calculateCheckboxState = function () {
        var _this = this;
        if (this._data) {
            this._allSelected = typeof this._data.find(function (d) { return !_this.isRowSelected(d); }) === 'undefined';
            this._indeterminate = false;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                var row = _a[_i];
                if (!this.isRowSelected(row)) {
                    continue;
                }
                this._indeterminate = true;
                break;
            }
        }
    };
    /**
     * Calculates the widths for columns and cells depending on content
     */
    TdDataTableComponent.prototype._calculateWidths = function () {
        var _this = this;
        if (this._colElements && this._colElements.length) {
            this._widths = [];
            this._colElements.forEach(function (col, index) {
                _this._adjustColumnWidth(index, _this._calculateWidth());
            });
            this._adjustColumnWidhts();
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * Adjusts columns after calculation to see if they need to be recalculated.
     */
    TdDataTableComponent.prototype._adjustColumnWidhts = function () {
        var _this = this;
        var fixedTotalWidth = 0;
        // get the number of total columns that have flexible widths (not fixed or hidden)
        var flexibleWidths = this._widths.filter(function (width, index) {
            if (_this.columns[index].hidden) {
                return false;
            }
            if (width.limit || width.max || width.min) {
                fixedTotalWidth += width.value;
            }
            return !width.limit && !width.max && !width.min;
        }).length;
        // calculate how much pixes are left that could be spread across
        // the flexible columns
        var recalculateHostWidth = 0;
        if (fixedTotalWidth < this.hostWidth) {
            recalculateHostWidth = this.hostWidth - fixedTotalWidth;
        }
        // if we have flexible columns and pixels to spare on them
        // we try and spread the pixels across them
        if (flexibleWidths && recalculateHostWidth) {
            var newValue_1 = Math.floor(recalculateHostWidth / flexibleWidths);
            var adjustedNumber_1 = 0;
            // adjust the column widths with the spread pixels
            this._widths.forEach(function (colWidth) {
                if (_this._widths[colWidth.index].max && _this._widths[colWidth.index].value > newValue_1 ||
                    _this._widths[colWidth.index].min && _this._widths[colWidth.index].value < newValue_1 ||
                    !_this._widths[colWidth.index].limit) {
                    _this._adjustColumnWidth(colWidth.index, newValue_1);
                    adjustedNumber_1++;
                }
            });
            // if there are still columns that need to be recalculated, we start over
            var newFlexibleWidths = this._widths.filter(function (width) {
                return !width.limit && !width.max;
            }).length;
            if (newFlexibleWidths !== adjustedNumber_1 && newFlexibleWidths !== flexibleWidths) {
                this._adjustColumnWidhts();
            }
        }
    };
    /**
     * Adjusts a single column to see if it can be recalculated
     */
    TdDataTableComponent.prototype._adjustColumnWidth = function (index, value) {
        this._widths[index] = {
            value: value,
            index: index,
            limit: false,
            min: false,
            max: false,
        };
        // flag to see if we need to skip the min width projection
        // depending if a width or min width has been provided
        var skipMinWidthProjection = false;
        if (this.columns[index]) {
            // if the provided width has min/max, then we check to see if we need to set it
            if (typeof this.columns[index].width === 'object') {
                var widthOpts = this.columns[index].width;
                // if the column width is less than the configured min, we override it
                skipMinWidthProjection = (widthOpts && !!widthOpts.min);
                if (widthOpts && widthOpts.min >= this._widths[index].value) {
                    this._widths[index].value = widthOpts.min;
                    this._widths[index].min = true;
                    // if the column width is more than the configured max, we override it
                }
                else if (widthOpts && widthOpts.max <= this._widths[index].value) {
                    this._widths[index].value = widthOpts.max;
                    this._widths[index].max = true;
                }
                // if it has a fixed width, then we just set it
            }
            else if (typeof this.columns[index].width === 'number') {
                this._widths[index].value = this.columns[index].width;
                skipMinWidthProjection = this._widths[index].limit = true;
            }
        }
        // if there wasn't any width or min width provided, we set a min to what the column width min should be
        if (!skipMinWidthProjection &&
            this._widths[index].value < this._colElements.toArray()[index].projectedWidth) {
            this._widths[index].value = this._colElements.toArray()[index].projectedWidth;
            this._widths[index].min = true;
            this._widths[index].limit = false;
        }
    };
    /**
     * Generic method to calculate column width
     */
    TdDataTableComponent.prototype._calculateWidth = function () {
        var renderedColumns = this.columns.filter(function (col) { return !col.hidden; });
        return Math.floor(this.hostWidth / renderedColumns.length);
    };
    /**
     * Method to calculate the rows to be rendered in the viewport
     */
    TdDataTableComponent.prototype._calculateVirtualRows = function () {
        var _this = this;
        var scrolledRows = 0;
        if (this._data) {
            this._totalHeight = 0;
            var rowHeightSum_1 = 0;
            // loop through all rows to see if we have their height cached
            // and sum them all to calculate the total height
            this._data.forEach(function (d, i) {
                // iterate through all rows at first and assume all
                // rows are the same height as the first one
                if (!_this._rowHeightCache[i]) {
                    _this._rowHeightCache[i] = _this._rowHeightCache[0] || TD_VIRTUAL_DEFAULT_ROW_HEIGHT;
                }
                rowHeightSum_1 += _this._rowHeightCache[i];
                // check how many rows have been scrolled
                if (_this._scrollVerticalOffset - rowHeightSum_1 > 0) {
                    scrolledRows++;
                }
            });
            this._totalHeight = rowHeightSum_1;
            // set the initial row to be rendered taking into account the row offset
            var fromRow = scrolledRows - TD_VIRTUAL_OFFSET;
            this._fromRow = fromRow > 0 ? fromRow : 0;
            var hostHeight = this._hostHeight;
            var index = 0;
            // calculate how many rows can fit in the viewport
            while (hostHeight > 0) {
                hostHeight -= this._rowHeightCache[this.fromRow + index];
                index++;
            }
            // set the last row to be rendered taking into account the row offset
            var range = (index - 1) + (TD_VIRTUAL_OFFSET * 2);
            var toRow = range + this.fromRow;
            // if last row is greater than the total length, then we use the total length
            if (isFinite(toRow) && toRow > this._data.length) {
                toRow = this._data.length;
            }
            else if (!isFinite(toRow)) {
                toRow = TD_VIRTUAL_OFFSET;
            }
            this._toRow = toRow;
        }
        else {
            this._totalHeight = 0;
            this._fromRow = 0;
            this._toRow = 0;
        }
        var offset = 0;
        // calculate the proper offset depending on how many rows have been scrolled
        if (scrolledRows > TD_VIRTUAL_OFFSET) {
            for (var index = 0; index < this.fromRow; index++) {
                offset += this._rowHeightCache[index];
            }
        }
        this._offsetTransform = this._domSanitizer.bypassSecurityTrustStyle('translateY(' + (offset - this.totalHeight) + 'px)');
        if (this._data) {
            this._virtualData = this.data.slice(this.fromRow, this.toRow);
        }
        // mark for check at the end of the queue so we are sure
        // that the changes will be marked
        Promise.resolve().then(function () {
            _this._changeDetectorRef.markForCheck();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(_directives_data_table_template_directive__WEBPACK_IMPORTED_MODULE_8__["TdDataTableTemplateDirective"]),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], TdDataTableComponent.prototype, "_templates", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('scrollableDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TdDataTableComponent.prototype, "_scrollableDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('columnElement'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], TdDataTableComponent.prototype, "_colElements", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])(_data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_7__["TdDataTableRowComponent"]),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], TdDataTableComponent.prototype, "_rows", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('data'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TdDataTableComponent.prototype, "data", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('columns'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TdDataTableComponent.prototype, "columns", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('selectable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TdDataTableComponent.prototype, "selectable", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('clickable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TdDataTableComponent.prototype, "clickable", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('multiple'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TdDataTableComponent.prototype, "multiple", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sortable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TdDataTableComponent.prototype, "sortable", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sortBy'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TdDataTableComponent.prototype, "sortBy", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sortOrder'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TdDataTableComponent.prototype, "sortOrder", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('sortChange'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TdDataTableComponent.prototype, "onSortChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('rowSelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TdDataTableComponent.prototype, "onRowSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('rowClick'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TdDataTableComponent.prototype, "onRowClick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('selectAll'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TdDataTableComponent.prototype, "onSelectAll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('compareWith'),
        __metadata("design:type", Function)
    ], TdDataTableComponent.prototype, "compareWith", void 0);
    TdDataTableComponent = TdDataTableComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            providers: [{
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return TdDataTableComponent_1; }),
                    multi: true,
                }],
            selector: 'td-data-table',
            styles: [__webpack_require__(/*! ./data-table.component.scss */ "./src/lib/data-table/data-table.component.scss")],
            template: __webpack_require__(/*! ./data-table.component.html */ "./src/lib/data-table/data-table.component.html"),
            // tslint:disable-next-line:use-input-property-decorator
            inputs: ['value'],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()), __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])),
        __metadata("design:paramtypes", [Object, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], TdDataTableComponent);
    return TdDataTableComponent;
    var TdDataTableComponent_1;
}(_TdDataTableMixinBase));



/***/ }),

/***/ "./src/lib/data-table/data-table.module.ts":
/*!*************************************************!*\
  !*** ./src/lib/data-table/data-table.module.ts ***!
  \*************************************************/
/*! exports provided: DataTableModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTableModule", function() { return DataTableModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _data_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data-table.component */ "./src/lib/data-table/data-table.component.ts");
/* harmony import */ var _data_table_column_data_table_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data-table-column/data-table-column.component */ "./src/lib/data-table/data-table-column/data-table-column.component.ts");
/* harmony import */ var _data_table_cell_data_table_cell_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data-table-cell/data-table-cell.component */ "./src/lib/data-table/data-table-cell/data-table-cell.component.ts");
/* harmony import */ var _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data-table-row/data-table-row.component */ "./src/lib/data-table/data-table-row/data-table-row.component.ts");
/* harmony import */ var _data_table_table_data_table_table_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./data-table-table/data-table-table.component */ "./src/lib/data-table/data-table-table/data-table-table.component.ts");
/* harmony import */ var _directives_data_table_template_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/data-table-template.directive */ "./src/lib/data-table/directives/data-table-template.directive.ts");
/* harmony import */ var _services_data_table_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/data-table.service */ "./src/lib/data-table/services/data-table.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var TD_DATA_TABLE = [
    _data_table_component__WEBPACK_IMPORTED_MODULE_6__["TdDataTableComponent"],
    _directives_data_table_template_directive__WEBPACK_IMPORTED_MODULE_11__["TdDataTableTemplateDirective"],
    _data_table_column_data_table_column_component__WEBPACK_IMPORTED_MODULE_7__["TdDataTableColumnComponent"],
    _data_table_cell_data_table_cell_component__WEBPACK_IMPORTED_MODULE_8__["TdDataTableCellComponent"],
    _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_9__["TdDataTableRowComponent"],
    _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_9__["TdDataTableColumnRowComponent"],
    _data_table_table_data_table_table_component__WEBPACK_IMPORTED_MODULE_10__["TdDataTableTableComponent"],
];
var DataTableModule = /** @class */ (function () {
    function DataTableModule() {
    }
    DataTableModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatPseudoCheckboxModule"],
            ],
            declarations: [
                TD_DATA_TABLE,
            ],
            exports: [
                TD_DATA_TABLE,
            ],
            providers: [
                _services_data_table_service__WEBPACK_IMPORTED_MODULE_12__["DATA_TABLE_PROVIDER"],
            ],
        })
    ], DataTableModule);
    return DataTableModule;
}());



/***/ }),

/***/ "./src/lib/data-table/directives/data-table-template.directive.ts":
/*!************************************************************************!*\
  !*** ./src/lib/data-table/directives/data-table-template.directive.ts ***!
  \************************************************************************/
/*! exports provided: TdDataTableTemplateDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableTemplateDirective", function() { return TdDataTableTemplateDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
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
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TdDataTableTemplateDirective = /** @class */ (function (_super) {
    __extends(TdDataTableTemplateDirective, _super);
    function TdDataTableTemplateDirective(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TdDataTableTemplateDirective.prototype, "tdDataTableTemplate", void 0);
    TdDataTableTemplateDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({ selector: '[tdDataTableTemplate]ng-template' }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]])
    ], TdDataTableTemplateDirective);
    return TdDataTableTemplateDirective;
}(_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["TemplatePortalDirective"]));



/***/ }),

/***/ "./src/lib/data-table/index.ts":
/*!*************************************!*\
  !*** ./src/lib/data-table/index.ts ***!
  \*************************************/
/*! exports provided: DataTableModule, TdDataTableSortingOrder, TdDataTableBase, _TdDataTableMixinBase, TdDataTableComponent, TdDataTableCellComponent, TdDataTableColumnComponent, TdDataTableColumnRowComponent, TdDataTableRowComponent, TdDataTableTableComponent, TdDataTableTemplateDirective, TdDataTableService, DATA_TABLE_PROVIDER_FACTORY, DATA_TABLE_PROVIDER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "./src/lib/data-table/public-api.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTableModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["DataTableModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableSortingOrder", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableSortingOrder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableBase", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_TdDataTableMixinBase", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["_TdDataTableMixinBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableCellComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableCellComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableColumnComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableColumnComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableColumnRowComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableColumnRowComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableRowComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableRowComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableTableComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableTableComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableTemplateDirective", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableTemplateDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdDataTableService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PROVIDER_FACTORY", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["DATA_TABLE_PROVIDER_FACTORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PROVIDER", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["DATA_TABLE_PROVIDER"]; });




/***/ }),

/***/ "./src/lib/data-table/public-api.ts":
/*!******************************************!*\
  !*** ./src/lib/data-table/public-api.ts ***!
  \******************************************/
/*! exports provided: DataTableModule, TdDataTableSortingOrder, TdDataTableBase, _TdDataTableMixinBase, TdDataTableComponent, TdDataTableCellComponent, TdDataTableColumnComponent, TdDataTableColumnRowComponent, TdDataTableRowComponent, TdDataTableTableComponent, TdDataTableTemplateDirective, TdDataTableService, DATA_TABLE_PROVIDER_FACTORY, DATA_TABLE_PROVIDER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_table_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-table.module */ "./src/lib/data-table/data-table.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTableModule", function() { return _data_table_module__WEBPACK_IMPORTED_MODULE_0__["DataTableModule"]; });

/* harmony import */ var _data_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-table.component */ "./src/lib/data-table/data-table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableSortingOrder", function() { return _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableBase", function() { return _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_TdDataTableMixinBase", function() { return _data_table_component__WEBPACK_IMPORTED_MODULE_1__["_TdDataTableMixinBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableComponent", function() { return _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableComponent"]; });

/* harmony import */ var _data_table_cell_data_table_cell_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-table-cell/data-table-cell.component */ "./src/lib/data-table/data-table-cell/data-table-cell.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableCellComponent", function() { return _data_table_cell_data_table_cell_component__WEBPACK_IMPORTED_MODULE_2__["TdDataTableCellComponent"]; });

/* harmony import */ var _data_table_column_data_table_column_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data-table-column/data-table-column.component */ "./src/lib/data-table/data-table-column/data-table-column.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableColumnComponent", function() { return _data_table_column_data_table_column_component__WEBPACK_IMPORTED_MODULE_3__["TdDataTableColumnComponent"]; });

/* harmony import */ var _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data-table-row/data-table-row.component */ "./src/lib/data-table/data-table-row/data-table-row.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableColumnRowComponent", function() { return _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_4__["TdDataTableColumnRowComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableRowComponent", function() { return _data_table_row_data_table_row_component__WEBPACK_IMPORTED_MODULE_4__["TdDataTableRowComponent"]; });

/* harmony import */ var _data_table_table_data_table_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data-table-table/data-table-table.component */ "./src/lib/data-table/data-table-table/data-table-table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableTableComponent", function() { return _data_table_table_data_table_table_component__WEBPACK_IMPORTED_MODULE_5__["TdDataTableTableComponent"]; });

/* harmony import */ var _directives_data_table_template_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/data-table-template.directive */ "./src/lib/data-table/directives/data-table-template.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableTemplateDirective", function() { return _directives_data_table_template_directive__WEBPACK_IMPORTED_MODULE_6__["TdDataTableTemplateDirective"]; });

/* harmony import */ var _services_data_table_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/data-table.service */ "./src/lib/data-table/services/data-table.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdDataTableService", function() { return _services_data_table_service__WEBPACK_IMPORTED_MODULE_7__["TdDataTableService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PROVIDER_FACTORY", function() { return _services_data_table_service__WEBPACK_IMPORTED_MODULE_7__["DATA_TABLE_PROVIDER_FACTORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PROVIDER", function() { return _services_data_table_service__WEBPACK_IMPORTED_MODULE_7__["DATA_TABLE_PROVIDER"]; });











/***/ }),

/***/ "./src/lib/data-table/services/data-table.service.ts":
/*!***********************************************************!*\
  !*** ./src/lib/data-table/services/data-table.service.ts ***!
  \***********************************************************/
/*! exports provided: TdDataTableService, DATA_TABLE_PROVIDER_FACTORY, DATA_TABLE_PROVIDER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdDataTableService", function() { return TdDataTableService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PROVIDER_FACTORY", function() { return DATA_TABLE_PROVIDER_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_TABLE_PROVIDER", function() { return DATA_TABLE_PROVIDER; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-table.component */ "./src/lib/data-table/data-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TdDataTableService = /** @class */ (function () {
    function TdDataTableService() {
    }
    /**
     * params:
     * - data: any[]
     * - searchTerm: string
     * - ignoreCase: boolean = false
     * - excludedColumns: string[] = []
     *
     * Searches [data] parameter for [searchTerm] matches and returns a new array with them.
     */
    TdDataTableService.prototype.filterData = function (data, searchTerm, ignoreCase, excludedColumns) {
        if (ignoreCase === void 0) { ignoreCase = false; }
        var filter = searchTerm ? (ignoreCase ? searchTerm.toLowerCase() : searchTerm) : '';
        if (filter) {
            data = data.filter(function (item) {
                var res = Object.keys(item).find(function (key) {
                    if (!excludedColumns || excludedColumns.indexOf(key) === -1) {
                        var preItemValue = ('' + item[key]);
                        var itemValue = ignoreCase ? preItemValue.toLowerCase() : preItemValue;
                        return itemValue.indexOf(filter) > -1;
                    }
                });
                return !(typeof res === 'undefined');
            });
        }
        return data;
    };
    /**
     * params:
     * - data: any[]
     * - sortBy: string
     * - sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending
     *
     * Sorts [data] parameter by [sortBy] and [sortOrder] and returns the sorted data.
     */
    TdDataTableService.prototype.sortData = function (data, sortBy, sortOrder) {
        if (sortOrder === void 0) { sortOrder = _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Ascending; }
        if (sortBy) {
            data = Array.from(data); // Change the array reference to trigger OnPush and not mutate original array
            data.sort(function (a, b) {
                var compA = a[sortBy];
                var compB = b[sortBy];
                var direction = 0;
                if (!Number.isNaN(Number.parseFloat(compA)) && !Number.isNaN(Number.parseFloat(compB))) {
                    direction = Number.parseFloat(compA) - Number.parseFloat(compB);
                }
                else {
                    if (compA < compB) {
                        direction = -1;
                    }
                    else if (compA > compB) {
                        direction = 1;
                    }
                }
                return direction * (sortOrder === _data_table_component__WEBPACK_IMPORTED_MODULE_1__["TdDataTableSortingOrder"].Descending ? -1 : 1);
            });
        }
        return data;
    };
    /**
     * params:
     * - data: any[]
     * - fromRow: number
     * - toRow: : number
     *
     * Returns a section of the [data] parameter starting from [fromRow] and ending in [toRow].
     */
    TdDataTableService.prototype.pageData = function (data, fromRow, toRow) {
        if (fromRow >= 1) {
            data = data.slice(fromRow - 1, toRow);
        }
        return data;
    };
    TdDataTableService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], TdDataTableService);
    return TdDataTableService;
}());

function DATA_TABLE_PROVIDER_FACTORY(parent) {
    return parent || new TdDataTableService();
}
var DATA_TABLE_PROVIDER = {
    // If there is already a service available, use that. Otherwise, provide a new one.
    provide: TdDataTableService,
    deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), TdDataTableService]],
    useFactory: DATA_TABLE_PROVIDER_FACTORY,
};


/***/ }),

/***/ "./src/lib/paging/index.ts":
/*!*********************************!*\
  !*** ./src/lib/paging/index.ts ***!
  \*********************************/
/*! exports provided: PagingModule, TdPagingBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "./src/lib/paging/public-api.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PagingModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["PagingModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdPagingBarComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TdPagingBarComponent"]; });




/***/ }),

/***/ "./src/lib/paging/paging-bar.component.html":
/*!**************************************************!*\
  !*** ./src/lib/paging/paging-bar.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"td-paging-bar\" (change)=\"$event.stopPropagation()\" >\n  <ng-content></ng-content>\n  <div class=\"td-paging-bar-navigation\">\n    <button mat-icon-button class=\"td-paging-bar-first-page\" type=\"button\" *ngIf=\"firstLast\" [disabled]=\"isMinPage()\" (click)=\"firstPage()\">\n      <mat-icon>{{ isRTL ? 'skip_next' : 'skip_previous' }}</mat-icon>\n    </button>\n    <button mat-icon-button class=\"td-paging-bar-prev-page\" type=\"button\" [disabled]=\"isMinPage()\" (click)=\"prevPage()\">\n      <mat-icon>{{ isRTL ? 'navigate_next' : 'navigate_before' }}</mat-icon>\n    </button>\n    <ng-template *ngIf=\"pageLinkCount > 0\" let-link let-index=\"index\" ngFor [ngForOf]=\"pageLinks\">\n      <button class=\"td-paging-bar-link-page\" mat-icon-button type=\"button\" [color]=\"page === link ? 'accent' : ''\" (click)=\"navigateToPage(link)\">{{link}}</button>\n    </ng-template>\n    <button mat-icon-button class=\"td-paging-bar-next-page\" type=\"button\" [disabled]=\"isMaxPage()\" (click)=\"nextPage()\">\n      <mat-icon>{{ isRTL ? 'navigate_before' : 'navigate_next' }}</mat-icon>\n    </button>\n    <button mat-icon-button class=\"td-paging-bar-last-page\" type=\"button\" *ngIf=\"firstLast\" [disabled]=\"isMaxPage()\" (click)=\"lastPage()\">\n      <mat-icon>{{ isRTL ? 'skip_previous' : 'skip_next' }}</mat-icon>\n    </button>\n  </div>\n</div>"

/***/ }),

/***/ "./src/lib/paging/paging-bar.component.scss":
/*!**************************************************!*\
  !*** ./src/lib/paging/paging-bar.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  height: 48px; }\n  :host .td-paging-bar {\n    height: 48px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n    justify-content: flex-end; }\n  :host .td-paging-bar ::ng-deep > * {\n      margin: 0 10px; }\n  :host .td-paging-bar [mat-icon-button] {\n      font-size: 12px;\n      font-weight: normal; }\n"

/***/ }),

/***/ "./src/lib/paging/paging-bar.component.ts":
/*!************************************************!*\
  !*** ./src/lib/paging/paging-bar.component.ts ***!
  \************************************************/
/*! exports provided: TdPagingBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdPagingBarComponent", function() { return TdPagingBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
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



var TdPagingBarComponent = /** @class */ (function () {
    function TdPagingBarComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        this._pageSize = 50;
        this._total = 0;
        this._page = 1;
        this._fromRow = 1;
        this._toRow = 1;
        this._initialized = false;
        this._pageLinks = [];
        this._pageLinkCount = 0;
        // special case when 2 pageLinks, detect when hit end of pages so can lead in correct direction
        this._hitEnd = false;
        // special case when 2 pageLinks, detect when hit start of pages so can lead in correct direction
        this._hitStart = false;
        /**
         * firstLast?: boolean
         * Shows or hides the first and last page buttons of the paging bar. Defaults to 'false'
         */
        this.firstLast = true;
        /**
         * initialPage?: number
         * Sets starting page for the paging bar. Defaults to '1'
         */
        this.initialPage = 1;
        /**
         * change?: function
         * Method to be executed when page size changes or any button is clicked in the paging bar.
         * Emits an [IPageChangeEvent] implemented object.
         */
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(TdPagingBarComponent.prototype, "pageLinkCount", {
        get: function () {
            return this._pageLinkCount;
        },
        /**
         * pageLinkCount?: number
         * Amount of page navigation links for the paging bar. Defaults to '0'
         */
        set: function (pageLinkCount) {
            this._pageLinkCount = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(pageLinkCount);
            this._calculatePageLinks();
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        /**
         * pageSize?: number
         * Selected page size for the pagination. Defaults 50.
         */
        set: function (pageSize) {
            this._pageSize = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(pageSize);
            this._page = 1;
            if (this._initialized) {
                this._handleOnChange();
            }
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "total", {
        get: function () {
            return this._total;
        },
        /**
         * total: number
         * Total rows for the pagination.
         */
        set: function (total) {
            this._total = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(total);
            this._calculateRows();
            this._calculatePageLinks();
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "pageLinks", {
        /**
         * pageLinks: number[]
         * Returns the pageLinks in an array
         */
        get: function () {
            return this._pageLinks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "range", {
        /**
         * range: string
         * Returns the range of the rows.
         */
        get: function () {
            return (!this._toRow ? 0 : this._fromRow) + "-" + this._toRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "page", {
        /**
         * page: number
         * Returns the current page.
         */
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "maxPage", {
        /**
         * page: number
         * Returns the max page for the current pageSize and total.
         */
        get: function () {
            return Math.ceil(this._total / this._pageSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdPagingBarComponent.prototype, "isRTL", {
        get: function () {
            if (this._dir) {
                return this._dir.dir === 'rtl';
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    TdPagingBarComponent.prototype.ngOnInit = function () {
        this._page = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(this.initialPage);
        this._calculateRows();
        this._calculatePageLinks();
        this._initialized = true;
        this._changeDetectorRef.markForCheck();
    };
    /**
     * navigateToPage?: function
     * Navigates to a specific valid page. Returns 'true' if page is valid, else 'false'.
     */
    TdPagingBarComponent.prototype.navigateToPage = function (page) {
        if (page === 1 || (page >= 1 && page <= this.maxPage)) {
            this._page = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(Math.floor(page));
            this._handleOnChange();
            return true;
        }
        return false;
    };
    /**
     * firstPage?: function
     * Navigates to the first page. Returns 'true' if page is valid, else 'false'.
     */
    TdPagingBarComponent.prototype.firstPage = function () {
        return this.navigateToPage(1);
    };
    /**
     * prevPage?: function
     * Navigates to the previous page. Returns 'true' if page is valid, else 'false'.
     */
    TdPagingBarComponent.prototype.prevPage = function () {
        return this.navigateToPage(this._page - 1);
    };
    /**
     * nextPage?: function
     * Navigates to the next page. Returns 'true' if page is valid, else 'false'.
     */
    TdPagingBarComponent.prototype.nextPage = function () {
        return this.navigateToPage(this._page + 1);
    };
    /**
     * lastPage?: function
     * Navigates to the last page. Returns 'true' if page is valid, else 'false'.
     */
    TdPagingBarComponent.prototype.lastPage = function () {
        return this.navigateToPage(this.maxPage);
    };
    TdPagingBarComponent.prototype.isMinPage = function () {
        return this._page <= 1;
    };
    TdPagingBarComponent.prototype.isMaxPage = function () {
        return this._page >= this.maxPage;
    };
    TdPagingBarComponent.prototype._calculateRows = function () {
        var top = (this._pageSize * this._page);
        this._fromRow = (this._pageSize * (this._page - 1)) + 1;
        this._toRow = this._total > top ? top : this._total;
    };
    /**
     * _calculatePageLinks?: function
     * Calculates the page links that should be shown to the user based on the current state of the paginator
     */
    TdPagingBarComponent.prototype._calculatePageLinks = function () {
        // special case when 2 pageLinks, detect when hit end of pages so can lead in correct direction
        if (this.isMaxPage()) {
            this._hitEnd = true;
            this._hitStart = false;
        }
        // special case when 2 pageLinks, detect when hit start of pages so can lead in correct direction
        if (this.isMinPage()) {
            this._hitEnd = false;
            this._hitStart = true;
        }
        // If the pageLinkCount goes above max possible pages based on perpage setting then reset it to maxPage
        var actualPageLinkCount = this.pageLinkCount;
        if (this.pageLinkCount > this.maxPage) {
            actualPageLinkCount = this.maxPage;
        }
        // reset the pageLinks array
        this._pageLinks = [];
        // fill in the array with the pageLinks based on the current selected page
        var middlePageLinks = Math.floor(actualPageLinkCount / 2);
        for (var x = 0; x < actualPageLinkCount; x++) {
            // don't go past the maxPage in the pageLinks
            // have to handle even and odd pageLinkCounts differently so can still lead to the next numbers
            if ((actualPageLinkCount % 2 === 0 && (this.page + middlePageLinks > this.maxPage)) ||
                (actualPageLinkCount % 2 !== 0 && (this.page + middlePageLinks >= this.maxPage))) {
                this._pageLinks[x] = this.maxPage - (actualPageLinkCount - (x + 1));
                // if the selected page is after the middle then set that page as middle and get the correct balance on left and right
                // special handling when there are only 2 pageLinks to just drop to next if block so can lead to next numbers when moving to right
                // when moving to the left then go into this block
            }
            else if ((actualPageLinkCount > 2 || actualPageLinkCount <= 2 && this._hitEnd) && (this.page - middlePageLinks) > 0) {
                this._pageLinks[x] = (this.page - middlePageLinks) + x;
                // if the selected page is before the middle then set the pages based on the x index leading up to and after selected page
            }
            else if ((this.page - middlePageLinks) <= 0) {
                this._pageLinks[x] = x + 1;
                // other wise just set the array in order starting from the selected page
            }
            else {
                this._pageLinks[x] = this.page + x;
            }
        }
    };
    TdPagingBarComponent.prototype._handleOnChange = function () {
        this._calculateRows();
        this._calculatePageLinks();
        var event = {
            page: this._page,
            maxPage: this.maxPage,
            pageSize: this._pageSize,
            total: this._total,
            fromRow: this._fromRow,
            toRow: this._toRow,
        };
        this._changeDetectorRef.markForCheck();
        this.onChange.emit(event);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('firstLast'),
        __metadata("design:type", Object)
    ], TdPagingBarComponent.prototype, "firstLast", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('initialPage'),
        __metadata("design:type", Object)
    ], TdPagingBarComponent.prototype, "initialPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('pageLinkCount'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TdPagingBarComponent.prototype, "pageLinkCount", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('pageSize'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TdPagingBarComponent.prototype, "pageSize", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('total'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TdPagingBarComponent.prototype, "total", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('change'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TdPagingBarComponent.prototype, "onChange", void 0);
    TdPagingBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            selector: 'td-paging-bar',
            template: __webpack_require__(/*! ./paging-bar.component.html */ "./src/lib/paging/paging-bar.component.html"),
            styles: [__webpack_require__(/*! ./paging-bar.component.scss */ "./src/lib/paging/paging-bar.component.scss")],
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()),
        __metadata("design:paramtypes", [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["Dir"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], TdPagingBarComponent);
    return TdPagingBarComponent;
}());



/***/ }),

/***/ "./src/lib/paging/paging.module.ts":
/*!*****************************************!*\
  !*** ./src/lib/paging/paging.module.ts ***!
  \*****************************************/
/*! exports provided: PagingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagingModule", function() { return PagingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _paging_bar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paging-bar.component */ "./src/lib/paging/paging-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PagingModule = /** @class */ (function () {
    function PagingModule() {
    }
    PagingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            ],
            declarations: [
                _paging_bar_component__WEBPACK_IMPORTED_MODULE_4__["TdPagingBarComponent"],
            ],
            exports: [
                _paging_bar_component__WEBPACK_IMPORTED_MODULE_4__["TdPagingBarComponent"],
            ],
        })
    ], PagingModule);
    return PagingModule;
}());



/***/ }),

/***/ "./src/lib/paging/public-api.ts":
/*!**************************************!*\
  !*** ./src/lib/paging/public-api.ts ***!
  \**************************************/
/*! exports provided: PagingModule, TdPagingBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _paging_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paging.module */ "./src/lib/paging/paging.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PagingModule", function() { return _paging_module__WEBPACK_IMPORTED_MODULE_0__["PagingModule"]; });

/* harmony import */ var _paging_bar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paging-bar.component */ "./src/lib/paging/paging-bar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdPagingBarComponent", function() { return _paging_bar_component__WEBPACK_IMPORTED_MODULE_1__["TdPagingBarComponent"]; });





/***/ })

}]);
//# sourceMappingURL=grammar-grammar-module~user-user-module.js.map