import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ReceivedListActions, ReceivedListActionTypes } from './receivedlist.actions';
import { initialReceivedListState, ReceivedListState } from './receivedlist.state';
import { ListPager } from "../../modules/listpager";

export function ReceivedListReducer(state = initialReceivedListState, action: ReceivedListActions): ReceivedListState {
  switch (action.type) {
    case ReceivedListActionTypes.SHOW:
      return Object.assign({}, state, { pager: action.payload });

    case ReceivedListActionTypes.LoadDataSuccess:
      return action.payload as ReceivedListState;

    // case ReceivedListActionTypes.ReceivedListPageDown:
    //   let page = Object.assign({}, state.pager);
    //   page.pageSize = action.payload as number;
    //   let state2 = { pager: page, comments: state.comments };
    //   return Object.assign({}, state, state2);

    default:
      return state;

  }
}
