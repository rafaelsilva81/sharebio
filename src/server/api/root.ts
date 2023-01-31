import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { slugRouter } from "./routers/slug";
import { linkRouter } from "./routers/links";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  slug: slugRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
