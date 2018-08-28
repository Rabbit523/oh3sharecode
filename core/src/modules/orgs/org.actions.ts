import { Action } from '@ngrx/store';
import { ORGState } from "../../modules/orgs";
import { OrganizationDtoJSON,OrgDto } from '../../shared/models/webapi/org/orgdto';

export const ORGActionTypes = { SHOW: '[ORG] Show', del: '[ORG] del', delSuc: '[ORG] delSuc', Post: '[ORG] Post', PostSuc: '[ORG] PostSuc', Get: '[ORG] Get', GetSuc: '[ORG] GetSuc', GetList: '[ORG] GetList', GetListSuc: '[ORG] GetListSuc' };

export class ORGShowAction implements Action { type = ORGActionTypes.SHOW; constructor(public payload: ORGState) { } }

export class ORGDelAction implements Action { type = ORGActionTypes.del; constructor(public payload: number) { } }
export class ORGDelSucAction implements Action { type = ORGActionTypes.delSuc; constructor(public payload: string) { } }

export class ORGPostAction implements Action { type = ORGActionTypes.Post; constructor(public payload: OrgDto) { } }
export class ORGPostSucAction implements Action { type = ORGActionTypes.PostSuc; constructor(public payload: string) { } }

export class ORGGetAction implements Action { type = ORGActionTypes.Get; constructor(public payload: number) { } }
export class ORGGetSucAction implements Action { type = ORGActionTypes.GetSuc; constructor(public payload: OrgDto) { } }

export class ORGGetListAction implements Action { type = ORGActionTypes.GetList; constructor(public payload: number) { } }
export class ORGGetListSucAction implements Action { type = ORGActionTypes.GetListSuc; constructor(public payload: OrganizationDtoJSON) { } }

export type ORGActions = ORGShowAction | ORGDelAction | ORGDelSucAction | ORGPostAction | ORGPostSucAction | ORGGetAction | ORGGetSucAction | ORGGetListAction | ORGGetListSucAction;
