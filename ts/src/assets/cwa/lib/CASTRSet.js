//-------- js/CASTRSet.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var CASTRSet, FourCC, RQ, V3, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    FourCC = cwaenv.get("FourCC");
    V3 = cwaenv.get("E3Vec");
    RQ = cwaenv.get("RotQuat");
    CASTRSet = (function () {
        function CASTRSet() {
            this.fourCCName = 0;
            this.rotation = [0, 0, 0, 1];
            this.translation = [0, 0, 0];
        }
        CASTRSet.fromJSON = function (jsntrset) {
            var trset;
            trset = new CASTRSet;
            trset.setFromJSON(jsntrset);
            return trset;
        };
        CASTRSet.fromXML = function (boneel) {
            var trset;
            trset = new CASTRSet;
            trset.setFromXML(boneel);
            return trset;
        };
        CASTRSet.fromBin = function (avdv) {
            var trset;
            trset = new CASTRSet;
            trset.setFromBin(avdv);
            return trset;
        };
        CASTRSet.create = function (name4cc, rot, trans) {
            var trset;
            trset = new CASTRSet;
            trset.setFrom(name4cc, rot, trans);
            return trset;
        };
        CASTRSet.createFromStr = function (name4ccstr, rot, trans) {
            var trset;
            trset = new CASTRSet;
            trset.setFromStr(name4ccstr, rot, trans);
            return trset;
        };
        CASTRSet.equalTrans = function (ta, tb) {
            return ta[0] === tb[0] && ta[1] === tb[1] && ta[2] === tb[2];
        };
        CASTRSet.approxEq = function (x, y) {
            var DIFF, EPS, SIZE;
            EPS = 5e-5;
            DIFF = Math.abs(x - y);
            SIZE = Math.max(Math.abs(x), Math.abs(y));
            if (SIZE <= 1) {
                return DIFF < EPS;
            } else {
                return DIFF / SIZE < EPS;
            }
        };
        CASTRSet.approxEqTrans = function (ta, tb) {
            var aeq, i;
            aeq = (function () {
                var j, results;
                results = [];
                for (i = j = 0; j < 3; i = ++j) {
                    results.push(this.approxEq(ta[i], tb[i]));
                }
                return results;
            }).call(this);
            return aeq[0] && aeq[1] && aeq[2];
        };
        CASTRSet.approxEqRots = function (ra, rb) {
            var aeq, i;
            aeq = (function () {
                var j, results;
                results = [];
                for (i = j = 0; j < 4; i = ++j) {
                    results.push(this.approxEq(ra[i], rb[i]));
                }
                return results;
            }).call(this);
            return aeq[0] && aeq[1] && aeq[2] && aeq[3];
        };
        CASTRSet.prototype.setFromJSON = function (jsntrset) {
            this.fourCCName = FourCC.fourCCInt(jsntrset.id4cc);
            if (jsntrset.rot) {
                RQ.setQV(this.rotation, jsntrset.rot);
            }
            if (jsntrset.trans) {
                return V3.setV3(this.translation, jsntrset.trans);
            }
        };
        CASTRSet.prototype.setFromXML = function (boneel) {
            var bname, brot, btrans, c, pel, rel, xyz, xyzw;
            btrans = null;
            brot = null;
            bname = boneel.getAttribute("name");
            pel = (boneel.getElementsByTagName("position")).item(0);
            rel = (boneel.getElementsByTagName("qRotation")).item(0);
            if (pel) {
                xyz = ["x", "y", "z"];
                btrans = (function () {
                    var j, len, results;
                    results = [];
                    for (j = 0, len = xyz.length; j < len; j++) {
                        c = xyz[j];
                        results.push(Number(pel.getAttribute(c)));
                    }
                    return results;
                })();
            }
            if (rel) {
                xyzw = ["x", "y", "z", "w"];
                brot = (function () {
                    var j, len, results;
                    results = [];
                    for (j = 0, len = xyzw.length; j < len; j++) {
                        c = xyzw[j];
                        results.push(Number(rel.getAttribute(c)));
                    }
                    return results;
                })();
            }
            return this.setFromStr(bname, brot, btrans);
        };
        CASTRSet.prototype.setFromBin = function (avdv) {
            var id4cc, rot, trans, xyz, xyzw;
            id4cc = avdv.nextUint();
            trans = (function () {
                var j, len, ref, results;
                ref = avdv.nextVec3();
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    xyz = ref[j];
                    results.push(xyz);
                }
                return results;
            })();
            rot = (function () {
                var j, len, ref, results;
                ref = avdv.nextQuat();
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    xyzw = ref[j];
                    results.push(xyzw);
                }
                return results;
            })();
            return this.setFrom(id4cc, rot, trans);
        };
        CASTRSet.prototype.setFromStr = function (name, rot, trans) {
            return this.setFrom(FourCC.fourCCInt(name), rot, trans);
        };
        CASTRSet.prototype.setFrom = function (name4cc, rot, trans) {
            this.fourCCName = name4cc;
            this.rotation = rot;
            return this.translation = trans;
        };
        CASTRSet.prototype.setFromTRSet = function (trs) {
            this.fourCCName = trs.getFourCC();
            RQ.setQV(this.rotation, trs.getRotation());
            return V3.setV3(this.translation, trs.getTranslation());
        };
        CASTRSet.prototype.has4CCName = function (nm4cc) {
            return this.fourCCName === nm4cc;
        };
        CASTRSet.prototype.getFourCC = function () {
            return this.fourCCName;
        };
        CASTRSet.prototype.getTranslation = function () {
            return this.translation;
        };
        CASTRSet.prototype.getRotation = function () {
            return this.rotation;
        };
        CASTRSet.prototype.set = function (trs) {
            return this.setFromTRSet(trs);
        };
        CASTRSet.prototype.setFourCC = function (fcctag) {
            return this.fourCCName = fcctag;
        };
        CASTRSet.prototype.setRotation = function (trs) {
            return this.rotation = RQ.copyOfQV(trs.getRotation());
        };
        CASTRSet.prototype.setTranslation = function (trs) {
            return this.translation = V3.copyOfV3(trs.getTranslation());
        };
        CASTRSet.prototype.hashCode = function () {
            var rhc, thc;
            thc = this.translation === null ? 0 : this.translation.hashCode();
            rhc = this.rotation === null ? 0 : this.rotation.hashCode();
            return this.fourCCName + thc + rhc;
        };
        CASTRSet.prototype.matches = function (other) {
            var FOURCC, ROT, TRANS, TRS, eq;
            TRS = CASTRSet;
            eq = this === other;
            if (!eq && (other instanceof TRS)) {
                FOURCC = other.getFourCC();
                TRANS = other.getTranslation();
                ROT = other.getRotation();
                if (this.fourCCName === FOURCC) {
                    if (TRS.equalTrans(this.translation, TRANS)) {
                        if (TRS.approxEqRots(this.rotation, ROT)) {
                            eq = true;
                        }
                    }
                }
            }
            return eq;
        };
        return CASTRSet;
    })();
    cwaenv.add(CASTRSet, "CASTRSet");
}).call(this);