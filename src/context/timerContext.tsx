import { createContext, useContext, useState } from "react";

export type TimerContextType = {
  display: string | undefined;
  setDisplay: (value: string | undefined) => void;
};

const defaultState: TimerContextType = {
  display: undefined,
  setDisplay: (undefined) => {
    return;
  },
};

export const TimerContext = createContext<TimerContextType>(defaultState);

const TimerProvider = ({ children }: { children: JSX.Element }) => {
  const [display, setDisplay] = useState<string | undefined>(undefined);

  return (
    <TimerContext.Provider value={{ display, setDisplay }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextType => {
  return useContext(TimerContext);
};

export default TimerProvider;
