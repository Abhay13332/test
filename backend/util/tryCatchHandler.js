"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logtryexecuter = exports.tryexecuter = void 0;
var tryexecuter = function (fn) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Promise.resolve(fn.apply(void 0, args)).catch(console.error);
}; };
exports.tryexecuter = tryexecuter;
var logtryexecuter = function (fn, fnsuccess, fnerr) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Promise.resolve(fn.apply(void 0, args)).then(function (rtvalue) {
        fnsuccess ? fnsuccess.apply(void 0, __spreadArray([rtvalue], args, false)) : (function () { console.log(rtvalue); console.log(args); });
        return rtvalue;
    }).catch(fnerr || console.error);
}; };
exports.logtryexecuter = logtryexecuter;
