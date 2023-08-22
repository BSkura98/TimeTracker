export const getTimeForMilliseconds = (milliseconds) => ({
  hour: Math.floor(milliseconds / 1000 / 60 / 60),
  minute: Math.floor((milliseconds / 1000 / 60) % 60),
  second: Math.floor((milliseconds / 1000) % 60),
});
