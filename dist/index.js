import upload from "./routes/upload.js";
import fastify from "fastify";
import fastifycors from "@fastify/cors";
import "./util/mongodbconnect.js";
import multipart from "@fastify/multipart";
import getsuits from "./routes/getsuits.js";
const appnew = fastify({ logger: true });
appnew.register((multipart), {
    limits: {
        fileSize: 100 * 1024 * 1024
    }
});
//    appnew.register(multer.contentParser)
appnew.register(fastifycors);
appnew.register(upload);
appnew.register(getsuits);
appnew.listen({ port: (Number(process.env.PORT)), host: "0.0.0.0" }, () => {
    console.log("started");
});
