import { Dispatch, SetStateAction } from "react";

const startTimer = (
  duration: number,
  setDisplay: Dispatch<SetStateAction<string>>
): void => {
  let timer = duration;
  let minutes, seconds;

  setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    const minutesText = minutes < 10 ? "0" + minutes : minutes;
    const secondsText = seconds < 10 ? "0" + seconds : seconds;

    setDisplay(minutesText + ":" + secondsText);

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
};

export default startTimer;
