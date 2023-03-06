import { body, param } from "express-validator";
import { isValidUrlFormat, isValidShortenedUrl, } from "./helpers/urlFormatValidator.js";

export const createUrlRequestGuardian  = body("urlToShorten")
  .exists()
  .withMessage("Invalid payload")
  .custom((url) => isValidUrlFormat(url))
  .withMessage("Invalid URL format");

export const clickCountRequestGuardian = param("*")
  .notEmpty()
  .withMessage("A shortened URL must be provided as route param")
  .custom((shortenedUrl) => isValidShortenedUrl(shortenedUrl))
  .withMessage("Invalid shortened URL format");