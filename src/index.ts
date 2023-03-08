import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.use("/", router)

try {
  await mongoose.connect(
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URL
      : process.env.DEV_MONGO_URL
  );
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
} catch (error) {
  console.error(error);
}