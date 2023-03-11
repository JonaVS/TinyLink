import { Request, Response, Router } from "express";
import { clickCountRequestGuardian, createUrlRequestGuardian, redirectRequestGuardian  } from "../middlewares/routeGuardians/shortenerGuardians.js";
import { validationResult as guardianResult } from "express-validator";
import { CreateRequest, RequestById } from "../types/Requests.js";
import { CreateUrlDTO } from "../dto/Url/UrlDtos.js";
import * as urlController from "../controllers/urlController.js"

const shortenerRouter = Router();

shortenerRouter.post(
  "/shortener",
  createUrlRequestGuardian,
  async (req: CreateRequest<CreateUrlDTO>, res: Response) => {
    const inputValidationErrors = guardianResult(req);
 
    if (!inputValidationErrors.isEmpty()) {
      res.status(400).json({errors: inputValidationErrors.array().map(err => err.msg)});
      return
    }
  
    const result = await urlController.createUrl(req.body);

    if (!result.success) {
      res.status(result.errorCode!).json({ error: result.error });
    } else {
      res.status(200).json(result.data);
    }
  }
);

shortenerRouter.get(
  "/clickcount/*",
  clickCountRequestGuardian,
  async (req: Request, res: Response) => {
    const inputValidationErrors = guardianResult(req);

    if (!inputValidationErrors.isEmpty()) {
      res.status(400).json({errors: inputValidationErrors.array().map(err => err.msg)});
      return
    }

    const result = await urlController.getUrlClickCount(req.params[0]);

    if (!result.success) {
      res.status(result.errorCode!).json({ error: result.error });
    } else {
      res.status(200).json(result.data);
    }
  }
);

shortenerRouter.get(
  "/:id",
  redirectRequestGuardian,
  async (req: RequestById, res: Response) => {
    const inputValidationErrors = guardianResult(req);

    if (!inputValidationErrors.isEmpty()) {
      /*
        This response is temporal. The real one will redirect to a frontend special 404 page
      */
      res.status(404).json({errors: inputValidationErrors.array()});
      return
    }

    const result = await urlController.findOrinalUrl(req.params.id);
    /*
     Prevents browsers for using cache with the shortened URLs
     This is needed to keep track of shortened URLs clicks count.
     The downside of this is that the db is going to get called everytime.
    */
    res.setHeader('Cache-Control', 'no-cache');

    if (!result.success) {
      /*
        This response is temporal. The real one will redirect to a frontend special 404 page
      */
      res.status(result.errorCode!).json({ error: result.error });
    } else {
      res.redirect(301, result.data!.originalUrl)
    }
  }
);

export default shortenerRouter;
