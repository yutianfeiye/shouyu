//-------- js/RotQuat.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var RotQuat, V3, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    V3 = cwaenv.get("E3Vec");
    RotQuat = (function () {
        var RQ;

        function RotQuat() {
            this.xyzw = new Float32Array(4);
            this.xyzw[3] = 1;
        }
        RQ = RotQuat;
        RotQuat.fStr = function (x, n) {
            return x.toFixed(n);
        };
        RotQuat.fStr3 = function (x) {
            return this.fStr(x, 3);
        };
        RotQuat.qStr = function (qv, n) {
            var ref, t, w, x, y, z;
            ref = (function () {
                var j, len, results;
                results = [];
                for (j = 0, len = qv.length; j < len; j++) {
                    t = qv[j];
                    results.push(this.fStr(t, n));
                }
                return results;
            }).call(this), x = ref[0], y = ref[1], z = ref[2], w = ref[3];
            return "<" + x + " " + y + " " + z + "; " + w + ">";
        };
        RotQuat.makeQV = function (x, y, z, w) {
            return new Float32Array([x, y, z, w]);
        };
        RotQuat.copyOfQV = function (qv) {
            return new Float32Array(qv);
        };
        RotQuat.setQV_xyzw = function (qv, x, y, z, w) {
            qv[0] = x;
            qv[1] = y;
            qv[2] = z;
            qv[3] = w;
            return qv;
        };
        RotQuat.setQV = function (qv, qq) {
            var w, x, y, z;
            x = qq[0], y = qq[1], z = qq[2], w = qq[3];
            qv[0] = x;
            qv[1] = y;
            qv[2] = z;
            qv[3] = w;
            return qv;
        };
        RotQuat.setAxisAngleQV = function (qv, xyz, angle) {
            var halfA, sinHA, ux, uy, uz;
            ux = xyz[0], uy = xyz[1], uz = xyz[2];
            halfA = 0.5 * angle;
            sinHA = Math.sin(halfA);
            return this.setQV_xyzw(qv, sinHA * ux, sinHA * uy, sinHA * uz, Math.cos(halfA));
        };
        RotQuat.setScaleQV = function (qv, s) {
            qv[0] *= s;
            qv[1] *= s;
            qv[2] *= s;
            qv[3] *= s;
            return qv;
        };
        RotQuat.scaleQV = function (q, s) {
            var qv;
            qv = this.copyOfQV(q);
            return this.setScaleQV(qv, s);
        };
        RotQuat.setNegateQV = function (qv) {
            qv[0] = -qv[0];
            qv[1] = -qv[1];
            qv[2] = -qv[2];
            qv[3] = -qv[3];
            return qv;
        };
        RotQuat.negateQV = function (q) {
            var qv;
            qv = this.copyOfQV(q);
            return this.setNegateQV(qv);
        };
        RotQuat.setAddQV = function (qv, qq) {
            qv[0] += qq[0];
            qv[1] += qq[1];
            qv[2] += qq[2];
            qv[3] += qq[3];
            return qv;
        };
        RotQuat.addQV = function (qa, qb) {
            var qv;
            qv = this.copyOfQV(qa);
            return this.setAddQV(qv, qb);
        };
        RotQuat.setSubtractQV = function (qv, qq) {
            qv[0] -= qq[0];
            qv[1] -= qq[1];
            qv[2] -= qq[2];
            qv[3] -= qq[3];
            return qv;
        };
        RotQuat.subtractQV = function (qa, qb) {
            var qv;
            qv = this.copyOfQV(qa);
            return this.setSubtractQV(qv, qb);
        };
        RotQuat.setConjugateQV = function (qv) {
            V3.setNegateV3(qv);
            return qv;
        };
        RotQuat.conjugateQV = function (qa) {
            var qv;
            qv = this.copyOfQV(qa);
            return this.setConjugateQV(qv);
        };
        RotQuat.innerProductQV = function (qa, qb) {
            return qa[0] * qb[0] + qa[1] * qb[1] + qa[2] * qb[2] + qa[3] * qb[3];
        };
        RotQuat.setProductQV = function (qv, qa, qb) {
            var aw, ax, ay, az, bw_, bx_, by_, bz_;
            ax = qa[0];
            ay = qa[1];
            az = qa[2];
            aw = qa[3];
            bx_ = qb[0];
            by_ = qb[1];
            bz_ = qb[2];
            bw_ = qb[3];
            return this.setQV_xyzw(qv, aw * bx_ + ax * bw_ + ay * bz_ - az * by_, aw * by_ + ay * bw_ + az * bx_ - ax * bz_, aw * bz_ + az * bw_ + ax * by_ - ay * bx_, aw * bw_ - ax * bx_ - ay * by_ - az * bz_);
        };
        RotQuat.lengthQV = function (qv) {
            return Math.sqrt(this.innerProductQV(qv, qv));
        };
        RotQuat.setNormalizeQV = function (qv) {
            var lensq;
            lensq = this.innerProductQV(qv, qv);
            if (1e-12 < lensq) {
                return setScaleQV(qv, 1 / Math.sqrt(lensq));
            } else {
                return qv;
            }
        };
        RotQuat.slerpQV = function (qv, qa, qb, T) {
            var ONE, T_COMP, cosOmega, doLinear, omega, qb_, sA, sB, sinOmega, sinSqOmega;
            ONE = 1;
            T_COMP = ONE - T;
            cosOmega = this.innerProductQV(qa, qb);
            qb_ = qb;
            if (cosOmega < 0) {
                cosOmega = -cosOmega;
                qb_ = this.negateQV(qb);
            }
            doLinear = ONE - cosOmega < 1e-5;
            if (doLinear) {
                sA = T_COMP;
                sB = T;
            } else {
                sinSqOmega = 1 - cosOmega * cosOmega;
                sinOmega = sinSqOmega / Math.sqrt(sinSqOmega);
                omega = Math.atan2(sinOmega, cosOmega);
                sA = (Math.sin(omega * T_COMP)) / sinOmega;
                sB = (Math.sin(omega * T)) / sinOmega;
            }
            this.setQV_xyzw(qv, qa[0] * sA + qb_[0] * sB, qa[1] * sA + qb_[1] * sB, qa[2] * sA + qb_[2] * sB, qa[3] * sA + qb_[3] * sB);
            if (doLinear) {
                return RotQuat.setNormaliseQV(qv);
            }
        };
        RotQuat.rotateV3 = function (v3r, v3, qv) {
            var _u, _uX_uXv, _uXv, _v, udotv, w;
            _v = V3.copyOfV3(v3);
            _u = qv;
            w = qv[3];
            udotv = V3.dotProductV3(_u, _v);
            _uXv = V3.setCrossProductV3(V3.copyOfV3(_u), _v);
            _uX_uXv = V3.setCrossProductV3(V3.copyOfV3(_u), _uXv);
            V3.setV3(v3r, _u);
            V3.setScaleV3(v3r, udotv);
            V3.setScaleV3(_v, w * w);
            V3.setAddV3(v3r, _v);
            V3.setScaleV3(_uXv, 2 * w);
            V3.setAddV3(v3r, _uXv);
            return V3.setAddV3(v3r, _uX_uXv);
        };
        RotQuat.rotateV3_ = function (vr, v, q) {
            var ab, c, cx, cy, cz, d, i, j, ref, results, ux, uy, uz, vx, vy, vz, w, w2, ww;
            vx = v[0], vy = v[1], vz = v[2];
            ux = q[0], uy = q[1], uz = q[2], w = q[3];
            ww = w * w;
            w2 = w + w;
            ab = ab = [(ux * ux + ww) * vx, (uy * uy + ww) * vy, (uz * uz + ww) * vz];
            ref = c = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx], cx = ref[0], cy = ref[1], cz = ref[2];
            c[0] *= w2;
            c[1] *= w2;
            c[2] *= w2;
            d = [uy * cz - uz * cy, uz * cx - ux * cz, ux * cy - uy * cx];
            results = [];
            for (i = j = 0; j < 3; i = ++j) {
                results.push(vr[i] = ab[i] + c[i] + d[i]);
            }
            return results;
        };
        RotQuat.setTRMat4x4FromQV = function (m, qv) {
            return this._setTRMatFromQV(m, qv, true, false, true);
        };
        RotQuat.setRotMat4x4FromQV = function (m, qv) {
            return this._setTRMatFromQV(m, qv, true, false, false);
        };
        RotQuat.setRotMat3x3FromQV = function (m, qv) {
            return this._setTRMatFromQV(m, qv, true, true);
        };
        RotQuat.setRotMatRows3x4FromQV = function (m, qv) {
            return this._setTRMatFromQV(m, qv, false, false, false);
        };
        RotQuat.setRotMat4x4TransposeFromQV = function (m, qv) {
            this._setTRMatFromQV(m, qv, false, false, true);
            m[12] = m[13] = m[14] = 0;
            return m;
        };
        RotQuat._setTRMatFromQV = function (m, qv, m_is_col_maj, m_is_3x3, do_t_4x4) {
            var WX_2, WY_2, WZ_2, XX_2, XY_2, XZ_2, X_2, YY_2, YZ_2, Y_2, ZZ_2, Z_2, m00, m01, m02, m10, m11, m12, m20, m21, m22, ww, xx, yy, zz;
            xx = qv[0], yy = qv[1], zz = qv[2], ww = qv[3];
            X_2 = xx + xx;
            Y_2 = yy + yy;
            Z_2 = zz + zz;
            WX_2 = ww * X_2;
            WY_2 = ww * Y_2;
            WZ_2 = ww * Z_2;
            XX_2 = xx * X_2;
            XY_2 = xx * Y_2;
            XZ_2 = xx * Z_2;
            YY_2 = yy * Y_2;
            YZ_2 = yy * Z_2;
            ZZ_2 = zz * Z_2;
            m00 = 1 - YY_2 - ZZ_2;
            m01 = XY_2 - WZ_2;
            m02 = XZ_2 + WY_2;
            m10 = XY_2 + WZ_2;
            m11 = 1 - XX_2 - ZZ_2;
            m12 = YZ_2 - WX_2;
            m20 = XZ_2 - WY_2;
            m21 = YZ_2 + WX_2;
            m22 = 1 - XX_2 - YY_2;
            if (m_is_col_maj) {
                if (m_is_3x3) {
                    m[0] = m00;
                    m[1] = m10;
                    m[2] = m20;
                    m[3] = m01;
                    m[4] = m11;
                    m[5] = m21;
                    m[6] = m02;
                    m[7] = m12;
                    m[8] = m22;
                } else {
                    m[0] = m00;
                    m[1] = m10;
                    m[2] = m20;
                    m[4] = m01;
                    m[5] = m11;
                    m[6] = m21;
                    m[8] = m02;
                    m[9] = m12;
                    m[10] = m22;
                    if (do_t_4x4) {
                        m[12] = m[13] = m[14] = 0;
                        m[15] = 1;
                    }
                }
            } else {
                m[0] = m00;
                m[1] = m01;
                m[2] = m02;
                m[4] = m10;
                m[5] = m11;
                m[6] = m12;
                m[8] = m20;
                m[9] = m21;
                m[10] = m22;
                if (do_t_4x4) {
                    m[3] = m[7] = m[11] = 0;
                    m[15] = 1;
                }
            }
            return m;
        };
        RotQuat.from_xyzw = function (x, y, z, w) {
            var q;
            q = new RQ;
            this.setQV_xyzw(q.xyzw, x, y, z, w);
            return q;
        };
        RotQuat.fromQV = function (qv) {
            var q;
            q = new RQ;
            this.setQV(q.xyzw, qv);
            return q;
        };
        RotQuat.fromRQ = function (q) {
            return this.fromQV(q.xyzw);
        };
        RotQuat.fromRot = function (axis, angle) {
            var q;
            q = new RQ;
            q.setFromAxisAngle(axis, angle);
            return q;
        };
        RotQuat.create = function () {
            return this.from_xyzw(0, 0, 0, 1);
        };
        RotQuat.fromRPY = function (roll, pitch, yaw) {
            var q;
            q = new RQ;
            q.setFromAxisRotations(roll, pitch, yaw);
            return q;
        };
        RotQuat.slerp = function (q, qa, qb, T) {
            return this.slerpQV(q.xyzw, qa.xyzw, qb.xyzw, T);
        };
        RotQuat.DEGS_TO_RADS = Math.PI / 180;
        RotQuat.RADS_TO_DEGS = 180 / Math.PI;
        RotQuat.ZERO = RotQuat.from_xyzw(0, 0, 0, 0);
        RotQuat.IDENTITY = new RQ;
        RotQuat.ROT_NEG_PI_BY_2_ON_Z = RotQuat.from_xyzw(0, 0, -Math.SQRT1_2, Math.SQRT1_2);
        RotQuat.prototype.copyXYZW = function () {
            return RQ.copyOfQV(this.xyzw);
        };
        RotQuat.prototype.toQV = function (xyzw) {
            return RQ.setQV(xyzw, this.xyzw);
        };
        RotQuat.prototype.asString = function () {
            var ref, w, x, y, z;
            ref = this.xyzw, x = ref[0], y = ref[1], z = ref[2], w = ref[3];
            return "<" + x + " " + y + " " + z + "; " + w + ">";
        };
        RotQuat.prototype.asString_n = function (n) {
            return RQ.qStr(this.xyzw, n);
        };
        RotQuat.prototype.asString4 = function () {
            return this.asString_n(4);
        };
        RotQuat.prototype.set_xyzw = function (x, y, z, w) {
            RQ.setQV_xyzw(this.xyzw, x, y, z, w);
            return this;
        };
        RotQuat.prototype.setVec = function (qv) {
            RQ.setQV(this.xyzw, qv);
            return this;
        };
        RotQuat.prototype.setFromRQ = function (q) {
            RQ.setQV(this.xyzw, q.xyzw);
            return this;
        };
        RotQuat.prototype.setFromAxisAngle = function (xyz, angle) {
            RQ.setAxisAngleQV(this.xyzw, xyz, angle);
            return this;
        };
        RotQuat.prototype.rotate = function (e3v) {
            RQ.rotateV3(e3v.xyz, e3v.xyz, this.xyzw);
            return e3v;
        };
        RotQuat.prototype.rotate_ = function (e3v) {
            RQ.rotateV3_(e3v.xyz, e3v.xyz, this.xyzw);
            return e3v;
        };
        /*  [UNUSED]
        *   Returns the sum of this quaternion and the given one.
        add: (q) -> RQ.addQV @xyzw, q.xyzw
        #--
        *   Returns the result of subtracting the given quaternion from this one.
        subtract: (q) -> RQ.subtractQV @xyzw, q.xyzw
        #-------
        *   Returns the inner product of this rotation quaternion with the
        *   given one.
        innerProduct: (q) -> innerProductQV @xyzw, q.xyzw
        #-----------
        */
        RotQuat.prototype.postMultiply = function (q) {
            var qp;
            qp = new RQ;
            RQ.setProductQV(qp.xyzw, this.xyzw, q.xyzw);
            return qp;
        };
        RotQuat.prototype.preMultiply = function (q) {
            var qp;
            qp = new RQ;
            RQ.setProductQV(qp.xyzw, q.xyzw, this.xyzw);
            return qp;
        };
        RotQuat.prototype.setNegate = function () {
            RQ.setNegateQV(this.xyzw);
            return this;
        };
        RotQuat.prototype.setInvert = function () {
            RQ.setConjugateQV(this.xyzw);
            return this;
        };
        RotQuat.prototype.setPostMultiply = function (q) {
            RQ.setProductQV(this.xyzw, this.xyzw, q.xyzw);
            return this;
        };
        RotQuat.prototype.setPreMultiply = function (q) {
            RQ.setProductQV(this.xyzw, q.xyzw, this.xyzw);
            return this;
        };
        RotQuat.prototype.setScaleRot = function (T) {
            var RQID;
            RQID = RQ.IDENTITY;
            if (T === 0) {
                this.setFromRQ(RQID);
            } else if (T !== 1) {
                RQ.slerp(this, RQID, this, T);
            } else {}
            return this;
        };
        RotQuat.prototype.setExtractRotX = function () {
            var c, d, s;
            s = this.xyzw[0];
            c = this.xyzw[3];
            d = Math.sqrt(s * s + c * c);
            return this.set_xyzw(s / d, 0, 0, c / d);
        };
        RotQuat.prototype.setScaleXRotationAngle = function (scale) {
            var scA;
            scA = scale * (Math.atan2(this.xyzw[0], this.xyzw[3]));
            this.xyzw[0] = Math.sin(scA);
            return this.xyzw[3] = Math.cos(scA);
        };
        RotQuat.prototype.setInvertX = function () {
            return this.xyzw[0] = -this.xyzw[0];
        };
        RotQuat.prototype.setFromRotMat3x3 = function (m) {
            var DIV_4W, EPS, SQRT_T, T, dorotx, doroty, dorotz, ref, tx, ty, tz;
            EPS = 1e-4;
            ref = [m[0], m[4], m[8]], tx = ref[0], ty = ref[1], tz = ref[2];
            T = tx + ty + tz + 1;
            if (1 <= T + EPS) {
                SQRT_T = Math.sqrt(T);
                DIV_4W = 0.5 / SQRT_T;
                this.set_xyzw((m[5] - m[7]) * DIV_4W, (m[6] - m[2]) * DIV_4W, (m[1] - m[3]) * DIV_4W, 0.5 * SQRT_T);
            } else {
                dorotx = doroty = dorotz = false;
                if (tz <= ty) {
                    if (ty <= tx) {
                        dorotx = true;
                    } else {
                        doroty = true;
                    }
                } else {
                    if (tz <= tx) {
                        dorotx = true;
                    } else {
                        dorotz = true;
                    }
                }
                if (dorotx) {
                    this._setFromMatWithXRot(m);
                } else if (doroty) {
                    this._setFromMatWithYRot(m);
                } else if (dorotz) {
                    this._setFromMatWithZRot(m);
                }
            }
            return this;
        };
        RotQuat.prototype._setFromMatWithXRot = function (m) {
            var DIV_4Wx, SQRT_Tx, Tx, ref, tx, ty, tz;
            ref = [m[0], m[4], m[8]], tx = ref[0], ty = ref[1], tz = ref[2];
            Tx = tx - ty - tz + 1;
            SQRT_Tx = Math.sqrt(Tx);
            DIV_4Wx = 0.5 / SQRT_Tx;
            return this.set_xyzw(0.5 * SQRT_Tx, (m[1] + m[3]) * DIV_4Wx, (m[6] + m[2]) * DIV_4Wx, (m[5] - m[7]) * DIV_4Wx);
        };
        RotQuat.prototype._setFromMatWithYRot = function (m) {
            var DIV_4Wy, SQRT_Ty, Ty, ref, tx, ty, tz;
            ref = [m[0], m[4], m[8]], tx = ref[0], ty = ref[1], tz = ref[2];
            Ty = -tx + ty - tz + 1;
            SQRT_Ty = Math.sqrt(Ty);
            DIV_4Wy = 0.5 / SQRT_Ty;
            return this.set_xyzw((m[1] + m[3]) * DIV_4Wy, 0.5 * SQRT_Ty, (m[5] + m[7]) * DIV_4Wy, (m[6] - m[2]) * DIV_4Wy);
        };
        RotQuat.prototype._setFromMatWithZRot = function (m) {
            var DIV_4Wz, SQRT_Tz, Tz, ref, tx, ty, tz;
            ref = [m[0], m[4], m[8]], tx = ref[0], ty = ref[1], tz = ref[2];
            Tz = -tx - ty + tz + 1;
            SQRT_Tz = Math.sqrt(Tz);
            DIV_4Wz = 0.5 / SQRT_Tz;
            return this.set_xyzw((m[6] + m[2]) * DIV_4Wz, (m[5] + m[7]) * DIV_4Wz, 0.5 * SQRT_Tz, (m[1] - m[3]) * DIV_4Wz);
        };
        RotQuat.prototype.toTRMat4x4 = function (m) {
            return RQ.setTRMat4x4FromQV(m, this.xyzw, true, false, true);
        };
        RotQuat.prototype.toRotMat4x4 = function (m) {
            return RQ.setRotMat4x4FromQV(m, this.xyzw, true, false, false);
        };
        RotQuat.prototype.toRotMat3x3 = function (m) {
            return RQ.setRotMat3x3FromQV(m, this.xyzw, true, true);
        };
        RotQuat.prototype.toRotMatRows3x4 = function (m) {
            return RQ.setRotMatRows3x4FromQV(m, this.xyzw, false, false, false);
        };
        RotQuat.prototype.setFromAxisRotations = function (roll, pitch, yaw) {
            var D2R_BY2, RPY_by2, cp, cr, cy, cycp, cysp, ref, ref1, ref2, rpy, rpyb2, sp, sr, sy, sycp, sysp;
            D2R_BY2 = RQ.DEGS_TO_RADS / 2;
            RPY_by2 = (function () {
                var j, len, ref, results;
                ref = [roll, pitch, yaw];
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    rpy = ref[j];
                    results.push(rpy * D2R_BY2);
                }
                return results;
            })();
            ref = (function () {
                var j, len, results;
                results = [];
                for (j = 0, len = RPY_by2.length; j < len; j++) {
                    rpyb2 = RPY_by2[j];
                    results.push(Math.cos(rpyb2));
                }
                return results;
            })(), cr = ref[0], cp = ref[1], cy = ref[2];
            ref1 = (function () {
                var j, len, results;
                results = [];
                for (j = 0, len = RPY_by2.length; j < len; j++) {
                    rpyb2 = RPY_by2[j];
                    results.push(Math.sin(rpyb2));
                }
                return results;
            })(), sr = ref1[0], sp = ref1[1], sy = ref1[2];
            ref2 = [cy * cp, sy * sp, sy * cp, cy * sp], cycp = ref2[0], sysp = ref2[1], sycp = ref2[2], cysp = ref2[3];
            return this.set_xyzw(cycp * sr - sysp * cr, cysp * cr + sycp * sr, sycp * cr - cysp * sr, cycp * cr + sysp * sr);
        };
        RotQuat.prototype.toAxisRotations = function (rpyVec) {
            var CP_CR, CP_SQ, CP_SR, CY, CY_CP, R2D, SP_NEG, SY_CP, SY_NEG, WW, W_SQ, XX, X_SQ, YY, Y_SQ, ZZ, Z_SQ, i, j, qv, ref, rpy;
            qv = this.xyzw;
            XX = qv[0];
            YY = qv[1];
            ZZ = qv[2];
            WW = qv[3];
            ref = [XX * XX, YY * YY, ZZ * ZZ, WW * WW], X_SQ = ref[0], Y_SQ = ref[1], Z_SQ = ref[2], W_SQ = ref[3];
            CY_CP = W_SQ + X_SQ - Y_SQ - Z_SQ;
            SY_CP = 2 * (XX * YY + WW * ZZ);
            SP_NEG = 2 * (XX * ZZ - WW * YY);
            CP_SQ = CY_CP * CY_CP + SY_CP * SY_CP;
            R2D = RQ.RADS_TO_DEGS;
            rpy = [0, R2D * (Math.asin(-SP_NEG)), 0];
            for (i = j = 0; j < 3; i = ++j) {
                rpyVec[i] = rpy[i];
            }
            if ((-1e-10 <= CP_SQ && CP_SQ <= 1e-10)) {
                SY_NEG = 2 * (XX * YY - WW * ZZ);
                CY = W_SQ - X_SQ + Y_SQ - Z_SQ;
                return rpyVec[2] = R2D * Math.atan2(-SY_NEG, CY);
            } else {
                CP_CR = W_SQ - X_SQ - Y_SQ + Z_SQ;
                CP_SR = 2 * (YY * ZZ + WW * XX);
                rpyVec[0] = R2D * Math.atan2(CP_SR, CP_CR);
                return rpyVec[2] = R2D * Math.atan2(SY_CP, CY_CP);
            }
        };
        return RotQuat;
    })();
    cwaenv.add(RotQuat, "RotQuat");
    cwaenv.fixRef("E3Vec", "RotQuat");
}).call(this);
//-------- js/Mat4.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var Mat4, RQ, V3, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    V3 = cwaenv.get("E3Vec");
    RQ = cwaenv.get("RotQuat");
    Mat4 = (function () {
        function Mat4() {
            throw "Mat4: cannot be instantiated.";
        }
        Mat4._nchk = 0;
        Mat4.makeMat4 = function () {
            return new Float32Array(16);
        };
        Mat4.makeIdMat4 = function () {
            var m;
            m = new Float32Array(16);
            m[0] = m[5] = m[10] = m[15] = 1;
            return m;
        };
        Mat4.setTrans = function (m, xyz) {
            m[0] = m[5] = m[10] = m[15] = 1;
            m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = 0;
            m[12] = xyz[0], m[13] = xyz[1], m[14] = xyz[2];
            return m;
        };
        Mat4.setTRComposeT = function (m, mtr, tx, ty, tz) {
            var r00, r01, r02, r10, r11, r12, r20, r21, r22;
            m[0] = r00 = mtr[0];
            m[1] = r10 = mtr[1];
            m[2] = r20 = mtr[2];
            m[4] = r01 = mtr[4];
            m[5] = r11 = mtr[5];
            m[6] = r21 = mtr[6];
            m[8] = r02 = mtr[8];
            m[9] = r12 = mtr[9];
            m[10] = r22 = mtr[10];
            m[12] = mtr[12] + r00 * tx + r01 * ty + r02 * tz;
            m[13] = mtr[13] + r10 * tx + r11 * ty + r12 * tz;
            m[14] = mtr[14] + r20 * tx + r21 * ty + r22 * tz;
            m[3] = m[7] = m[11] = 0;
            m[15] = 1;
            return m;
        };
        Mat4.setProduct = function (m, ma, mb) {
            var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33;
            a00 = ma[0];
            a10 = ma[1];
            a20 = ma[2];
            a30 = ma[3];
            a01 = ma[4];
            a11 = ma[5];
            a21 = ma[6];
            a31 = ma[7];
            a02 = ma[8];
            a12 = ma[9];
            a22 = ma[10];
            a32 = ma[11];
            a03 = ma[12];
            a13 = ma[13];
            a23 = ma[14];
            a33 = ma[15];
            b00 = mb[0];
            b10 = mb[1];
            b20 = mb[2];
            b30 = mb[3];
            b01 = mb[4];
            b11 = mb[5];
            b21 = mb[6];
            b31 = mb[7];
            b02 = mb[8];
            b12 = mb[9];
            b22 = mb[10];
            b32 = mb[11];
            b03 = mb[12];
            b13 = mb[13];
            b23 = mb[14];
            b33 = mb[15];
            m[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            m[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            m[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            m[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            m[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            m[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            m[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            m[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            m[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            m[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            m[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            m[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            m[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
            m[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
            m[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
            m[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
            return m;
        };
        Mat4.setFrustum = function (m, xlo, xhi, ylo, yhi, near, far) {
            var xlen, ylen, zlen;
            xlen = xhi - xlo;
            ylen = yhi - ylo;
            zlen = far - near;
            m[0] = 2 * near / xlen;
            m[1] = m[2] = m[3] = 0;
            m[5] = 2 * near / ylen;
            m[4] = m[6] = m[7] = 0;
            m[8] = (xhi + xlo) / xlen;
            m[9] = (yhi + ylo) / ylen;
            m[10] = -(far + near) / zlen;
            m[11] = -1;
            m[14] = -2 * far * near / zlen;
            m[12] = m[13] = m[15] = 0;
            return m;
        };
        Mat4.setPerspective = function (m, fovy, aspect, near, far) {
            var xhi, yhi;
            yhi = near * (Math.tan(0.5 * fovy * RQ.DEGS_TO_RADS));
            xhi = aspect * yhi;
            return this.setFrustum(m, -xhi, xhi, -yhi, yhi, near, far);
        };
        Mat4.setLookAt = function (m, eye, cor, upu) {
            var ce, laxu, layu, lazu;
            ce = V3.subtractV3(eye, cor);
            lazu = V3.normalizeV3(ce);
            laxu = V3.unitCrossProductV3(upu, lazu);
            layu = V3.crossProductV3(lazu, laxu);
            m[0] = laxu[0], m[4] = laxu[1], m[8] = laxu[2];
            m[12] = -(V3.dotProductV3(laxu, eye));
            m[1] = layu[0], m[5] = layu[1], m[9] = layu[2];
            m[13] = -(V3.dotProductV3(layu, eye));
            m[2] = lazu[0], m[6] = lazu[1], m[10] = lazu[2];
            m[14] = -(V3.dotProductV3(lazu, eye));
            m[3] = m[7] = m[11] = 0;
            m[15] = 1;
            return m;
        };
        return Mat4;
    })();
    cwaenv.add(Mat4, "Mat4");
}).call(this);