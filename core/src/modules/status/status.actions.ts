import { Action } from '@ngrx/store';
import { StatusState } from "../../modules/status";
import { StatusDtoJSON, StatusDto } from '../../shared/models/webapi/status/status';

export const StatusActionTypes = { SHOW: '[Status] Show', Post: '[Status] Post', PostSuc: '[Status] PostSuc', Get: '[Status] Get', GetSuc: '[Status] GetSuc', GetList: '[Status] GetList', GetListSuc: '[Status] GetListSuc' };

export class StatusShowAction implements Action { type = StatusActionTypes.SHOW; constructor(public payload: StatusState) { } }

export class StatusPostAction implements Action { type = StatusActionTypes.Post; constructor(public payload: StatusDto) { } }
export class StatusPostSucAction implements Action { type = StatusActionTypes.PostSuc; constructor(public payload: string) { } }

export class StatusGetAction implements Action { type = StatusActionTypes.Get; constructor(public payload: number) { } }
export class StatusGetSucAction implements Action { type = StatusActionTypes.GetSuc; constructor(public payload: StatusDto) { } }

export class StatusGetListAction implements Action { type = StatusActionTypes.GetList; constructor(public payload: any) { } }
export class StatusGetListSucAction implements Action { type = StatusActionTypes.GetListSuc; constructor(public payload: StatusDtoJSON) { } }

export type StatusActions = StatusShowAction | StatusPostAction | StatusPostSucAction | StatusGetAction | StatusGetSucAction | StatusGetListAction | StatusGetListSucAction;
