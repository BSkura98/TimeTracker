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

export const EDIT_TIMER_ENTRY = gql`
  mutation updateTimerEntry($id: Int!, $timerName: String!) {
    updateTimerEntry(updateTimerEntryInput: { id: $id, timerName: $timerName }) {
      id
      timerId
      startTime
      endTime
    }
  }
`;

export const REMOVE_TIMER_ENTRY = gql`
  mutation updateTimerEntry($id: Int!) {
    removeTimerEntry(id: $id) {
      timerId
    }
  }
`;
