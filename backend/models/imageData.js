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
exports.Image = void 0;
var mongoose = require("mongoose");
var ImageSchema = new mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ["Astar Poshak", "Satan Suit", "Cotton Suit", "Jod", "Odhni", "Printed", "Half Pure Poshak", "Zero Pure Poshak", "Pure Poshak"] },
    price: Number,
    images: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    colorNames: [{ type: String, required: true }],
    detailedDescription: { type: String },
    title: { type: String, required: true },
    originalPrices: { type: Number },
    ratings: Number,
    reviewCount: Number,
    specifications: { type: [{ key: String, value: String }], required: false },
    features: [String],
    inStock: { type: Boolean },
}, { statics: {
        imageDataByTitle: function (title) {
            return this.findOne({ title: title });
        }, imageDataById: function (id) {
            return this.findById(id);
        }, getSuits: function () {
            return this.find({ type: { $nin: ["Jod", "Odhni", "Printed"] } });
        }, priceUpdate: function (id, price) {
            return __awaiter(this, void 0, void 0, function () {
                var document;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne({ id: id })];
                        case 1:
                            document = _a.sent();
                            if (!!document.originalPrices) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.aggregate([{ $match: { id: id } }, { $set: { originalPrice: price } }, { $set: { price: price } }])];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.findOneAndUpdate({ id: id }, { $set: { price: price } })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }, updateRatings: function (id, rating) {
            this.aggregate([
                { $match: { id: id } },
                { $set: { ratings: { $divide: [{ $add: ["$ratings", rating] }, 2] } },
                }
            ]);
        }, imageDatagetbyType: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.find({ type: { $in: __spreadArray([], args, true) } }).sort("-createdAt");
        }
    },
    timestamps: true,
    strict: true, });
exports.Image = mongoose.model('Image', ImageSchema);
exports.default = exports.Image;
