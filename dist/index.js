import upload from "./routes/upload.js";
import fastify from "fastify";
import fastifycors from "@fastify/cors";
import "./util/mongodbconnect.js";
import multipart from "@fastify/multipart";
const appnew = fastify({ logger: true });
appnew.register((multipart), {});
//    appnew.register(multer.contentParser)
appnew.register(fastifycors);
appnew.register(upload);
appnew.listen({ port: (Number(process.env.Port)), host: "0.0.0.0" }, () => {
    console.log("started");
});
