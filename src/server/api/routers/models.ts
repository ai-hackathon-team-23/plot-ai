import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const modelsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ user_id: z.string(), model_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { user_id, model_id } = input;

      const model = await ctx.db.models.findFirst({
        where: { id: model_id, userId: user_id || ctx.session.user.id },
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
    .input(z.object({ model_id: z.string(), model_object: z.object({}) }))
    .mutation(async ({ ctx, input }) => {
      const { model_id, model_object } = input;

      const updatedModel = await ctx.db.models.update({
        where: { id: model_id },
        data: model_object,
      });

      return updatedModel;
    }),

  delete: protectedProcedure
    .input(z.object({ model_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { model_id } = input;

      await ctx.db.models.delete({
        where: { id: model_id },
      });

      return { success: true };
    }),
});
