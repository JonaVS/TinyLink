import express from "express";
import { getHelloMessage } from "./controllers/helloController.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessage);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));