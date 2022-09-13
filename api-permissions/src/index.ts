import fastify from "fastify";
import fastifyAuthVerify from "fastify-auth0-verify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { scopePlugin } from "./auth";

import config from "./config";
import { itemRoutes } from "./routes";

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyAuthVerify, {
  domain: config.AUTH0_DOMAIN,
  audience: config.API_IDENTIFIER,
});
server.register(scopePlugin);
server.register(itemRoutes);

server.listen({ host: config.HOST, port: config.PORT }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
