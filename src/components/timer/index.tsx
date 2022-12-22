import { type Settings } from "@prisma/client";
import { trpc } from "@utils/trpc";
import formatTime from "@_utils/formatTime";
import startTimer from "@_utils/startTimer";
import React, { useEffect, useState } from "react";

type Timers = Omit<Settings, "accountId">;

enum TimerKeys {
  POMODORO = "pomodoroLength",
  SHORT_BREAK = "shortBreakLength",
  LONG_BREAK = "longBreakLength",
}

const Timer = () => {
  const settingsQuery = trpc.settings.fetchSettings.useQuery();
  const [times, setTimes] = useState<Timers>({} as Timers);
  const [tab, setTab] = useState<TimerKeys>(TimerKeys.POMODORO);
  const [display, setDisplay] = useState<string>(formatTime(0, 0, 0));

  useEffect(() => {
    if (settingsQuery.data) {
      const { pomodoroLength, shortBreakLength, longBreakLength } =
        settingsQuery.data;
      setTimes({ pomodoroLength, shortBreakLength, longBreakLength });
      setDisplay(formatTime(0, pomodoroLength, 0));
    }
  }, [settingsQuery.data]);

  useEffect(() => {
    setDisplay(formatTime(0, times[tab], 0));
  }, [tab]);

  return (
    <section>
      {Object.keys(TimerKeys).map((key) => (
        <button
          key={key}
          onClick={() => {
            setTab(TimerKeys[key as keyof typeof TimerKeys]);
          }}
          className={
            tab === TimerKeys[key as keyof typeof TimerKeys]
              ? "bg-cGray-300"
              : ""
          }
        >
          {key}
        </button>
      ))}
      {times && <h3>{display}</h3>}
      <button
        onClick={() => startTimer(times ? times[tab] * 60 : 0, setDisplay)}
      >
        Start
      </button>
    </section>
  );
};

export default Timer;
