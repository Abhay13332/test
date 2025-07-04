"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upload_ts_1 = require("./routes/upload.ts");
var fastify_1 = require("fastify");
var cors_1 = require("@fastify/cors");
require("./util/mongodbconnect.ts");
var multipart_1 = require("@fastify/multipart");
var getsuits_ts_1 = require("./routes/getsuits.ts");
var appnew = (0, fastify_1.default)({ logger: true });
appnew.register((multipart_1.default), {
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
//    appnew.register(multer.contentParser)
appnew.register(cors_1.default);
appnew.register(upload_ts_1.default);
appnew.register(getsuits_ts_1.default);
appnew.listen({ port: (Number(process.env.PORT)), host: "0.0.0.0" }, function () {
    console.log("started");
});
