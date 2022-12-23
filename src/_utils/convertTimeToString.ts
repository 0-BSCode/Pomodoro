const convertTimeToString = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60) - h * 60;
  const s = seconds % 60;

  const hString = h < 10 ? "0" + h : h;
  const mString = m < 10 ? "0" + m : m;
  const sString = s < 10 ? "0" + s : s;

  return hString + ":" + mString + ":" + sString;
};

export default convertTimeToString;
