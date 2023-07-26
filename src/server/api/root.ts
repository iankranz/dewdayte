import { exampleRouter } from "@/server/api/routers/example";
import { roomRouter } from "./routers/room";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  room: roomRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
