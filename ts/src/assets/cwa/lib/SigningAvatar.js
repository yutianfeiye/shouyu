

//-------- js/SigningAvatar.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var AGI, AnimScheduler, AvCache, AvDataAccess, AvDefView, AvatarCamera, CASAnimation, CASFrame, Character, Config, Data, HtoG, SigningAvatar, console, cwaenv, document, log, setTimeout, theConfig, theSToCA,
        bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    Data = cwaenv.get("Data");
    Config = cwaenv.get("Config");
    AvCache = cwaenv.get("AvCache");
    AvDataAccess = cwaenv.get("AvDataAccess");
    AvDefView = cwaenv.get("AvDefView");
    AvatarCamera = cwaenv.get("AvatarCamera");
    AGI = cwaenv.get("AGI");
    CASFrame = cwaenv.get("CASFrame");
    Character = cwaenv.get("Character");
    CASAnimation = cwaenv.get("CASAnimation");
    AnimScheduler = cwaenv.get("AnimScheduler");
    HtoG = cwaenv.get("HtoG");
    theSToCA = cwaenv.get("theSToCA");
    theConfig = Config.theConfig;
    SigningAvatar = (function () {
        function SigningAvatar(avGUI, canvasEl, speedFun, evtHandlers) {
            var xslLoc;
            this.avGUI = avGUI;
            this.canvasEl = canvasEl;
            this.speedFun = speedFun;
            this.evtHandlers = evtHandlers;
            this.playSiGML = bind(this.playSiGML, this);
            this.playGSiGML = bind(this.playGSiGML, this);
            this.avIndex = this.avGUI.avIndex;
            this.gl = null;
            this.character = null;
            this.camera = null;
            this.pendingAvName = null;
            this.pendingCASAnim = null;
            this.curAnimScheduler = null;
            this.stocMap = {};
            this.nSToC = 0;
            log("Starting SigningAvatar " + this.avIndex);
            this.USING_JAR_FOR_AV_DEF = theConfig.useAvatarJARs;
            this.sigmlBase = theConfig.sigmlBase;
            xslLoc = Data.absoluteURI("h2s.xsl", theConfig.cwaBase);
            this.H2G = new HtoG(xslLoc, false, 0);
            this.animgenServer = theConfig.animgenServer;
            this.USING_JSON_STOC_FORMAT = true;
            this.jCAS = null;
            this.DO_ANIM_STATUS_REPORTING = true;
            this.canvasEl.setAttribute("ondragstart", "return false");
            log("Getting WebGL context");
            this.gl = (this.canvasEl.getContext("webgl")) || (this.canvasEl.getContext("experimental-webgl"));
            if (this.gl == null) {
                console.warn("No WebGL context. Disaster.");
            }
            this.gl.viewport(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.avCache = {};
            this.logGLImplementationData();
        }
        SigningAvatar.prototype.avCachePut = function (av, ctr) {
            return this.avCache[av] = ctr;
        };
        SigningAvatar.prototype.avCacheGet = function (av) {
            return this.avCache[av];
        };
        SigningAvatar.prototype.avCacheContains = function (av) {
            return this.avCache[av] != null;
        };
        SigningAvatar.prototype.switchAvatar = function (av) {
            log("Switch Avatar to " + av);
            if (!this.character || (this.character.getName()) !== av) {
                this.pendingAvName = av;
                if (this.curAnimScheduler) {
                    return this.stopPlay();
                } else {
                    return setTimeout(((function (_this) {
                        return function () {
                            return _this.loadNewAvatar();
                        };
                    })(this)), 0);
                }
            } else {
                return log("Character " + av + " already loaded");
            }
        };
        SigningAvatar.prototype.playGSiGML = function (sigmlText) {
            var CASCB, av, blob, cascb, casfmt, form, rqst, rqstid, servCB, servURI, skipSign, txtarea;
            this.evtHandlers.animLoading();
            av = this.character.getName();
            txtarea = document.getElementById("JSONText");

            console.log(theConfig.animgenProc +"========================");
            if (theConfig.animgenProc === "Client") {
                this.avGUI.stat("SiGML Loading for " + av);
                skipSign = 0;
                this.jCAS = {
                    anim: new CASAnimation,
                    playStarted: false
                };
                CASCB = (function (_this) {
                    return function (jsonsign) {
                        var pfx;
                        pfx = "Animgen: ";
                     
                        switch (jsonsign.type) {
                            case AGI.CB.Sign:
                                return _this.acceptJSONCASSign(jsonsign, pfx);
                            case AGI.CB.Skip:
                                return skipSign++;
                            case AGI.CB.Done:
                                _this.acceptJSONCASEndSignStream(pfx, skipSign === 0 ? "" : " with errors");
                                return _this.jCAS = null;
                            case AGI.CB.Fail:
                                _this.avGUI.stat("" + jsonsign.err);
                                return _this.evtHandlers.animIdle();
                            default:
                                return _this.avGUI.stat("Unexpected callback " + jsonsign.type);
                        }
                    };
                })(this);

                return AGI.SiGMLToCAS(sigmlText, av, this.avIndex, theSToCA.curFPS, CASCB);
            } else if (theConfig.animgenProc === "Server") {
                servURI = this.animgenServer + "?avatar=" + av;
                if ((sigmlText.indexOf("hns_sign")) !== -1) {
                    log("Error: Still needs H-SiGML to G-SiGML processing");
                    servURI += "&htog=true";
                }
                log("playGSiGML Server URI: " + servURI);
                this.avGUI.stat("Processing SiGML for " + av);
                servCB = (function (_this) {
                    return function (jsonData, errC, errT, part) {
                        var i, len, sign;
                        if (jsonData == null) {
                            jsonData = [];
                        }
                        if (errC > 0) {
                            jsonData = [];
                            log("SiGML Error: " + errT);
                        }
                        if (txtarea) {
                            txtarea.value = Data.ppJSON(jsonData);
                            if (errC > 0) {
                                txtarea.value += ("Err: " + errT + "\n") + part;
                            }
                        }
                        _this.jCAS = {
                            anim: new CASAnimation,
                            playStarted: false
                        };
                        for (i = 0, len = jsonData.length; i < len; i++) {
                            sign = jsonData[i];
                            _this.acceptJSONCASSign(sign, "AnimgenServer");
                        }
                        _this.acceptJSONCASEndSignStream("AnimgenServer");
                        if (jsonData.length === 0) {
                            _this.evtHandlers.animIdle();
                            return _this.avGUI.stat("No signs returned for " + av);
                        }
                    };
                })(this);
                form = new FormData;
                blob = new Blob([sigmlText]);
                form.append("sigml", blob, "temp.sigml");
                return Data.fetchJSON(servURI, servCB, form);
            } else if ((theSToCA.getSToCA()) != null) {
                casfmt = (this.USING_JSON_STOC_FORMAT ? "json" : "xml");
                rqstid = "stoca" + this.nSToC + "_" + this.avIndex;
                this.nSToC += 1;
                rqst = {
                    stext: sigmlText
                };
                this.stocMap[rqstid] = rqst;
                this.avGUI.stat("Loading SiGML text for " + av);
                if (this.USING_JSON_STOC_FORMAT) {
                    this.jCAS = {
                        anim: new CASAnimation,
                        playStarted: false
                    };
                }
                cascb = this.USING_JSON_STOC_FORMAT ? ((function (_this) {
                    return function (jcassign) {
                        return _this.acceptJSONCAS(rqstid, jcassign);
                    };
                })(this)) : ((function (_this) {
                    return function (cas) {
                        return _this.acceptXMLCAS(rqstid, cas);
                    };
                })(this));
                return theSToCA.doSiGMLTextToCAS(rqstid, sigmlText, av, casfmt, cascb);
            } else {
                this.evtHandlers.animIdle();
                return this.avGUI.stat("SToCA: No SiGML played as SToCA applet unavailable");
            }
        };
        SigningAvatar.prototype.playSiGML = function (sigmlText) {
            var CB, av;
            this.evtHandlers.animLoading();
            av = this.character.getName();
            if ((theConfig.animgenProc !== "Client") && (sigmlText.indexOf("hns_sign")) !== -1) {
                CB = (function (_this) {
                    return function (res) {
                        if (res.errCount > 0 || !res.sigDoc) {
                            _this.evtHandlers.animIdle();
                            _this.avGUI.stat("No signs available for " + av);
                            return log("Errors:\n" + res.errText);
                        } else {
                            return _this.playGSiGML(Data.mnDOM(res.sigDoc));
                        }
                    };
                })(this);
                this.avGUI.stat("Converting H-SiGML to G-SiGML for " + av);
                return this.H2G.parseHtoGText(sigmlText, CB);
            } else {
                return this.playGSiGML(sigmlText);
            }
        };
        SigningAvatar.prototype.playSiGMLURL = function (sigmlURL) {
            var surlAbs;
            this.evtHandlers.animLoading();
            surlAbs = Data.absoluteURI(sigmlURL, this.sigmlBase);
            log("playSiGMLURL: " + surlAbs);
            return (Data.promiseURIText(surlAbs))["catch"]((function (_this) {
                return function (err) {
                    _this.evtHandlers.animIdle();
                    _this.avGUI.stat("Animgen: SiGML URL not loaded");
                    throw err;
                };
            })(this)).then(this.playSiGML);
        };
        SigningAvatar.prototype.playCAS = function (casfile) {
            console.warn("playCAS: Not implemented");
            return void 0;
        };
        SigningAvatar.prototype.stopPlay = function () {
            if (this._checkAS("Stop")) {
                return this.curAnimScheduler.stop();
            }
        };
        SigningAvatar.prototype.suspendPlay = function () {
            if (this._checkAS("Suspend")) {
                return this.curAnimScheduler.suspend();
            }
        };
        SigningAvatar.prototype.resumePlay = function () {
            if (this._checkAS("Resume")) {
                return this.curAnimScheduler.resume();
            }
        };
        SigningAvatar.prototype.showPreviousFrame = function () {
            if (this._checkAS("Show Previous Frame")) {
                return this.curAnimScheduler.showPreviousFrame();
            }
        };
        SigningAvatar.prototype.showNextFrame = function () {
            if (this._checkAS("Show Next Frame")) {
                return this.curAnimScheduler.showNextFrame();
            }
        };
        SigningAvatar.prototype._checkAS = function (optag) {
            if (!this.curAnimScheduler) {
                log(optag + " impossible: no current animation.");
            }
            return this.curAnimScheduler != null;
        };
        SigningAvatar.prototype.logGLImplementationData = function () {
            var glver, maXVUV, maxVA, renderer, slver, vendor;
            glver = this.gl.getParameter(this.gl.VERSION);
            slver = this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION);
            vendor = this.gl.getParameter(this.gl.VENDOR);
            renderer = this.gl.getParameter(this.gl.RENDERER);
            maxVA = this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS);
            maXVUV = this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS);
            log("--------  WebGL Implementation Data  --------");
            log("GL Version: " + glver + ";  GLSL Version: " + slver);
            log("Vendor: " + vendor + ";  Renderer: " + renderer);
            log("MAX_VERTEX_ATTRIBS: " + maxVA + ";  MAX_VERTEX_UNIFORM_VECTORS: " + maXVUV);
            return log("---------------------------------------------");
        };
        SigningAvatar.prototype.notifyFrame = function (g, s, f, isdone) {
            if (this.DO_ANIM_STATUS_REPORTING) {
                if (this.curAnimScheduler !== this.ambientScheduler) {
                    this.evtHandlers.atFrame(g, s, f, isdone);
                    return this.character.meshes[0].morphsManager._f = f;
                }
            }
        };
        SigningAvatar.prototype.draw = function (frame, deltaclk) {
            var avHeight, avWidth;
            avWidth = this.canvasEl.clientWidth;
            avHeight = this.canvasEl.clientHeight;
            if (this.canvasEl.width !== avWidth || this.canvasEl.height !== avHeight) {
                this.canvasEl.width = avWidth;
                this.canvasEl.height = avHeight;
            }
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.gl.viewport(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.enable(this.gl.CULL_FACE);
            this.camera.update(deltaclk, this.canvasEl.width, this.canvasEl.height);
            this.character.setFrame(frame);
            return this.character.draw(this.avPos[0], this.avPos[1], this.avPos[2], this.camera.getViewMatrix(), this.camera.getProjMatrix());
        };
        SigningAvatar.prototype.startNewCamera = function () {
            var camdata, m2internal, yadj;
            m2internal = this.character.getMetresToInternal();
            yadj = this.character.getAdjustViewY();
            this.avPos = [0, 0, 0];
            camdata = theConfig.avSettings[this.avIndex].initCamera || [0, 0, 4, 12, 19, 30, -1, -1];
            log("Camera: [" + (camdata.toString()) + "]");
            this.camera = new AvatarCamera(this.gl, camdata, yadj, m2internal);
            this.canvasEl.onmousedown = (function (_this) {
                return function (evt) {
                    return _this.camera.mousedown(evt);
                };
            })(this);
            this.canvasEl.onmousemove = (function (_this) {
                return function (evt) {
                    return _this.camera.mousemove(evt);
                };
            })(this);
            this.canvasEl.onmouseup = (function (_this) {
                return function (evt) {
                    return _this.camera.mouseup(evt);
                };
            })(this);
            this.canvasEl.onmouseover = (function (_this) {
                return function (evt) {
                    return _this.camera.mouseover(evt);
                };
            })(this);
            this.canvasEl.onmouseout = (function (_this) {
                return function (evt) {
                    return _this.camera.mouseout(evt);
                };
            })(this);
            this.canvasEl.addEventListener('touchstart', this.camera.touchstart, false);
            this.canvasEl.addEventListener('touchend', this.camera.touchend, false);
            return this.canvasEl.addEventListener('touchmove', this.camera.touchmove, false);
        };
        SigningAvatar.prototype.loadNewAvatar = function () {
            var av, ref;
            if ((ref = this.character) != null) {
                ref.release();
            }
            av = this.pendingAvName;
            this.pendingAvName = null;
            this.pendingCASAnim = null;
            this.evtHandlers.avLoadStarts(av);
            if (this.USING_JAR_FOR_AV_DEF) {
                return this.startBinaryAvatar(av);
            } else {
                return this.startJSONAvatar(av);
            }
        };
        SigningAvatar.prototype.startJSONAvatar = function (av) {
            var e;
            log("Start JSON character load for " + av);
            try {
                this.character = new Character;
                this.character.loadJSON(this.gl, av);
                return this.startNewCharacter(av, "JSON");
            } catch (error) {
                e = error;
                this.character = null;
                this.evtHandlers.avLoadDone(null);
                return log(e.stack || e.stacktrace || e);
            }
        };
        SigningAvatar.prototype.loadBinaryAvatar = function (av, avdef) {
            var e;
            log("Load Binary character " + av);
            try {
                return this.character.loadBinary(this.gl, av, avdef);
            } catch (error) {
                e = error;
                this.character = null;
                this.evtHandlers.avLoadDone(null);
                return log("Error " + e + "\nStack:\n" + e.stack + "\nStackTrace:\n" + e.stacktrace);
            }
        };
        SigningAvatar.prototype.startBinaryAvatar = function (av) {
            var avAv, avDefHandler, bindForGL;
            bindForGL = (function (_this) {
                return function () {
                    _this.character.bindForGL(_this.gl);
                    return _this.startNewCharacter(av, "Binary");
                };
            })(this);
            if (this.avCacheContains(av)) {
                this.character = this.avCacheGet(av);
                return bindForGL();
            } else {
                this.character = new Character();
                this.avCachePut(av, this.character);
                avDefHandler = (function (_this) {
                    return function (av, adv, pngURIGen) {
                        var avdef;
                        avdef = new AvDefView(av, adv, pngURIGen);
                        _this.loadBinaryAvatar(av, avdef);
                        return bindForGL();
                    };
                })(this);
                avAv = AvCache.get(av);
                return avAv.procAvDef(avDefHandler);
            }
        };
        SigningAvatar.prototype.startNewCharacter = function (avname, loadkind) {
            this.evtHandlers.avLoadDone((this.character ? avname : null));
            if (this.character) {
                this.startNewCamera();
                this.ambientScheduler = this.makeAnimScheduler(this.getAmbientCASAnim());
                return this.startAmbientAnimation();
            }
        };
        SigningAvatar.prototype.getAmbientCASAnim = function () {
            return CASAnimation.fromFrames(this.character.getAmbientFrames());
        };
        SigningAvatar.prototype.donePlay = function () {
            var actionfun;
            if (this.curAnimScheduler !== this.ambientScheduler) {
                this.evtHandlers.animIdle();
                this.avGUI.stat("Playing complete");
            }
            this.curAnimScheduler = null;
            actionfun = this.pendingAvName ? ((function (_this) {
                return function () {
                    return _this.loadNewAvatar();
                };
            })(this)) : this.pendingCASAnim ? ((function (_this) {
                return function () {
                    return _this.startPendingAnimation();
                };
            })(this)) : ((function (_this) {
                return function () {
                    return _this.startAmbientAnimation();
                };
            })(this));
            return setTimeout(actionfun, 0);
        };
        SigningAvatar.prototype.checkFramesAndSwitchAnimation = function (casanim) {
            if (casanim.hasFrames()) {
                return this.switchAnimation(casanim);
            }
        };
        SigningAvatar.prototype.switchAnimation = function (casanim) {
            this.pendingCASAnim = casanim;
            if (this.curAnimScheduler) {
                return this.curAnimScheduler.stop();
            } else {
                return this.startPendingAnimation();
            }
        };
        SigningAvatar.prototype.startPendingAnimation = function () {
            this.curAnimScheduler = this.makeAnimScheduler(this.pendingCASAnim);
            this.pendingCASAnim = null;
            this.evtHandlers.animActive();
            return this.curAnimScheduler.restart();
        };
        SigningAvatar.prototype.startAmbientAnimation = function () {
            this.curAnimScheduler = this.ambientScheduler;
            return this.curAnimScheduler.restart();
        };
        SigningAvatar.prototype.makeAnimScheduler = function (casanim) {
            var donefun, framefun, playfun, rqstanimfun;
            playfun = this.draw.bind(this);
            donefun = this.donePlay.bind(this);
            framefun = this.notifyFrame.bind(this);
            rqstanimfun = window.delayAnimationFrame.bind(window);
            return new AnimScheduler(casanim, playfun, donefun, this.speedFun, framefun, this.evtHandlers.fps, rqstanimfun);
        };
        SigningAvatar.prototype.acceptJSONCAS = function (rqstid, jcassign) {
            var jsonsign, pfx, s, txtarea;
            s = this.jCAS.anim.countSigns();
            pfx = "S-to-C request ID=" + rqstid + ", sign " + s + ": ";
            if (this.stocMap[rqstid]) {
                jsonsign = Data.parseJSON(jcassign);
                if (jsonsign) {
                    if (jsonsign.signIndex === void 0) {
                        this.acceptJSONCASEndSignStream(pfx);
                        return this.closeSToCRequest(rqstid);
                    } else {
                        txtarea = document.getElementById("JSONText");
                        if (txtarea) {
                            log("JSON text area available");
                            if (s === 0) {
                                txtarea.value = "";
                            }
                            txtarea.value = txtarea.value + JSON.stringify(jsonsign);
                        }
                        return this.acceptJSONCASSign(jsonsign, pfx);
                    }
                } else {
                    return log(pfx + "invalid JSON for sign " + s + ".");
                }
            } else {
                return log(pfx + "unexpected request ID.");
            }
        };
        SigningAvatar.prototype.acceptJSONCASSign = function (jsonsign, msgpfx) {
            var anim, s, sframes, sgloss;
            anim = this.jCAS.anim;
            sframes = jsonsign.frames.map(CASFrame.fromJSON);
            s = jsonsign.signIndex;
            sgloss = jsonsign.gloss;
            anim.extendSigns({
                i: s,
                gloss: sgloss,
                frames: sframes
            });
            if (!this.jCAS.playStarted && anim.hasFrames()) {
                this.switchAnimation(anim);
                return this.jCAS.playStarted = true;
            }
        };
        SigningAvatar.prototype.acceptJSONCASEndSignStream = function (msgpfx, qual) {
            var anim;
            if (qual == null) {
                qual = "";
            }
            anim = this.jCAS.anim;
            this.avGUI.stat("SiGML Loaded" + qual);
            return anim.setCompleted();
        };
        SigningAvatar.prototype.acceptXMLCAS = function (rqstid, cas) {
            var pfx, rqst;
            rqst = this.stocMap[rqstid];
            pfx = "S-to-C request ID=" + rqstid + ": ";
            if (!rqst) {
                log(pfx + "unexpected ID.");
            } else if (!cas) {
                log(pfx + "failed.");
            } else {
                log(pfx + "CAS text length=" + cas.length + ".");
                this.checkFramesAndSwitchAnimation(CASAnimation.fromCASText(cas));
            }
            return this.closeSToCRequest(rqstid);
        };
        SigningAvatar.prototype.closeSToCRequest = function (rqstid) {
            theSToCA.setDoneSiGMLToCASRequest(rqstid);
            delete this.stocMap[rqstid];
            return this.jCAS = null;
        };
        return SigningAvatar;
    })();
    cwaenv.add(SigningAvatar, "SigningAvatar");
}).call(this);