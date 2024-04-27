import { postRouter } from "~/server/api/routers/post";
import { modelsRouter } from "~/server/api/routers/models";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { propertySearchRouter } from "./routers/propertySearch";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  models: modelsRouter,
  propertySearch: propertySearchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
