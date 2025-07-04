import {fileprocess} from "../controllers/colorget.ts";
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { RouteHandler } from 'fastify';
 const uploadRoute:FastifyPluginAsyncTypebox=async (fastify)=>{
   
fastify.post("/upload",{
    
    handler:(fileprocess as RouteHandler)
});
}
export default uploadRoute;