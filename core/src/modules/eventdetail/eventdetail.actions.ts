import { Action } from '@ngrx/store';
import { EventDetailState, EventDetailParas, ExcuteAndUpdateCommand, UpdateFixedField } from './eventdetail.state';
import { PostListModel } from '../../shared/models/webapi/eventpost/postlistmodel';
import { KeyIconName } from '../../shared/models/common/keyvalue';
import { AllTasksModel, EventDetailJson } from '../../shared/models/webapi/eventdetail/eventdetailjson';
import { BugUserDtoModel } from '../../shared/models/webapi/mytractor/buguserdtomodel';
import { IntKeyValueCheck } from '../../shared/models/webapi/eventdetail/intkeyvalue';


export const EventDetailActionTypes = {
  SHOW: '[EventDetail] Show',
  RefreshMainData: '[EventDetail] RefreshMainData',
  RefreshMainExtendData: '[EventDetail] RefreshMainExtendData',
  RefreshMainDataSucc: '[EventDetail] RefreshMainDataSucc',
  RefreshPostData: '[EventDetail] RefreshPostData',
  RefreshPostDataSucc: '[EventDetail] RefreshPostDataSucc',
  SetTaskState: '[EventDetail] SetTaskState',
  RefreshTaskData: '[EventDetail] RefreshTaskData',
  RefreshTaskDataSucc: '[EventDetail] RefreshTaskDataSucc',
  GetCommands: '[EventDetail] GetCommands',
  GetCommandsSucc: '[EventDetail] GetCommandsSucc',
  GetBugUserDtoS: '[EventDetail] GetBugUserDtoS',
  GetBugUserDtoSSucc: '[EventDetail] GetBugUserDtoSSucc',
  SetDetailViewId: '[EventDetail] SetDetailViewId',
  SetDetailViewIdSucc: '[EventDetail] SetDetailViewIdSucc',
  NoteClick: '[EventDetail] NoteClick',
  NoteClickSucc: '[EventDetail] NoteClickSucc',
  EditTask: '[EventDetail] EditTask',
  ExcuteCommand: '[EventDetail] ExcuteCommand',
  BugComplate: '[EventDetail] BugComplate',
  UpdateFieldFixed: '[EventDetail] UpdateFieldFixed',
  UpdateFieldFixedSucc: '[EventDetail] UpdateFieldFixedSucc',
  DeleteEvent: '[EventDetail] DeleteEvent',
  UploadPostWithEvent: '[EventDetail] UploadPostWithEvent'
};

export class EventDetailShowAction implements Action {
  type = EventDetailActionTypes.SHOW;
  constructor(public payload: any) { }
}

export class EventDetailRefreshMainDataAction implements Action {
  type = EventDetailActionTypes.RefreshMainData;
  constructor(public payload: number) { }
}
export class EventDetailRefreshMainExtendDataAction implements Action {
  type = EventDetailActionTypes.RefreshMainExtendData;
  constructor(public payload: EventDetailState) { }
}
export class EventDetailRefreshMainDataSuccAction implements Action {
  type = EventDetailActionTypes.RefreshMainDataSucc;
  constructor(public payload: EventDetailState) { }
}
export class EventDetailRefreshPostDataAction implements Action {
  type = EventDetailActionTypes.RefreshPostData;
  constructor(public payload: EventDetailParas) { }
}
export class EventDetailRefreshPostDataSuccAction implements Action {
  type = EventDetailActionTypes.RefreshPostDataSucc;
  constructor(public payload: PostListModel[]) { }
}

export class EventDetailSetTaskStateAction implements Action {
  type = EventDetailActionTypes.SetTaskState;
  constructor(public payload: EventDetailParas) { }
}
export class EventDetailRefreshTaskDataAction implements Action {
  type = EventDetailActionTypes.RefreshTaskData;
  constructor(public payload: number) { }
}
export class EventDetailRefreshTaskDataSuccAction implements Action {

  type = EventDetailActionTypes.RefreshTaskDataSucc;
  constructor(public payload: AllTasksModel) { }
}
export class EventDetailGetCommandsAction implements Action {
  type = EventDetailActionTypes.GetCommands;
  constructor(public payload: EventDetailParas) { }
}
export class EventDetailGetCommandsSuccAction implements Action {
  type = EventDetailActionTypes.GetCommandsSucc;
  constructor(public payload: Array<KeyIconName>) { }
}
export class EventDetailGetBugUserDtoSAction implements Action {
  type = EventDetailActionTypes.GetBugUserDtoS;
  constructor(public payload: EventDetailParas) { }
}
export class EventDetailGetBugUserDtoSSuccAction implements Action {
  type = EventDetailActionTypes.GetBugUserDtoSSucc;
  constructor(public payload: Array<BugUserDtoModel>) { }
}

export class EventDetailSetDetailViewIdAction implements Action {
  type = EventDetailActionTypes.SetDetailViewId;
  constructor(public payload: number) { }
}

export class EventDetailSetDetailViewIdSuccAction implements Action {
  type = EventDetailActionTypes.SetDetailViewIdSucc;
  constructor(public payload: IntKeyValueCheck[]) { }
}

export class EventDetailNoteClickAction implements Action {
  type = EventDetailActionTypes.NoteClick;
  constructor(public payload: string) { }
}
export class EventDetailNoteClickSuccAction implements Action {
  type = EventDetailActionTypes.NoteClickSucc;
  constructor(public payload: string) { }
}

export class EventDetailEditTaskAction implements Action {
  type = EventDetailActionTypes.EditTask;
  constructor(public payload: EventDetailState) { }
}
export class EventDetailExcuteCommandAction implements Action {
  type = EventDetailActionTypes.ExcuteCommand;
  constructor(public payload: ExcuteAndUpdateCommand) { }
}

export class EventDetailBugComplateAction implements Action {
  type = EventDetailActionTypes.BugComplate;
  constructor(public payload: boolean) { }
}

export class EventDetailUpdateFieldFixedAction implements Action {
  type = EventDetailActionTypes.UpdateFieldFixed;
  constructor(public payload: UpdateFixedField) { }
}

export class EventDetailUpdateFieldFixedSuccAction implements Action {
  type = EventDetailActionTypes.UpdateFieldFixedSucc;
  constructor(public payload: EventDetailJson) { }
}

export class EventDetailDeleteEventAction implements Action {
  type = EventDetailActionTypes.DeleteEvent;
  constructor(public payload: any) { }
}
export class EventDetailUploadPostWithEventAction implements Action {
  type = EventDetailActionTypes.UploadPostWithEvent;
  constructor(public payload: EventDetailState) { }
}

export type EventDetailActions = EventDetailShowAction |
  EventDetailRefreshMainDataAction | EventDetailRefreshMainExtendDataAction | EventDetailRefreshMainDataSuccAction |
  EventDetailRefreshPostDataAction | EventDetailRefreshPostDataSuccAction |
  EventDetailSetTaskStateAction | EventDetailRefreshTaskDataAction | EventDetailRefreshTaskDataSuccAction |
  EventDetailGetCommandsAction | EventDetailGetCommandsSuccAction |
  EventDetailGetBugUserDtoSAction | EventDetailGetBugUserDtoSSuccAction |
  EventDetailSetDetailViewIdAction | EventDetailSetDetailViewIdSuccAction |
  EventDetailNoteClickAction | EventDetailNoteClickSuccAction | EventDetailExcuteCommandAction |
  EventDetailBugComplateAction | EventDetailUpdateFieldFixedAction |
  EventDetailDeleteEventAction | EventDetailUploadPostWithEventAction;
