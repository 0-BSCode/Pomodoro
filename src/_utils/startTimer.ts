import { type Dispatch, type SetStateAction } from "react";
import convertTimeToString from "./convertTimeToString";

const startTimer = (
  duration: number,
  setDisplay: Dispatch<SetStateAction<string>>
): NodeJS.Timer => {
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

  return timerInterval;
};

export default startTimer;
