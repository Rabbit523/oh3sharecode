import { Action } from '@ngrx/store';
import { AuthState } from "../../modules/Auth";

export const AuthActionTypes = {
  AuthSet: '[Auth] SetAuth',
  TokenSet: '[Auth] SetToken',
  Logout: '[Auth] Logout',
  AuthOpSuc: '[Auth] AuthOpSuc',
};

export class AuthSetAction implements Action {
  type = AuthActionTypes.AuthSet;
  constructor(public payload: boolean) { }
}
export class TokenSetAction implements Action {
  type = AuthActionTypes.TokenSet;
  constructor(public payload: string) { }
}
export class AuthLogoutAction implements Action {
  type = AuthActionTypes.Logout;
  constructor(public payload: string) { }
}
export class AuthOpSucAction implements Action {
  type = AuthActionTypes.AuthOpSuc;
  constructor(public payload: string) { }
}

export type AuthActions = AuthSetAction | TokenSetAction | AuthLogoutAction | AuthOpSucAction;
