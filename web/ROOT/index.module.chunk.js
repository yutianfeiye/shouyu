webpackJsonp(["index.module"],{

/***/ "./src/app/speech-to-text/index.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayoutGap=\"15px\" class=\"all-page gray\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n    <mat-card [formGroup]=\"form\" fxLayout=\"column\" fxLayoutGap=\"15px\">\n        <mat-card-title>\n            Sample speech to text - Sample using Angular Form\n        </mat-card-title>\n        <speech2text [props]='props'></speech2text>\n        <button mat-raised-button color=\"primary\" (click)=\"save(containerFormat)\">保存</button>\n    </mat-card>\n\n</div>"

/***/ }),

/***/ "./src/app/speech-to-text/index.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IndexComponent = /** @class */ (function () {
    function IndexComponent(fb) {
        this.fb = fb;
        this.props = {
            lang: 'cmn-Hans-CN',
            onChange: function (value) { return console.log(value + '===='); },
            onEnd: function (value) { return console.log(value + '#####'); }
        };
    }
    IndexComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    IndexComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            'text': ['', [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].maxLength(10)
                ]]
        });
    };
    IndexComponent.prototype.save = function (element) {
        console.log(this.form.value);
    };
    IndexComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'text2-speech',
            template: __webpack_require__("./src/app/speech-to-text/index.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/app/speech-to-text/index.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexModule", function() { return IndexModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routing_module__ = __webpack_require__("./src/app/speech-to-text/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index_component__ = __webpack_require__("./src/app/speech-to-text/index.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_speech2text_speech_module__ = __webpack_require__("./src/lib/speech2text/speech.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__index_component__["a" /* IndexComponent */] }
];
var IndexModule = /** @class */ (function () {
    function IndexModule() {
    }
    IndexModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_5__routing_module__["a" /* RoutingModule */],
                __WEBPACK_IMPORTED_MODULE_7__lib_speech2text_speech_module__["a" /* SpeechModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__index_component__["a" /* IndexComponent */]],
            providers: []
        })
    ], IndexModule);
    return IndexModule;
}());



/***/ }),

/***/ "./src/app/speech-to-text/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_component__ = __webpack_require__("./src/app/speech-to-text/index.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_2__index_component__["a" /* IndexComponent */]
    }
];
var RoutingModule = /** @class */ (function () {
    // tslint:disable-next-line:eofline
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        })
        // tslint:disable-next-line:eofline
    ], RoutingModule);
    return RoutingModule;
}());



/***/ }),

/***/ "./src/lib/speech2text/speech.component.css":
/***/ (function(module, exports) {

module.exports = ".chatInputWrapper {\n  position: relative;\n  height: 120px;\n}\n.micImg {\n  position: absolute;\n  width: 38px;\n  height: 38px;\n  right: 5px;\n  top: 1px;\n}\n.chatMessageInput {\n  background-color: #ffffff;\n  padding: 0 10px;\n  margin: 0;\n  width: 100%;\n  border-radius: 2px;\n  border: 1px solid #e5e9ec;\n  -webkit-transition: background 0.2s linear 0s, -webkit-box-shadow 0.2s linear 0s;\n  transition: background 0.2s linear 0s, -webkit-box-shadow 0.2s linear 0s;\n  transition: background 0.2s linear 0s, box-shadow 0.2s linear 0s;\n  transition: background 0.2s linear 0s, box-shadow 0.2s linear 0s, -webkit-box-shadow 0.2s linear 0s;\n  outline: 0;\n  height: 40px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}"

/***/ }),

/***/ "./src/lib/speech2text/speech.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"chatInputWrapper\"> \n    <img *ngIf=\"this.supportVoice\" \n    [src]=\"this.speaking ? micAnimate : mic\" \n    class=\"micImg\"\n    (click)=\"this.say()\" />\n        <input\n            (change)=\"changeValue()\"\n            [(ngModel)]=\"inputValue\" \n            class=\"chatMessageInput\"\n            placeholder=\"Type your message\" \n            fxFlex=\"100\"  \n        />\n\n        <audio controls autoplay style=\"padding:20px\"></audio>\n</div>\n"

/***/ }),

/***/ "./src/lib/speech2text/speech.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeechComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_audio_recorder_recorder_service__ = __webpack_require__("./src/lib/speech2text/core-audio/recorder/recorder.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpeechComponent = /** @class */ (function () {
    function SpeechComponent(detectRef, recorderService) {
        this.detectRef = detectRef;
        this.recorderService = recorderService;
        this.mic = '/assets/mic.gif';
        this.micAnimate = '/assets/mic-animate.gif';
        this.speaking = false;
        this.inputValue = '';
        this.supportVoice = 'webkitSpeechRecognition' in window;
        this.recognitionType = 'google';
    }
    SpeechComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.supportVoice && this.recognitionType !== 'xunfei') {
            //   const WebkitSpeechRecognition = IWindow.webkitSpeechRecognition;
            var _a = window, webkitSpeechRecognition = _a.webkitSpeechRecognition, webkitSpeechGrammarList = _a.webkitSpeechGrammarList;
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = this.props.lang || 'cmn-Hans-CN';
            this.recognition.onresult = function (event) {
                var interimTranscript = '';
                var finalTranscript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                        _this.inputValue = finalTranscript;
                        _this.detectRef.detectChanges();
                        if (_this.props.onChange) {
                            _this.props.onChange(finalTranscript);
                        }
                        if (_this.props.onEnd) {
                            _this.props.onEnd(finalTranscript);
                        }
                    }
                    else {
                        interimTranscript += event.results[i][0].transcript;
                        _this.inputValue = interimTranscript;
                        if (_this.props.onChange) {
                            _this.props.onChange(interimTranscript);
                        }
                    }
                }
            };
        }
    };
    SpeechComponent.prototype.changeValue = function (event) {
        this.inputValue = event.target.value;
    };
    SpeechComponent.prototype.say = function () {
        if (this.supportVoice && this.recognitionType !== 'xunfei') {
            if (!this.speaking) {
                // start listening
                this.inputValue = '';
                this.recognition.start();
            }
            else {
                this.recognition.stop();
                //  const question = this.inputValue;
            }
        }
        else {
            if (!this.speaking) {
                this.recorderService.start();
            }
            else {
                this.recorderService.stop();
            }
        }
        this.speaking = !this.speaking;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], SpeechComponent.prototype, "props", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], SpeechComponent.prototype, "recognitionType", void 0);
    SpeechComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'speech2text',
            template: __webpack_require__("./src/lib/speech2text/speech.component.html"),
            styles: [__webpack_require__("./src/lib/speech2text/speech.component.css")],
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].Default,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1__core_audio_recorder_recorder_service__["a" /* RecorderService */]])
    ], SpeechComponent);
    return SpeechComponent;
}());



/***/ }),

/***/ "./src/lib/speech2text/speech.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeechModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__speech_component__ = __webpack_require__("./src/lib/speech2text/speech.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SpeechModule = /** @class */ (function () {
    function SpeechModule() {
    }
    SpeechModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__speech_component__["a" /* SpeechComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__speech_component__["a" /* SpeechComponent */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__speech_component__["a" /* SpeechComponent */]]
        })
    ], SpeechModule);
    return SpeechModule;
}());



/***/ })

});
//# sourceMappingURL=index.module.chunk.js.map