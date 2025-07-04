import Images from "../models/imageData.js";
const getsuits = async (fastify) => {
    fastify.get("/suits", async () => {
        return await Images.getSuits();
    });
};
export default getsuits;
