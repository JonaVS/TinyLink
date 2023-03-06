import { HydratedDocument } from "mongoose";
import { ActionResult } from "../../types/ActionResult.js";
import { isValidShortenedUrl, isValidUrlFormat } from "../../utils/urlFormatValidator.js";
import { IUrl, Url } from "../models/Url.js";

export const createUrl = async ( urlToShorten:string ): Promise<ActionResult<HydratedDocument<IUrl> | null>> => {
  const result = new ActionResult<HydratedDocument<IUrl> | null>(null);

  try {
    const normalizedUrl = new URL(urlToShorten).toString();
    const urlId = await Url.generateId();
    const shortenedUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.API_DOMAIN}/${urlId}`
        : `http://localhost:5000/${urlId}`

    result.data = await Url.create({
      _id: urlId,
      originalUrl: normalizedUrl,
      shortUrl: shortenedUrl,
    });
    
  } catch (error) {
    result.setError(500, "An error ocurred while creating the shortened URL");
  }

  return result;
};

export const findOriginalUrl = async (shortUrlId:string):Promise<ActionResult<HydratedDocument<IUrl> | null>> => {
  const result = new ActionResult<HydratedDocument<IUrl> | null>(null);
  let dbUrl:HydratedDocument<IUrl> | null = null; 

  /******FIND OPERATION******/
  try {
    dbUrl = await Url.findById(shortUrlId);
    if (!dbUrl) {
      result.setError(404, "Invalid shortened URL id");
      return result;
    }
  } catch (error) {
    result.setError(500, "An error ocurred while fetching the shortened URL");
    return result;
  }

  /******CLICK COUNT INCREASE OPERATION******/
  /*
    If the above code is successful the server is able to redirect the user, 
      so, if the click count increase for some reason fails, 
      the server just catch and logs the error and proceed with the redirection.
  */
    try {  
     dbUrl.clickCount++;
     await dbUrl.save();
    } catch (error) {
      console.log(
        `The click count increase for the shortUrl: ${dbUrl.shortUrl} with id: ${dbUrl._id} failed`
      );
    }

  result.data = dbUrl; 
  return result
}

export const findUrlByShortUrl = async (shortUrl: string):Promise<ActionResult<HydratedDocument<IUrl> | null>> => {
  const result = new ActionResult<HydratedDocument<IUrl> | null>(null);

  if (!isValidShortenedUrl(shortUrl)) {
    result.setError(400, "Invalid shortened URL format")
    return result;
  }

  const urlId = shortUrl.split('/').pop();

  try {
    result.data = await Url.findById(urlId);
    if (!result.data) {
      result.setError(404, "Invalid shortened URL");
      return result;
    }
  } catch (error) {
    result.setError(500, "An error ocurred while fetching the URL data");
  }

  return result;
}