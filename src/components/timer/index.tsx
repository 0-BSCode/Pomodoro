import { trpc } from "@utils/trpc";
import convertTimeToString from "@_utils/convertTimeToString";
import convertStringToTime from "@_utils/convertStringToTime";
import React, { useEffect, useState } from "react";
import parseTimerKey from "@_utils/parseTimerKey";
import icons from "@assets/images/icons";
import SettingsModal from "@components/settings/Modal";
import { type Timers } from "types/timers";
import { TimerKeys } from "types/enums/timerKeys";
import { AlarmSounds } from "types/enums/alarmSounds";
import useLocalStorage from "@_hooks/useLocalStorage";
import { useTimerContext } from "@context/timerContext";
import { TimerStatus } from "types/enums/timerStatus";

const Timer = () => {
  const [times, setTimes] = useState<Timers | undefined>(undefined);
  const [tab, setTab] = useState<TimerKeys>(TimerKeys.POMODORO);
  // const [display, setDisplay] = useState<string>(convertTimeToString(0));
  // const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const { getItem, setItem } = useLocalStorage();
  const {
    display,
    setDisplay,
    setTitleDisplay,
    timer,
    startTimer,
    stopTimer,
    status,
  } = useTimerContext();
  const settingsQuery = trpc.settings.fetchSettings.useQuery();

  // Initializing timer
  useEffect(() => {
    if (settingsQuery.data) {
      const { pomodoroLength, shortBreakLength, longBreakLength } =
        settingsQuery.data;
      setTimes({ pomodoroLength, shortBreakLength, longBreakLength });
    }

    const currentTab =
      (getItem("currentTab") as TimerKeys) ?? TimerKeys.POMODORO;

    setTab(currentTab);
  }, [settingsQuery.data]);

  // Switching tabs
  useEffect(() => {
    if (status !== TimerStatus.STOPPED) return;

    if (times) {
      setDisplay(convertTimeToString(times[tab] * 60));
    }

    // TODO: Pass enum as param
    setItem<string>("currentTab", tab);
  }, [tab, times]);

  // Ending timer
  useEffect(() => {
    if (timer && convertStringToTime(display) === 0 && times) {
      stopTimer(TimerStatus.STOPPED);

      // Play alarm sound
      const audioElem = document.getElementById(
        "audio-player-timer"
      ) as HTMLAudioElement;
      audioElem.volume = (settingsQuery.data?.volume ?? 50) / 100;
      audioElem.play();

      let newTab = TimerKeys.POMODORO;
      // Switch tabs
      switch (tab) {
        case TimerKeys.POMODORO: {
          const longBreakInterval = settingsQuery.data?.longBreakInterval ?? 4;
          const sessionNumber =
            (parseInt(getItem("sessionNumber") ?? "0") + 1) % longBreakInterval;

          if (sessionNumber) {
            newTab = TimerKeys.SHORT_BREAK;
          } else {
            newTab = TimerKeys.LONG_BREAK;
          }

          setItem<number>("sessionNumber", sessionNumber);
          break;
        }
      }

      setTab(newTab);
      setDisplay(convertTimeToString(times[newTab] * 60));

      // TODO: Pass enum as param
      setItem<string>("currentTab", newTab);
    }

    if (status !== TimerStatus.STOPPED) {
      setTitleDisplay(display);
    } else {
      setTitleDisplay(undefined);
    }
  }, [timer, display]);

  // Confirm before reload while timer is running
  useEffect(() => {
    if (window && timer) {
      window.onbeforeunload = () => {
        return "";
      };
    } else {
      window.onbeforeunload = null;
    }
  }, [timer, window]);

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
      <audio
        id="audio-player-timer"
        src={
          AlarmSounds[
            settingsQuery.data?.alarmSound as keyof typeof AlarmSounds
          ] as string
        }
      />
      <audio id="audio-player-btn" src="/sounds/mouse-click.mp3" />
      <section className="flex flex-col gap-6">
        <div className="flex justify-between">
          {Object.keys(TimerKeys).map((key) => (
            <button
              key={key}
              onClick={() => {
                if (status !== TimerStatus.STOPPED) {
                  if (confirm("This will reset the timer. Continue?")) {
                    setDisplay(convertTimeToString(0));
                    setTab(TimerKeys[key as keyof typeof TimerKeys]);
                    stopTimer(TimerStatus.STOPPED);
                  }
                } else {
                  setTab(TimerKeys[key as keyof typeof TimerKeys]);
                }
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
                ? " btn--outlined shadow-none"
                : " btn--contained border-2 border-cGray-500")
            }
            onClick={() => {
              const audioElem = document.getElementById(
                "audio-player-btn"
              ) as HTMLAudioElement;
              audioElem.volume = 1;
              audioElem.play();
              if (!timer) {
                startTimer(convertStringToTime(display));
              } else {
                stopTimer(TimerStatus.PAUSED);
              }
            }}
          >
            {timer ? "Stop" : "Start"}
          </button>
          <button
            className="p-0 shadow-none"
            disabled={!timer}
            onClick={(e) => {
              e.preventDefault();

              if (
                confirm(
                  "Timer will be reset. Are you sure you want to do this?"
                )
              ) {
                setDisplay(convertTimeToString(0));
              }
            }}
          >
            <img
              src={timer ? icons.skipIcon : icons.skipDisabledIcon}
              alt={"Skip"}
              className="w-8"
            />
          </button>
          <button
            className="p-0 shadow-none"
            onClick={(e) => {
              e.preventDefault();
              setOpenSettings(true);
            }}
          >
            <img src={icons.settingsIcon} alt={"Skip"} className="w-8" />
          </button>
        </div>
      </section>
    </>
  );
};

export default Timer;
