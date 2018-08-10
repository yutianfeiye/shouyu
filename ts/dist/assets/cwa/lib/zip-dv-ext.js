
//-------- js/zip-dv-ext.js --------
/*
Copyright (c) 2013 Gildas Lormeau. All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in
the documentation and/or other materials provided with the distribution.
3. The names of the authors may not be used to endorse or promote products
derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function () {
    "use strict";
    // Repeated to avoid changing zip.js to expose it
    function getDataHelper(byteLength, bytes) {
        var dataBuffer, dataArray;
        dataBuffer = new ArrayBuffer(byteLength);
        dataArray = new Uint8Array(dataBuffer);
        if (bytes)
            dataArray.set(bytes, 0);
        return {
            buffer: dataBuffer,
            array: dataArray,
            view: new DataView(dataBuffer)
        };
    }
    // Extension to the set of Writers -- DataViewWriter. Presumably by RE.
    function DataViewWriter(byteLength) {
        var data, offset, that = this;

        function init(callback, onerror) {
            data = getDataHelper(byteLength);
            offset = 0;
            callback();
        }

        function writeUint8Array(array, callback, onerror) {
            //window.console.log("Adding byte range ["+offset+".."+(offset+array.byteLength)+")");
            data.array.set(array, offset);
            offset += array.byteLength;
            callback();
        }

        function getData(callback) {
            callback(data.view);
        }
        that.init = init;
        that.writeUint8Array = writeUint8Array;
        that.getData = getData;
    }
    DataViewWriter.prototype = new zip.Writer();
    DataViewWriter.prototype.constructor = DataViewWriter;
    zip.DataViewWriter = DataViewWriter;
})();