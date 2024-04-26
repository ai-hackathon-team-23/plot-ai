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

  getAll: protectedProcedure
    .input(z.object({ user_id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.models.findMany({
        where: { userId: input.user_id || ctx.session.user.id },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        modelName: z.string().min(1),
        description: z.string().max(150),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, modelName, description } = input;

      return ctx.db.models.create({
        data: {
          name: modelName,
          userId: userId || ctx.session.user.id,
          description: description,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ modelId: z.string(), modelObject: z.array([]) }))
    .mutation(async ({ ctx, input }) => {
      const { modelId, modelObject } = input;

      const updatedModel = await ctx.db.models.update({
        where: { id: modelId },
        data: JSON.stringify(modelObject),
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
