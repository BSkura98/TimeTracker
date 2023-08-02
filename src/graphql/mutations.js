import { gql } from "@apollo/client";

export const CREATE_AND_START_TIMER_ENTRY = gql`
  mutation createTimerEntry($startTime: DateTime!, $timerName: String!) {
    createTimerEntry(
      createTimerEntryInput: { startTime: $startTime, timerName: $timerName }
    ) {
      id
      startTime
      timer {
        id
        name
      }
    }
  }
`;

export const STOP_TIMER_ENTRY = gql`
  mutation updateTimerEntry($id: Int!, $endTime: DateTime!) {
    updateTimerEntry(updateTimerEntryInput: { id: $id, endTime: $endTime }) {
      id
      timerId
      startTime
      endTime
    }
  }
`;
