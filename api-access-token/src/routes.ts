import { Type } from "@sinclair/typebox";
import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";

import { addItem, readItems } from "./db";

export const itemRoutes: FastifyPluginCallbackTypebox = (
  fastify,
  opts,
  done
) => {
  fastify.get(
    "/items",
    {
      preHandler: [fastify.authenticate, fastify.requiredScopes("read:items")],
    },
    async (request, reply) => {
      const items = await readItems();
      return items;
    }
  );

  fastify.post(
    "/items",
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
        }),
      },
      preHandler: async (request, reply) => {
        await fastify.authenticate(request, reply);
        await fastify.requiredScopes("add:items")(request, reply);
      },
    },
    async (request, reply) => {
      const item = {
        name: request.body.name,
      };
      await addItem(item);
      return item;
    }
  );

  done();
};
