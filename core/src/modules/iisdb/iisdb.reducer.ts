import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IISDBActions, IISDBActionTypes } from './iisdb.actions';
import { initialIISDBState, IISDBState } from './iisdb.state';

export function IISDBReducer(state = initialIISDBState, action: IISDBActions): IISDBState {
  switch (action.type) {
    case IISDBActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case IISDBActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
