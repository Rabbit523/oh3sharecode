import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SelfDefineFunctionsActions, SelfDefineFunctionsActionTypes } from './function.actions';
import { initialSelfDefineFunctionsState, SelfDefineFunctionsState } from './function.state';

export function SelfDefineFunctionsReducer(state = initialSelfDefineFunctionsState, action: SelfDefineFunctionsActions): SelfDefineFunctionsState {
  switch (action.type) {
    case SelfDefineFunctionsActionTypes.GetDicSuc:
      return Object.assign({}, state, { Dic: action.payload });   
    case SelfDefineFunctionsActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case SelfDefineFunctionsActionTypes.GetSuc:
      return Object.assign({}, state, { SelfDefineFunctions: action.payload });
    case SelfDefineFunctionsActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
