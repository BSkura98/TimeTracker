import { differenceInMilliseconds } from "date-fns";

export const calculateTotalTimersTimes = (timerEntries) =>
  timerEntries?.reduce((timers, timerEntry) => {
    if (timerEntry.endTime) {
      const { timer } = timerEntry;
      timers[timer.name] = timers[timer.name] ?? 0;
      timers[timer.name] += differenceInMilliseconds(
        new Date(timerEntry.endTime),
        new Date(timerEntry.startTime)
      );
    }
    return timers;
  }, {});