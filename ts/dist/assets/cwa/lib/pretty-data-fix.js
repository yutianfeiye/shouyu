//-------- js/pretty-data-fix.js --------
/**
 * pretty-data - nodejs plugin to pretty-print or minify data in XML, JSON and CSS formats.
 *  
 * Version - 0.40.0
 * Copyright (c) 2012 Vadim Kiryukhin
 * vkiryukhin @ gmail.com
 * http://www.eslinstructor.net/pretty-data/
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 *	pd.xml(data ) - pretty print XML;
 *	pd.json(data) - pretty print JSON;
 *	pd.css(data ) - pretty print CSS;
 *	pd.sql(data)  - pretty print SQL;
 *
 *	pd.xmlmin(data [, preserveComments] ) - minify XML; 
 *	pd.jsonmin(data)                      - minify JSON; 
 *	pd.cssmin(data [, preserveComments] ) - minify CSS; 
 *	pd.sqlmin(data)                       - minify SQL; 
 *
 * PARAMETERS:
 *
 *	@data  			- String; XML, JSON, CSS or SQL text to beautify;
 * 	@preserveComments	- Bool (optional, used in minxml and mincss only); 
 *				  Set this flag to true to prevent removing comments from @text; 
 *	@Return 		- String;
 *	
 * USAGE:
 *	
 *	var pd  = require('pretty-data').pd;
 *
 *	var xml_pp   = pd.xml(xml_text);
 *	var xml_min  = pd.xmlmin(xml_text [,true]);
 *	var json_pp  = pd.json(json_text);
 *	var json_min = pd.jsonmin(json_text);
 *	var css_pp   = pd.css(css_text);
 *	var css_min  = pd.cssmin(css_text [, true]);
 *	var sql_pp   = pd.sql(sql_text);
 *	var sql_min  = pd.sqlmin(sql_text);
 *
 * TEST:
 *	comp-name:pretty-data$ node ./test/test_xml
 *	comp-name:pretty-data$ node ./test/test_json
 *	comp-name:pretty-data$ node ./test/test_css
 *	comp-name:pretty-data$ node ./test/test_sql
 */
function pp() {
    this.shift = ['\n']; // array of shifts
    this.step = '  '; // 2 spaces
    var maxdeep = 100, // nesting level
        ix = 0;
    // initialize array with shifts //
    for (ix = 0; ix < maxdeep; ix++) {
        this.shift.push(this.shift[ix] + this.step);
    }
};
// ----------------------- XML section ----------------------------------------------------
pp.prototype.xml = function (text, preserveComments) {
    var strg = preserveComments ? text :
        text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "");
    var ar = strg.replace(/>\s{0,}</g, "><")
        .replace(/</g, "~::~<")
        .replace(/xmlns\:/g, "~::~xmlns:")
        .replace(/xmlns\=/g, "~::~xmlns=")
        .split('~::~'),
        len = ar.length,
        inComment = false,
        deep = 0,
        str = '',
        ix = 0;
    for (ix = 0; ix < len; ix++) {
        // start comment or <![CDATA[...]]> or <!DOCTYPE //
        if (ar[ix].search(/<!/) > -1) {
            str += this.shift[deep] + ar[ix];
            inComment = true;
            // end comment  or <![CDATA[...]]> //
            if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1) {
                inComment = false;
            }
        } else
            // end comment  or <![CDATA[...]]> //    find --> or ]>
            if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
                str += ar[ix];
                inComment = false;
            } else
                // <elm></elm> //    find prev <tag and this <\tag    but now not prev \>
                if (ar[ix - 1] != null && ar[ix - 1].search(/\/>/) == -1 && /^<\w/.exec(ar[ix - 1]) && /^<\/\w/.exec(ar[ix]) &&
                    /^<[\w:\-\.\,]+/.exec(ar[ix - 1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/', '')) {
                    // Omits indentation
                    // str += ar[ix];
                    // No longer omits indentation: For compatibility with Java PP routine
                    str = !inComment ? str += this.shift[--deep] + ar[ix] : str += ar[ix];
                    // if(!inComment) deep--;
                } else
                    // <elm> //
                    //    find <tag but not </ or />
                    if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1) {
                        str = !inComment ? str += this.shift[deep++] + ar[ix] : str += ar[ix];
                    } else
                        // <elm>...</elm> //    find <tag and </    not sure how both can be on one line
                        if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                            str = !inComment ? str += this.shift[deep] + ar[ix] : str += ar[ix];
                        } else
                            // </elm> //    find </
                            if (ar[ix].search(/<\//) > -1) {
                                str = !inComment ? str += this.shift[--deep] + ar[ix] : str += ar[ix];
                            } else
                                // <elm/> //    find />
                                if (ar[ix].search(/\/>/) > -1) {
                                    str = !inComment ? str += this.shift[deep] + ar[ix] : str += ar[ix];
                                } else
                                    // <? xml ... ?> //
                                    if (ar[ix].search(/<\?/) > -1) {
                                        str += this.shift[deep] + ar[ix];
                                    } else
                                        // xmlns //
                                        if (ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1) {
                                            str += this.shift[deep] + ar[ix];
                                        }
        else {
            str += ar[ix];
        }
    }
    return (str[0] == '\n') ? str.slice(1) : str;
}
// ----------------------- JSON section ----------------------------------------------------
pp.prototype.json = function (text) {
    if (typeof text === "string") {
        return JSON.stringify(JSON.parse(text), null, this.step);
    }
    if (typeof text === "object") {
        return JSON.stringify(text, null, this.step);
    }
    return null;
}
// ----------------------- CSS section ----------------------------------------------------
pp.prototype.css = function (text) {
    var ar = text.replace(/\s{1,}/g, ' ')
        .replace(/\{/g, "{~::~")
        .replace(/\}/g, "~::~}~::~")
        .replace(/\;/g, ";~::~")
        .replace(/\/\*/g, "~::~/*")
        .replace(/\*\//g, "*/~::~")
        .replace(/~::~\s{0,}~::~/g, "~::~")
        .split('~::~'),
        len = ar.length,
        deep = 0,
        str = '',
        ix = 0;
    for (ix = 0; ix < len; ix++) {
        if (/\{/.exec(ar[ix])) {
            str += this.shift[deep++] + ar[ix];
        } else
        if (/\}/.exec(ar[ix])) {
            str += this.shift[--deep] + ar[ix];
        } else
        if (/\*\\/.exec(ar[ix])) {
            str += this.shift[deep] + ar[ix];
        } else {
            str += this.shift[deep] + ar[ix];
        }
    }
    return str.replace(/^\n{1,}/, '');
}
// ----------------------- SQL section ----------------------------------------------------
function isSubquery(str, parenthesisLevel) {
    return parenthesisLevel - (str.replace(/\(/g, '').length - str.replace(/\)/g, '').length)
}

function split_sql(str, tab) {
    return str.replace(/\s{1,}/g, " ")
        .replace(/ AND /ig, "~::~" + tab + tab + "AND ")
        .replace(/ BETWEEN /ig, "~::~" + tab + "BETWEEN ")
        .replace(/ CASE /ig, "~::~" + tab + "CASE ")
        .replace(/ ELSE /ig, "~::~" + tab + "ELSE ")
        .replace(/ END /ig, "~::~" + tab + "END ")
        .replace(/ FROM /ig, "~::~FROM ")
        .replace(/ GROUP\s{1,}BY/ig, "~::~GROUP BY ")
        .replace(/ HAVING /ig, "~::~HAVING ")
        //.replace(/ IN /ig,"~::~"+tab+"IN ")
        .replace(/ IN /ig, " IN ")
        .replace(/ JOIN /ig, "~::~JOIN ")
        .replace(/ CROSS~::~{1,}JOIN /ig, "~::~CROSS JOIN ")
        .replace(/ INNER~::~{1,}JOIN /ig, "~::~INNER JOIN ")
        .replace(/ LEFT~::~{1,}JOIN /ig, "~::~LEFT JOIN ")
        .replace(/ RIGHT~::~{1,}JOIN /ig, "~::~RIGHT JOIN ")
        .replace(/ ON /ig, "~::~" + tab + "ON ")
        .replace(/ OR /ig, "~::~" + tab + tab + "OR ")
        .replace(/ ORDER\s{1,}BY/ig, "~::~ORDER BY ")
        .replace(/ OVER /ig, "~::~" + tab + "OVER ")
        .replace(/\(\s{0,}SELECT /ig, "~::~(SELECT ")
        .replace(/\)\s{0,}SELECT /ig, ")~::~SELECT ")
        .replace(/ THEN /ig, " THEN~::~" + tab + "")
        .replace(/ UNION /ig, "~::~UNION~::~")
        .replace(/ USING /ig, "~::~USING ")
        .replace(/ WHEN /ig, "~::~" + tab + "WHEN ")
        .replace(/ WHERE /ig, "~::~WHERE ")
        .replace(/ WITH /ig, "~::~WITH ")
        //.replace(/\,\s{0,}\(/ig,",~::~( ")
        //.replace(/\,/ig,",~::~"+tab+tab+"")
        .replace(/ ALL /ig, " ALL ")
        .replace(/ AS /ig, " AS ")
        .replace(/ ASC /ig, " ASC ")
        .replace(/ DESC /ig, " DESC ")
        .replace(/ DISTINCT /ig, " DISTINCT ")
        .replace(/ EXISTS /ig, " EXISTS ")
        .replace(/ NOT /ig, " NOT ")
        .replace(/ NULL /ig, " NULL ")
        .replace(/ LIKE /ig, " LIKE ")
        .replace(/\s{0,}SELECT /ig, "SELECT ")
        .replace(/~::~{1,}/g, "~::~")
        .split('~::~');
}
pp.prototype.sql = function (text) {
    var ar_by_quote = text.replace(/\s{1,}/g, " ")
        .replace(/\'/ig, "~::~\'")
        .split('~::~'),
        len = ar_by_quote.length,
        ar = [],
        deep = 0,
        tab = this.step, //+this.step,
        inComment = true,
        inQuote = false,
        parenthesisLevel = 0,
        str = '',
        ix = 0;
    for (ix = 0; ix < len; ix++) {
        if (ix % 2) {
            ar = ar.concat(ar_by_quote[ix]);
        } else {
            ar = ar.concat(split_sql(ar_by_quote[ix], tab));
        }
    }
    len = ar.length;
    for (ix = 0; ix < len; ix++) {
        parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);
        if (/\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
            ar[ix] = ar[ix].replace(/\,/g, ",\n" + tab + tab + "")
        }
        if (/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
            deep++;
            str += this.shift[deep] + ar[ix];
        } else
        if (/\'/.exec(ar[ix])) {
            if (parenthesisLevel < 1 && deep) {
                deep--;
            }
            str += ar[ix];
        } else {
            str += this.shift[deep] + ar[ix];
            if (parenthesisLevel < 1 && deep) {
                deep--;
            }
        }
    }
    str = str.replace(/^\n{1,}/, '').replace(/\n{1,}/g, "\n");
    return str;
}
// ----------------------- min section ----------------------------------------------------
pp.prototype.xmlmin = function (text, preserveComments) {
    var str = preserveComments ? text :
        text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "");
    return str.replace(/>\s{0,}</g, "><");
}
pp.prototype.jsonmin = function (text) {
    return text.replace(/\s{0,}\{\s{0,}/g, "{")
        .replace(/\s{0,}\[$/g, "[")
        .replace(/\[\s{0,}/g, "[")
        .replace(/:\s{0,}\[/g, ':[')
        .replace(/\s{0,}\}\s{0,}/g, "}")
        .replace(/\s{0,}\]\s{0,}/g, "]")
        .replace(/\"\s{0,}\,/g, '",')
        .replace(/\,\s{0,}\"/g, ',"')
        .replace(/\"\s{0,}:/g, '":')
        .replace(/:\s{0,}\"/g, ':"')
        .replace(/:\s{0,}\[/g, ':[')
        .replace(/\,\s{0,}\[/g, ',[')
        .replace(/\,\s{2,}/g, ', ')
        .replace(/\]\s{0,},\s{0,}\[/g, '],[');
}
pp.prototype.cssmin = function (text, preserveComments) {
    var str = preserveComments ? text :
        text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");
    return str.replace(/\s{1,}/g, ' ')
        .replace(/\{\s{1,}/g, "{")
        .replace(/\}\s{1,}/g, "}")
        .replace(/\;\s{1,}/g, ";")
        .replace(/\/\*\s{1,}/g, "/*")
        .replace(/\*\/\s{1,}/g, "*/");
}
pp.prototype.sqlmin = function (text) {
    return text.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")");
}
// --------------------------------------------------------------------------------------------
// this.Pretty = new pp;	
this.getCWAEnv().add(new pp, "Pretty");
//-------- js/Access.XHR.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var Access, DOMParse, Env, Pretty, XMLSerialize, cwaenv, document, logLev;
    cwaenv = this.getCWAEnv();
    document = this.document;
    XMLSerialize = new XMLSerializer;
    DOMParse = new DOMParser;
    Env = cwaenv.get("CWAEnv");
    Pretty = cwaenv.get("Pretty");
    logLev = 0;
    Access = (function () {
        function Access() {}
        Access.setLogLevel = function (lev) {
            return logLev = lev;
        };
        Access.trace = function (str) {
            if (logLev >= 440) {
                return console.log(str);
            }
        };
        Access.toDOM = function (theXML, errCB) {
            var doc, errMsg, i, len, pErr, pErrs;
            if (errCB == null) {
                errCB = null;
            }
            doc = DOMParse.parseFromString(theXML, "text/xml");
            pErrs = doc.getElementsByTagName("parsererror");
            if (pErrs.length > 0) {
                errMsg = "";
                for (i = 0, len = pErrs.length; i < len; i++) {
                    pErr = pErrs[i];
                    errMsg += Access._justText(pErr);
                }
                Access.trace(errMsg);
                if (errCB) {
                    errCB("error", errMsg);
                }
                return null;
            } else {
                return doc;
            }
        };
        Access._justText = function (el) {
            var i, len, nd, ref, res;
            res = "";
            ref = el.childNodes;
            for (i = 0, len = ref.length; i < len; i++) {
                nd = ref[i];
                if (nd.nodeType === Node.ELEMENT_NODE) {
                    res += Access._justText(nd);
                } else if (nd.nodeType === Node.TEXT_NODE) {
                    res += nd.nodeValue;
                }
            }
            return res;
        };
        Access._isFileURL = function (url) {
            return (url.substring(0, 5)) === "file:";
        };
        Access.fetchURI = function (theURI, theCB, form) {
            var myXHR, rqstData, rqstType;
            if (form == null) {
                form = null;
            }
            rqstType = form === "HEAD" ? "HEAD" : (form === null) || (form === "GET") ? "GET" : "POST";
            rqstData = (form === "HEAD") || (form === "POST") || (form === "GET") ? null : form;
            console.log("fetchURI fetching: " + theURI + " Type=" + rqstType);
            if ((Env.browTag === "IE") && (Access._isFileURL(theURI))) {
                myXHR = new ActiveXObject("Microsoft.XMLHTTP");
                myXHR.open(rqstType, theURI, true);
                myXHR.onreadystatechange = (function (_this) {
                    return function () {
                        var msg;
                        if (myXHR.readyState === XMLHttpRequest.DONE) {
                            if ((myXHR.status === 0) || (myXHR.status === 200)) {
                                console.log("fetchURI using ActiveX fetched:  " + theURI + " Status=" + myXHR.status);
                                return theCB(myXHR.responseText, 0, null, myXHR.responseText);
                            } else {
                                msg = "fetchURI using ActiveX: Failed for " + theURI + " Status=" + myXHR.status;
                                console.log(msg);
                                return theCB(null, 1, msg, myXHR.responseText);
                            }
                        }
                    };
                })(this);
            } else {
                myXHR = new XMLHttpRequest;
                myXHR.open(rqstType, theURI, true);
                myXHR.overrideMimeType("text/plain; charset=x-user-defined");
                myXHR.onloadend = (function (_this) {
                    return function () {
                        var msg, xhrok;
                        xhrok = (myXHR.status === 0) || (myXHR.status === 200);
                        if (xhrok) {
                            console.log("fetchURI fetched:  " + theURI + " Status=" + myXHR.status);
                            return theCB(myXHR.responseText, 0, null, myXHR.responseText);
                        } else {
                            msg = "fetchURI: Failed for " + theURI + " Status=" + myXHR.status;
                            console.log(msg);
                            return theCB(null, 1, msg, myXHR.responseText);
                        }
                    };
                })(this);
            }
            return myXHR.send(rqstData);
        };
        return Access;
    })();
    cwaenv.add(Access, "Access");
    cwaenv.add(XMLSerialize, "XMLSerialize");
    cwaenv.add(Node, "Node");
}).call(this);
//-------- js/Data.js --------
// Generated by CoffeeScript 1.12.2
(function () {
    var Access, Data, Pretty, Sync, XMLSerialize, cwaenv, log;
    cwaenv = this.getCWAEnv();
    Access = cwaenv.get("Access");
    Pretty = cwaenv.get("Pretty");
    XMLSerialize = cwaenv.get("XMLSerialize");
    log = console.log;
    Data = (function () {
        function Data() {}
        Data.toDOM = Access.toDOM;
        Data.result = function (val, errCount, errText, partVal) {
            return {
                value: val,
                errCount: errCount,
                errText: errText,
                partVal: partVal
            };
        };
        Data.parseJSON = function (jstr) {
            if ((jstr != null) && jstr.length > 0) {
                return JSON.parse(jstr);
            } else {
                console.log("JSON.parse failed for \"" + jstr + "\"");
                return null;
            }
        };
        Data.tee = function (cbA, cbB) {
            return (function (_this) {
                return function () {
                    cbA();
                    return cbB();
                };
            })(this);
        };
        Data.ppJSON = function (theJSON) {
            return Pretty.json(theJSON);
        };
        Data.mnJSON = function (theJSON) {
            if (typeof theJSON === "object") {
                theJSON = JSON.stringify(theJSON);
            }
            return Pretty.jsonmin(theJSON);
        };
        Data.ppXML = function (theXML, pres) {
            if (pres == null) {
                pres = true;
            }
            return Pretty.xml(theXML, pres);
        };
        Data.mnXML = function (theXML, pres) {
            if (pres == null) {
                pres = false;
            }
            return Pretty.xmlmin(theXML, pres);
        };
        Data.ppDOM = function (theDOM, pres) {
            if (pres == null) {
                pres = true;
            }
            return Pretty.xml(XMLSerialize.serializeToString(theDOM), pres);
        };
        Data.mnDOM = function (theDOM, pres) {
            if (pres == null) {
                pres = false;
            }
            return Pretty.xmlmin(XMLSerialize.serializeToString(theDOM), pres);
        };
        Data.splitURI = function (uri) {
            var matches, pattern;
            pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
            matches = uri.match(pattern);
            return {
                scheme: matches[2],
                authority: matches[4],
                path: matches[5],
                query: matches[7],
                fragment: matches[9]
            };
        };
        Data.stringURI = function (uriobj) {
            var res;
            res = uriobj.path;
            if (uriobj != null ? uriobj.authority : void 0) {
                res = "//" + uriobj.authority + res;
            }
            if (uriobj != null ? uriobj.scheme : void 0) {
                res = uriobj.scheme + ":" + res;
            }
            if (uriobj.query != null) {
                res += "?" + uriobj.query;
            }
            return res;
        };
        Data.stringURIPath = function (uriobj) {
            var res;
            res = uriobj.path;
            if (uriobj.query != null) {
                res += "?" + uriobj.query;
            }
            return res;
        };
        Data.absoluteSplitURI = function (uri, base) {
            var basedir, baseobj, ref, uriobj;
            uriobj = Data.splitURI(uri);
            baseobj = Data.splitURI(base);
            basedir = baseobj.path.substr(0, (baseobj.path.lastIndexOf("/")) + 1);
            return {
                scheme: uriobj.scheme || baseobj.scheme,
                authority: uriobj.authority || baseobj.authority,
                path: ((ref = uriobj.path) != null ? ref.charAt(0) : void 0) === "/" ? uriobj.path : basedir + uriobj.path,
                query: uriobj.query || baseobj.query,
                fragment: uriobj.fragment || baseobj.fragment
            };
        };
        Data.absoluteURI = function (uri, base) {
            return Data.stringURI(Data.absoluteSplitURI(uri, base));
        };
        Data.asDir = function (uri) {
            if (uri.endsWith("/")) {
                return uri;
            } else {
                return uri + "/";
            }
        };
        Data.isDataURL = function (url) {
            return (url.substring(0, 5)) === "data:";
        };
        Data.fetchURI = Access.fetchURI;
        Data.fetchText = function (theURI, theCB, form) {
            var textCB;
            textCB = (function (_this) {
                return function (val, errC, errT, part) {
                    if (errC === 0) {
                        val = (val.replace(/\r\n/g, "\n")).replace(/\r/g, "\n");
                    }
                    return theCB(val, errC, errT, part);
                };
            })(this);
            return Data.fetchURI(theURI, textCB, form);
        };
        Data.fetchJSON = function (theURI, theCB, form) {
            var JSONCB;
            JSONCB = (function (_this) {
                return function (val, errC, errT, part) {
                    var err, newJSON;
                    if (errC > 0 || val.length === 0) {
                        return theCB(val, errC, errT, part);
                    } else if (val.length === 0) {
                        return theCB(null, 1, "No JSON data found", val);
                    } else {
                        try {
                            newJSON = Data.parseJSON(val);
                            return theCB(newJSON, 0, null, newJSON);
                        } catch (error) {
                            err = error;
                            return theCB(null, 1, err, val);
                        }
                    }
                };
            })(this);
            return Data.fetchURI(theURI, JSONCB, form);
        };
        Data.promiseURI = function (theURI, form) {
            return new Promise((function (_this) {
                return function (resolve, reject) {
                    var theCB;
                    theCB = function (val, errC, errT, part) {
                        if (errC > 0) {
                            return reject(new Error(JSON.stringify([errC, errT, part])));
                        } else {
                            return resolve(val);
                        }
                    };
                    return Data.fetchURI(theURI, theCB, form);
                };
            })(this));
        };
        Data.promiseURIText = function (theURI, form) {
            return (Data.promiseURI(theURI, form)).then(function (res) {
                return (res.replace(/\r\n/g, "\n")).replace(/\r/g, "\n");
            });
        };
        Data.id = function (arg) {
            return arg;
        };
        return Data;
    })();
    Sync = (function () {
        function Sync() {
            this.value = null;
            this.state = 0;
            this.CBs = [];
        }
        Sync.prototype.sync = function (CB, state) {
            if (state == null) {
                state = 1;
            }
            return this.check({
                proc: CB,
                state: state
            });
        };
        Sync.syncAll = function (CB, syncs, vals) {
            var theCB, theSync;
            if (vals == null) {
                vals = [];
            }
            if (syncs.length === 0) {
                CB(vals);
            } else {
                theSync = syncs.shift();
                theCB = (function (_this) {
                    return function (val) {
                        vals.push(val);
                        return Sync.syncAll(CB, syncs, vals);
                    };
                })(this);
                theSync.sync(theCB);
            }
            return null;
        };
        Sync.prototype.check = function (CB) {
            if (CB.state === this.state) {
                CB.proc(this.value);
            } else {
                this.CBs.push(CB);
            }
            return null;
        };
        Sync.prototype.set = function (value, state1) {
            var CB, i, len, results, theCBs;
            this.value = value;
            this.state = state1 != null ? state1 : 1;
            theCBs = this.CBs;
            this.CBs = [];
            results = [];
            for (i = 0, len = theCBs.length; i < len; i++) {
                CB = theCBs[i];
                results.push(this.check(CB));
            }
            return results;
        };
        return Sync;
    })();
    cwaenv.add(Data, "Data");
}).call(this);