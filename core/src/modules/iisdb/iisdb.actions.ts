import { Action } from '@ngrx/store';
import { IISDBState } from "../../modules/iisdb";
import { NewSite, IISSite, NewSiteDb } from '../../shared/models/webapi/iisdb/iisdb';

export const IISDBActionTypes = { SHOW: '[IISDB] Show', PostIIS: '[IISDB] PostIIS', PostIISSuc: '[IISDB] PostIISSuc', PostDB: '[IISDB] PostDB', PostDBSuc: '[IISDB] PostDBSuc', GetList: '[IISDB] GetList', GetListSuc: '[IISDB] GetListSuc' };

export class IISDBShowAction implements Action { type = IISDBActionTypes.SHOW; constructor(public payload: IISDBState) { } }

export class IISPostAction implements Action { type = IISDBActionTypes.PostIIS; constructor(public payload: NewSite) { } }
export class IISPostSucAction implements Action { type = IISDBActionTypes.PostIISSuc; constructor(public payload: string) { } }

export class DBPostAction implements Action { type = IISDBActionTypes.PostDB; constructor(public payload: NewSiteDb) { } }
export class DBPostSucAction implements Action { type = IISDBActionTypes.PostDBSuc; constructor(public payload: string) { } }

export class IISDBGetListAction implements Action { type = IISDBActionTypes.GetList; constructor(public payload: any) { } }
export class IISDBGetListSucAction implements Action { type = IISDBActionTypes.GetListSuc; constructor(public payload: IISSite) { } }

export type IISDBActions = IISDBShowAction | IISPostAction | IISPostSucAction | DBPostAction | DBPostSucAction | IISDBGetListAction | IISDBGetListSucAction;
