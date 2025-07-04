import { fileprocess } from "../controllers/colorget.js";
const uploadRoute = async (fastify) => {
    fastify.post("/upload", {
        handler: fileprocess
    });
};
export default uploadRoute;
