import { HydratedDocument } from "mongoose";
import { IUrl } from "../../db/models/Url.js";
import { UrlDTO } from "./UrlDtos.js";

export const toUrlDto = (createdUrl: HydratedDocument<IUrl>): UrlDTO => {
  return {
    id: createdUrl._id,
    originalUrl: createdUrl.originalUrl,
    shortUrl: createdUrl.shortUrl,
    clickCount: createdUrl.clickCount,
    createdAt: createdUrl.createdAt,
    updatedAt: createdUrl.updatedAt,
  };
};