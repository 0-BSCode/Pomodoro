import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { taskRouter } from "./task";
import { settingsRouter } from "./settings";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  task: taskRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
