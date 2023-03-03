export const isValidUrlFormat = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    const domainRegex = new RegExp(`^(${process.env.API_DOMAIN}|${process.env.APP_DOMAIN})$`) 
    if (parsedUrl.hostname.match(domainRegex)) {
      return false;
    }

    return true
  } catch (err) {
    return false;
  }
};