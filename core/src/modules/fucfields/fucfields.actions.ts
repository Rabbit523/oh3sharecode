import { Action } from '@ngrx/store';
import { SelfDefineFieldDtoState } from "../../modules/fucfields";
import { SelfDefineFieldDtoJSON, SelfDefineFieldDto } from '../../shared/models/webapi/funcfields/fieldsdto';
import { SelectListItemModel } from '../../shared/models/webapi/eventdetail/dropdownjson';

export const SelfDefineFieldDtoActionTypes = { SHOW: '[SelfDefineFieldDto] Show', GetSelect: '[SelfDefineFieldDto] GetSelect', GetSelectSuc: '[SelfDefineFieldDto] GetSelectSuc', GetDic: '[SelfDefineFieldDto] GetDic', GetDicSuc: '[SelfDefineFieldDto] GetDicSuc', Post: '[SelfDefineFieldDto] Post', PostSuc: '[SelfDefineFieldDto] PostSuc', Get: '[SelfDefineFieldDto] Get', GetSuc: '[SelfDefineFieldDto] GetSuc', GetList: '[SelfDefineFieldDto] GetList', GetListSuc: '[SelfDefineFieldDto] GetListSuc' };

export class SelfDefineFieldDtoShowAction implements Action { type = SelfDefineFieldDtoActionTypes.SHOW; constructor(public payload: SelfDefineFieldDtoState) { } }

export class SelfDefineFieldDtoPostAction implements Action { type = SelfDefineFieldDtoActionTypes.Post; constructor(public payload: SelfDefineFieldDto) { } }
export class SelfDefineFieldDtoPostSucAction implements Action { type = SelfDefineFieldDtoActionTypes.PostSuc; constructor(public payload: string) { } }

export class SelfDefineFieldDtoGetAction implements Action { type = SelfDefineFieldDtoActionTypes.Get; constructor(public payload: number) { } }
export class SelfDefineFieldDtoGetSucAction implements Action { type = SelfDefineFieldDtoActionTypes.GetSuc; constructor(public payload: SelfDefineFieldDto) { } }

export class SelfDefineFieldDtoGetListAction implements Action { type = SelfDefineFieldDtoActionTypes.GetList; constructor(public payload: any) { } }
export class SelfDefineFieldDtoGetListSucAction implements Action { type = SelfDefineFieldDtoActionTypes.GetListSuc; constructor(public payload: SelfDefineFieldDtoJSON) { } }

export class SelfDefineFieldDtoGetDicAction implements Action { type = SelfDefineFieldDtoActionTypes.GetDic; constructor(public payload: any) { } }
export class SelfDefineFieldDtoGetDicSucAction implements Action { type = SelfDefineFieldDtoActionTypes.GetDicSuc; constructor(public payload: JSON) { } }

export class SelfDefineFieldDtoGetSelectAction implements Action { type = SelfDefineFieldDtoActionTypes.GetSelect; constructor(public payload: any) { } }
export class SelfDefineFieldDtoGetSelectSucAction implements Action { type = SelfDefineFieldDtoActionTypes.GetSelectSuc; constructor(public payload: SelectListItemModel[]) { } }

export type SelfDefineFieldDtoActions = SelfDefineFieldDtoShowAction | SelfDefineFieldDtoPostAction | SelfDefineFieldDtoPostSucAction | SelfDefineFieldDtoGetAction | SelfDefineFieldDtoGetSucAction | SelfDefineFieldDtoGetListAction | SelfDefineFieldDtoGetListSucAction | SelfDefineFieldDtoGetDicAction | SelfDefineFieldDtoGetDicSucAction | SelfDefineFieldDtoGetSelectAction | SelfDefineFieldDtoGetSelectSucAction;
