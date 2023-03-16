import { body, param } from "express-validator";
import { isServiceDomain, isValidShortenedUrl, isValidUrlId, } from "./helpers/urlFormatValidator.js";

export const createUrlRequestGuardian  = body("urlToShorten")
  .exists()
  .withMessage("Invalid payload")
  .isURL()
  .withMessage("Invalid URL format")
  .custom((url) => isServiceDomain(url))
  .withMessage("Invalid URL format");

export const usageCountRequestGuardian = param("*")
  .notEmpty()
  .withMessage("A shortened URL must be provided as route param")
  .custom((shortenedUrl) => isValidShortenedUrl(shortenedUrl))
  .withMessage("Invalid shortened URL format");

/*
  This validation can save some database calls if URL ids doesnt match the expected pattern.
  Also, error messages are not needed here 
    since the user is going to be redirected to a 404 page on the frontend app
*/  
export const redirectRequestGuardian = param("id")
  .exists()
  .custom((urlId) => isValidUrlId(urlId));