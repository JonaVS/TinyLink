import { Request, Response, Router } from "express";
import { usageCountRequestGuardian, createUrlRequestGuardian, redirectRequestGuardian  } from "../middlewares/routeGuardians/shortenerGuardians.js";
import { validationResult as guardianResult } from "express-validator";
import { CreateRequest, RequestById } from "../types/Requests.js";
import { CreateUrlDTO } from "../dto/Url/UrlDtos.js";
import * as urlController from "../controllers/urlController.js"

const shortenerRouter = Router();

const appBaseUrl =
  process.env.NODE_ENV === "production"
  ? `https://${process.env.APP_DOMAIN}`
  : `http://localhost:5173`

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
      res.status(result.errorCode!).json({ errors: [result.error] });
    } else {
      res.status(201).json(result.data);
    }
  }
);

shortenerRouter.get(
  "/usageCount/*",
  usageCountRequestGuardian,
  async (req: Request, res: Response) => {
    const inputValidationErrors = guardianResult(req);

    if (!inputValidationErrors.isEmpty()) {
      res.status(400).json({errors: inputValidationErrors.array().map(err => err.msg)});
      return
    }

    const result = await urlController.getUrlUsageCount(req.params[0]);

    if (!result.success) {
      res.status(result.errorCode!).json({ errors: [result.error] });
    } else {
      res.status(200).json(result.data);
    }
  }
);

shortenerRouter.get("/", async (req: Request, res: Response) => {
  res.redirect(301, appBaseUrl);
});

shortenerRouter.get(
  "/:id",
  redirectRequestGuardian,
  async (req: RequestById, res: Response) => {
    const inputValidationErrors = guardianResult(req);
    /*
     Prevents browsers for using cache with the shortened URLs
     This is needed to keep track of shortened URLs clicks count.
     The downside of this is that the db is going to get called everytime.
    */
    res.setHeader('Cache-Control', 'no-cache');
    
    if (!inputValidationErrors.isEmpty()) {
      res.redirect(301, `${appBaseUrl}/404`)
      return
    }

    const result = await urlController.findOrinalUrl(req.params.id);

    if (!result.success) {
      res.redirect(301, `${appBaseUrl}/404`)
    } else {
      res.redirect(301, result.data!.originalUrl)
    }
  }
);

export default shortenerRouter;
