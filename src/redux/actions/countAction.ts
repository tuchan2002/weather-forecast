import { COUNTER_CHANGE } from "../types/countType";

export function changeCount(count: number) {
  return {
    type: COUNTER_CHANGE,
    payload: { count },
  };
}
