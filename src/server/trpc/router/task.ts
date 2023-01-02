import { type Task } from "@prisma/client";
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

      if (!name.length) {
        throw new Error("Task should have a name");
      }

      const newTask = await ctx.prisma.task.create({
        data: {
          name,
          description: description && description.length ? description : null,
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
          account: {
            userId: ctx.session.user.id,
          },
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      await ctx.prisma.task.delete({
        where: {
          id: taskId,
        },
      });

      return taskId;
    }),
  editTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        name: z.string().nullish(),
        description: z.string().nullish(),
        isFinished: z.boolean().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { taskId, name, description, isFinished } = input;

      const task = await ctx.prisma.task.findFirst({
        where: {
          id: taskId,
          account: {
            userId: ctx.session.user.id,
          },
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      const updateObject: Partial<Task> = {};

      if (name?.length) {
        updateObject.name = name;
      }

      if (description?.length) {
        updateObject.description = description;
      }

      if (typeof isFinished === "boolean") {
        updateObject.isFinished = isFinished;
      }

      const updatedTask = await ctx.prisma.task.update({
        where: {
          id: taskId,
        },
        data: updateObject,
      });

      return updatedTask;
    }),
});
