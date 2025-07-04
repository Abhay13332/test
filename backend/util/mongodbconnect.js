"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tryCatchHandler_ts_1 = require("./tryCatchHandler.ts");
await (0, tryCatchHandler_ts_1.logtryexecuter)(mongoose_1.default.connect, function () { return console.log("mongo connect"); })(process.env.MONGODB_URI || "");
