//-------- js/MeshVertex.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var FourCC, MeshVertex, V3, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    FourCC = cwaenv.get("FourCC");
    V3 = cwaenv.get("E3Vec");
    MeshVertex = (function () {
        function MeshVertex() {
            this.index = -1;
            this.countBones = 0;
            this.bone4cc = null;
            this.weight = null;
            this.offsetVector = null;
            this.baseNormal = null;
            this.distance = null;
        }
        MeshVertex.fromJSON = function (jsnmvtx, ix) {
            var mvtx;
            mvtx = new MeshVertex;
            mvtx.setFromJSON(jsnmvtx, ix);
            return mvtx;
        };
        MeshVertex.fromBin = function (avdv, ix) {
            var mvtx;
            mvtx = new MeshVertex;
            mvtx.setFromBin(avdv, ix);
            return mvtx;
        };
        MeshVertex.prototype.setFromJSON = function (jsnmvtx, ix) {
            var CVT_4CC, MAKE_V3F;
            CVT_4CC = FourCC.fourCCInt;
            MAKE_V3F = V3.fromVec.bind(V3);
            this.index = ix;
            this.countBones = jsnmvtx.countInfluences;
            this.offsetVector = jsnmvtx.offsets.map(MAKE_V3F);
            this.baseNormal = jsnmvtx.baseNormals.map(MAKE_V3F);
            this.bone4cc = jsnmvtx.influenceNames.map(CVT_4CC);
            this.weight = jsnmvtx.weights.slice();
            return this.distance = jsnmvtx.xDistances.slice();
        };
        MeshVertex.prototype.setFromBin = function (avdv, ix) {
            var b, i, ibRange, j, ref, ref1, results;
            this.index = ix;
            this.countBones = avdv.nextUint();
            ibRange = (function () {
                results = [];
                for (var i = 0, ref = this.countBones; 0 <= ref ? i < ref : i > ref; 0 <= ref ? i++ : i--) {
                    results.push(i);
                }
                return results;
            }).apply(this);
            this.offsetVector = (function () {
                var j, len, results1;
                results1 = [];
                for (j = 0, len = ibRange.length; j < len; j++) {
                    b = ibRange[j];
                    results1.push(V3.fromVec(avdv.nextVec3()));
                }
                return results1;
            })();
            this.baseNormal = (function () {
                var j, len, results1;
                results1 = [];
                for (j = 0, len = ibRange.length; j < len; j++) {
                    b = ibRange[j];
                    results1.push(V3.fromVec(avdv.nextVec3()));
                }
                return results1;
            })();
            this.bone4cc = new Array(this.countBones);
            for (b = j = 0, ref1 = this.countBones; 0 <= ref1 ? j < ref1 : j > ref1; b = 0 <= ref1 ? ++j : --j) {
                this.bone4cc[b] = avdv.nextStr4cc();
            }
            this.weight = (function () {
                var k, len, results1;
                results1 = [];
                for (k = 0, len = ibRange.length; k < len; k++) {
                    b = ibRange[k];
                    results1.push(avdv.nextFloat());
                }
                return results1;
            })();
            return this.distance = (function () {
                var k, len, results1;
                results1 = [];
                for (k = 0, len = ibRange.length; k < len; k++) {
                    b = ibRange[k];
                    results1.push(avdv.nextFloat());
                }
                return results1;
            })();
        };
        MeshVertex.prototype.getBoneEndDistance = function (b) {
            return this.distance[b];
        };
        MeshVertex.prototype.getIndex = function () {
            return this.index;
        };
        MeshVertex.prototype.getNumBones = function () {
            return this.countBones;
        };
        MeshVertex.prototype.getBone4cc = function (b) {
            return this.bone4cc[b];
        };
        MeshVertex.prototype.getWeight = function (b) {
            return this.weight[b];
        };
        MeshVertex.prototype.getOffset = function (b) {
            return this.offsetVector[b];
        };
        MeshVertex.prototype.getBaseNormal = function (b) {
            return this.baseNormal[b];
        };
        return MeshVertex;
    })();
    this.MeshVertex = MeshVertex;
}).call(this);