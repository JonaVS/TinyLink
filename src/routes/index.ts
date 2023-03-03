import { Router } from "express";
import shortenerRouter from "./urlRoutes.js";

const router = Router();

router.use("/", shortenerRouter )

export default router;