import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const taskRouter = router({
  fetchTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.task.findMany({
      where: {
        account: {
          userId: ctx.session.user.id,
        },
      },
    });

    return tasks;
  }),
  addTask: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description } = input;

      const userAccount = await ctx.prisma.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!userAccount) {
        throw new Error("Can't find user account");
      }

      const newTask = await ctx.prisma.task.create({
        data: {
          name,
          description,
          accountId: userAccount.id,
        },
      });

      return newTask;
    }),
});
