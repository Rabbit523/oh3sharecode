import { Action } from '@ngrx/store';
import { ToDoListState } from "../../modules/todolist";
import { MyNewPostCommentWithNamePic ,MyNewPostComment } from "../../shared/models/webapi/eventpost/postlistmodel";
import { ListPager } from '../listpager';


export const ToDoListActionTypes = {
  SetTitle:'[ToDoList] SetPAGETITLE',
  SHOW: '[ToDoList] SHOW',
  PAGEDOWN: '[ToDoList] PAGEDOWN',
  LoadDataSuccess: '[ToDoList] LoadDataSuccess',
};
export class ToDoListSetTitleAction implements Action {
  type = ToDoListActionTypes.SetTitle;
  constructor(public payload: string) { }
}
export class ToDoListShowAction implements Action {
  type = ToDoListActionTypes.SHOW;
  constructor(public payload: ListPager) { }
}
export class ToDoListPageDownAction implements Action {
  type = ToDoListActionTypes.PAGEDOWN;
  constructor(public payload: ToDoListState) { }
}
export class ToDoListLoadDataSuccessAction implements Action {
  type = ToDoListActionTypes.LoadDataSuccess;
  constructor(public payload: ToDoListState) { }
}


export type ToDoListActions = ToDoListSetTitleAction|ToDoListShowAction | ToDoListPageDownAction|ToDoListLoadDataSuccessAction;
