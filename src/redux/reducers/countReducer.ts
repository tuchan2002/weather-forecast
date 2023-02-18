import { ICounterChangeType, COUNTER_CHANGE, ICount } from "../types/countType";

const initialState: ICount = {
  count: 0,
};
const countReducer = (
  state: ICount = initialState,
  action: ICounterChangeType
): ICount => {
  switch (action.type) {
    case COUNTER_CHANGE:
      return {
        ...state,
        count: action.payload.count,
      };
    default:
      return state;
  }
};
export default countReducer;
