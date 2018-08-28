import { Action } from '@ngrx/store';
import { ExtToDoListState } from "../../modules/exttodolist";
import { ListPager } from '../listpager';


export const ExtToDoListActionTypes = {
  SHOW: '[ExtToDoList] SHOW',
  PAGEDOWN: '[ExtToDoList] PAGEDOWN',
  LoadDataSuccess: '[ExtToDoList] LoadDataSuccess',
};

export class ExtToDoListShowAction implements Action {
  type = ExtToDoListActionTypes.SHOW;
  constructor(public payload: ExtToDoListState) { }
}
export class ExtToDoListPageDownAction implements Action {
  type = ExtToDoListActionTypes.PAGEDOWN;
  constructor(public payload: ExtToDoListState) { }
}
export class ExtToDoListLoadDataSuccessAction implements Action {
  type = ExtToDoListActionTypes.LoadDataSuccess;
  constructor(public payload: ExtToDoListState) { }
}
export type ExtToDoListActions = ExtToDoListShowAction | ExtToDoListPageDownAction|ExtToDoListLoadDataSuccessAction;