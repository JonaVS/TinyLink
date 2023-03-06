export const isValidUrlFormat = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    const domainRegex = new RegExp(`^(${process.env.API_DOMAIN}|${process.env.APP_DOMAIN})$`)
    const protocolRegex = new RegExp(/^(https?:)$/i) 
    if (
      parsedUrl.hostname.match(domainRegex) ||
      !parsedUrl.protocol.match(protocolRegex)
    ) {
      return false;
    }

    return true
  } catch (err) {
    return false;
  }
};

export const isValidShortenedUrl = (shortenedUrl: string):boolean => {
  const domain =
    process.env.NODE_ENV === "production"
      ? process.env.API_DOMAIN
      : "localhost:5000"

  const shortenedUrlRegex = new RegExp(`^https?://${domain}/[a-zA-Z0-9]{6}$`, "i");
  return shortenedUrl?.match(shortenedUrlRegex) ? true : false;
}

export const isValidUrlId = (urlId: string): boolean => {
  const urlIdRegex = new RegExp(`^[a-zA-Z0-9]{6}$`);
  return urlId?.match(urlIdRegex) ? true : false;
};