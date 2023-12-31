import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const spaceRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const space = await ctx.prisma.space.create({
        data: {
          name: input.name,
        },
      });
      return {
        id: space.id,
      };
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const room = await ctx.prisma.space.findUnique({
        where: {
          id: input.id,
        },
      });
      return room;
    }),
  getDayTasks: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tasks = await ctx.prisma.task.findMany({
        where: { spaceId: input.id, dueCategory: "TODAY", status: "ACTIVE" },
        orderBy: { name: "asc" },
      });
      return { tasks };
    }),
  getWeekTasks: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tasks = await ctx.prisma.task.findMany({
        where: {
          spaceId: input.id,
          dueCategory: "THIS_WEEK",
          status: "ACTIVE",
        },
        orderBy: { name: "asc" },
      });
      return { tasks };
    }),
  getMonthTasks: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tasks = await ctx.prisma.task.findMany({
        where: {
          spaceId: input.id,
          dueCategory: "THIS_MONTH",
          status: "ACTIVE",
        },
        orderBy: { name: "asc" },
      });
      return { tasks };
    }),
});
