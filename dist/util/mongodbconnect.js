import mongoose from "mongoose";
import { logtryexecuter } from "./tryCatchHandler.js";
await logtryexecuter(mongoose.connect, () => console.log("mongo connect"))(process.env.MONGODB_URI || "");
