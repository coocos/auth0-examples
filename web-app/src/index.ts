import fastify from "fastify";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import fastifyView from "@fastify/view";
import ejs from "ejs";

import config from "./config";
import { authPlugin, authRoutes } from "./auth";
import { indexHandler, loginHandler } from "./routes";

const server = fastify({
  logger: true,
});

// Setup session support and templates
server.register(fastifyCookie);
server.register(fastifySession, {
  secret: config.SESSION_SECRET,
  cookieName: "session-cookie",
});
server.register(fastifyView, {
  engine: {
    ejs,
  },
});

// Register auth plugin and related routes
server.register(authPlugin);
server.register(authRoutes);

// Setup app routes
server.get("/", indexHandler);
server.get("/login", loginHandler);

server.listen({ host: config.HOST, port: config.PORT }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
