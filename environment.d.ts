export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string,
      API_DOMAIN: string,
      APP_DOMAIN: string,
      NODE_ENV: string
    }
  }
}