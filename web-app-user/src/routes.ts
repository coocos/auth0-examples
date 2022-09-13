import path from "path";

import { RouteHandlerMethod } from "fastify";
import { generators } from "openid-client";

export const indexHandler: RouteHandlerMethod = (request, reply) => {
  if (request.session.user) {
    const template = path.join("templates", "index.ejs");
    reply.view(template, {
      user: request.session.user,
    });
  } else {
    reply.redirect("/login");
  }
};

export const loginHandler: RouteHandlerMethod = async (request, reply) => {
  if (!request.server.authClient || !request.session.verifier) {
    request.server.log.error("Auth plugin configuration error");
    throw new Error("Auth plugin configuration error");
  }
  const template = path.join("templates", "login.ejs");
  return reply.view(template, {
    authorizationUrl: request.server.authClient.authorizationUrl({
      scope: "openid profile",
      code_challenge: generators.codeChallenge(request.session.verifier),
      code_challenge_method: "S256",
    }),
  });
};
