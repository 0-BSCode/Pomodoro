const formatTime = (
  hours: number,
  minutes: number,
  seconds: number
): string => {
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;

  return h + ":" + m + ":" + s;
};

export default formatTime;
