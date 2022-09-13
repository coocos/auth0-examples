import { FastifyPluginCallback, RouteHandlerMethod } from "fastify";

import config from "../config";

// Called when user logs out
const logoutHandler: RouteHandlerMethod = async (request, reply) => {
  await request.session.destroy();
  const params = new URLSearchParams({
    returnTo: config.LOGOUT_URI,
    client_id: config.CLIENT_ID,
  });
  const logoutUrl = `https://${config.AUTH0_DOMAIN}/v2/logout/?${params}`;
  await reply.redirect(logoutUrl);
};

// Called after user has authenticated to the authorization server
const callbackHandler: RouteHandlerMethod = async (request, reply) => {
  if (!request.server.authClient) {
    request.server.log.error("Auth plugin configuration error");
    throw new Error("Auth plugin configuration error");
  }
  const tokenSet = await request.server.authClient.callback(
    config.REDIRECT_URI,
    request.server.authClient.callbackParams(request.raw),
    {
      code_verifier: request.session.verifier,
    }
  );
  const userInfo = await request.server.authClient.userinfo(tokenSet);
  request.session.user = userInfo;
  await reply.redirect("/");
};

export const authRoutes: FastifyPluginCallback = async (fastify, options) => {
  fastify.get("/logout", logoutHandler);
  fastify.get("/callback", callbackHandler);
};
