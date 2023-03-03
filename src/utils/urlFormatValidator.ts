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