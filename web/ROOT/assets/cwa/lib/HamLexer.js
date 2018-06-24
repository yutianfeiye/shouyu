//-------- js/HamLexer.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var CommonToken, EOF, HamLexer, Token, cwaenv, document, hamLimit, ttMap, ttUnused;
    cwaenv = this.getCWAEnv();
    document = this.document;
    EOF = 1;
    ttUnused = -1;
    hamLimit = 256;
    ttMap = [ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, Ham4Parser.HamTab, Ham4Parser.HamLinefeed, ttUnused, Ham4Parser.HamPagebreak, Ham4Parser.HamReturn, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, Ham4Parser.HamVersion40, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, ttUnused, Ham4Parser.HamSpace, Ham4Parser.HamExclaim, Ham4Parser.HamQuery, Ham4Parser.HamFullstop, Ham4Parser.HamComma, Ham4Parser.HamPlus, Ham4Parser.HamMetaalt, Ham4Parser.HamClocku, Ham4Parser.HamClockul, Ham4Parser.HamClockl, Ham4Parser.HamClockdl, Ham4Parser.HamClockd, Ham4Parser.HamClockdr, Ham4Parser.HamClockr, Ham4Parser.HamClockur, Ham4Parser.HamClockfull, Ham4Parser.HamSymmpar, Ham4Parser.HamSymmlr, Ham4Parser.HamFist, Ham4Parser.HamFlathand, Ham4Parser.HamFinger2, Ham4Parser.HamFinger23, Ham4Parser.HamFinger23spread, Ham4Parser.HamFinger2345, Ham4Parser.HamThumboutmod, Ham4Parser.HamThumbacrossmod, Ham4Parser.HamPinch12, Ham4Parser.HamPinchall, Ham4Parser.HamPinch12open, Ham4Parser.HamCee12, Ham4Parser.HamCeeall, Ham4Parser.HamCee12open, Ham4Parser.HamThumbopenmod, Ham4Parser.HamFingerstraightmod, Ham4Parser.HamFingerbendmod, Ham4Parser.HamFingerhookedmod, Ham4Parser.HamNondominant, Ham4Parser.HamDoublebent, Ham4Parser.HamDoublehooked, ttUnused, Ham4Parser.HamExtfingeru, Ham4Parser.HamExtfingerur, Ham4Parser.HamExtfingerr, Ham4Parser.HamExtfingerdr, Ham4Parser.HamExtfingerd, Ham4Parser.HamExtfingerdl, Ham4Parser.HamExtfingerl, Ham4Parser.HamExtfingerul, Ham4Parser.HamExtfingerol, Ham4Parser.HamExtfingero, Ham4Parser.HamExtfingeror, Ham4Parser.HamExtfingeril, Ham4Parser.HamExtfingeri, Ham4Parser.HamExtfingerir, Ham4Parser.HamExtfingerui, Ham4Parser.HamExtfingerdi, Ham4Parser.HamExtfingerdo, Ham4Parser.HamExtfingeruo, ttUnused, ttUnused, ttUnused, Ham4Parser.HamEarlobe, Ham4Parser.HamNostrils, Ham4Parser.HamShouldertop, Ham4Parser.HamPalmu, Ham4Parser.HamPalmur, Ham4Parser.HamPalmr, Ham4Parser.HamPalmdr, Ham4Parser.HamPalmd, Ham4Parser.HamPalmdl, Ham4Parser.HamPalml, Ham4Parser.HamPalmul, Ham4Parser.HamReplace, Ham4Parser.HamArmextended, Ham4Parser.HamBehind, Ham4Parser.HamEtc, Ham4Parser.HamOrirelative, Ham4Parser.HamTongue, Ham4Parser.HamTeeth, Ham4Parser.HamStomach, Ham4Parser.HamNeutralspace, Ham4Parser.HamHead, Ham4Parser.HamHeadtop, Ham4Parser.HamForehead, Ham4Parser.HamEyebrows, Ham4Parser.HamEyes, Ham4Parser.HamNose, Ham4Parser.HamEar, Ham4Parser.HamCheek, Ham4Parser.HamLips, Ham4Parser.HamChin, Ham4Parser.HamUnderchin, Ham4Parser.HamNeck, Ham4Parser.HamShoulders, Ham4Parser.HamChest, Ham4Parser.HamStomach, Ham4Parser.HamBelowstomach, Ham4Parser.HamLrbeside, Ham4Parser.HamLrat, Ham4Parser.HamUpperarm, Ham4Parser.HamElbow, Ham4Parser.HamElbowinside, Ham4Parser.HamLowerarm, Ham4Parser.HamWristback, Ham4Parser.HamWristpulse, Ham4Parser.HamThumbball, Ham4Parser.HamPalm, Ham4Parser.HamHandback, Ham4Parser.HamThumb, Ham4Parser.HamIndexfinger, Ham4Parser.HamMiddlefinger, Ham4Parser.HamRingfinger, Ham4Parser.HamPinky, Ham4Parser.HamThumbside, Ham4Parser.HamPinkyside, Ham4Parser.HamBetween, Ham4Parser.HamFingertip, Ham4Parser.HamFingernail, Ham4Parser.HamFingerpad, Ham4Parser.HamFingermidjoint, Ham4Parser.HamFingerbase, Ham4Parser.HamFingerside, Ham4Parser.HamWristtopulse, Ham4Parser.HamWristtoback, Ham4Parser.HamWristtothumb, Ham4Parser.HamWristtopinky, Ham4Parser.HamCoreftag, Ham4Parser.HamCorefref, Ham4Parser.HamNomotion, Ham4Parser.HamMoveu, Ham4Parser.HamMoveur, Ham4Parser.HamMover, Ham4Parser.HamMovedr, Ham4Parser.HamMoved, Ham4Parser.HamMovedl, Ham4Parser.HamMovel, Ham4Parser.HamMoveul, Ham4Parser.HamMoveol, Ham4Parser.HamMoveo, Ham4Parser.HamMoveor, Ham4Parser.HamMoveil, Ham4Parser.HamMovei, Ham4Parser.HamMoveir, Ham4Parser.HamMoveui, Ham4Parser.HamMovedi, Ham4Parser.HamMovedo, Ham4Parser.HamMoveuo, Ham4Parser.HamMovecross, Ham4Parser.HamMovex, Ham4Parser.HamSmallmod, Ham4Parser.HamLargemod, Ham4Parser.HamArcl, Ham4Parser.HamArcu, Ham4Parser.HamArcr, Ham4Parser.HamArcd, Ham4Parser.HamWavy, Ham4Parser.HamZigzag, Ham4Parser.HamFingerplay, Ham4Parser.HamParbegin, Ham4Parser.HamParend, Ham4Parser.HamCircleo, Ham4Parser.HamCirclei, Ham4Parser.HamCircled, Ham4Parser.HamCircleu, Ham4Parser.HamCirclel, Ham4Parser.HamCircler, Ham4Parser.HamIncreasing, Ham4Parser.HamDecreasing, Ham4Parser.HamClose, Ham4Parser.HamTouch, Ham4Parser.HamInterlock, Ham4Parser.HamCross, Ham4Parser.HamFast, Ham4Parser.HamSlow, Ham4Parser.HamTense, Ham4Parser.HamRest, Ham4Parser.HamHalt, Ham4Parser.HamRepeatfromstart, Ham4Parser.HamRepeatfromstartseveral, Ham4Parser.HamRepeatcontinue, Ham4Parser.HamRepeatcontinueseveral, Ham4Parser.HamSeqbegin, Ham4Parser.HamSeqend, Ham4Parser.HamAlternatingmotion, Ham4Parser.HamRepeatreverse, Ham4Parser.HamBrushing, Ham4Parser.HamNonipsi, ttUnused, Ham4Parser.HamEllipseh, Ham4Parser.HamEllipseur, Ham4Parser.HamEllipsev, Ham4Parser.HamEllipseul, Ham4Parser.HamMime, Ham4Parser.HamAltbegin, Ham4Parser.HamAltend, Ham4Parser.HamNodding, Ham4Parser.HamSwinging, Ham4Parser.HamTwisting, Ham4Parser.HamStircw, Ham4Parser.HamStirccw, ttUnused, ttUnused, ttUnused, ttUnused, Ham4Parser.HamFusionbegin, Ham4Parser.HamFusionend, ttUnused, ttUnused, Ham4Parser.HamCircleul, Ham4Parser.HamCircledr, Ham4Parser.HamCircleur, Ham4Parser.HamCircledl, Ham4Parser.HamCircleol, Ham4Parser.HamCircleir, Ham4Parser.HamCircleor, Ham4Parser.HamCircleil, Ham4Parser.HamCircledo, Ham4Parser.HamCircleui, Ham4Parser.HamCircledi, Ham4Parser.HamCircleuo, ttUnused, ttUnused, Ham4Parser.HamNbs, ttUnused];
    Token = org.antlr.runtime.Token;
    CommonToken = org.antlr.runtime.CommonToken;
    HamLexer = (function () {
        function HamLexer(hamSignCharCodes, tokenNames, logLev) {
            this.hamSignCharCodes = hamSignCharCodes;
            this.tokenNames = tokenNames;
            this.logLev = logLev != null ? logLev : 0;
            this.hamSignLength = this.hamSignCharCodes.length;
            this.trace("HamLexer Overridden Input: " + this.hamSignCharCodes + " length=" + this.hamSignLength);
            this.trace("HamLexer Tokens: " + this.tokenNames);
            this.iScan = 0;
            this.lMark = -1;
        }
        HamLexer.prototype.setLogLevel = function (lev) {
            return this.logLev = lev;
        };
        HamLexer.prototype.trace = function (str) {
            if (this.logLev >= 440) {
                return console.log(str);
            }
        };
        HamLexer.prototype.seek = function (ix) {
            this.trace("Lex: seek(" + ix + ") called");
            return this.iScan = ix;
        };
        HamLexer.prototype.rewind = function (ix) {
            if (ix != null) {
                this.trace("Lex: rewind(" + ix + ") called");
                return this.iScan = ix;
            } else {
                this.trace("Lex: rewind() called");
                if (this.lMark >= 0) {
                    return this.iScan = this.lMark;
                }
            }
        };
        HamLexer.prototype.mark = function () {
            this.trace("Lex: mark() yeilds " + this.iScan);
            this.lMark = this.iScan;
            return this.iScan;
        };
        HamLexer.prototype.index = function () {
            this.trace("Lex: index() yeilds " + this.iScan);
            return this.iScan;
        };
        HamLexer.prototype.tokName = function (i) {
            if (i === EOF) {
                return "<EOF>";
            } else if (i === ttUnused) {
                return "<UNUSED>";
            } else {
                return this.tokenNames[i];
            }
        };
        HamLexer.prototype.getType = function (i, tag) {
            var ich, res;
            res = Token.EOF;
            if (i >= 0 && i < this.hamSignLength) {
                ich = this.hamSignCharCodes.charCodeAt(i);
                res = ich < hamLimit ? ttMap[ich] : ttUnused;
            }
            this.trace("Lex: at " + this.iScan + " getType(" + i + ") for " + tag + " yeilds " + res + "=" + (this.tokName(res)));
            return res;
        };
        HamLexer.prototype.getToken = function (i) {
            var ttype;
            ttype = this.getType(i, "getToken");
            return new CommonToken(ttype, (this.tokName(ttype)) + "{" + i + "}");
        };
        HamLexer.prototype.LA = function (ah) {
            var typ;
            typ = ah === 0 ? EOF : ah < 0 ? getType(this.iScan + ah, "LA") : this.getType(this.iScan + ah - 1, "LA");
            this.trace("Lex: LA(" + ah + ") yeilds " + typ);
            return typ;
        };
        HamLexer.prototype.LT = function (ah) {
            this.trace("Lex: LT(" + ah + ") calls getToken");
            if (ah === 0 || (this.iScan + ah) < 0) {
                return null;
            } else if (ah < 0) {
                return this.getToken(this.iScan + ah);
            } else {
                return this.getToken(this.iScan + ah - 1);
            }
        };
        HamLexer.prototype.consume = function () {
            this.iScan++;
            return this.trace("Lex: consume() now " + this.iScan);
        };
        return HamLexer;
    })();
    cwaenv.add(HamLexer, "HamLexer");
}).call(this);