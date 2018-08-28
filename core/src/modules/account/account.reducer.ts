import { Action } from '@ngrx/store';
import { AccountActions, AccountActionTypes } from './account.actions';
import { initialAccountState, AccountState } from './account.state';

export function AccountReducer(state = initialAccountState, action: AccountActions): AccountState {
  switch (action.type) {
    case AccountActionTypes.SHOW:
    case AccountActionTypes.AccountLoadDataSuccess:
      return action.payload as AccountState;
    default:
      return state;

  }
}
