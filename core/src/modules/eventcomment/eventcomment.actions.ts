import { Action } from '@ngrx/store';
import { EventCommentState, EventCommentParas } from "./eventcomment.state";


export const EventCommentActionTypes = {
  SHOW: '[EventComment] Show',
  SetPath: '[EventComment] SetPath',
  SetFiles: '[EventComment] SetFiles',
  SaveComment: '[EventComment] SaveComment',
  SetComment: '[EventComment] SetComment',  
};

export class EventCommentShowAction implements Action {
  type = EventCommentActionTypes.SHOW;
  constructor(public payload: EventCommentParas) { }
}

export class EventCommentSetPathAction implements Action {
  type = EventCommentActionTypes.SetPath;
  constructor(public payload: string[] | object[]) { }
}
export class EventCommentSetCommentAction implements Action {
  type = EventCommentActionTypes.SetComment;
  constructor(public payload: string) { }
}
export class EventCommentSaveCommentAction implements Action {
  type = EventCommentActionTypes.SaveComment;
  constructor(public payload: EventCommentState) { }
}



export type EventCommentActions = EventCommentShowAction
  | EventCommentSetPathAction | EventCommentSetCommentAction | EventCommentSaveCommentAction;
