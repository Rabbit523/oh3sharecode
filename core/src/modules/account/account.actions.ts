import { Action } from '@ngrx/store';
import { AccountState } from "./account.state";


export const AccountActionTypes = {
  SHOW: '[Account] Show',
  LogOut: '[Account] LogOut',
  ChangePassword: '[Account] ChangePassword',
  UpdatePicture: '[Account] UpdatePicture',
  AccountLoadDataSuccess: '[Account] AccountLoadDataSuccess',
};

export class AccountShowAction implements Action {
  type = AccountActionTypes.SHOW;
  constructor(public payload: AccountState) { }
}

export class AccountChangePasswordAction implements Action {
  type = AccountActionTypes.ChangePassword;
  constructor(public payload: AccountState) { }
}

export class AccountUpdatePictureAction implements Action {
  type = AccountActionTypes.UpdatePicture;
  constructor(public payload: string) { }
}

export class AccountLoadDataSuccessAction implements Action {
  type = AccountActionTypes.AccountLoadDataSuccess;
  constructor(public payload: AccountState) { }
}

export type AccountActions = AccountShowAction |  AccountChangePasswordAction | AccountUpdatePictureAction | AccountLoadDataSuccessAction;