import { IUrl } from "../../db/models/Url.js";

export type CreateUrlDTO = {
  urlToShorten: string;
};

export type UrlDTO = Omit<IUrl, "_id"> & {
  id: string
};

export type OriginalUrlDTO = {
  originalUrl: string
}

export type UrlClickCountDTO = Pick<IUrl, "shortUrl" | "clickCount">