import { gql } from "@apollo/client";

export const getTimersEntries = gql`
  query TimerEntries($startTimeDay: DateTime!) {
    timerEntries(filterTimerEntryInput: { startTimeDay: $startTimeDay }) {
      id
      startTime
      endTime
      timer {
        name
      }
    }
  }
`;
