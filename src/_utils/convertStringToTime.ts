const convertStringToTime = (duration: string): number => {
  const time = duration.split(":");

  const hours = parseInt(time[0] || "0");
  const minutes = parseInt(time[1] || "0");
  const seconds = parseInt(time[2] || "0");

  return hours * 3600 + minutes * 60 + seconds;
};

export default convertStringToTime;
