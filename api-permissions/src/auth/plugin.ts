import {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
} from "fastify";
import fp from "fastify-plugin";
import { Forbidden } from "http-errors";

// Extend fastify instance type definition with custom decorator
declare module "fastify" {
  interface FastifyInstance {
    requiredScopes: (...required: string[]) => ScopeHandler;
  }
}

// Extend token definition with example content
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      scope: string;
    };
  }
}

type ScopeHandler = (
  request: FastifyRequest,
  reply: FastifyReply
) => Promise<void>;

function requiredScopes(...required: string[]): ScopeHandler {
  return async (request, reply) => {
    const userScopes = request.user.scope.split(" ");
    for (const scope of required) {
      if (!userScopes.includes(scope)) {
        throw new Forbidden("Insufficient scopes");
      }
    }
  };
}

const unwrappedScopePlugin: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.decorate("requiredScopes", requiredScopes);
  done();
};

export const scopePlugin = fp(unwrappedScopePlugin);
