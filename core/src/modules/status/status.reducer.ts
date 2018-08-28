import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StatusActions, StatusActionTypes } from './status.actions';
import { initialStatusState, StatusState } from './status.state';

export function StatusReducer(state = initialStatusState, action: StatusActions): StatusState {
  switch (action.type) {
    case StatusActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case StatusActionTypes.GetSuc:
      return Object.assign({}, state, { Status: action.payload });
    case StatusActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
