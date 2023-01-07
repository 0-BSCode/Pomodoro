import Modal from "@components/_common/modal";
import React, { useEffect, useState } from "react";
import icons from "@assets/images/icons";
import { type Timers } from "types/timers";
import { TimerKeys } from "types/enums/timerKeys";
import { trpc } from "@utils/trpc";
import parseTimerKey from "@_utils/parseTimerKey";
import { AlarmSounds } from "types/enums/alarmSounds";

const TKeys = Object.keys(TimerKeys);

interface Props {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: Props) => {
  const [timers, setTimers] = useState<Timers | undefined>(undefined);
  const [longBreakInterval, setLongBreakInterval] = useState<number>(0);
  const [alarmSound, setAlarmSound] = useState<string | undefined>(undefined);
  const [alarmSoundInitChange, setAlarmSoundInitChange] =
    useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const updateSettings = trpc.settings.updateSettings.useMutation({
    onSuccess: () => {
      onClose();
    },
  });

  trpc.settings.fetchSettings.useQuery(undefined, {
    onSuccess: (data) => {
      const { pomodoroLength, shortBreakLength, longBreakLength } = data;
      setTimers({ pomodoroLength, shortBreakLength, longBreakLength });
      setLongBreakInterval(data.longBreakInterval);
      setAlarmSound(data.alarmSound);
      setVolume(data.volume);
    },
  });

  useEffect(() => {
    if (!alarmSoundInitChange) return;
    const audioElem = document.getElementById(
      "audio-player-settings"
    ) as HTMLAudioElement;
    audioElem.volume = volume / 100;
    audioElem.play();
  }, [alarmSound, volume]);

  const submitDisabled =
    timers && Object.values(timers).some((timer) => timer === 0);

  return (
    <Modal
      content={
        <section className="modal gap-4">
          <audio
            id="audio-player-settings"
            src={AlarmSounds[alarmSound as keyof typeof AlarmSounds] as string}
          />
          <div className="flex items-center justify-between">
            <p className="text-xl">Settings</p>
            <button onClick={onClose} className="btn--skeleton">
              <img src={icons.timesIcon} alt={"Exit settings"} />
            </button>
          </div>
          <div className="breaker" />
          <div className="flex items-center justify-between gap-5">
            {timers &&
              Object.keys(timers).map((key, idx) => (
                <div
                  key={`time__${idx}`}
                  className="flex flex-col justify-between gap-2"
                >
                  <p className="text-md capitalize">
                    {parseTimerKey(TKeys[idx] ?? "")}
                  </p>
                  {/* TODO: Make this a number input */}
                  <input
                    className="inpt--text-center"
                    type={"text"}
                    value={timers[key as keyof typeof timers]}
                    onChange={(e) =>
                      setTimers({
                        ...timers,
                        [key as keyof typeof timers]: parseInt(
                          e.target.value.replace(/\D/, "") || "0"
                        ),
                      })
                    }
                  />
                  <p className="text-sm">minutes</p>
                </div>
              ))}
          </div>
          <div className="breaker" />
          <div className="flex items-center justify-between">
            <p className="text-md w-full">Long Break Interval</p>
            <input
              className="inpt--text-center w-1/4"
              type={"text"}
              value={longBreakInterval}
              onChange={(e) =>
                setLongBreakInterval(
                  parseInt(e.target.value.replace(/\D/, "") || "0")
                )
              }
            />
          </div>
          <div className="breaker" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-md w-full">Alarm Sound</p>
              <select
                name="alarms"
                id="alarmSounds"
                className="w-2/5 capitalize"
                onChange={(e) => {
                  setAlarmSound(e.target.value);
                  setAlarmSoundInitChange(true);
                }}
                value={alarmSound}
              >
                {Object.keys(AlarmSounds).map((sound, idx) => (
                  <option key={`sound__${idx}`} value={sound}>
                    {sound.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-md w-full">Volume</p>
              <input
                className="inpt--text-center w-1/4"
                type={"text"}
                value={volume}
                onChange={(e) => {
                  const newVolume = parseInt(
                    e.target.value.replace(/\D/, "") || "0"
                  );
                  if (newVolume <= 0 || newVolume >= 100) return;
                  setVolume(newVolume);
                  setAlarmSoundInitChange(true);
                }}
              />
            </div>
          </div>
          <div className="breaker" />
          <div className="flex w-full justify-end">
            <button
              className={
                "btn--contained shadow-none " +
                (submitDisabled ? "bg-cGray-300" : "")
              }
              onClick={() => {
                if (!timers) return;

                updateSettings.mutate({
                  pomodoroLength: timers.pomodoroLength,
                  shortBreakLength: timers.shortBreakLength,
                  longBreakLength: timers.longBreakLength,
                  longBreakInterval,
                  alarmSound,
                  volume,
                });
              }}
              disabled={submitDisabled}
            >
              Save
            </button>
          </div>
        </section>
      }
    />
  );
};

export default SettingsModal;
