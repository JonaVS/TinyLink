import { HydratedDocument } from "mongoose";
import { IUrl } from "../../db/models/Url.js";
import { OriginalUrlDTO, UrlClickCountDTO, UrlDTO } from "./UrlDtos.js";

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

export const toOriginalUrlDto = (url: HydratedDocument<IUrl>): OriginalUrlDTO => {
  return {
    originalUrl: url.originalUrl
  }
}

export const toUrlClickCountDto = (url: HydratedDocument<IUrl>): UrlClickCountDTO => {
  return {
    shortUrl: url.shortUrl,
    clickCount: url.clickCount
  }
}