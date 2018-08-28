import { Action } from '@ngrx/store';
import { EventListMenuFilterContentState } from "./eventlistmenufiltercontent.state";
import { IntKeyValueCheck } from '../../shared/models/webapi/eventdetail/intkeyvalue';
import { DropDownFilterModel } from '../../shared/models/webapi/category/category';



export const EventListMenuFilterContentActionTypes = {
  SHOW: '[EventListMenuFilterContent] Show',
  SetDropDownSate: '[EventListMenuFilterContent] SetDropDownSate',
  ViewChange: '[EventListMenuFilterContent] ViewChange',
  ViewChangeSucc: '[EventListMenuFilterContent] ViewChangeSucc',
};

export class EventListMenuFilterContentShowAction implements Action {
  type = EventListMenuFilterContentActionTypes.SHOW;
  constructor(public payload: EventListMenuFilterContentState) { }
}

export class EventListMenuFilterContentSetSateAction implements Action {
  type = EventListMenuFilterContentActionTypes.SetDropDownSate;
  constructor(public payload: DropDownFilterModel) { }
}
export class EventListMenuFilterContentViewChangeAction implements Action {
  type = EventListMenuFilterContentActionTypes.ViewChange;
  constructor(public payload: number) { }
}

export class EventListMenuFilterContentViewChangeSuccAction implements Action {
  type = EventListMenuFilterContentActionTypes.ViewChangeSucc;
  constructor(public payload: IntKeyValueCheck[]) { }
}




export type EventListMenuFilterContentActions = EventListMenuFilterContentShowAction | EventListMenuFilterContentSetSateAction
  | EventListMenuFilterContentViewChangeAction | EventListMenuFilterContentViewChangeSuccAction;
