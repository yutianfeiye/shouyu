//-------- js/polyfills.js --------
// Polyfills: Mostly for IE
//
// Math.fround
//
if (!Math.fround) {
    console.log("Polyfill used for Math.fround");
    Math.fround = (function (array) {
        return function (x) {
            array[0] = x;
            // console.log ("Math.fround(" + x + ") = " + array[0]);
            return array[0];
        };
    })(new Float32Array(1));
}
if (!Math.imul) {
    console.log("Polyfill used for Math.imul");
    Math.imul = function (a, b) {
        var aHi = (a >>> 16) & 0xffff;
        var aLo = a & 0xffff;
        var bHi = (b >>> 16) & 0xffff;
        var bLo = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((aLo * bLo) + (((aHi * bLo + aLo * bHi) << 16) >>> 0) | 0);
    };
}
if (!Math.clz32) {
    console.log("Polyfill used for Math.clz32");
    Math.clz32 = function (x) {
        // Let n be ToUint32(x).
        // Let p be the number of leading zero bits in
        // the 32-bit binary representation of n.
        // Return p.
        if (x == null || x === 0) {
            return 32;
        }
        return 31 - Math.floor(Math.log(x >>> 0) * Math.LOG2E);
    };
}
//
// Date.now
//
if (!Date.now) {
    console.log("Polyfill used for Date.now");
    Date.now = function now() {
        return new Date().getTime();
    };
}
//
// requestAnimationFrame functions
//
// requestAnimationFrame with no fallback
(function () {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    var lastTime = 0;
    if (!window.requestAnimationFrame) {
        // requestAnimationFrame using fallback to setTimeout
        console.log("Polyfill used for requestAnimationFrame using setTimeout");
        // Omits the mysterious element parameter
        window.requestAnimationFrame = function (callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        }
    }
    // delayAnimationFrame using requestAnimationFrame
    console.log("Polyfill used for delayAnimationFrame");
    window.delayAnimationFrame = function (callback, delay) {
        if (delay == null) delay = 0;
        var id = window.setTimeout(function () {
            window.requestAnimationFrame(callback);
        }, delay);
        return id;
    }
}());
//
// String.endsWith
//
if (!String.prototype.endsWith) {
    console.log("Polyfill used for String.endsWith");
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
//
// String.startsWith
//
if (!String.prototype.startsWith) {
    console.log("Polyfill used for String.startsWith");
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
//
// Promise
//
(function (root) {
    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function noop() {}
    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
        return function () {
            fn.apply(thisArg, arguments);
        };
    }

    function Promise(fn) {
        if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = 0;
        this._handled = false;
        this._value = undefined;
        this._deferreds = [];
        doResolve(fn, this);
    }

    function handle(self, deferred) {
        while (self._state === 3) {
            self = self._value;
        }
        if (self._state === 0) {
            self._deferreds.push(deferred);
            return;
        }
        self._handled = true;
        Promise._immediateFn(function () {
            var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
            if (cb === null) {
                (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                return;
            }
            var ret;
            try {
                ret = cb(self._value);
            } catch (e) {
                reject(deferred.promise, e);
                return;
            }
            resolve(deferred.promise, ret);
        });
    }

    function resolve(self, newValue) {
        try {
            // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;
                if (newValue instanceof Promise) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                }
            }
            self._state = 1;
            self._value = newValue;
            finale(self);
        } catch (e) {
            reject(self, e);
        }
    }

    function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
    }

    function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
            Promise._immediateFn(function () {
                if (!self._handled) {
                    Promise._unhandledRejectionFn(self._value);
                }
            });
        }
        for (var i = 0, len = self._deferreds.length; i < len; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
    }
    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                resolve(self, value);
            }, function (reason) {
                if (done) return;
                done = true;
                reject(self, reason);
            });
        } catch (ex) {
            if (done) return;
            done = true;
            reject(self, ex);
        }
    }
    Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var prom = new(this.constructor)(noop);
        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
    };
    Promise.all = function (arr) {
        var args = Array.prototype.slice.call(arr);
        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
                try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) {
                                res(i, val);
                            }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };
    Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
            return value;
        }
        return new Promise(function (resolve) {
            resolve(value);
        });
    };
    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };
    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for (var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    };
    // Use polyfill for setImmediate for performance gains
    Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) {
            setImmediate(fn);
        }) ||
        function (fn) {
            setTimeoutFunc(fn, 0);
        };
    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== 'undefined' && console) {
            console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
        }
    };
    /**
     * Set the immediate function to execute callbacks
     * @param fn {function} Function to execute
     * @deprecated
     */
    Promise._setImmediateFn = function _setImmediateFn(fn) {
        Promise._immediateFn = fn;
    };
    /**
     * Change the function to execute on unhandled rejection
     * @param {function} fn Function to execute on unhandled rejection
     * @deprecated
     */
    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
        Promise._unhandledRejectionFn = fn;
    };
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Promise;
    } else if (!root.Promise) {
        console.log("Polyfill used for Promise");
        root.Promise = Promise;
    }
})(this);