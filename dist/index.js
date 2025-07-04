import upload from "./routes/upload.js";
import fastify from "fastify";
import fastifycors from "@fastify/cors";
import "./util/mongodbconnect.js";
import multipart from "@fastify/multipart";
import getsuits from "./routes/getsuits.js";
const appnew = fastify({ logger: true , requestTimeout: 300000,        // e.g. 5 minutes

  // Prevents idle sockets from lingering.
  connectionTimeout: 600000,     // e.g. 10 minutes

  // For HTTP/2 sessions
  http2SessionTimeout: 600000,   });
appnew.register((multipart), {
    limits: {
        fileSize: 100 * 1024 * 1024
    }
});
//    appnew.register(multer.contentParser)
appnew.register(fastifycors,{
     origin: true
});
appnew.register(upload);
appnew.register(getsuits);
appnew.listen({ port: (Number(process.env.PORT)), host: "0.0.0.0" }, () => {
    console.log("started");
});
