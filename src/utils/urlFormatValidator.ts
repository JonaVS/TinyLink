export const isValidUrlFormat = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname === process.env.API_DOMAIN ||
      parsedUrl.hostname === process.env.APP_DOMAIN
    ) {
      return false;
    }

    return true
  } catch (err) {
    return false;
  }
};