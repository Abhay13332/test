 import type { FastifyPluginAsync } from "fastify";
import Images from "../models/imageData.ts";
 const getsuits:FastifyPluginAsync=async(fastify)=>{
fastify.get("/suits",async()=>{
     return await Images.getSuits();
})
}
export default getsuits;