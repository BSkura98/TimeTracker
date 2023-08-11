export const formatTime = (hour, minute, second) => {
  let h = hour >= 10 ? hour : "0" + hour;
  let m = minute >= 10 ? minute : "0" + minute;
  let s = second >= 10 ? second : "0" + second;
  return h + ":" + m + ":" + s;
};
