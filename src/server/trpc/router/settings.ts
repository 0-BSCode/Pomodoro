import { Settings } from "@prisma/client";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const settingsRouter = router({
  fetchSettings: protectedProcedure.query(async ({ ctx }) => {
    let settings = await ctx.prisma.settings.findFirst({
      where: {
        account: {
          userId: ctx.session.user.id,
        },
      },
    });

    if (!settings) {
      const account = await ctx.prisma.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!account) {
        throw new Error("No account associated with settings");
      }

      settings = await ctx.prisma.settings.create({
        data: {
          accountId: account.id,
          pomodoroLength: 30,
          shortBreakLength: 5,
          longBreakLength: 25,
        },
      });
    }

    return settings;
  }),
  updateSettings: protectedProcedure
    .input(
      z.object({
        pomodoroLength: z.number().nullish(),
        shortBreakLength: z.number().nullish(),
        longBreakLength: z.number().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { pomodoroLength, shortBreakLength, longBreakLength } = input;

      const settings = await ctx.prisma.settings.findFirst({
        where: {
          account: {
            userId: ctx.session.user.id,
          },
        },
      });

      if (!settings) {
        throw new Error("Settings not found");
      }

      const updateObject: Partial<Settings> = {};

      //   TODO: Strict verification (throw errors for invalid values)
      if (pomodoroLength && pomodoroLength > 0) {
        updateObject.pomodoroLength = pomodoroLength;
      }

      if (shortBreakLength && shortBreakLength > 0) {
        updateObject.shortBreakLength = shortBreakLength;
      }

      if (longBreakLength && longBreakLength > 0) {
        updateObject.longBreakLength = longBreakLength;
      }

      const updatedSettings = await ctx.prisma.settings.update({
        where: {
          accountId: settings.accountId,
        },
        data: updateObject,
      });

      return updatedSettings;
    }),
});
