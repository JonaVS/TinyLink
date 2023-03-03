import { Response, Router } from "express";
import { CreateRequest } from "../types/Requests.js";
import { CreateUrlDTO } from "../dto/Url/UrlDtos.js";
import * as urlController from "../controllers/urlController.js"

const shortenerRouter = Router();

shortenerRouter.post(
  "/shortener",
  async (req: CreateRequest<CreateUrlDTO>, res: Response) => {
    const result = await urlController.createUrl(req.body);

    if (!result.success) {
      res.status(result.errorCode!).json({ error: result.error });
    } else {
      res.status(200).json(result.data);
    }
  }
);

export default shortenerRouter;
