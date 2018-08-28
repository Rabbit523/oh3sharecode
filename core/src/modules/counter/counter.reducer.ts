import { CounterActions, CounterActionTypes } from './counter.actions';
import { CounterState, initialCounterState } from './counter.state';

export function counterReducer(state = initialCounterState, action: CounterActions): CounterState {
  switch (action.type) {

    case CounterActionTypes.INCREMENT:
      return Object.assign({}, state, { total: state.total + 1 });
    case CounterActionTypes.DECREMENT:
      return Object.assign({}, state, { total: state.total - 1 });
    case CounterActionTypes.RESET_SUCCESS:
    default:
      return state;
  }
}
