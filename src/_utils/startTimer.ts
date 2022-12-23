import { type Dispatch, type SetStateAction } from "react";
import formatTime from "./formatTime";

const startTimer = (
  duration: number,
  setDisplay: Dispatch<SetStateAction<string>>
): NodeJS.Timer => {
  let timer = duration;
  let minutes, seconds;

  const timerInterval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    const displayText = formatTime(0, minutes, seconds);
    setDisplay(displayText);

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);

  return timerInterval;
};

export default startTimer;
