import { Action } from '@ngrx/store';
import { ReceivedListState } from "../../modules/receivedlist";
import { MyNewPostCommentWithNamePic,MyNewPostComment } from "../../shared/models/webapi/eventpost/postlistmodel";
import { ListPager } from '../listpager';


export const ReceivedListActionTypes = {
  SHOW: '[ReceivedList] SHOW',
  PAGEDOWN: '[ReceivedList] PAGEDOWN',
  LoadDataSuccess: '[ReceivedList] LoadDataSuccess',
};

export class ReceivedListShowAction implements Action {
  type = ReceivedListActionTypes.SHOW;
  constructor(public payload: ListPager) { }
}
export class ReceivedListPageDownAction implements Action {
  type = ReceivedListActionTypes.PAGEDOWN;
  constructor(public payload: ReceivedListState) { }
}
export class ReceivedListLoadDataSuccessAction implements Action {
  type = ReceivedListActionTypes.LoadDataSuccess;
  constructor(public payload: ReceivedListState) { }
}


export type ReceivedListActions = ReceivedListShowAction | ReceivedListPageDownAction|ReceivedListLoadDataSuccessAction;
