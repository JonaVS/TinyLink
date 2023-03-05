import { CreateUrlDTO, OriginalUrlDTO, UrlClickCountDTO, UrlDTO } from "../../dto/Url/UrlDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import * as urlDal from '../dal/urlDal.js'
import { HydratedDocument } from "mongoose";
import { IUrl } from "../models/Url.js";
import { toOriginalUrlDto, toUrlClickCountDto, toUrlDto } from "../../dto/Url/urlDtoMappers.js";
import { toServiceActionResult } from "./helpers/toServiceActionResult.js";

export const createUrl = async (payload: CreateUrlDTO):Promise<ActionResult<UrlDTO | null>> => {
  const dbResult = await urlDal.createUrl(payload.urlToShorten);

  const serviceResult = toServiceActionResult<HydratedDocument<IUrl>, UrlDTO>(
    dbResult,
    toUrlDto
  ) as ActionResult<UrlDTO | null>;

  return serviceResult;
}

export const findOriginalUrl = async (shortUrlId:string):Promise<ActionResult<OriginalUrlDTO | null>> => {
  const dbResult = await urlDal.findOriginalUrl(shortUrlId);

  const serviceResult = toServiceActionResult<HydratedDocument<IUrl>, OriginalUrlDTO>(
    dbResult,
    toOriginalUrlDto
  ) as ActionResult<OriginalUrlDTO | null>;

  return serviceResult;
}

export const getUrlClickCount = async (shortUrl: string):Promise<ActionResult<UrlClickCountDTO | null>> => {
  const dbResult = await urlDal.findUrlByShortUrl(shortUrl);

  const serviceResult = toServiceActionResult<HydratedDocument<IUrl>, UrlClickCountDTO>(
    dbResult,
    toUrlClickCountDto
  ) as ActionResult<UrlClickCountDTO | null>;

  return serviceResult;
}