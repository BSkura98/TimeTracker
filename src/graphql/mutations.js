import { gql } from "@apollo/client";

export const getTimersEntries = gql`
  {
    timerEntries {
      id
      startTime
      endTime
      timer {
        name
      }
    }
  }
`;
