(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dictionary-item-input-module"],{

/***/ "./src/app/dictionary/category-dialog.html":
/*!*************************************************!*\
  !*** ./src/app/dictionary/category-dialog.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>类别</h1>\n<div mat-dialog-content>\n  <p>类别名称</p>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"data.name\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"cancel()\">取消</button>\n  <button mat-button [mat-dialog-close]=\"data.name\" cdkFocusInitial>保存</button>\n</div>"

/***/ }),

/***/ "./src/app/dictionary/category-dialog.ts":
/*!***********************************************!*\
  !*** ./src/app/dictionary/category-dialog.ts ***!
  \***********************************************/
/*! exports provided: CategoryDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryDialog", function() { return CategoryDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
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


var CategoryDialog = /** @class */ (function () {
    function CategoryDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    CategoryDialog.prototype.cancel = function () {
        this.dialogRef.close();
    };
    CategoryDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'category-dialog',
            template: __webpack_require__(/*! ./category-dialog.html */ "./src/app/dictionary/category-dialog.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], CategoryDialog);
    return CategoryDialog;
}());



/***/ }),

/***/ "./src/app/dictionary/item-input.css":
/*!*******************************************!*\
  !*** ./src/app/dictionary/item-input.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n/* CSS Document */\n/* tab pane */\n:host {  \n\twidth:100%;\n }\n.container div {\n  min-height: 150px;\n  padding: 10px;\n  margin: 10px;\n}\n.fab-button {\n  box-sizing: border-box;\n  width: 55px;\n  height: 55px;\n  text-align: left;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  z-index: 9;\n  position: absolute;\n  bottom: 40px;\n  right: 40px;\n  color: white;\n}\n.fab-item-icon {\n  color: white\n}\n.rows div {\n  padding-left: 10px;\n}\n.form-container {\n  display: flex;\n  flex-direction: column;\n}\n.form-container>* {\n  width: 100%;\n}\n.col-md-2 {\n  display: flex;\n  flex-direction: row;\n}\na:link,\na:visited,\na:hover,\na:active {\n  color: #f00;\n  text-decoration: none\n}\n.stripe1 {\n  background-color: #DDDDDD\n}\n.stripe2 {\n  background-color: #CCEEFF\n}\ntd {\n  text-align: center\n}\na.ham {\n  font-family: \"hamnosysunicoderegular\";\n  font-size: larger\n}\nspan.ham {\n  font-family: \"hamnosysunicoderegular\";\n  font-size: larger\n}\n#hamcaption {\n  text-align: center;\n  font-family: \"hamnosysunicoderegular\";\n  font-size: xx-large\n}\ninput.ham {\n  font-family: \"hamnosysunicoderegular\";\n  font-size: xx-large\n}\nbutton.ham {\n  width: 1.3em;\n  height: 1.3em;\n  background-color: #ddd;\n  font-family: \"hamnosysunicoderegular\";\n  font-size: xx-large;\n  display: inline-block;\n  position: relative;\n  text-decoration: none;\n  text-align: center;\n  font-weight: 700;\n  border-radius: 4px;\n  border: 1px solid #666;\n}\n@font-face {\n  font-family: 'hamnosysunicoderegular';\n  src: url('/assets/fonts/hamnosysunicode-webfont.eot');\n  src: url('/assets/fonts/hamnosysunicode-webfont.eot?#iefix') format('embedded-opentype'), url('/assets/fonts/hamnosysunicode-webfont.woff2') format('woff2'), url('/assets/fonts/hamnosysunicode-webfont.woff') format('woff'), url('/assets/fonts/hamnosysunicode-webfont.ttf') format('truetype'), url('/assets/fonts/hamnosysunicode-webfont.svg#hamnosysunicoderegular') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.background-highlight {\n  background-color: lightgrey;\n}\n.mat-form-field {\n  font-size: initial;\n}\n.left-title {\n  margin-left: 24px;\n}\n.left-card {\n  margin-left: 4px;\n}\n"

/***/ }),

/***/ "./src/app/dictionary/item-input.html":
/*!********************************************!*\
  !*** ./src/app/dictionary/item-input.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxFlexFill fxLayout=\"row\" fxLayoutGap='10px'>\n    <mat-card fxFlex=\"16\" fxFlexFill fxLayout='column' style=\"padding: 5px\">\n       <mat-card-title>\n         <div class='left-title'>\n          <mat-form-field>\n            <mat-select [(value)]=\"lang\" (selectionChange)='onSelect($event)'>\n              <mat-option value=\"zh_cn\">中文</mat-option>\n              <mat-option value=\"en_us\">美国英语</mat-option>\n            </mat-select>\n        </mat-form-field>\n        </div>\n        <mat-divider></mat-divider>\n      </mat-card-title> \n      <mat-card-content  >\n          <perfect-scrollbar  class=\"scroll-container\" \n                          fxFlex=\"auto\" \n                          [config]=\"config\" \n                          [scrollIndicators]=\"true\"> \n                          <div align=\"center\" fxFlexFill >\n                              <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n                                  <mat-tree-node *matTreeNodeDef=\"let node\"  matTreeNodeToggle matTreeNodePadding (click)=\"nodeSelect(node)\" >\n                                    <button mat-icon-button disabled></button>\n                                    {{node.name}} \n                                  </mat-tree-node>\n                                  <mat-tree-node *matTreeNodeDef=\"let node;when: hasChild\" matTreeNodePadding (click)=\"nodeSelect(node)\">\n                                    <button mat-icon-button matTreeNodeToggle  [attr.aria-label]=\"'toggle ' + node.name\">\n                                      <mat-icon class=\"mat-icon-rtl-mirror\">\n                                        {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}\n                                      </mat-icon>\n                                    </button>\n                                    {{node.name}} \n                                  </mat-tree-node>\n                                </mat-tree>\n                          </div>\n            </perfect-scrollbar> \n        <div class=\"fab-button\">\n          <button mat-fab>\n            <mat-icon color=\"accent\" class=\"fab-item-icon\"  (click)=\"openDialog()\">add</mat-icon>\n          </button>\n        </div>\n      </mat-card-content>\n    </mat-card>\n  <mat-card fxFlex=\"55\" fxFlexFill fxLayout='column'>\n    <mat-card-content fxFlexFill>\n      <div fxFlexFill fxLayout='column'>\n      <form [formGroup]=\"form\"  novalidate>\n        <div fxLayout=\"row\" class='rows'>\n          <div fxFlex=\"50\" fxLayout=\"row\">\n            <mat-form-field fxFlexFill>\n              <input matInput placeholder=\"单词\" formControlName=\"word\">\n            </mat-form-field>\n          </div>\n          <div fxFlex=\"50\" fxLayout=\"row\">\n            <mat-form-field fxFlexFill>\n              <input matInput placeholder=\"拼音\" formControlName=\"pinyin\">\n            </mat-form-field>\n          </div>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start end\" style='height:150px' class='rows'>\n          <div fxFlex=\"100\" fxLayout=\"row\">\n            <mat-form-field fxFlexFill>\n              <textarea matInput placeholder=\"描述\" formControlName=\"description\" matTextareaAutosize='true' cdkAutosizeMaxRows=\"6\" cdkAutosizeMinRows=\"3\"></textarea>\n            </mat-form-field>\n          </div>\n          <!-- <div fxFlex=\"50\" fxLayout=\"row\">\n           <fancy-image-uploader [options]=\"options\" (onUpload)=\"onUpload($event)\"></fancy-image-uploader> \n          </div> -->\n        </div>\n        <div fxLayout=\"row\" class='rows'>\n          <div fxFlex=\"100\" fxLayout=\"row\">\n            <mat-form-field fxFlexFill>\n              <input #hansField  matInput placeholder=\"手势\" class=\"ham\" name=\"hamnosys\" formControlName=\"hamnosys\">\n            </mat-form-field>\n          </div>\n        </div>\n      </form>\n      <mat-tab-group fxFlexFill>\n        <mat-tab label=\"手型\">  \n          <div id=\"keyboard_hsh\">\n            <table>\n              <tr>\n                <td>\n                  <button title=\"hamfist\" class=\"ham\" value=\"\"  (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamflathand\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfinger2\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfinger23\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfinger23spread\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfinger2345\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinch12\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinchall\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinchopen\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamcee12\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamceeall\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamceeopen\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamthumboutmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamthumbacrossmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamthumbopenmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td colspan=\"4\">&nbsp;</td>\n                <td>\n                  <button title=\"hamdoublebent\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamfingerstraightmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamfingerbendmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamfingerhookmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamdoublehooked\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamthumb\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamindexfinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hammiddlefinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamringfinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinky\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hambetween\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingertip\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingernail\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerpad\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingermidjoint\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerbase\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerside\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"方向\">\n          <div id=\"keyboard_ori\">\n            <table>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamextfingeru\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hamextfingero\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerul\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerur\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamextfingerol\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingeror\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamextfingerl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamextfingerr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamextfingerl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamextfingerr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerdl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerdr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamextfingeril\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerir\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamextfingerd\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hamextfingeri\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"5\"></td>\n                <td>\n                  <button title=\"hambetween\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamorirelative\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamextfingeru\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hampalmu\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerui\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingeruo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hampalmul\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hampalmur\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamextfingeri\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamextfingero\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hampalml\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hampalmr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerdi\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamextfingerdo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hampalmdl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hampalmdr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamextfingerd\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hampalmd\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"位置\">\n          <div id=\"keyboard_loc\">\n            <table>\n              <tr>\n                <td>\n                  <button title=\"hamheadtop\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamhead\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamforehead\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamnose\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamnostrils\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamlips\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamtongue\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamteeth\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamchin\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamunderchin\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamneck\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamshouldertop\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamshoulders\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamchest\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamstomach\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hambelowstomach\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hameyebrows\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hameyes\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamear\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamearlobe\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamcheek\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamupperarm\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamelbowinside\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamlowerarm\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamwristback\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamthumbball\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampalm\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamhandback\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamthumbside\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinkyside\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamthumb\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamindexfinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hammiddlefinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamringfinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinky\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hambetween\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingertip\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingernail\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerpad\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingermidjoint\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerbase\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamclose\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamtouch\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"haminterlock\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamcross\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hambrushing\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hambehind\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamarmextended\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamlrbeside\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamlrat\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamdoublebent\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamdoublehooked\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamneutralspace\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"动作1\">\n          <div id=\"keyboard_mov1\">\n            <table>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hammoveu\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hammoveo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hammoveul\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hammoveur\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hammoveol\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hammoveor\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hammovel\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hammover\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hammovel\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hammover\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hammovedl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hammovedr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hammoveil\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hammoveir\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hammoved\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hammovei\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"5\"></td>\n                <td>\n                  <button title=\"hambetween\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamspace\" class=\"ham\" value=\" \" (click)=\"setGesture($event)\"> </button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hammoveu\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamfast\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamslow\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamtense\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamrest\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamhalt\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hammoveui\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hammoveuo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamrepeatfromstart\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamrepeatfromstartseveral\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamrepeatcontinue\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamrepeatcontinueseveral\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamrepeatreverse\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hammovei\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hammoveo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamsmallmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamlargemod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamnomotion\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamincreasing\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamdecreasing\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hammovedi\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hammovedo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamarcl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamarcu\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamarcd\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamarcr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamwavy\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hammoved\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamellipsev\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamellipseur\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamellipseh\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamellipseul\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamzigzag\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"动作2\">\n          <div id=\"keyboard_mov2\">\n            <table>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamcircleu\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hamcircleo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamcircleul\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamcircleur\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamcircleol\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamcircleor\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamcirclel\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamcircler\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamcirclel\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamcircler\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamcircledl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamcircledr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamcircleil\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamcircleir\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamcircled\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hamcirclei\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamstircw\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamnodding\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamtwisting\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamreplace\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n\n                <td>\n                  <button title=\"hamstirccw\" class=\"ham\" value=\"\"  (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamswinging\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerplay\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hambetween\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamcircleu\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hamclocku\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamcircleui\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamcircleuo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamclockul\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamclockur\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamcirclei\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"3\"></td>\n                <td>\n                  <button title=\"hamcircleo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamclockl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamclockfull\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamclockr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td></td>\n                <td>\n                  <button title=\"hamcircledi\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamcircledo\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"4\"></td>\n                <td>\n                  <button title=\"hamclockdl\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td></td>\n                <td>\n                  <button title=\"hamclockdr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"></td>\n                <td>\n                  <button title=\"hamcircled\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td colspan=\"6\"></td>\n                <td>\n                  <button title=\"hamclockd\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"双手\">\n          <div id=\"keyboard_2hd\">\n            <table>\n              <tr>\n                <td>\n                  <button title=\"hamsymmpar\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamsymmlr\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfingerstraightmod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamlargemod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamsymmlr,hamfingerstraightmod,hamlargemod\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamparbegin\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamplus\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamparend\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamalternatingmotion\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamnonipsi\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamnondominant\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hametc\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n              </tr>\n              <tr>\n\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamseqbegin\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamseqend\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamparbegin\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamparend\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfusionbegin\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamfusionend\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamaltbegin\" class=\"ham\" value=\"{\" (click)=\"setGesture($event)\">{{ '{' }}</button>\n                </td>\n                <td>\n                  <button title=\"hamaltend\" class=\"ham\" value=\"}\" (click)=\"setGesture($event)\"> {{ '}' }}</button>\n                </td>\n                <td>\n                  <button title=\"hammetaalt\" class=\"ham\" value=\"|\" (click)=\"setGesture($event)\"> {{ '|' }}</button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamcoreftag\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamcorefref\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\">&nbsp;</button>\n                </td>\n                <td>\n                  <button title=\"hamthumb\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamindexfinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hammiddlefinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hamringfinger\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n                <td>\n                  <button title=\"hampinky\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <button title=\"hamcomma\" class=\"ham\" value=\",\" (click)=\"setGesture($event)\">{{ ',' }}</button>\n                </td>\n                <td>\n                  <button title=\"hamfullstop\" class=\"ham\" value=\".\" (click)=\"setGesture($event)\">{{ '.' }}</button>\n                </td>\n                <td>\n                  <button title=\"hamexclaim\" class=\"ham\" value=\"!\" (click)=\"setGesture($event)\">{{ '!' }}</button>\n                </td>\n                <td>\n                  <button title=\"hamquery\" class=\"ham\" value=\"?\" (click)=\"setGesture($event)\">{{ '?' }}</button>\n                </td>\n                <td>\n                  <button title=\"hammime\" class=\"ham\" value=\"\" (click)=\"setGesture($event)\"></button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n      <div class=\"fab-button\">\n        <button mat-fab (click)=\"onSubmit()\">\n          <mat-icon color=\"accent\" class=\"fab-item-icon\">check</mat-icon>\n        </button>\n      </div>\n    </mat-card-content>\n  </mat-card>\n  <mat-card fxFlex=\"29\" fxFlexFill fxLayout='column'>\n    <!-- <mat-card-title>\n        <h3 class=\"mat-title\">\n          手语字典管理\n        </h3>\n        <mat-divider></mat-divider>\n    </mat-card-title> -->\n  <mat-card-content fxFlexFill >\n    <div class=\"CWASAPanel av0\" align=\"center\" fxFlexFill></div>\n    <div class=\"fab-button\">\n      <button mat-fab (click)=\"play()\">\n        <mat-icon color=\"accent\" class=\"fab-item-icon\">play_arrow</mat-icon>\n      </button>\n    </div>\n  </mat-card-content>\n</mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/dictionary/item-input.module.ts":
/*!*************************************************!*\
  !*** ./src/app/dictionary/item-input.module.ts ***!
  \*************************************************/
/*! exports provided: ItemInputModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemInputModule", function() { return ItemInputModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _item_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./item.routing */ "./src/app/dictionary/item.routing.ts");
/* harmony import */ var _item_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./item-input */ "./src/app/dictionary/item-input.ts");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _category_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./category-dialog */ "./src/app/dictionary/category-dialog.ts");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












// import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';



var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    wheelPropagation: true
};
var routes = [
    { path: '', component: _item_input__WEBPACK_IMPORTED_MODULE_7__["ItemInputComponent"] }
];
var ItemInputModule = /** @class */ (function () {
    function ItemInputModule() {
    }
    ItemInputModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_11__["MatTreeModule"],
                //  FancyImageUploaderModule,
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__["MatDividerModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_10__["HttpModule"],
                _item_routing__WEBPACK_IMPORTED_MODULE_6__["RoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_14__["PerfectScrollbarModule"]
            ],
            declarations: [_item_input__WEBPACK_IMPORTED_MODULE_7__["ItemInputComponent"], _category_dialog__WEBPACK_IMPORTED_MODULE_13__["CategoryDialog"]],
            entryComponents: [
                _category_dialog__WEBPACK_IMPORTED_MODULE_13__["CategoryDialog"]
            ],
            providers: [
                {
                    provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_14__["PERFECT_SCROLLBAR_CONFIG"],
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                }
            ]
        })
    ], ItemInputModule);
    return ItemInputModule;
}());



/***/ }),

/***/ "./src/app/dictionary/item-input.ts":
/*!******************************************!*\
  !*** ./src/app/dictionary/item-input.ts ***!
  \******************************************/
/*! exports provided: DictionaryNode, DictionaryFlatNode, FileDatabase, ItemInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DictionaryNode", function() { return DictionaryNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DictionaryFlatNode", function() { return DictionaryFlatNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDatabase", function() { return FileDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemInputComponent", function() { return ItemInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/esm5/tree.es5.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _category_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./category-dialog */ "./src/app/dictionary/category-dialog.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';


// tslint:disable-next-line:import-blacklist

// tslint:disable-next-line:import-blacklist



/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
var DictionaryNode = /** @class */ (function () {
    function DictionaryNode() {
    }
    return DictionaryNode;
}());

/** Flat node with expandable and level information */
var DictionaryFlatNode = /** @class */ (function () {
    function DictionaryFlatNode(expandable, name, level, type, id, parent) {
        this.expandable = expandable;
        this.name = name;
        this.level = level;
        this.type = type;
        this.id = id;
        this.parent = parent;
    }
    return DictionaryFlatNode;
}());

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
var FileDatabase = /** @class */ (function () {
    function FileDatabase(http) {
        this.http = http;
        this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"]([]);
        this.treeUrl = '/api/dictionary/getCategory';
        this.lang = 'zh_cn';
        this.sigml = '';
        this.initialize();
    }
    Object.defineProperty(FileDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    FileDatabase.prototype.initialize = function () {
        var _this = this;
        var params = {};
        params['lang'] = this.lang;
        this.getData(params).subscribe(function (data) {
            if (data.success) {
                _this.dataChange.next(data.result);
                //   this.quickStatData.value = data.result;
            }
            else {
                // this.errorDiagnostic = data.message;
            }
        }, function (error) {
        });
    };
    FileDatabase.prototype.getData = function (params) {
        var paramString = '';
        if (params !== undefined) {
            paramString = this.buildQuery(params);
        }
        return this.http.get(this.treeUrl + paramString)
            .map(function (res) { return res.json(); });
    };
    FileDatabase.prototype.buildQuery = function (query) {
        var url = '';
        if (query) {
            url += '?';
            var params = [];
            // tslint:disable-next-line:forin
            for (var key in query) {
                var value = query[key];
                if (value !== undefined) {
                    params.push(key + "=" + value);
                }
            }
            url += params.join('&');
        }
        return url;
    };
    FileDatabase = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], FileDatabase);
    return FileDatabase;
}());

var ItemInputComponent = /** @class */ (function () {
    function ItemInputComponent(database, renderer, formBuilder, http, dialog) {
        var _this = this;
        this.database = database;
        this.renderer = renderer;
        this.formBuilder = formBuilder;
        this.http = http;
        this.dialog = dialog;
        this.submitted = false;
        this.errorDiagnostic = '';
        this.lang = 'zh_cn';
        this.category = '';
        this.config = {};
        this.submitType = 'save';
        this.props = {
            lang: 'cmn-Hans-CN',
            onChange: function (value) { return console.log(value + '===='); },
            onEnd: function (value) { return console.log(value + '#####'); }
        };
        this.hasListener = [];
        this.updateHighlight = function (newHighlight) {
            // tslint:disable-next-line:no-unused-expression
            _this.oldHighlight && _this.renderer.removeClass(_this.oldHighlight.nativeElement, 'background-highlight');
            _this.renderer.addClass(newHighlight.nativeElement, 'background-highlight');
            _this.oldHighlight = newHighlight;
        };
        this.transformer = function (node, level) {
            return new DictionaryFlatNode(node.expandable, node.name, level, node.type, node.id, node.parent);
        };
        this._getLevel = function (node) { return node.level; };
        this._isExpandable = function (node) { return node.expandable; };
        this._getChildren = function (node) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(node.children);
        };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.treeFlattener = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__["MatTreeFlattener"](this.transformer, this._getLevel, this._isExpandable, this._getChildren);
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_3__["FlatTreeControl"](this._getLevel, this._isExpandable);
        this.dataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__["MatTreeFlatDataSource"](this.treeControl, this.treeFlattener);
        database.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    ItemInputComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this.treeNodes.forEach(function (reference) {
            if (!_this.hasListener.includes(reference.nativeElement)) {
                _this.renderer.listen(reference.nativeElement, 'click', function () {
                    _this.updateHighlight(reference);
                });
                _this.renderer.listen(reference.nativeElement.children.item(0), 'click', function () {
                    _this.updateHighlight(reference);
                });
                _this.hasListener = _this.hasListener.concat([reference.nativeElement]);
            }
        });
        this.hasListener = this.hasListener.filter(function (element) { return document.contains(element); });
    };
    ItemInputComponent.prototype.ngOnInit = function () {
        this.buildForm();
        CWASA.init();
    };
    ItemInputComponent.prototype.onSelect = function (e) {
        this.lang = e.value;
        this.dataSource.data = [];
        this.loadTree(this.lang);
    };
    ItemInputComponent.prototype.loadTree = function (lang) {
        var _this = this;
        var params = {};
        params['lang'] = lang;
        this.database.getData(params).subscribe(function (data) {
            if (data.success) {
                _this.database.dataChange.next(data.result);
                //   this.quickStatData.value = data.result;
            }
            else {
                // this.errorDiagnostic = data.message;
            }
        });
    };
    ItemInputComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_category_dialog__WEBPACK_IMPORTED_MODULE_8__["CategoryDialog"], {
            width: '250px',
            data: { name: '', lang: this.lang }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var params = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["URLSearchParams"]();
                params.append('name', result);
                params.append('lang', _this.lang);
                _this.postCategory(params).subscribe(function (data) {
                    if (data.success) {
                        _this.loadTree(_this.lang);
                    }
                    else {
                        _this.submitted = false;
                        _this.errorDiagnostic = data.message;
                    }
                });
            }
        });
    };
    ItemInputComponent.prototype.nodeSelect = function (e) {
        var _this = this;
        if (e.type === 'category') {
            this.category = e.id;
            this.submitType = 'save';
            this.form.reset();
        }
        else {
            var params = {};
            params['id'] = e.id;
            this.category = e.parent;
            this.getWord(params).subscribe(function (data) {
                if (data.success) {
                    _this.sigml = data.result.sigml;
                    _this.wordId = data.result.id;
                    delete data.result.sigml;
                    delete data.result.id;
                    delete data.result.category;
                    delete data.result.lang;
                    _this.form.setValue(data.result);
                    _this.submitType = 'update';
                    console.log(_this.sigml);
                    CWASA.playSiGMLText(_this.sigml);
                }
                else {
                    console.log(data.message);
                }
            });
        }
        console.log(e);
    };
    ItemInputComponent.prototype.getWord = function (params) {
        var url = '/api/dictionary/getWord';
        var paramString = '';
        if (params !== undefined) {
            paramString = this.database.buildQuery(params);
        }
        return this.http.get(url + paramString).map(function (res) { return res.json(); });
    };
    // onUpload(file: UploadedFile) {
    //   console.log(file.response);
    // }
    ItemInputComponent.prototype.replaceSelection = function (_field, text) {
        var e = this.hansField.nativeElement;
        // var text = arguments[0] || '';
        return (
        /* mozilla / dom 3.0 */
        ('selectionStart' in e && function () {
            if (_field.value == null) {
                _field.value = '';
            }
            _field.setValue(_field.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length));
            return this;
        }) ||
            /* exploder */
            (document.selection && function () {
                e.focus();
                document.selection.createRange().text = text;
                return this;
            }) ||
            function () {
                e.setValue(e.value + text);
                return this;
            })();
    };
    ItemInputComponent.prototype.buildForm = function () {
        this.form = this.formBuilder.group({
            'word': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)
                ]],
            'pinyin': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)
                ]],
            'description': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(200)
                ]],
            // 'image': ['', [
            //   Validators.required,
            //   Validators.minLength(2),
            //   Validators.maxLength(200)
            // ]],
            'hamnosys': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(300)
                ]]
        });
    };
    ItemInputComponent.prototype.setGesture = function (e) {
        var val = e.srcElement.value;
        // this.form.get('hans').setValue('55555');
        this.replaceSelection(this.form.get('hamnosys'), val);
    };
    ItemInputComponent.prototype.postCategory = function (params) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]();
        var postUrl = '/api/dictionary/postCategory';
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(postUrl, params, { headers: headers, withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    ItemInputComponent.prototype.postWord = function (params) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]();
        var postUrl = '/api/dictionary/postWord';
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(postUrl, params, { headers: headers, withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    ItemInputComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.category !== '') {
            this.submitted = true;
            this.errorDiagnostic = null;
            var params = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["URLSearchParams"]();
            params.append('word', this.form.value.word);
            params.append('description', this.form.value.description);
            //  params.append('image', this.form.value.image);
            params.append('hamnosys', this.form.value.hamnosys);
            params.append('pinyin', this.form.value.pinyin);
            params.append('category', this.category);
            params.append('lang', this.lang);
            params.append('type', this.submitType);
            if (this.submitType === 'update') {
                params.append('id', this.wordId);
            }
            this.postWord(params).subscribe(function (data) {
                if (data.success) {
                    _this.loadTree(_this.lang);
                }
                else {
                    _this.submitted = false;
                    _this.errorDiagnostic = data.message;
                }
            });
        }
    };
    ItemInputComponent.prototype.play = function () {
        CWASA.playSiGMLText(this.sigml);
        //   AvatarGUI.playSiGMLText(this.sigml);
    };
    ItemInputComponent.prototype.save = function (element) {
        console.log(this.form.value);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hansField'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ItemInputComponent.prototype, "hansField", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])(_angular_material_tree__WEBPACK_IMPORTED_MODULE_4__["MatTreeNode"], { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }),
        __metadata("design:type", Array)
    ], ItemInputComponent.prototype, "treeNodes", void 0);
    ItemInputComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'Hans-input',
            template: __webpack_require__(/*! ./item-input.html */ "./src/app/dictionary/item-input.html"),
            styles: [__webpack_require__(/*! ./item-input.css */ "./src/app/dictionary/item-input.css")],
            providers: [FileDatabase],
            // encapsulation: ViewEncapsulation.None,
            // tslint:disable-next-line:use-host-property-decorator
            host: {
                style: 'flex:1'
            }
        }),
        __metadata("design:paramtypes", [FileDatabase,
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]])
    ], ItemInputComponent);
    return ItemInputComponent;
}());



/***/ }),

/***/ "./src/app/dictionary/item.routing.ts":
/*!********************************************!*\
  !*** ./src/app/dictionary/item.routing.ts ***!
  \********************************************/
/*! exports provided: RoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutingModule", function() { return RoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _item_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./item-input */ "./src/app/dictionary/item-input.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _item_input__WEBPACK_IMPORTED_MODULE_2__["ItemInputComponent"]
    }
];
var RoutingModule = /** @class */ (function () {
    // tslint:disable-next-line:eofline
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
        // tslint:disable-next-line:eofline
    ], RoutingModule);
    return RoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=dictionary-item-input-module.js.map