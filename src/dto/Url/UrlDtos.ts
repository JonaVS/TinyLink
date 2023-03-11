import { IUrl } from "../../db/models/Url.js";

export type CreateUrlDTO = {
  urlToShorten: string;
};

export type UrlDTO = Pick<IUrl, "shortUrl">;

export type OriginalUrlDTO = {
  originalUrl: string
}

export type UrlClickCountDTO = Pick<IUrl, "shortUrl" | "clickCount">