import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SelfDefineFieldDtoActions, SelfDefineFieldDtoActionTypes } from './fucfields.actions';
import { initialSelfDefineFieldDtoState, SelfDefineFieldDtoState } from './fucfields.state';

export function SelfDefineFieldDtoReducer(state = initialSelfDefineFieldDtoState, action: SelfDefineFieldDtoActions): SelfDefineFieldDtoState {
  switch (action.type) {
    case SelfDefineFieldDtoActionTypes.GetDicSuc:
      return Object.assign({}, state, { Dic: action.payload });
    case SelfDefineFieldDtoActionTypes.GetSelectSuc:
      return Object.assign({}, state, { SelectList: action.payload });
    case SelfDefineFieldDtoActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case SelfDefineFieldDtoActionTypes.GetSuc:
      return Object.assign({}, state, { SelfDefineFieldDto: action.payload });
    case SelfDefineFieldDtoActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;

  }
}
