import { CreateUrlDTO, UrlDTO } from "../../dto/Url/UrlDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import * as urlDal from '../dal/urlDal.js'
import { HydratedDocument } from "mongoose";
import { IUrl } from "../models/Url.js";
import { toUrlDto } from "../../dto/Url/urlDtoMappers.js";
import { toServiceActionResult } from "./helpers/toServiceActionResult.js";

export const createUrl = async (payload: CreateUrlDTO):Promise<ActionResult<UrlDTO | null>> => {
  const dbResult = await urlDal.createUrl(payload.urlToShorten);

  const serviceResult = toServiceActionResult<HydratedDocument<IUrl>, UrlDTO>(
    dbResult,
    toUrlDto
  ) as ActionResult<UrlDTO | null>;

  return serviceResult;
}