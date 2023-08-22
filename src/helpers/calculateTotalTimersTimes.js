import { differenceInMilliseconds } from "date-fns";

export const calculateTotalTimersTimes = (timerEntries) => {
  return timerEntries?.reduce((totalTimes, timerEntry) => {
    const newTotalTimes = [...totalTimes];

    if (timerEntry.endTime) {
      const { timer } = timerEntry;

      let i = totalTimes.findIndex((t) => t.name === timer.name);
      if (i === -1)
        newTotalTimes.push({
          id: timer.id,
          name: timer.name,
          time: differenceInMilliseconds(
            new Date(timerEntry.endTime),
            new Date(timerEntry.startTime)
          ),
        });
      else
        newTotalTimes[i] = {
          ...newTotalTimes[i],
          time:
            newTotalTimes[i].time +
            differenceInMilliseconds(
              new Date(timerEntry.endTime),
              new Date(timerEntry.startTime)
            ),
        };
    }
    return newTotalTimes;
  }, []);
};
