import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PriorityActions, PriorityActionTypes } from './priority.actions';
import { initialPriorityState, PriorityState } from './priority.state';

export function PriorityReducer(state = initialPriorityState, action: PriorityActions): PriorityState {
  switch (action.type) {
    case PriorityActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case PriorityActionTypes.GetSuc:
      return Object.assign({}, state, { Priority: action.payload });
    case PriorityActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
