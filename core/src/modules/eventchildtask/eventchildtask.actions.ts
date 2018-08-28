import { Action } from '@ngrx/store';
import { EventChildTaskState } from "../../modules/eventchildtask";
import { EventChildTaskBase, ChildTaskModel } from './eventchildtask.state';


export const EventChildTaskActionTypes = {
  SHOW: '[EventChildTask] Show',
  SHOWSucc: '[EventChildTask] ShowSucc',
  UpdatePost: '[EventChildTask] UpdatePost',

};

export class EventChildTaskShowAction implements Action {
  type = EventChildTaskActionTypes.SHOW;
  constructor(public payload: ChildTaskModel) { }
}

export class EventChildTaskShowSuccAction implements Action {
  type = EventChildTaskActionTypes.SHOWSucc;
  constructor(public payload: EventChildTaskBase) { }
}
export class EventChildTaskUpdatePostAction implements Action {
  type = EventChildTaskActionTypes.UpdatePost;
  constructor(public payload: EventChildTaskState) { }
}


export type EventChildTaskActions = EventChildTaskShowAction|EventChildTaskShowSuccAction | EventChildTaskUpdatePostAction;
