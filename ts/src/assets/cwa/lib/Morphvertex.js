//-------- js/Morphvertex.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var MorphVertex, V3, console, cwaenv, document, log, setTimeout;
    cwaenv = this.getCWAEnv();
    console = this.console;
    document = this.document;
    setTimeout = this.setTimeout;
    log = console.log.bind(console);
    V3 = cwaenv.get("E3Vec");
    MorphVertex = (function () {
        function MorphVertex() {
            this.ixVertex = -1;
            this.offset = this.normal = null;
        }
        MorphVertex.fromJSON = function (jsnmphvtx) {
            var mphvtx;
            mphvtx = new MorphVertex;
            mphvtx.setFromJSON(jsnmphvtx);
            return mphvtx;
        };
        MorphVertex.fromBin = function (avdv) {
            var mphvtx;
            mphvtx = new MorphVertex;
            mphvtx.setFromBin(avdv);
            return mphvtx;
        };
        MorphVertex.prototype.setFromJSON = function (jsnmphvtx) {
            this.ixVertex = jsnmphvtx.vertex;
            this.offset = V3.copyOfV3(jsnmphvtx.offset);
            return this.normal = V3.copyOfV3(jsnmphvtx.normal);
        };
        MorphVertex.prototype.setFromBin = function (avdv) {
            var weight;
            this.ixVertex = avdv.nextUint();
            weight = avdv.nextFloat();
            this.offset = avdv.nextVec3();
            return this.normal = avdv.nextVec3();
        };
        MorphVertex.prototype.getVertexId = function () {
            return this.ixVertex;
        };
        MorphVertex.prototype.getOffset = function () {
            return this.offset;
        };
        MorphVertex.prototype.getNormal = function () {
            return this.normal;
        };
        return MorphVertex;
    })();
    cwaenv.add(MorphVertex, "MorphVertex");
}).call(this);