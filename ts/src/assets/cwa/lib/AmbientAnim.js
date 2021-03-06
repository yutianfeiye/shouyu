
//-------- js/AmbientAnim.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var AmbientAnim, CASFrame, CASMorph, CASTRSet, RQ, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    RQ = cwaenv.get("RotQuat");
    CASTRSet = cwaenv.get("CASTRSet");
    CASMorph = cwaenv.get("CASMorph");
    CASFrame = cwaenv.get("CASFrame");
    AmbientAnim = (function () {
        function AmbientAnim() {
            this.AMBIENT_FPS = 0;
            this.N_FRAMES = 0;
            this.CYCLE_TIME = 0;
            this.ixAmbient = 0;
            this.tAmbient = 0;
            this.tCurrent = 0;
        }
        AmbientAnim.create = function (aframes, fps) {
            var aa;
            aa = new AmbientAnim;
            aa.set(aframes, fps);
            return aa;
        };
        AmbientAnim.prototype.set = function (aframes, fps) {
            var lastfrm;
            this.AMBIENT_FPS = fps;
            this.AMBIENT_FRAMES = aframes;
            this.N_FRAMES = aframes.length;
            lastfrm = aframes[this.N_FRAMES - 1];
            return this.CYCLE_TIME = (lastfrm.getTime()) + (lastfrm.getDuration());
        };
        AmbientAnim.prototype.resetClock = function () {
            this.ixAmbient = 0;
            this.tAmbient = 0;
            return this.tCurrent = 0;
        };
        AmbientAnim.prototype.randomResetClock = function () {
            var IX;
            this.ixAmbient = IX = Math.floor((Math.random()) * this.N_FRAMES);
            return this.tCurrent = this.tAmbient = this.AMBIENT_FRAMES[IX].getTime();
        };
        AmbientAnim.prototype.synchClock = function () {
            return this.tCurrent = this.tAmbient;
        };
        AmbientAnim.prototype.getTime = function () {
            return this.tCurrent;
        };
        AmbientAnim.prototype.getAmbientFPS = function () {
            return this.AMBIENT_FPS;
        };
        AmbientAnim.prototype.getAmbientFrames = function () {
            return this.AMBIENT_FRAMES;
        };
        AmbientAnim.prototype.adjust = function (frame, scale) {
            return this.adjustForTime(frame, scale, frame.getTime());
        };
        AmbientAnim.prototype.adjustForTimeDelta = function (frame, scale, td) {
            return this.adjustForTime(frame, scale, this.tCurrent + td);
        };
        AmbientAnim.prototype.adjustForTime = function (frame, scale, t) {
            return this.applyAmbientToFrame(frame, this.findAmbientFrame(t)(), scale);
        };
        AmbientAnim.prototype.findAmbientFrame = function (t) {
            var EPS, N_CYCLES, T_CYCLES, T_DELTA, T_REL, T_STEP, fcurr, fnext, frame, ix, tix, tixnext;
            T_DELTA = t - this.tAmbient;
            N_CYCLES = Math.floor(T_DELTA / this.CYCLE_TIME);
            T_CYCLES = N_CYCLES * this.CYCLE_TIME;
            T_REL = T_DELTA - T_CYCLES;
            ix = this.ixAmbient;
            tix = 0;
            tixnext = this.AMBIENT_FRAMES[ix].getDuration();
            while (tixnext <= T_REL) {
                ix = this.nextAmbientIndex(ix);
                tix = tixnext;
                tixnext += this.AMBIENT_FRAMES[ix].getDuration();
            }
            T_STEP = tixnext - tix;
            EPS = T_STEP * 0.05;
            frame = null;
            if (T_DELTA < tix + EPS) {
                frame = this.AMBIENT_FRAMES[ix];
            } else if (tixnext < T_DELTA + EPS) {
                frame = this.AMBIENT_FRAMES[this.nextAmbientIndex(ix)];
            } else {
                fcurr = this.AMBIENT_FRAMES[ix];
                fnext = this.AMBIENT_FRAMES[this.nextAmbientIndex(ix)];
                frame = this.interpolate(fcurr, fnext, (T_DELTA - tix) / T_STEP);
            }
            this.ixAmbient = ix;
            this.tAmbient += T_CYCLES + tix;
            this.tCurrent = t;
            return frame;
        };
        AmbientAnim.prototype.nextAmbientIndex = function (ix) {
            var nextix;
            nextix = ix + 1;
            if (nextix === this.N_FRAMES) {
                nextix = 0;
            }
            return nextix;
        };
        AmbientAnim.prototype.interpolate = function (fa, fb, T) {
            var DUR_A, TM_A, TM_ADJ, bones, morphs;
            bones = this.interpolateBones(fa.getTRSets(), fb.getTRSets(), T);
            morphs = this.interpolateMorphs(fa, fb, T);
            TM_A = fa.getTime();
            DUR_A = fa.getDuration();
            TM_ADJ = DUR_A * T;
            return CASFrame.create(TM_A + TM_ADJ, DUR_A - TM_ADJ, bones, morphs);
        };
        AmbientAnim.prototype.interpolateBones = function (A_BONES, B_BONES, T) {
            var A_4CC, A_BONE, A_TRANS, B_4CC, B_BONE, ISSUE, NEW_ROT, N_BONES, PFX_ID, bones, fourccerrs, i, j, lenok, qa, qb, qnew, ref;
            bones = null;
            lenok = true;
            fourccerrs = 0;
            if (A_BONES.length !== B_BONES.length) {
                lenok = false;
            } else {
                N_BONES = A_BONES.length;
                bones = new Array(N_BONES);
                qa = new RQ;
                qb = new RQ;
                qnew = new RQ;
                for (i = j = 0, ref = N_BONES; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                    A_BONE = A_BONES[i];
                    B_BONE = B_BONES[i];
                    qa.setVec(A_BONE.getRotation());
                    qb.setVec(B_BONE.getRotation());
                    RQ.slerp(qnew, qa, qb, T);
                    NEW_ROT = qnew.copyXYZW();
                    A_4CC = A_BONE.getFourCC();
                    B_4CC = B_BONE.getFourCC();
                    if (A_4CC !== B_4CC) {
                        ++fourccerrs;
                    }
                    A_TRANS = A_BONE.getTranslation();
                    bones[i] = CASTRSet.create(A_4CC, NEW_ROT, A_TRANS);
                }
            }
            if (!lenok || fourccerrs !== 0) {
                bones = A_BONES;
                PFX_ID = "AmbientAnim.interpolateBones(): ";
                ISSUE = !lenok ? "nonmatching bone-set sizes." : fourccerrs + " nonmatching bone-set indices.";
                throw new Error(PFX_ID + ISSUE);
            }
            return bones;
        };
        AmbientAnim.prototype.makeMorphListWithExtras = function (A_FRAME, B_MORPHS) {
            var A_MORPHS, bextras, morphs;
            A_MORPHS = A_FRAME.getMorphs();
            bextras = B_MORPHS.filter(function (bmph) {
                return (A_FRAME.getMorph(bmph.getName())) === null;
            });
            morphs = new Array(A_MORPHS.length);
            if (bextras.length) {
                morphs = morphs.concat(bextras);
            }
            return morphs;
        };
        AmbientAnim.prototype.interpolateMorphs = function (fa, fb, T) {
            var AMOUNT, A_MORPH, A_MORPHS, B_MORPH, B_MORPHS, M_4CC, j, len, m, morph, morphs;
            A_MORPHS = fa.getMorphs();
            B_MORPHS = fb.getMorphs();
            morphs = null;
            if (A_MORPHS.length === 0 && B_MORPHS.length === 0) {
                morphs = A_MORPHS;
            } else {
                morphs = this.makeMorphListWithExtras(fa, B_MORPHS);
                for (m = j = 0, len = A_MORPHS.length; j < len; m = ++j) {
                    A_MORPH = A_MORPHS[m];
                    M_4CC = A_MORPH.getName();
                    B_MORPH = fb.getMorph(M_4CC);
                    morph = A_MORPH;
                    if (B_MORPH !== null) {
                        AMOUNT = (A_MORPH.getAmount()) * (1 - T) + (B_MORPH.getAmount()) * T;
                        morph = CASMorph.create(M_4CC, AMOUNT);
                    }
                    morphs[m] = morph;
                }
            }
            return morphs;
        };
        AmbientAnim.prototype.applyAmbientToFrame = function (frame, ambientframe, scale) {
            var FBONES, FMORPHS, NEW_BONES, NEW_MORPHS;
            NEW_BONES = this.bonesWithAmbient(frame, ambientframe, scale);
            NEW_MORPHS = this.morphsWithAmbient(frame, ambientframe, scale);
            FBONES = frame.getTRSets();
            FMORPHS = frame.getMorphs();
            if (NEW_BONES === FBONES && NEW_MORPHS === FMORPHS) {
                return frame;
            } else {
                return CASFrame.create(frame.getTime(), frame.getDuration(), NEW_BONES, NEW_MORPHS);
            }
        };
        AmbientAnim.prototype.bonesWithAmbient = function (frame, ambientframe, scale) {
            var AMB_BONE, AMB_BONES, BONE, BONES, NAME, NEW_BONES, N_BONES, TRANS, b, j, len, newbone, qamb, qnew;
            BONES = frame.getTRSets();
            AMB_BONES = ambientframe.getTRSets();
            N_BONES = BONES.length;
            NEW_BONES = AMB_BONES.length === 0 ? BONES : new Array(N_BONES);
            if (NEW_BONES !== BONES) {
                qnew = new RQ;
                qamb = new RQ;
                for (b = j = 0, len = BONES.length; j < len; b = ++j) {
                    BONE = BONES[b];
                    NAME = BONE.getFourCC();
                    newbone = BONE;
                    AMB_BONE = ambientframe.getTRSet(NAME);
                    if (AMB_BONE !== null) {
                        qnew.setVec(BONE.getRotation());
                        qamb.setVec(AMB_BONE.getRotation());
                        qamb.setScaleRot(scale);
                        qnew.setPostMultiply(qamb);
                        TRANS = BONE.getTranslation();
                        newbone = CASTRSet.create(NAME, qnew.copyXYZW(), TRANS);
                    }
                    NEW_BONES[b] = newbone;
                }
            }
            return NEW_BONES;
        };
        AmbientAnim.prototype.morphsWithAmbient = function (frame, ambientframe, scale) {
            var AMB_AMT, AMB_MORPH, AMB_MORPHS, MORPH, MORPHS, M_4CC, amt, j, len, m, newmorph, newmorphs;
            MORPHS = frame.getMorphs();
            AMB_MORPHS = ambientframe.getMorphs();
            newmorphs = MORPHS;
            if (AMB_MORPHS.length !== 0) {
                newmorphs = this.makeMorphListWithExtras(frame, AMB_MORPHS);
                for (m = j = 0, len = MORPHS.length; j < len; m = ++j) {
                    MORPH = MORPHS[m];
                    M_4CC = MORPH.getName();
                    newmorph = MORPH;
                    AMB_MORPH = ambientframe.getMorph(M_4CC)();
                    if (AMB_MORPH !== null) {
                        AMB_AMT = (AMB_MORPH.getAmount()) * scale;
                        amt = (MORPH.getAmount()) + AMB_AMT;
                        if (1 < amt) {
                            amt = 1;
                        }
                        newmorph = CASMorph.create(M_4CC, amt);
                    }
                    newmorphs[m] = newmorph;
                }
            }
            return newmorphs;
        };
        return AmbientAnim;
    })();
    cwaenv.add(AmbientAnim, "AmbientAnim");
}).call(this);