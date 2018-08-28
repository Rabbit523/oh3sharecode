import { Action } from '@ngrx/store';
import { PriorityState } from "../../modules/priority";
import { PriorityDtoJSON,PriorityDto } from '../../shared/models/webapi/priority/priority';

export const PriorityActionTypes = { SHOW: '[Priority] Show', del: '[Priority] del', delSuc: '[Priority] delSuc', Post: '[Priority] Post', PostSuc: '[Priority] PostSuc', Get: '[Priority] Get', GetSuc: '[Priority] GetSuc', GetList: '[Priority] GetList', GetListSuc: '[Priority] GetListSuc' };

export class PriorityShowAction implements Action { type = PriorityActionTypes.SHOW; constructor(public payload: PriorityState) { } }

export class PriorityPostAction implements Action { type = PriorityActionTypes.Post; constructor(public payload: PriorityDto) { } }
export class PriorityPostSucAction implements Action { type = PriorityActionTypes.PostSuc; constructor(public payload: string) { } }

export class PriorityGetAction implements Action { type = PriorityActionTypes.Get; constructor(public payload: number) { } }
export class PriorityGetSucAction implements Action { type = PriorityActionTypes.GetSuc; constructor(public payload: PriorityDto) { } }

export class PriorityGetListAction implements Action { type = PriorityActionTypes.GetList; constructor(public payload: any) { } }
export class PriorityGetListSucAction implements Action { type = PriorityActionTypes.GetListSuc; constructor(public payload: PriorityDtoJSON) { } }

export type PriorityActions = PriorityShowAction | PriorityPostAction | PriorityPostSucAction | PriorityGetAction | PriorityGetSucAction | PriorityGetListAction | PriorityGetListSucAction;
