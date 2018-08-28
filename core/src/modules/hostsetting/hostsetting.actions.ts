import { Action } from '@ngrx/store';
import { HostSettingState } from "../../modules/hostsetting";
import { EventDispalyTitle } from '../../shared/models/webapi/hostsetting/hostsetting';

export const HostSettingActionTypes = {
  SHOW: '[HostSetting] Show', GetNames: '[HostSetting] GetNames', GetNamesSuc: '[HostSetting] GetNamesSuc', GetMobile: '[HostSetting] GetMobile', GetMobileSuc: '[HostSetting] GetMobileSuc', GetPc: '[HostSetting] GetPc', GetPcSuc: '[HostSetting] GetPcSuc',
  SetMobile: '[HostSetting] SetMobile', SetMobileSuc: '[HostSetting] SetMobileSuc', SetPc: '[HostSetting] SetPc', SetPcSuc: '[HostSetting] SetPcSuc'
};

export class HostSettingShowAction implements Action { type = HostSettingActionTypes.SHOW; constructor(public payload: HostSettingState) { } }

export class HostSettingGetNamesAction implements Action { type = HostSettingActionTypes.GetNames; constructor(public payload: number) { } }
export class HostSettingGetNamesSucAction implements Action { type = HostSettingActionTypes.GetNamesSuc; constructor(public payload: EventDispalyTitle) { } }

export class HostSettingGetMobileAction implements Action { type = HostSettingActionTypes.GetMobile; constructor(public payload: number) { } }
export class HostSettingGetMobileSucAction implements Action { type = HostSettingActionTypes.GetMobileSuc; constructor(public payload: string) { } }

export class HostSettingGetPcAction implements Action { type = HostSettingActionTypes.GetPc; constructor(public payload: number) { } }
export class HostSettingGetPcSucAction implements Action { type = HostSettingActionTypes.GetPcSuc; constructor(public payload: string) { } }

export class HostSettingSetMobileAction implements Action { type = HostSettingActionTypes.SetMobile; constructor(public payload: any) { } }
export class HostSettingSetMobileSucAction implements Action { type = HostSettingActionTypes.SetMobileSuc; constructor(public payload: any) { } }

export class HostSettingSetPcAction implements Action { type = HostSettingActionTypes.SetPc; constructor(public payload: any) { } }
export class HostSettingSetPcSucAction implements Action { type = HostSettingActionTypes.SetPcSuc; constructor(public payload: any) { } }

export type HostSettingActions = HostSettingShowAction | HostSettingGetNamesAction | HostSettingGetNamesSucAction | HostSettingGetMobileAction | HostSettingGetMobileSucAction |
  HostSettingGetPcAction | HostSettingGetPcSucAction | HostSettingSetMobileAction | HostSettingSetMobileSucAction | HostSettingSetPcAction | HostSettingSetPcSucAction;
