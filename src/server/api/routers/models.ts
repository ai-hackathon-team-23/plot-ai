import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const modelsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ userId: z.string(), modelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId, modelId } = input;

      const model = await ctx.db.models.findFirst({
        where: { id: modelId, userId: userId || ctx.session.user.id },
      });

      if (!model) {
        throw new Error("Model not found");
      }

      return model;
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        modelName: z.string().min(1),
        modelDescription: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, modelName, modelDescription } = input;

      return ctx.db.models.create({
        data: {
          name: modelName,
          description: modelDescription,
          userId: userId || ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ modelId: z.string(), modelObject: z.object({}) }))
    .mutation(async ({ ctx, input }) => {
      const { modelId, modelObject } = input;

      const updatedModel = await ctx.db.models.update({
        where: { id: modelId },
        data: modelObject,
      });

      return updatedModel;
    }),

  delete: protectedProcedure
    .input(z.object({ modelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { modelId } = input;

      await ctx.db.models.delete({
        where: { id: modelId },
      });

      return { success: true };
    }),
});
