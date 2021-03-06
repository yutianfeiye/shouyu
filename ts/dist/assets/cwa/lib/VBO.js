//-------- js/VBO.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var VBO, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    VBO = (function () {
        function VBO(GL, elSize1, data, mode1, attrLoc, itemType, glTarget, usage1) {
            this.GL = GL;
            this.elSize = elSize1;
            this.mode = mode1;
            this.attrLoc = attrLoc;
            this.itemType = itemType;
            this.glTarget = glTarget;
            this.usage = usage1;
            this._buffer = this.GL.createBuffer();
            this._nVertices = data.length / this.elSize;
            this.GL.bindBuffer(this.glTarget, this._buffer);
            this.GL.bufferData(this.glTarget, data, this.usage);
            this.GL.bindBuffer(this.glTarget, null);
        }
        VBO._make = function (gl, elSize, buf, mode, aLoc, iType, isEl, isDyn) {
            var target, usage;
            target = isEl ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
            usage = isDyn ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
            return new VBO(gl, elSize, buf, mode, aLoc, iType, target, usage);
        };
        VBO.makeStd = function (gl, elSize, buf, aLoc) {
            return this._make(gl, elSize, buf, null, aLoc, gl.FLOAT, false, false);
        };
        VBO.makeDyn = function (gl, elSize, buf, aLoc) {
            return this._make(gl, elSize, buf, null, aLoc, gl.FLOAT, false, true);
        };
        VBO.makeEls = function (gl, elSize, buf, mode, isByte) {
            var iType;
            iType = isByte ? gl.UNSIGNED_BYTE : gl.UNSIGNED_SHORT;
            return this._make(gl, elSize, buf, mode, null, iType, true, false);
        };
        VBO.prototype._valueSize = function () {
            var gl, type;
            gl = this.GL;
            type = this.itemType;
            if (type === gl.FLOAT) {
                return 4;
            } else if (type === gl.UNSIGNED_BYTE) {
                return 1;
            } else if (type === gl.UNSIGNED_SHORT) {
                return 2;
            } else {
                return -1;
            }
        };
        VBO.prototype.getHandle = function () {
            return this._buffer;
        };
        VBO.prototype.getElementSize = function () {
            return this.elSize;
        };
        VBO.prototype.getNumVertices = function () {
            return this._nVertices;
        };
        VBO.prototype.uploadPartialData = function (baseEl, data) {
            var byteOffset;
            byteOffset = baseEl * this.elSize * (this._valueSize());
            this.GL.bindBuffer(this.glTarget, this._buffer);
            this.GL.bufferSubData(this.glTarget, byteOffset, data);
            return this.GL.bindBuffer(this.glTarget, null);
        };
        VBO.prototype.uploadNewData = function (data) {
            return this.uploadPartialData(0, data);
        };
        VBO.prototype.enableAttrib = function () {
            this.GL.enableVertexAttribArray(this.attrLoc);
            this.GL.bindBuffer(this.glTarget, this._buffer);
            this.GL.vertexAttribPointer(this.attrLoc, this.elSize, this.itemType, false, 0, 0);
            return this.GL.bindBuffer(this.glTarget, null);
        };
        VBO.prototype.disableAttrib = function () {
            return this.GL.disableVertexAttribArray(this.attrLoc);
        };
        VBO.prototype.drawElements = function () {
            this.GL.bindBuffer(this.glTarget, this._buffer);
            this.GL.drawElements(this.mode, this._nVertices, this.itemType, 0);
            return this.GL.bindBuffer(this.glTarget, null);
        };
        return VBO;
    })();
    cwaenv.add(VBO, "VBO");
}).call(this);