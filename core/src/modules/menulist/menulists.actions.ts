import { Action } from '@ngrx/store';
import { MenuCount, ApplicationPageListGroup } from '../../shared/models/common/pagemodel';
import { StringKeyValue } from '../../shared/models/common/keyvalue';
import { JsonDictionary } from '../../shared/models/common/jsondictionary';

export const MenuListsActionTypes = {
  SHOWFIRST: '[MenuLists] SHOWFIRST',
  SHOWAPP: '[MenuLists] SHOWAPP',
  ListProblemChange: '[MenuLists] ListProblemChange',
  ListCommentChange: '[MenuLists] ListCommentChange',
  ListEventChange: '[MenuLists] ListEventChange',
  SetCount: '[MenuLists] SetCount',
};

export class MenuListsSHOWFIRSTAction implements Action {
  type = MenuListsActionTypes.SHOWFIRST;
  constructor(public payload: ApplicationPageListGroup[]) { }
}
export class MenuListsSHOWAPPAction implements Action {
  type = MenuListsActionTypes.SHOWAPP;
  constructor(public payload: ApplicationPageListGroup[]) { }
}
export class MenuListsChangeAction implements Action {
  type = MenuListsActionTypes.ListProblemChange;
  constructor(public payload: StringKeyValue[]) { }
}
export class MenuListsSetCountAction implements Action {
  type = MenuListsActionTypes.SetCount;
  constructor(public payload: JsonDictionary<MenuCount>) { }
}

export type MenuListsActions = MenuListsSHOWFIRSTAction | MenuListsSHOWAPPAction | MenuListsSetCountAction | MenuListsChangeAction;
