import { Action } from '@ngrx/store';
import { CameraSettingDtoState } from "../../modules/camdb";
import { CamSettingCamTimeArea, CameraSettingDtoJson } from '../../shared/models/webapi/cam/cam';

export const CameraSettingDtoActionTypes = { SHOW: '[CameraSettingDto] Show', Get: '[CameraSettingDto] Get', GetSuc: '[CameraSettingDto] GetSuc', Post: '[CameraSettingDto] Post', PostSuc: '[CameraSettingDto] PostSuc', GetList: '[CameraSettingDto] GetList', GetListSuc: '[CameraSettingDto] GetListSuc' };

export class CameraSettingDtoShowAction implements Action { type = CameraSettingDtoActionTypes.SHOW; constructor(public payload: CameraSettingDtoState) { } }

export class CameraSettingDtoGetAction implements Action { type = CameraSettingDtoActionTypes.Get; constructor(public payload: number) { } }
export class CameraSettingDtoGetSucAction implements Action { type = CameraSettingDtoActionTypes.GetSuc; constructor(public payload: CamSettingCamTimeArea) { } }

export class CameraSettingDtoPostAction implements Action { type = CameraSettingDtoActionTypes.Post; constructor(public payload: CamSettingCamTimeArea) { } }
export class CameraSettingDtoPostSucAction implements Action { type = CameraSettingDtoActionTypes.PostSuc; constructor(public payload: string) { } }

export class CameraSettingDtoGetListAction implements Action { type = CameraSettingDtoActionTypes.GetList; constructor(public payload: any) { } }
export class CameraSettingDtoGetListSucAction implements Action { type = CameraSettingDtoActionTypes.GetListSuc; constructor(public payload: CameraSettingDtoJson) { } }

export type CameraSettingDtoActions = CameraSettingDtoShowAction | CameraSettingDtoGetAction | CameraSettingDtoGetSucAction | CameraSettingDtoPostAction | CameraSettingDtoPostSucAction | CameraSettingDtoGetListAction | CameraSettingDtoGetListSucAction;
