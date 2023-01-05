import Modal from "@components/_common/modal";
import React, { useEffect, useState } from "react";
import icons from "@assets/images/icons";
import { type Timers } from "types/timers";
import { TimerKeys } from "types/enums/timerKeys";
import { trpc } from "@utils/trpc";
import parseTimerKey from "@_utils/parseTimerKey";

const TKeys = Object.keys(TimerKeys);

interface Props {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: Props) => {
  const settingsQuery = trpc.settings.fetchSettings.useQuery();
  const [timers, setTimers] = useState<Timers | undefined>(undefined);
  const updateSettings = trpc.settings.updateSettings.useMutation({
    onSuccess: () => {
      onClose();
    },
  });

  //   TODO: Extract settings fetching to context
  useEffect(() => {
    if (settingsQuery.data) {
      const { pomodoroLength, shortBreakLength, longBreakLength } =
        settingsQuery.data;
      setTimers({ pomodoroLength, shortBreakLength, longBreakLength });
    }
  }, [settingsQuery.data]);

  const submitDisabled =
    timers && Object.values(timers).some((timer) => timer === 0);

  return (
    <Modal
      content={
        <section className="modal gap-3">
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
