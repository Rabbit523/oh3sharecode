import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { initialAuthState, AuthState } from './auth.state';

export function AuthReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.AuthSet:
      var Authstate = { Login_timeOut: action.payload, };
      return Object.assign({}, state, Authstate);
    case AuthActionTypes.TokenSet:
      var Authstate0 = { Login_timeOut: !action.payload || String(action.payload).length <= 0, token: action.payload };
      return Object.assign({}, state, Authstate0);
      case AuthActionTypes.Logout:
      var Authstate1 = { Login_timeOut: true, token: "" };
      return Object.assign({}, state, Authstate1);
    default:
      return state;

  }
}
