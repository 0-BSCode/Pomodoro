const parseTimerKey = (key: string): string => {
  return key.split("_").join(" ").toLowerCase();
};

export default parseTimerKey;
