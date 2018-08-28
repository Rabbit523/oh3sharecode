import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RoleActions, RoleActionTypes } from './role.actions';
import { initialRoleState, RoleState } from './role.state';

export function RoleReducer(state = initialRoleState, action: RoleActions): RoleState {
  switch (action.type) {
    case RoleActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case RoleActionTypes.GetSuc:
      return Object.assign({}, state, { Role: action.payload });
    case RoleActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
