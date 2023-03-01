import { config } from "dotenv";
config();
import express from "express";
import { getHelloMessage } from "./controllers/helloController.js";
import mongoose from "mongoose";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessage);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
} catch (error) {
  console.error(error);
}