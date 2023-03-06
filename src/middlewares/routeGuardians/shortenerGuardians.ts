import { body } from "express-validator";
import { isValidUrlFormat } from "./helpers/urlFormatValidator.js";

export const createUrlRequestGuardian  = body("urlToShorten")
  .exists()
  .withMessage("Invalid payload")
  .custom((url) => isValidUrlFormat(url))
  .withMessage("Invalid URL format");