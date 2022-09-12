import { Issuer, generators, BaseClient } from "openid-client";
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

import config from "../config";

// Extend fastify default types with the properties set by the plugin
declare module "fastify" {
  interface FastifyInstance {
    authClient: BaseClient;
  }
  interface Session {
    user?: {
      name?: string;
    };
    verifier?: string;
  }
}

const plugin: FastifyPluginCallback = async (fastify, options) => {
  // Discover client configuration via Auth0 /.well-known/openid-configuration
  const issuer = await Issuer.discover(`https://${config.AUTH0_DOMAIN}`);
  const client = new issuer.Client({
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    redirect_uris: [config.REDIRECT_URI],
    response_types: ["code"],
  });

  // Attach the configured client to the fastify instance for easy access
  fastify.decorate("authClient", client);

  // Attach generated code challenge verifier to session if needed
  fastify.addHook("preHandler", (request, reply, done) => {
    if (!request.session.verifier) {
      request.session.verifier = generators.codeVerifier();
    }
    done();
  });
};

export const authPlugin = fp(plugin);
