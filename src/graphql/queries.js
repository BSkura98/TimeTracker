import { gql } from "@apollo/client";

export const GET_TIMERS_ENTRIES = gql`
  query TimerEntries($startTimeDay: DateTime!) {
    timerEntries(filterTimerEntryInput: { startTimeDay: $startTimeDay }) {
      id
      startTime
      endTime
      timer {
        id
        name
      }
    }
  }
`;
