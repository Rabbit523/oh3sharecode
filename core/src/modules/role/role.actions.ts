import { Action } from '@ngrx/store';
import { RoleState } from "../../modules/role";
import { GUID, Role, RoleDTOJSON } from '../../shared/models/webapi/roles/role';

export const RoleActionTypes = { SHOW: '[Role] Show', Post: '[Role] Post', PostSuc: '[Role] PostSuc', Get: '[Role] Get', GetSuc: '[Role] GetSuc', GetList: '[Role] GetList', GetListSuc: '[Role] GetListSuc' };

export class RoleShowAction implements Action { type = RoleActionTypes.SHOW; constructor(public payload: RoleState) { } }

export class RolePostAction implements Action { type = RoleActionTypes.Post; constructor(public payload: Role) { } }
export class RolePostSucAction implements Action { type = RoleActionTypes.PostSuc; constructor(public payload: string) { } }

export class RoleGetAction implements Action { type = RoleActionTypes.Get; constructor(public payload: GUID) { } }
export class RoleGetSucAction implements Action { type = RoleActionTypes.GetSuc; constructor(public payload: Role) { } }

export class RoleGetListAction implements Action { type = RoleActionTypes.GetList; constructor(public payload: any) { } }
export class RoleGetListSucAction implements Action { type = RoleActionTypes.GetListSuc; constructor(public payload: RoleDTOJSON) { } }

export type RoleActions = RoleShowAction | RolePostAction | RolePostSucAction | RoleGetAction | RoleGetSucAction | RoleGetListAction | RoleGetListSucAction;
