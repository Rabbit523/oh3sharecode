import { Action } from '@ngrx/store';
import { SelfDefineFunctionsState } from "../../modules/function";
import { SelfDefineFunctionsJSON, SelfDefineFunctions } from '../../shared/models/webapi/function/function';

export const SelfDefineFunctionsActionTypes = { SHOW: '[SelfDefineFunctions] Show', GetDic: '[SelfDefineFunctions] GetDic', GetDicSuc: '[SelfDefineFunctions] GetDicSuc', Post: '[SelfDefineFunctions] Post', PostSuc: '[SelfDefineFunctions] PostSuc', Get: '[SelfDefineFunctions] Get', GetSuc: '[SelfDefineFunctions] GetSuc', GetList: '[SelfDefineFunctions] GetList', GetListSuc: '[SelfDefineFunctions] GetListSuc' };

export class SelfDefineFunctionsShowAction implements Action { type = SelfDefineFunctionsActionTypes.SHOW; constructor(public payload: SelfDefineFunctionsState) { } }

export class SelfDefineFunctionsPostAction implements Action { type = SelfDefineFunctionsActionTypes.Post; constructor(public payload: SelfDefineFunctions) { } }
export class SelfDefineFunctionsPostSucAction implements Action { type = SelfDefineFunctionsActionTypes.PostSuc; constructor(public payload: string) { } }

export class SelfDefineFunctionsGetAction implements Action { type = SelfDefineFunctionsActionTypes.Get; constructor(public payload: number) { } }
export class SelfDefineFunctionsGetSucAction implements Action { type = SelfDefineFunctionsActionTypes.GetSuc; constructor(public payload: SelfDefineFunctions) { } }

export class SelfDefineFunctionsGetListAction implements Action { type = SelfDefineFunctionsActionTypes.GetList; constructor(public payload: any) { } }
export class SelfDefineFunctionsGetListSucAction implements Action { type = SelfDefineFunctionsActionTypes.GetListSuc; constructor(public payload: SelfDefineFunctionsJSON) { } }

export class SelfDefineFunctionsGetDicAction implements Action { type = SelfDefineFunctionsActionTypes.GetDic; constructor(public payload: any) { } }
export class SelfDefineFunctionsGetDicSucAction implements Action { type = SelfDefineFunctionsActionTypes.GetDicSuc; constructor(public payload: JSON) { } }

export type SelfDefineFunctionsActions = SelfDefineFunctionsShowAction | SelfDefineFunctionsPostAction | SelfDefineFunctionsPostSucAction | SelfDefineFunctionsGetAction | SelfDefineFunctionsGetSucAction | SelfDefineFunctionsGetListAction | SelfDefineFunctionsGetListSucAction | SelfDefineFunctionsGetDicAction | SelfDefineFunctionsGetDicSucAction;
