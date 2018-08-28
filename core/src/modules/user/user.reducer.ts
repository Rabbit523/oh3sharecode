import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserActions, UserActionTypes } from './user.actions';
import { initialUserState, UserState } from './user.state';

export function UserReducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.UserGetSuc:
      return Object.assign({}, state, { UserInfo: action.payload });
    case UserActionTypes.UserListGetSuc:
      return Object.assign({}, state, { UserList: action.payload });
    case UserActionTypes.ImportUserSuc:
      return Object.assign({}, state, { ImportMsg: action.payload });
    case UserActionTypes.SHOW:
    default:
      return state;
  }
}
