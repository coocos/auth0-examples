import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

export default {
  HOST: env.HOST ?? "localhost",
  PORT: parseInt(env.PORT ?? "3000", 10),
  SESSION_SECRET: env.SESSION_SECRET ?? "set a proper secret",
  CLIENT_ID: env.CLIENT_ID ?? "your client id should go here",
  CLIENT_SECRET: env.CLIENT_SECRET ?? "your client secret should go here",
  REDIRECT_URI: env.REDIRECT_URI ?? "https://localhost/callback",
  LOGOUT_URI: env.LOGOUT_URI ?? "https://localhost",
  AUTH0_DOMAIN: env.AUTH0_DOMAIN ?? "your Auth0 domain should go here",
};
