export const COUNTER_CHANGE = "COUNTER_CHANGE";

export interface ICount {
  count: number;
}

export interface ICounterChangeType {
  type: typeof COUNTER_CHANGE;
  payload: ICount;
}
