"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileprocess = void 0;
var cln = require("color-namer");
var cloudinary_ts_1 = require("../util/cloudinary.ts");
// import getColors from 'get-image-colors';
var ColorNamer = cln.default;
var imageData_ts_1 = require("../models/imageData.ts");
var streamifier_1 = require("streamifier");
var colornamer = (await Promise.resolve().then(function () { return require("color-namer"); })).default;
var get_image_colors_1 = require("get-image-colors");
var getcolor = function (buff, options) { return __awaiter(void 0, void 0, void 0, function () {
    var colors, top, name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, get_image_colors_1.default)(buff, options)];
            case 1:
                colors = _a.sent();
                top = colors[0].hex();
                name = colornamer(top).ntc[0];
                return [2 /*return*/, [top, name]];
        }
    });
}); };
var fileprocess = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var colors, colorNames, promiseArr, imagenames, ind, data, itrtxt, _a, itrtxt_1, itrtxt_1_1, part, filebuffer, color, filename, e_1_1;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                // let files= req.files();
                console.log("st");
                colors = [];
                colorNames = [];
                promiseArr = [];
                imagenames = [];
                ind = 0;
                data = { specs: [] };
                itrtxt = req.parts();
                console.log("exc");
                _e.label = 1;
            case 1:
                _e.trys.push([1, 9, 10, 15]);
                _a = true, itrtxt_1 = __asyncValues(itrtxt);
                _e.label = 2;
            case 2: return [4 /*yield*/, itrtxt_1.next()];
            case 3:
                if (!(itrtxt_1_1 = _e.sent(), _b = itrtxt_1_1.done, !_b)) return [3 /*break*/, 8];
                _d = itrtxt_1_1.value;
                _a = false;
                part = _d;
                if (!(part.type != "file")) return [3 /*break*/, 4];
                console.log("gh");
                if (part.fieldname == "specs") {
                    data.specs.push(part.value);
                }
                else {
                    data[part.fieldname] = part.value;
                }
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, part.toBuffer()];
            case 5:
                filebuffer = _e.sent();
                return [4 /*yield*/, getcolor(filebuffer, part.mimetype)];
            case 6:
                color = _e.sent();
                colors.push(color[0]);
                colorNames.push(color[1].name);
                filename = "".concat(Date.now(), "/").concat(ind++, ".jpg");
                promiseArr.push(uploadBufferToCloudinary(filebuffer, filename));
                imagenames.push(filename);
                _e.label = 7;
            case 7:
                _a = true;
                return [3 /*break*/, 2];
            case 8: return [3 /*break*/, 15];
            case 9:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 15];
            case 10:
                _e.trys.push([10, , 13, 14]);
                if (!(!_a && !_b && (_c = itrtxt_1.return))) return [3 /*break*/, 12];
                return [4 /*yield*/, _c.call(itrtxt_1)];
            case 11:
                _e.sent();
                _e.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 14: return [7 /*endfinally*/];
            case 15: 
            // console.log("somethingstart"+JSON.stringify(filebuffer)+"hjk");
            return [4 /*yield*/, Promise.all(promiseArr)];
            case 16:
                // console.log("somethingstart"+JSON.stringify(filebuffer)+"hjk");
                _e.sent();
                imageData_ts_1.Image.create(({
                    type: data.type,
                    description: data.description,
                    inStock: true,
                    price: data.price,
                    images: imagenames,
                    colors: colors,
                    colorNames: colorNames,
                    title: data.title,
                    reviewCount: 0,
                    ratings: 4,
                    features: data.specs
                }));
                console.log("done");
                return [2 /*return*/, { "upload": "success" }];
        }
    });
}); };
exports.fileprocess = fileprocess;
function uploadBufferToCloudinary(buffer, filename) {
    return new Promise(function (resolve, reject) {
        var uploadStream = cloudinary_ts_1.default.uploader.upload_stream({ public_id: filename, resource_type: "image", folder: "poshaks" }, function (error, result) {
            if (error)
                return reject(error);
            resolve(result);
        });
        streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
    });
}
