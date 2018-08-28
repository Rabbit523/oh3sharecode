import { Action } from '@ngrx/store';
import { MenuListsActions, MenuListsActionTypes } from './menulists.actions';
import { initialMenuListState, MenuListsState } from './menulists.state';
import { MenuCount } from '../../shared/models/common/pagemodel';
import { JsonDictionary } from '../../shared/models/common/jsondictionary';

export function MenuListsReducer(state = initialMenuListState, action: MenuListsActions): MenuListsState {
  switch (action.type) {
    case MenuListsActionTypes.SHOWFIRST:
      return Object.assign({}, state, { Page_first: action.payload });

    case MenuListsActionTypes.SHOWAPP:
      return Object.assign({}, state, { Page_App: action.payload });

    case MenuListsActionTypes.SetCount:
      let countDic = action.payload as JsonDictionary<MenuCount>;
      let newstate = JSON.parse(JSON.stringify(state));
      newstate.Page_first.forEach(g => {
        g.items.forEach(i => { if (countDic[i.EnumId]) { i.Count = countDic[i.EnumId].count.toString(); i.LastTime = countDic[i.EnumId].date; } })
      });
      newstate.Page_App.forEach(g => {
        g.items.forEach(i => { if (countDic[i.EnumId]) { i.Count = countDic[i.EnumId].count.toString(); i.LastTime = countDic[i.EnumId].date; } })
      });
      return newstate;

    default:
      return state;

  }
}
