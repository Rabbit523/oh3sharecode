import { Action } from '@ngrx/store';
import { NotifyState } from "../../modules/notify";
import { NotificationDTO,NotificationDTOJson } from '../../shared/models/webapi/notify/notify';

export const NotifyActionTypes = { SHOW: '[Notify] Show', Post: '[Notify] Post', PostSuc: '[Notify] PostSuc', Get: '[Notify] Get', GetSuc: '[Notify] GetSuc', GetList: '[Notify] GetList', GetListSuc: '[Notify] GetListSuc' };

export class NotifyShowAction implements Action { type = NotifyActionTypes.SHOW; constructor(public payload: NotifyState) { } }


export class NotifyPostAction implements Action { type = NotifyActionTypes.Post; constructor(public payload: number) { } }
export class NotifyPostSucAction implements Action { type = NotifyActionTypes.PostSuc; constructor(public payload: string) { } }

export class NotifyGetAction implements Action { type = NotifyActionTypes.Get; constructor(public payload: number) { } }
export class NotifyGetSucAction implements Action { type = NotifyActionTypes.GetSuc; constructor(public payload: NotificationDTO) { } }

export class NotifyGetListAction implements Action { type = NotifyActionTypes.GetList; constructor(public payload: any) { } }
export class NotifyGetListSucAction implements Action { type = NotifyActionTypes.GetListSuc; constructor(public payload: NotificationDTOJson) { } }

export type NotifyActions = NotifyShowAction | NotifyPostAction | NotifyPostSucAction | NotifyGetAction | NotifyGetSucAction | NotifyGetListAction | NotifyGetListSucAction;
