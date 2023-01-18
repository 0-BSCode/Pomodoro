import convertTimeToString from "@_utils/convertTimeToString";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

export type TimerContextType = {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
  titleDisplay: string | undefined;
  setTitleDisplay: Dispatch<SetStateAction<string | undefined>>;
  timer: NodeJS.Timer | null;
  startTimer: (duration: number) => void;
  stopTimer: () => void;
};

const defaultState: TimerContextType = {
  display: "",
  setDisplay: (undefined) => {
    return;
  },
  titleDisplay: undefined,
  setTitleDisplay: (undefined) => {
    return;
  },
  timer: null,
  startTimer: (duration = -1) => {
    return;
  },
  stopTimer: () => {
    return;
  },
};

export const TimerContext = createContext<TimerContextType>(defaultState);

const TimerProvider = ({ children }: { children: JSX.Element }) => {
  const [display, setDisplay] = useState<string>(convertTimeToString(0));
  const [titleDisplay, setTitleDisplay] = useState<string | undefined>(
    undefined
  );
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const startTimer = (duration: number) => {
    let timer = duration;
    let hours, minutes, seconds;

    const timerInterval = setInterval(() => {
      hours = Math.floor(timer / 3600);
      minutes = Math.floor(timer / 60) - hours * 60;
      seconds = timer % 60;

      const remainingTime = hours * 3600 + minutes * 60 + seconds;
      const displayText = convertTimeToString(remainingTime);
      setDisplay(displayText);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);

    setTimer(timerInterval);
  };

  const stopTimer = () => {
    if (!timer) return;
    clearInterval(timer);
    setTimer(null);
  };

  return (
    <TimerContext.Provider
      value={{
        display,
        setDisplay,
        titleDisplay,
        setTitleDisplay,
        timer,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextType => {
  return useContext(TimerContext);
};

export default TimerProvider;
