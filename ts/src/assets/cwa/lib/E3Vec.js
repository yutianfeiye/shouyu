//-------- js/E3Vec.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var E3Vec, RQ, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    RQ = void 0;
    E3Vec = (function () {
        function E3Vec(x, y, z) {
            this.xyz = new Float32Array([x, y, z]);
        }
        E3Vec.setRotQuat = function (rq) {
            return RQ = rq;
        };
        E3Vec.fStr = function (x, n) {
            return x.toFixed(n);
        };
        E3Vec.fStr3 = function (x) {
            return this.fStr(x, 3);
        };
        E3Vec.vStr = function (xyz, n) {
            var ref, t, xs, ys, zs;
            ref = (function () {
                var i, len1, results;
                results = [];
                for (i = 0, len1 = xyz.length; i < len1; i++) {
                    t = xyz[i];
                    results.push(this.fStr(t, n));
                }
                return results;
            }).call(this), xs = ref[0], ys = ref[1], zs = ref[2];
            return "<" + xs + " " + ys + " " + zs + ">";
        };
        E3Vec.make3Vec = function () {
            return new Float32Array(3);
        };
        E3Vec.make4Vec = function () {
            return new Float32Array(4);
        };
        E3Vec.makeV3 = function (x, y, z) {
            return new Float32Array([x, y, z]);
        };
        E3Vec.copyOfV3 = function (xyz) {
            return new Float32Array(xyz);
        };
        E3Vec.setV3_xyz = function (xyz, x, y, z) {
            xyz[0] = x;
            xyz[1] = y;
            xyz[2] = z;
            return xyz;
        };
        E3Vec.setV3 = function (xyz, xyzb) {
            var xb, yb, zb;
            xb = xyzb[0], yb = xyzb[1], zb = xyzb[2];
            xyz[0] = xb;
            xyz[1] = yb;
            xyz[2] = zb;
            return xyz;
        };
        E3Vec.setAddV3 = function (xyz, xyzb) {
            var xb, yb, zb;
            xb = xyzb[0], yb = xyzb[1], zb = xyzb[2];
            xyz[0] += xb;
            xyz[1] += yb;
            xyz[2] += zb;
            return xyz;
        };
        E3Vec.addV3 = function (xyza, xyzb) {
            return this.setAddV3(this.copyOfV3(xyza), xyzb);
        };
        E3Vec.setSubtractV3 = function (xyz, xyzb) {
            var xb, yb, zb;
            xb = xyzb[0], yb = xyzb[1], zb = xyzb[2];
            xyz[0] -= xb;
            xyz[1] -= yb;
            xyz[2] -= zb;
            return xyz;
        };
        E3Vec.subtractV3 = function (xyza, xyzb) {
            return this.setSubtractV3(this.copyOfV3(xyza), xyzb);
        };
        E3Vec.dotProductV3 = function (xyza, xyzb) {
            var xa, xb, ya, yb, za, zb;
            xa = xyza[0], ya = xyza[1], za = xyza[2];
            xb = xyzb[0], yb = xyzb[1], zb = xyzb[2];
            return xa * xb + ya * yb + za * zb;
        };
        E3Vec.squaredLengthV3 = function (xyz) {
            return this.dotProductV3(xyz, xyz);
        };
        E3Vec.lengthV3 = function (xyz) {
            return Math.sqrt(this.squaredLengthV3(xyz));
        };
        E3Vec.projectionV3 = function (xyza, xyzb) {
            return (this.dotProductV3(xyza, xyzb)) / (this.lengthV3(xyzb));
        };
        E3Vec.setScaleV3 = function (xyz, s) {
            xyz[0] *= s;
            xyz[1] *= s;
            xyz[2] *= s;
            return xyz;
        };
        E3Vec.setInverseScaleV3 = function (xyz, s) {
            xyz[0] /= s;
            xyz[1] /= s;
            xyz[2] /= s;
            return xyz;
        };
        E3Vec.setNegateV3 = function (xyz) {
            var x, y, z;
            x = xyz[0], y = xyz[1], z = xyz[2];
            return this.setV3_xyz(xyz, -x, -y, -z);
        };
        E3Vec.setNormalizeV3 = function (xyz) {
            var len;
            len = this.lengthV3(xyz);
            if (1e-5 <= len) {
                return this.setInverseScaleV3(xyz, len);
            } else {
                return xyz;
            }
        };
        E3Vec.normalizeV3 = function (xyza) {
            return this.setNormalizeV3(this.copyOfV3(xyza));
        };
        E3Vec.setCrossProductV3 = function (xyz, xyzb) {
            var xa, xb, ya, yb, za, zb;
            xa = xyz[0], ya = xyz[1], za = xyz[2];
            xb = xyzb[0], yb = xyzb[1], zb = xyzb[2];
            return this.setV3_xyz(xyz, ya * zb - za * yb, za * xb - xa * zb, xa * yb - ya * xb);
        };
        E3Vec.crossProductV3 = function (xyza, xyzb) {
            return this.setCrossProductV3(this.copyOfV3(xyza), xyzb);
        };
        E3Vec.setUnitCrossProductV3 = function (xyz, xyzb) {
            return this.setNormalizeV3(this.setCrossProductV3(xyz, xyzb));
        };
        E3Vec.unitCrossProductV3 = function (xyza, xyzb) {
            return this.setUnitCrossProductV3(this.copyOfV3(xyza), xyzb);
        };
        E3Vec.setRotateV3 = function (xyz, qv) {
            return RQ.rotateV3(xyz, xyz, qv);
        };
        E3Vec.from_xyz = function (x, y, z) {
            return new E3Vec(x, y, z);
        };
        E3Vec.fromV3 = function (xyz) {
            var x, y, z;
            x = xyz[0], y = xyz[1], z = xyz[2];
            return new E3Vec(x, y, z);
        };
        E3Vec.fromE3V = function (e3v) {
            return this.fromV3(e3v.xyz);
        };
        E3Vec.fromVec = function (xyz) {
            return this.fromV3(xyz);
        };
        E3Vec.create = function () {
            return new E3Vec(0, 0, 0);
        };
        E3Vec.ZERO = new E3Vec(0, 0, 0);
        E3Vec.prototype.x = function () {
            return this.xyz[0];
        };
        E3Vec.prototype.y = function () {
            return this.xyz[1];
        };
        E3Vec.prototype.z = function () {
            return this.xyz[2];
        };
        E3Vec.prototype.copyXYZ = function () {
            return E3Vec.copyOfV3(this.xyz);
        };
        E3Vec.prototype.toXYZ = function (xyz) {
            return E3Vec.setV3(xyz, this.xyz);
        };
        E3Vec.prototype.toV3 = function (xyz) {
            return E3Vec.setV3(xyz, this.xyz);
        };
        E3Vec.prototype.toStr = function () {
            return this.asString();
        };
        E3Vec.prototype.asString = function () {
            var ref, x, y, z;
            ref = this.xyz, x = ref[0], y = ref[1], z = ref[2];
            return "<" + x + " " + y + " " + z + ">";
        };
        E3Vec.prototype.asString_n = function (n) {
            return E3Vec.vStr(this.xyz, n);
        };
        E3Vec.prototype.asString4 = function () {
            return this.asString_n(4);
        };
        E3Vec.prototype.set_xyz = function (x, y, z) {
            E3Vec.setV3_xyz(this.xyz, x, y, z);
            return this;
        };
        E3Vec.prototype.setVec = function (xyz) {
            E3Vec.setV3(this.xyz, xyz);
            return this;
        };
        E3Vec.prototype.setFromE3V = function (e3v) {
            E3Vec.setV3(this.xyz, e3v.xyz);
            return this;
        };
        E3Vec.prototype.addXYZ = function (xyz) {
            return E3Vec.fromV3(E3Vec.setAddV3(E3Vec.copyOfV3(this.xyz), xyz));
        };
        E3Vec.prototype.add = function (e3v) {
            return this.addXYZ(e3v.xyz);
        };
        E3Vec.prototype.dotProduct = function (e3v) {
            return E3Vec.dotProductV3(this.xyz, e3v.xyz);
        };
        E3Vec.prototype.setNegate = function () {
            E3Vec.setNegateV3(this.xyz);
            return this;
        };
        E3Vec.prototype.setAdd = function (e3v) {
            E3Vec.setAddV3(this.xyz, e3v.xyz);
            return this;
        };
        E3Vec.prototype.setCrossProduct = function (e3v) {
            E3Vec.setCrossProductV3(this.xyz, e3v.xyz);
            return this;
        };
        E3Vec.prototype.setUnitCrossProduct = function (e3v) {
            E3Vec.setUnitCrossProductV3(this.xyz, e3v.xyz);
            return this;
        };
        E3Vec.prototype.setRotate = function (rq) {
            E3Vec.setRotateV3(this.xyz, rq.xyzw);
            return this;
        };
        E3Vec.prototype.projectionOn = function (e3v) {
            return E3Vec.projectionV3(this.xyz, e3v.xyz);
        };
        E3Vec.prototype.xyzLength = function () {
            return E3Vec.lengthV3(this.xyz);
        };
        E3Vec.prototype.squaredLength = function () {
            return E3Vec.squaredLengthV3(this.xyz);
        };
        return E3Vec;
    })();
    cwaenv.add(E3Vec, "E3Vec");
}).call(this);