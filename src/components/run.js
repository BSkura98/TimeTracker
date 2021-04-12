var updatedSecond = 0,
  updatedMinute = 0,
  updatedHour = 0;
var timerId = 0;

export const setTime = (timer) => {
  updatedSecond = timer.s;
  updatedMinute = timer.m;
  updatedHour = timer.h;
  timerId = timer.id;
};

export const run = (timers, setTimers) => {
  console.log(updatedSecond);

  if (updatedMinute === 60) {
    updatedHour++;
    updatedMinute = 0;
  }
  if (updatedSecond === 60) {
    updatedMinute++;
    updatedSecond = 0;
  }
  updatedSecond++;
  return setTimers(
    timers.map((item) => {
      if (item.id === timerId) {
        const updatedItem = {
          ...item,
          s: updatedSecond,
          m: updatedMinute,
          h: updatedHour,
        };
        console.log(updatedItem.s);
        return updatedItem;
      }
      return item;
    })
  );
};
