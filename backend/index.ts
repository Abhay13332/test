import upload from "./routes/upload.ts"
import fastify from "fastify";
import fastifycors from "@fastify/cors"
import "./util/mongodbconnect.ts";
import multipart from "@fastify/multipart";
import getsuits from "./routes/getsuits.ts";
const appnew=fastify({logger:true});
  appnew.register((multipart),{
 limits:{
  fileSize:10*1024*1024
 }
  });
   
//    appnew.register(multer.contentParser)
appnew.register(fastifycors);
appnew.register(upload);
appnew.register(getsuits);  

 
appnew.listen({port:(Number(process.env.PORT)),host:"0.0.0.0"},()=>{
    console.log("started");
})
 