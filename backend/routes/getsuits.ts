import  type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import Images from "../models/imageData.ts";
 const getsuits:FastifyPluginAsyncTypebox=async(fastify)=>{
fastify.get("/suits",async()=>{
     return await Images.getSuits();
})
}
export default getsuits;