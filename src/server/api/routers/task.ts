import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ spaceId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.create({
        data: {
          spaceId: input.spaceId,
        },
      });
      return {
        id: task.id,
      };
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const room = await ctx.prisma.task.findUnique({
        where: {
          id: input.id,
        },
      });
      return room;
    }),
});
