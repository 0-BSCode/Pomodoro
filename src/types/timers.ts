import { type Settings } from "@prisma/client";

export type Timers = Omit<Settings, "accountId">;
