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
  deleteTask: protectedProcedure
    .input(
      z
        .object({
          taskId: z.string(),
        })
        .required()
    )
    .mutation(async ({ input, ctx }) => {
      const { taskId } = input;

      const task = await ctx.prisma.task.findFirst({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      const userAccount = await ctx.prisma.account.findFirst({
        where: {
          // TODO: Fix bc a user can have multiple accounts
          userId: ctx.session.user.id,
        },
      });

      if (!userAccount) {
        throw new Error("Could not retrieve account information");
      }

      if (userAccount.id !== task.accountId) {
        throw new Error("Task not associated with current account");
      }

      await ctx.prisma.task.delete({
        where: {
          id: taskId,
        },
      });

      return taskId;
    }),
});
