import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ExtToDoListActions, ExtToDoListActionTypes } from './exttodolist.actions';
import { initialExtToDoListState, ExtToDoListState } from './exttodolist.state';
import { ListPager } from "../../modules/listpager";

export function ExtToDoListReducer(state = initialExtToDoListState, action: ExtToDoListActions): ExtToDoListState {
  switch (action.type) {
    case ExtToDoListActionTypes.SHOW:
      return Object.assign({}, state, { pageTitle: (action.payload as ExtToDoListState).pageTitle });
    case ExtToDoListActionTypes.LoadDataSuccess:
      return action.payload as ExtToDoListState;
    default:
      return state;
  }
}