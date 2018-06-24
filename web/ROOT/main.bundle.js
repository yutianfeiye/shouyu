webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/dictionary/item-input.module": [
		"./src/app/dictionary/item-input.module.ts",
		"item-input.module",
		"common"
	],
	"app/speech-to-text/index.module": [
		"./src/app/speech-to-text/index.module.ts",
		"common",
		"index.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- The content below is only a placeholder and can be replaced.\n<div style=\"text-align:center\">\n  <div>\n    <div>点击录音按钮开始说话，说完之后再次点击按钮结束说话</div>\n    <speech></speech>\n  </div>\n</div> -->\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
// import { Component } from '@angular/core';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
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
        console.log('99999999999999999999999999999999999999999999');
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routing_module__ = __webpack_require__("./src/app/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_speech2text_core_audio__ = __webpack_require__("./src/lib/speech2text/core-audio/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["b" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__lib_speech2text_core_audio__["a" /* CoreAudioModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/fesm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    { path: '', loadChildren: 'app/dictionary/item-input.module#ItemInputModule' },
    { path: 'speech', loadChildren: 'app/speech-to-text/index.module#IndexModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/lib/speech2text/core-audio/core-audio.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreAudioModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recorder_recorder_service__ = __webpack_require__("./src/lib/speech2text/core-audio/recorder/recorder.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worker_worker_service__ = __webpack_require__("./src/lib/speech2text/core-audio/worker/worker.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CoreAudioModule = /** @class */ (function () {
    function CoreAudioModule() {
    }
    CoreAudioModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [],
            declarations: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__recorder_recorder_service__["a" /* RecorderService */],
                __WEBPACK_IMPORTED_MODULE_2__worker_worker_service__["a" /* WorkerService */]
            ]
        })
    ], CoreAudioModule);
    return CoreAudioModule;
}());



/***/ }),

/***/ "./src/lib/speech2text/core-audio/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recorder_recorder_service__ = __webpack_require__("./src/lib/speech2text/core-audio/recorder/recorder.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_audio_module__ = __webpack_require__("./src/lib/speech2text/core-audio/core-audio.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__core_audio_module__["a"]; });




/***/ }),

/***/ "./src/lib/speech2text/core-audio/recorder/recorder.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecorderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs-compat/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worker_worker_service__ = __webpack_require__("./src/lib/speech2text/core-audio/worker/worker.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RecorderService = /** @class */ (function () {
    function RecorderService(workerService) {
        this.workerService = workerService;
        this.bufferSize = 4096;
        this.sampleRate = 44100;
        this.recordingLength = 0;
        this.audioChannel = [];
        this.recording = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](false);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__worker_worker_service__["a" /* WorkerService */]])
    ], RecorderService);
    return RecorderService;
}());



/***/ }),

/***/ "./src/lib/speech2text/core-audio/worker/web-worker.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebWorker; });
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_worker__ = __webpack_require__("./src/lib/speech2text/core-audio/worker/web-worker.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkerService = /** @class */ (function () {
    function WorkerService() {
    }
    WorkerService.prototype.execute = function (func) {
        var blobContent = [func.toString(), ";this.onmessage = function(e) {" + func.name + "(e.data);}"];
        var blob = new Blob(blobContent, { type: 'application/javascript' });
        var url = URL.createObjectURL(blob);
        return new __WEBPACK_IMPORTED_MODULE_1__web_worker__["a" /* WebWorker */](url);
    };
    WorkerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], WorkerService);
    return WorkerService;
}());



/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map