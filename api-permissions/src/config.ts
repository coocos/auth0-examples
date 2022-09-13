import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

export default {
  HOST: env.HOST ?? "localhost",
  PORT: parseInt(env.PORT ?? "3000"),
  AUTH0_DOMAIN: env.AUTH0_DOMAIN,
  API_IDENTIFIER: env.API_IDENTIFIER,
};
