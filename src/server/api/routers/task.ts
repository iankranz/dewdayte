import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ spaceId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.create({
        data: {
          spaceId: input.spaceId,
          dueCategory: "TODAY",
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
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().max(100).optional(),
        dueCategory: z.enum(["TODAY", "THIS_WEEK", "THIS_MONTH"]),
        description: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          dueCategory: input.dueCategory,
          description: input.description,
        },
      });
      return task;
    }),
});
