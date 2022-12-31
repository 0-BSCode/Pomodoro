import { type Settings } from "@prisma/client";
import { trpc } from "@utils/trpc";
import convertTimeToString from "@_utils/convertTimeToString";
import convertStringToTime from "@_utils/convertStringToTime";
import startTimer from "@_utils/startTimer";
import React, { useEffect, useState } from "react";
import parseTimerKey from "@_utils/parseTimerKey";
import skipDisabledIcon from "public/images/skip-disabled.svg";
import skipIcon from "public/images/skip.svg";
import settingsIcon from "public/images/setting.svg";

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
    <section className="mt-14 flex flex-col gap-6">
      <div className="flex justify-between">
        {Object.keys(TimerKeys).map((key) => (
          <button
            key={key}
            onClick={() => {
              setTab(TimerKeys[key as keyof typeof TimerKeys]);
            }}
            className={
              "chip " +
              (tab === TimerKeys[key as keyof typeof TimerKeys]
                ? "btn--contained"
                : "btn--outlined")
            }
          >
            {parseTimerKey(key)}
          </button>
        ))}
      </div>
      {times && <h3 className="text-center text-7xl">{display}</h3>}
      <div className="flex justify-center gap-8">
        <button
          className={
            "rounded-lg py-1 px-5" +
            (timer
              ? " btn--outlined"
              : " btn--contained border-2 border-cGray-500")
          }
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
        <button className="p-0 shadow-none">
          <img src={timer ? skipIcon.src : skipDisabledIcon.src} alt={"Skip"} />
        </button>
        <button className="p-0 shadow-none">
          <img src={settingsIcon.src} alt={"Skip"} />
        </button>
      </div>
    </section>
  );
};

export default Timer;
