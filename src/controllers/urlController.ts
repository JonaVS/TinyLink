import { CreateUrlDTO, UrlDTO } from "../dto/Url/UrlDtos.js";
import { ActionResult } from "../types/ActionResult.js";
import * as urlService from "../db/services/urlService.js"

export const createUrl = async (payload: CreateUrlDTO):Promise<ActionResult<UrlDTO | null>> => {
  return await urlService.createUrl(payload);
}