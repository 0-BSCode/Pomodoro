import React, { useState } from "react";

const useTimerInterval = () => {
  const [timerInterval, setTimerInterval] = useState<string | undefined>(
    undefined
  );

  const getInterval = (): string | undefined => {
    return timerInterval;
  };

  const setInterval = (value: string): void => {
    setTimerInterval(value);
  };

  return { getInterval, setInterval };
};

export default useTimerInterval;
