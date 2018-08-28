import { Action } from '@ngrx/store';
import { MediaState } from "../../modules/media";
import { MediaFileUrl, ProtectCamSettingDTO, GrounpMediaFile, MediaFileUrlJSON } from "../../shared/models/webapi/media/media";
export class ShowPlayListParas {
  placeid: number;
  isActive: boolean;
  day: string;
}
export class StaticPagedListParas {
  pIndex: number;
  pSize: number;
  sCam: number;
  cStDate: string;
  cEndDate: string;
}
export const MediaActionTypes = {
  SHOW: '[Media] Show',
  GetList: '[Media] GetList',
  GetListSuc: '[Media] GetListSuc',
  GetProtects: '[Media] GetProtects',
  GetProtectsSuc: '[Media] GetProtectsSuc',
  GetShowPlayList: '[Media] GetShowPlayList',
  GetShowPlayListSuc: '[Media] GetShowPlayListSuc',
  GetStaticPagedList: '[Media] GetStaticPagedList',
  GetStaticPagedListSuc: '[Media] GetStaticPagedListSuc'
};

export class MediaShowAction implements Action { type = MediaActionTypes.SHOW; constructor(public payload: MediaState) { } }
export class GetListAction implements Action { type = MediaActionTypes.GetList; constructor(public payload: boolean) { } }
export class GetListSucAction implements Action { type = MediaActionTypes.GetListSuc; constructor(public payload: MediaFileUrl[]) { } }
export class GetProtectsAction implements Action { type = MediaActionTypes.GetProtects; constructor(public payload: number) { } }
export class GetProtectsSucAction implements Action { type = MediaActionTypes.GetProtectsSuc; constructor(public payload: ProtectCamSettingDTO) { } }
export class GetShowPlayListAction implements Action { type = MediaActionTypes.GetShowPlayList; constructor(public payload: ShowPlayListParas) { } }
export class GetShowPlayListSucAction implements Action { type = MediaActionTypes.GetShowPlayListSuc; constructor(public payload: GrounpMediaFile[]) { } }
export class GetStaticPagedListAction implements Action { type = MediaActionTypes.GetStaticPagedList; constructor(public payload: StaticPagedListParas) { } }
export class GetStaticPagedListSucAction implements Action { type = MediaActionTypes.GetStaticPagedListSuc; constructor(public payload: MediaFileUrlJSON) { } }

export type MediaActions = MediaShowAction |
  GetListAction | GetListSucAction | GetProtectsAction | GetProtectsSucAction |
  GetShowPlayListAction | GetShowPlayListSucAction | GetStaticPagedListAction | GetStaticPagedListSucAction;
