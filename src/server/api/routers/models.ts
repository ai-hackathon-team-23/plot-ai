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

  create: protectedProcedure
    .input(z.object({ user_id: z.string(), model_name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { user_id, model_name } = input;

      return ctx.db.models.create({
        data: {
          name: model_name,
          userId: user_id || ctx.session.user.id,
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
