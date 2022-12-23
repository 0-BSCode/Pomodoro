import { type Settings } from "@prisma/client";
import { trpc } from "@utils/trpc";
import convertTimeToString from "@_utils/convertTimeToString";
import convertStringToTime from "@_utils/convertStringToTime";
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
  const [display, setDisplay] = useState<string>(convertTimeToString(0));
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  // Initializing timer
  useEffect(() => {
    if (settingsQuery.data) {
      const { pomodoroLength, shortBreakLength, longBreakLength } =
        settingsQuery.data;
      setTimes({ pomodoroLength, shortBreakLength, longBreakLength });
      setDisplay(convertTimeToString(pomodoroLength * 60));
    }
  }, [settingsQuery.data]);

  // Switching tabs
  useEffect(() => {
    setDisplay(convertTimeToString(times[tab] * 60));
  }, [tab]);

  // Ending timer
  useEffect(() => {
    if (timer && convertStringToTime(display) === 0) {
      clearInterval(timer);
      setTimer(null);
      setDisplay(convertTimeToString(times[tab] * 60));
    }
  }, [timer, display]);

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
        onClick={() => {
          if (!timer) {
            const interval = startTimer(
              convertStringToTime(display),
              setDisplay
            );
            setTimer(interval);
          } else {
            clearInterval(timer);
            setTimer(null);
          }
        }}
      >
        {timer ? "Stop" : "Start"}
      </button>
    </section>
  );
};

export default Timer;
