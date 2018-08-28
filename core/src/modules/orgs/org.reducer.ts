import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ORGActions, ORGActionTypes } from './org.actions';
import { initialORGState, ORGState } from './org.state';

export function ORGReducer(state = initialORGState, action: ORGActions): ORGState {
  switch (action.type) {
    case ORGActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case ORGActionTypes.GetSuc:
      return Object.assign({}, state, { Org: action.payload });
    case ORGActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
