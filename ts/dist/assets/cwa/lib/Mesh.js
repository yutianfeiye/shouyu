//-------- js/Mesh.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var Config, Data, FourCC, M4, Mesh, MorphsManager, RQ, Shader, Texture, V3, VBO, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    Config = cwaenv.get("Config");
    Data = cwaenv.get("Data");
    Shader = cwaenv.get("Shader");
    Texture = cwaenv.get("Texture");
    VBO = cwaenv.get("VBO");
    FourCC = cwaenv.get("FourCC");
    V3 = cwaenv.get("E3Vec");
    RQ = cwaenv.get("RotQuat");
    M4 = cwaenv.get("Mat4");
    MorphsManager = cwaenv.get("MorphsManager");
    Mesh = (function () {
        Mesh._shaderPath = {};
        Mesh._shaderSource = {};
        Mesh._shaderSourceLoaded = function () {
            var ref, ref1;
            return ((ref = this._shaderSource) != null ? ref.vert : void 0) && ((ref1 = this._shaderSource) != null ? ref1.frag : void 0);
        };
        Mesh._fetchShaders = function (callback) {
            var cb, fsloaded, fsloc, ref, ref1, sroot, vsloaded, vsloc;
            sroot = "qskin";
            this._shaderPath.vert = "shaders/" + sroot + ".vert";
            this._shaderPath.frag = "shaders/" + sroot + ".frag";
            cb = (function (_this) {
                return function () {
                    if (_this._shaderSourceLoaded()) {
                        return callback();
                    }
                };
            })(this);
            if (this._shaderSourceLoaded()) {
                return cb();
            } else {
                if (!((ref = this._shaderSource) != null ? ref.vert : void 0)) {
                    vsloaded = (function (_this) {
                        return function (vstxt) {
                            _this._shaderSource.vert = vstxt;
                            return cb();
                        };
                    })(this);
                    vsloc = Data.absoluteURI(this._shaderPath.vert, Config.theConfig.cwaBase);
                    Data.fetchText(vsloc, vsloaded);
                }
                if (!((ref1 = this._shaderSource) != null ? ref1.frag : void 0)) {
                    fsloaded = (function (_this) {
                        return function (fstxt) {
                            _this._shaderSource.frag = fstxt;
                            return cb();
                        };
                    })(this);
                    fsloc = Data.absoluteURI(this._shaderPath.frag, Config.theConfig.cwaBase);
                    return Data.fetchText(fsloc, fsloaded);
                }
            }
        };

        function Mesh(gl, usebonetrx, cputrx2mat) {
            var floatext;
            this.gl = gl;
            this.modelMat = M4.makeMat4();
            this.modelViewMat = M4.makeMat4();
            this.modelViewProjMat = M4.makeMat4();
            this.skinningShader = null;
            this.vertices = null;
            this.vertexDuplicateIndices = null;
            this.texture = null;
            this.texCoords = null;
            this.boneIxs = null;
            this.boneWeights = null;
            this.triStripIndices = null;
            this.bindPos = null;
            this.bindNorm = null;
            this.vbos = [];
            this.morphsManager = null;
            this.uniformMVMat = null;
            this.uniformMVPMat = null;
            this.uniformBones = null;
            this.uniformMorphWeights = null;
            this.uniformTexture = null;
            this.DO_TRX_BONE_UNIFORMS = usebonetrx;
            this.TEST_CPU_TRX_TO_MAT = cputrx2mat;
            this.boneTexture = null;
            this.twistTexture = null;
            this.uniformSkelXforms = null;
            this.uniformSkelXformsWidth = null;
            this.uniformSkelXformsHeight = null;
            this.boneTwists = null;
            this.uniformBoneTwistData = null;
            this.uniformBoneTwistWidth = null;
            this.uniformBoneTwistHeight = null;
            this.isReady = false;
            floatext = this.gl.getExtension('OES_texture_float');
            this.DO_ARM_TWISTS = true;
            this._SUPPRESS_A_T = false;
            this.USE_TEXTURES = floatext != null;
        }
        Mesh.MORPH_TAGS = ["A", "B", "C", "D"];
        Mesh.prototype.setFromJSON = function (jsnmesh) {
            this.loadVertices(jsnmesh.meshPoints);
            this.loadTriangleStripIndices(jsnmesh.triangleStripIndices);
            this.loadVertexDuplicateData(jsnmesh.duplicateVertexIndices);
            this.loadTextureCoords(jsnmesh.textureCoordinatePairs);
            this.morphsManager = MorphsManager.fromJSON(jsnmesh.morphTargets, Mesh.MORPH_TAGS);
            return this.createCPUVertexBuffers();
        };
        Mesh.prototype.setFromBin = function (avdv) {
            this.lodRange = avdv.nextFloat();
            this.loadVerticesBin(avdv);
            this.loadTriangleStripIndicesBin(avdv);
            this.loadVertexDuplicateDataBin(avdv);
            this.loadTextureCoordsBin(avdv);
            this.morphsManager = MorphsManager.fromBin(avdv, Mesh.MORPH_TAGS);
            return this.createCPUVertexBuffers();
        };
        Mesh.prototype.loadVertices = function (jsnmpts) {
            this.vertices = jsnmpts.map(MeshVertex.fromJSON);
            return this.nVertsNoDups = this.vertices.length;
        };
        Mesh.prototype.loadVerticesBin = function (avdv) {
            var nMV, v;
            nMV = avdv.nextUint();
            this.vertices = (function () {
                var l, ref, results;
                results = [];
                for (v = l = 0, ref = nMV; 0 <= ref ? l < ref : l > ref; v = 0 <= ref ? ++l : --l) {
                    results.push(MeshVertex.fromBin(avdv, v));
                }
                return results;
            })();
            return this.nVertsNoDups = this.vertices.length;
        };
        Mesh.prototype.loadTriangleStripIndices = function (jsntsis) {
            return this.triStripIndices = new Uint16Array(jsntsis);
        };
        Mesh.prototype.loadTriangleStripIndicesBin = function (avdv) {
            var l, nTSI, ref, t, tsi;
            nTSI = avdv.nextUint();
            tsi = new Uint16Array(nTSI);
            for (t = l = 0, ref = nTSI; 0 <= ref ? l < ref : l > ref; t = 0 <= ref ? ++l : --l) {
                tsi[t] = avdv.nextUshort();
            }
            return this.triStripIndices = tsi;
        };
        Mesh.prototype.appendDuplicatedVertices = function () {
            var l, len, ref, results, vdi;
            ref = this.vertexDuplicateIndices;
            results = [];
            for (l = 0, len = ref.length; l < len; l++) {
                vdi = ref[l];
                results.push(this.vertices.push(this.vertices[vdi]));
            }
            return results;
        };
        Mesh.prototype.loadVertexDuplicateData = function (jsndvis) {
            this.vertexDuplicateIndices = jsndvis;
            return this.appendDuplicatedVertices();
        };
        Mesh.prototype.loadVertexDuplicateDataBin = function (avdv) {
            var j, nDupVertices;
            nDupVertices = avdv.nextUint();
            this.vertexDuplicateIndices = (function () {
                var l, ref, results;
                results = [];
                for (j = l = 0, ref = nDupVertices; 0 <= ref ? l < ref : l > ref; j = 0 <= ref ? ++l : --l) {
                    results.push(avdv.nextUint());
                }
                return results;
            })();
            return this.appendDuplicatedVertices();
        };
        Mesh.prototype.loadTextureCoords = function (jsntcpairs) {
            var i, tca;
            tca = new Float32Array(2 * jsntcpairs.length);
            i = 0;
            jsntcpairs.forEach((function (cc) {
                this[i] = cc[0];
                this[i + 1] = cc[1];
                return i += 2;
            }), tca);
            return this.texCoords = tca;
        };
        Mesh.prototype.loadTextureCoordsBin = function (avdv) {
            var c, cc, i, l, nTC2, ref, tca;
            nTC2 = avdv.nextUint();
            tca = new Float32Array(2 * nTC2);
            i = 0;
            for (c = l = 0, ref = nTC2; 0 <= ref ? l < ref : l > ref; c = 0 <= ref ? ++l : --l) {
                cc = avdv.nextVec2();
                tca[i] = cc[0];
                tca[i + 1] = cc[1];
                i += 2;
            }
            return this.texCoords = tca;
        };
        Mesh.prototype.createCPUVertexBuffers = function () {
            var nV, nV3, nV4;
            nV = this.vertices.length;
            nV3 = nV * 3;
            nV4 = nV * 4;
            this.bindPos = new Float32Array(nV3);
            this.bindNorm = new Float32Array(nV3);
            this.boneIxs = new Float32Array(nV4);
            this.boneWeights = new Float32Array(nV4);
            if (this.DO_ARM_TWISTS) {
                this.boneTwists = new Float32Array(nV4);
            }
            return this.morphsManager.createCPUVertexBuffers(nV);
        };
        Mesh.prototype.createShaders = function (callback, nbones) {
            var allLoaded, useQSkin, vssubs;
            useQSkin = this.DO_TRX_BONE_UNIFORMS && !this.TEST_CPU_TRX_TO_MAT;
            if (!useQSkin) {
                log("Only \"qskin\" shaders supported");
            }
            vssubs = [
                ["N_BONES", "" + nbones],
                ["DO_TWIST", this.DO_ARM_TWISTS ? "1" : "0"],
                ["USE_TXTR", this.USE_TEXTURES ? "1" : "0"]
            ];
            allLoaded = (function (_this) {
                return function () {
                    _this.skinningShader = new Shader(_this.gl, Mesh._shaderPath.vert, Mesh._shaderPath.frag, Mesh._shaderSource.vert, Mesh._shaderSource.frag, vssubs);
                    return callback();
                };
            })(this);
            return Mesh._fetchShaders(allLoaded);
        };
        Mesh.prototype.createTextureFromJSON = function (tURL) {
            log("Texture directly from URL " + tURL);
            return this.texture = new Texture(this.gl, (function (tURLHandler) {
                return tURLHandler(tURL);
            }), false);
        };
        Mesh.prototype.createTextureFromAvDV = function (avdv, tName, mustFlip) {
            log("Asynchronous texture PNG URI via AvDef entry for " + tName);
            return this.texture = new Texture(this.gl, avdv.pngURIGen(tName), mustFlip);
        };
        Mesh.prototype.bindTextureForGL = function (tName) {
            return this.texture.bind();
        };
        Mesh.prototype.releaseMesh = function (tName) {
            this.isReady = false;
            return this.texture.release();
        };
        Mesh.prototype.prepareSkeleton = function (skel) {
            this.makeVertexArraysForBones(skel);
            this.makeVertexArraysForMorphs(skel);
            return this.generateBindPose(skel);
        };
        Mesh.prototype.prepareForGL = function (skel) {
            var finishShaders;
            if (this.USE_TEXTURES) {
                this.boneTexture = this.gl.createTexture();
                this.twistTexture = this.gl.createTexture();
            }
            finishShaders = (function (_this) {
                return function () {
                    if (_this.skinningShader.isValid()) {
                        _this.createGLVBOs(skel);
                        return _this.cacheGLUniformLocations();
                    }
                };
            })(this);
            return this.createShaders(finishShaders, skel.getBonesCount());
        };
        Mesh.prototype.makeVertexArraysForBones = function (skel) {
            var b, bb, bone, k, l, len, m, nV4, o, ref, ref1, ref2, results, scale, stw, v, v4, vertex, wtw;
            nV4 = this.vertices.length * 4;
            for (k = l = 0, ref = nV4; 0 <= ref ? l < ref : l > ref; k = 0 <= ref ? ++l : --l) {
                this.boneIxs[k] = 0;
                this.boneWeights[k] = 0;
            }
            if (this.DO_ARM_TWISTS) {
                for (k = m = 0, ref1 = nV4; 0 <= ref1 ? m < ref1 : m > ref1; k = 0 <= ref1 ? ++m : --m) {
                    this.boneTwists[k] = -1;
                }
            }
            ref2 = this.vertices;
            results = [];
            for (v = o = 0, len = ref2.length; o < len; v = ++o) {
                vertex = ref2[v];
                v4 = v * 4;
                results.push((function () {
                    var p, ref3, results1;
                    results1 = [];
                    for (b = p = 0, ref3 = vertex.getNumBones(); 0 <= ref3 ? p < ref3 : p > ref3; b = 0 <= ref3 ? ++p : --p) {
                        bb = skel.getBoneIndex(vertex.getBone4cc(b));
                        this.boneIxs[v4 + b] = bb;
                        this.boneWeights[v4 + b] = vertex.getWeight(b);
                        if (this.DO_ARM_TWISTS && !this._SUPPRESS_A_T) {
                            scale = -1;
                            bone = skel.getBone(bb);
                            stw = bone.doesShoulderTwist();
                            wtw = bone.doesWristTwist();
                            if (stw || wtw) {
                                scale = (vertex.getBoneEndDistance(b)) / (bone.getLength());
                                if (scale < 0) {
                                    scale = 0;
                                }
                                if (1 < scale) {
                                    scale = 1;
                                }
                                if (stw) {
                                    scale = 1 - scale;
                                }
                            }
                            results1.push(this.boneTwists[v4 + b] = scale);
                        } else {
                            results1.push(void 0);
                        }
                    }
                    return results1;
                }).call(this));
            }
            return results;
        };
        Mesh.prototype.makeVertexArraysForMorphs = function (skel) {
            var globalHeadRot, headBone;
            headBone = skel.getBoneBy4CC(FourCC.fourCCInt("HEAD"));
            globalHeadRot = RQ.fromRQ((headBone.getGlobalTRX()).rot());
            globalHeadRot.setPostMultiply(RQ.ROT_NEG_PI_BY_2_ON_Z);
            return this.morphsManager.makeVertexArrays(this.vertexDuplicateIndices, globalHeadRot);
        };
        Mesh.prototype.generateBindPose = function (skeleton) {
            var b, bone, bpTRX, i, l, len, m, norm3V, normXYZ, o, offset3V, offsetXYZ, ref, ref1, v, v3, v4, vertex, weight;
            offset3V = V3.create();
            offsetXYZ = offset3V.xyz;
            norm3V = V3.create();
            normXYZ = norm3V.xyz;
            ref = this.vertices;
            for (v = l = 0, len = ref.length; l < len; v = ++l) {
                vertex = ref[v];
                v3 = v * 3;
                v4 = v * 4;
                for (b = m = 0, ref1 = vertex.getNumBones(); 0 <= ref1 ? m < ref1 : m > ref1; b = 0 <= ref1 ? ++m : --m) {
                    bone = skeleton.getBone(this.boneIxs[v4 + b]);
                    weight = this.boneWeights[v4 + b];
                    bpTRX = bone.getBindPoseTRX();
                    offset3V.setFromE3V(vertex.getOffset(b));
                    norm3V.setFromE3V(vertex.getBaseNormal(b));
                    bpTRX.transform(offset3V);
                    (bpTRX.rot()).rotate(norm3V);
                    for (i = o = 0; o < 3; i = ++o) {
                        this.bindPos[v3 + i] += offsetXYZ[i] * weight;
                        this.bindNorm[v3 + i] += normXYZ[i] * weight;
                    }
                }
            }
            return void 0;
        };
        Mesh.prototype.createGLVBOs = function (skeleton) {
            var GL, setVBO_std, ssal;
            GL = this.gl;
            ssal = (function (_this) {
                return function (id) {
                    return _this.skinningShader.getAttributeLocation(id);
                };
            })(this);
            setVBO_std = (function (_this) {
                return function (id, n, buf) {
                    _this.vbos[id] = VBO.makeStd(GL, n, buf, ssal(id));
                    return void 0;
                };
            })(this);
            setVBO_std("BindPos", 3, this.bindPos);
            setVBO_std("BindNorm", 3, this.bindNorm);
            setVBO_std("BoneIxs", 4, this.boneIxs);
            setVBO_std("BoneWeights", 4, this.boneWeights);
            if (this.DO_ARM_TWISTS) {
                setVBO_std("BoneTwists", 4, this.boneTwists);
            }
            setVBO_std("VSTexCoord0", 2, this.texCoords);
            this.morphsManager.createGLVBOs(GL, ssal);
            this.vbos["TriStripIndices"] = VBO.makeEls(GL, 1, this.triStripIndices, GL.TRIANGLE_STRIP, false);
            return void 0;
        };
        Mesh.prototype.cacheGLUniformLocations = function () {
            var ssuLoc, ssuaLoc;
            ssuLoc = (function (_this) {
                return function (unm) {
                    return _this.skinningShader.getUniformLocation(unm);
                };
            })(this);
            ssuaLoc = function (uanm) {
                return ssuLoc(uanm + "[0]");
            };
            this.uniformMVMat = ssuLoc("ModelViewMat");
            this.uniformMVPMat = ssuLoc("ModelViewProjMat");
            if (this.DO_TRX_BONE_UNIFORMS) {
                if (!this.TEST_CPU_TRX_TO_MAT) {
                    if (this.USE_TEXTURES) {
                        this.uniformSkelXformsWidth = ssuLoc("SkelXformsWidth");
                        this.uniformSkelXformsHeight = ssuLoc("SkelXformsHeight");
                        this.uniformSkelXforms = ssuLoc("SkelXforms");
                        if (this.DO_ARM_TWISTS) {
                            this.uniformBoneTwistWidth = ssuLoc("BoneTwistWidth");
                            this.uniformBoneTwistHeight = ssuLoc("BoneTwistHeight");
                            this.uniformBoneTwistData = ssuLoc("BoneTwistData");
                        }
                    } else {
                        this.uniformSkelXforms = ssuaLoc("SkelXforms");
                        if (this.DO_ARM_TWISTS) {
                            this.uniformBoneTwistData = ssuaLoc("BoneTwistData");
                        }
                    }
                } else {
                    this.uniformBones = ssuaLoc("Bones");
                }
            } else {
                this.uniformBones = ssuaLoc("Bones");
            }
            this.uniformMorphWeights = ssuLoc("MorphWeights");
            return this.uniformTexture = ssuLoc("Texture");
        };
        Mesh.prototype.checkReady = function () {
            var ref, ref1;
            return (this.skinningShader != null) && ((ref = this.skinningShader) != null ? ref.isValid() : void 0) && ((ref1 = this.texture) != null ? ref1.isValid() : void 0);
        };
        Mesh.prototype.draw = function (skeleton, currentMorphs, x, y, z, viewMat, projMat) {
            if (this.isReady || (this.isReady = this.checkReady())) {
                return this.doDraw(skeleton, currentMorphs, x, y, z, viewMat, projMat);
            }
        };
        Mesh.prototype.doDraw = function (skeleton, currentMorphs, x, y, z, viewMat, projMat) {
            var GL, GL_A_BUF, GL_EL_A_BUF, avbo, avbos, avids, id, l, len, len1, m, mWeights, skelXforms, texHeight, texWidth, twistData;
            this.morphsManager.setGLDataForDraw(currentMorphs);
            M4.setTRComposeT(this.modelViewMat, viewMat, x, y, z);
            M4.setProduct(this.modelViewProjMat, projMat, this.modelViewMat);
            GL = this.gl;
            GL_A_BUF = GL.ARRAY_BUFFER;
            GL_EL_A_BUF = GL.ELEMENT_ARRAY_BUFFER;
            GL.useProgram(this.skinningShader.getHandle());
            GL.uniformMatrix4fv(this.uniformMVMat, false, this.modelViewMat);
            GL.uniformMatrix4fv(this.uniformMVPMat, false, this.modelViewProjMat);
            if (this.DO_TRX_BONE_UNIFORMS) {
                if (!this.TEST_CPU_TRX_TO_MAT) {
                    skelXforms = skeleton.getSkelXformsData();
                    twistData = skeleton.getBoneTwistData();
                    if (this.USE_TEXTURES) {
                        texWidth = skeleton.getSkelTexWidth();
                        texHeight = skeleton.getSkelTexHeight();
                        GL.activeTexture(GL.TEXTURE1);
                        GL.bindTexture(GL.TEXTURE_2D, this.boneTexture);
                        GL.uniform1i(this.uniformSkelXforms, 1);
                        GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, false);
                        GL.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                        GL.pixelStorei(GL.UNPACK_ALIGNMENT, 4);
                        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
                        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
                        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
                        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
                        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, texWidth, texHeight, 0, GL.RGBA, GL.FLOAT, skelXforms);
                        GL.uniform1i(this.uniformSkelXformsWidth, texWidth);
                        GL.uniform1i(this.uniformSkelXformsHeight, texHeight);
                        if (this.DO_ARM_TWISTS) {
                            texWidth = skeleton.getTwistTexWidth();
                            texHeight = skeleton.getTwistTexHeight();
                            GL.activeTexture(GL.TEXTURE2);
                            GL.bindTexture(GL.TEXTURE_2D, this.twistTexture);
                            GL.uniform1i(this.uniformBoneTwistData, 2);
                            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, false);
                            GL.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                            GL.pixelStorei(GL.UNPACK_ALIGNMENT, 4);
                            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
                            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
                            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
                            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
                            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, texWidth, texHeight, 0, GL.RGBA, GL.FLOAT, twistData);
                            GL.uniform1i(this.uniformBoneTwistWidth, texWidth);
                            GL.uniform1i(this.uniformBoneTwistHeight, texHeight);
                        }
                    } else {
                        GL.uniformMatrix4fv(this.uniformSkelXforms, false, skelXforms);
                        if (this.DO_ARM_TWISTS) {
                            GL.uniform4fv(this.uniformBoneTwistData, twistData);
                        }
                    }
                } else {
                    GL.uniform4fv(this.uniformBones, skeleton.getVSSkinMatRows());
                }
            } else {
                GL.uniform4fv(this.uniformBones, skeleton.getSkinMatRows());
            }
            mWeights = this.morphsManager.getMorphWeights();
            GL.uniform4fv(this.uniformMorphWeights, mWeights);
            GL.activeTexture(GL.TEXTURE0);
            GL.bindTexture(GL.TEXTURE_2D, this.texture.getHandle());
            GL.uniform1i(this.uniformTexture, 0);
            avids = ["BindPos", "BindNorm", "BoneIxs", "BoneWeights"];
            if (this.DO_ARM_TWISTS) {
                avids.push("BoneTwists");
            }
            avids.push("VSTexCoord0");
            avbos = (function () {
                var l, len, results;
                results = [];
                for (l = 0, len = avids.length; l < len; l++) {
                    id = avids[l];
                    results.push(this.vbos[id]);
                }
                return results;
            }).call(this);
            for (l = 0, len = avbos.length; l < len; l++) {
                avbo = avbos[l];
                avbo.enableAttrib();
            }
            this.morphsManager.enableMorphVBOs();
            this.vbos["TriStripIndices"].drawElements();
            this.morphsManager.disableMorphVBOs();
            for (m = 0, len1 = avbos.length; m < len1; m++) {
                avbo = avbos[m];
                avbo.disableAttrib();
            }
            GL.useProgram(null);
            return void 0;
        };
        Mesh.prototype.checkMesh = function (tag, skel) {
            var b, b4cc, bb, l, len, max4cc, nb, nondup, ref, results, sb, v, vertex, vl;
            max4cc = Math.pow(2, 32) - 1;
            sb = skel != null ? skel.getBonesCount() : void 0;
            vl = this.vertices.length;
            nondup = vl - this.vertexDuplicateIndices.length;
            log("* " + tag + " Check Mesh: vertices=" + vl + " of which duplicates=" + this.vertexDuplicateIndices.length);
            ref = this.vertices;
            results = [];
            for (v = l = 0, len = ref.length; l < len; v = ++l) {
                vertex = ref[v];
                if (v < nondup && v !== vertex.getIndex()) {
                    log("* Mesh: Mismatch pos=" + v + " index=" + (vertex.getIndex()));
                }
                nb = vertex.getNumBones();
                if (nb == null) {
                    results.push(log("* Mesh: undefined getNumBones for v=" + v));
                } else if (nb < 0 || nb > 4) {
                    results.push(log("* Mesh: bad ib count (" + nb + ") for v=" + v + "/" + vl));
                } else {
                    results.push((function () {
                        var m, ref1, results1;
                        results1 = [];
                        for (b = m = 0, ref1 = nb; 0 <= ref1 ? m < ref1 : m > ref1; b = 0 <= ref1 ? ++m : --m) {
                            b4cc = vertex.getBone4cc(b);
                            if (b4cc == null) {
                                results1.push(log("* Mesh: undefined getBone4cc for v=" + v + " ib=" + b + "/" + nb));
                            } else if (b4cc < 0 || b4cc > max4cc) {
                                results1.push(log("* Mesh: invalid getBone4cc for v=" + v + " ib=" + b + "/" + nb + " b4cc=" + b4cc + "(\"" + (FourCC.fourCCStr(b4cc)) + "\")"));
                            } else if (skel != null) {
                                bb = skel.getBoneBy4CC(b4cc);
                                if (bb == null) {
                                    results1.push(log("* Mesh: missing bone for v=" + v + "/" + vl + " ib=" + b + "/" + nb + " b4cc=" + b4cc + "(\"" + (FourCC.fourCCStr(b4cc)) + "\")"));
                                } else if (bb < 0 || bb >= sb) {
                                    results1.push(log("* Mesh: bad bone number for v=" + v + "/" + vl + " ib=" + b + "/" + nb + " b4cc=" + b4cc + "(\"" + (FourCC.fourCCStr(b4cc)) + "\") bb=" + bb + "/" + sb));
                                } else {
                                    results1.push(void 0);
                                }
                            } else {
                                results1.push(void 0);
                            }
                        }
                        return results1;
                    })());
                }
            }
            return results;
        };
        return Mesh;
    })();
    cwaenv.add(Mesh, "Mesh");
}).call(this);