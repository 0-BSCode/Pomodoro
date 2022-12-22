import { type Dispatch, type SetStateAction } from "react";
import formatTime from "./formatTime";

const startTimer = (
  duration: number,
  setDisplay: Dispatch<SetStateAction<string>>
): void => {
  let timer = duration;
  let minutes, seconds;

  setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    const displayText = formatTime(0, minutes, seconds);
    setDisplay(displayText);

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
};

export default startTimer;
