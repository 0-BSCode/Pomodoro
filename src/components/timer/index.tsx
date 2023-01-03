import { trpc } from "@utils/trpc";
import convertTimeToString from "@_utils/convertTimeToString";
import convertStringToTime from "@_utils/convertStringToTime";
import startTimer from "@_utils/startTimer";
import React, { useEffect, useState } from "react";
import parseTimerKey from "@_utils/parseTimerKey";
import icons from "@assets/images/icons";
import SettingsModal from "@components/settings/Modal";
import { type Timers } from "types/timers";
import { TimerKeys } from "types/enums/timerKeys";

const Timer = () => {
  const settingsQuery = trpc.settings.fetchSettings.useQuery();
  const [times, setTimes] = useState<Timers | undefined>(undefined);
  const [tab, setTab] = useState<TimerKeys>(TimerKeys.POMODORO);
  const [display, setDisplay] = useState<string>(convertTimeToString(0));
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

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
    if (times) {
      setDisplay(convertTimeToString(times[tab] * 60));
    }
  }, [tab]);

  // Ending timer
  useEffect(() => {
    if (timer && convertStringToTime(display) === 0 && times) {
      clearInterval(timer);
      setTimer(null);
      setDisplay(convertTimeToString(times[tab] * 60));
    }
  }, [timer, display]);

  return (
    <>
      {openSettings && (
        <SettingsModal
          onClose={() => {
            setOpenSettings(false);
            settingsQuery.refetch();
          }}
        />
      )}
      <section className="flex flex-col gap-6">
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
          <button className="p-0 shadow-none" disabled={!timer}>
            <img
              src={timer ? icons.skipIcon : icons.skipDisabledIcon}
              alt={"Skip"}
            />
          </button>
          <button
            className="p-0 shadow-none"
            onClick={(e) => {
              e.preventDefault();
              setOpenSettings(true);
            }}
          >
            <img src={icons.settingsIcon} alt={"Skip"} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Timer;
