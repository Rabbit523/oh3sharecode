import { Action } from '@ngrx/store';
import { AutoState } from "../../modules/auto";


export const AutoActionTypes = {
  SHOW: '[Auto] Show',
  GetCreateIndexAll: '[Auto] GetCreateIndexAll', GetCreateIndexAllSuc: '[Auto] GetCreateIndexAllSuc',
  GetBarCordImg: '[Auto] GetBarCordImg', GetBarCordImgSuc: '[Auto] GetBarCordImgSuc',
  RebuildUserTempNew: '[Auto] RebuildUserTempNew', RebuildUserTempNewSuc: '[Auto] RebuildUserTempNewSuc',
  RebuildFunc: '[Auto] RebuildFunc', RebuildFuncSuc: '[Auto] RebuildFuncSuc',
  RebuildView: '[Auto] RebuildView', RebuildViewSuc: '[Auto] RebuildViewSuc',
  ExportAttach: '[Auto] ExportAttach', ExportAttachSuc: '[Auto] ExportAttachSuc',
  Export: '[Auto] Export', ExportSuc: '[Auto] ExportSuc',
  Timeing: '[Auto] Timeing', TimeingSuc: '[Auto] TimeingSuc',
  TaskEveryDay: '[Auto] TaskEveryDay', TaskEveryDaySuc: '[Auto] TaskEveryDaySuc'
};

export class AutoShowAction implements Action { type = AutoActionTypes.SHOW; constructor(public payload: AutoState) { } }

export class GetCreateIndexAllAction implements Action { type = AutoActionTypes.GetCreateIndexAll; constructor(public payload: any) { } }
export class GetCreateIndexAllSucAction implements Action { type = AutoActionTypes.GetCreateIndexAllSuc; constructor(public payload: string) { } }

export class GetBarCordImgAction implements Action { type = AutoActionTypes.GetBarCordImg; constructor(public payload: any) { } }
export class GetBarCordImgSucAction implements Action { type = AutoActionTypes.GetBarCordImgSuc; constructor(public payload: string) { } }

export class RebuildUserTempNewAction implements Action { type = AutoActionTypes.RebuildUserTempNew; constructor(public payload: any) { } }
export class RebuildUserTempNewSucAction implements Action { type = AutoActionTypes.RebuildUserTempNewSuc; constructor(public payload: string) { } }

export class RebuildFuncAction implements Action { type = AutoActionTypes.RebuildFunc; constructor(public payload: number) { } }
export class RebuildFuncSucAction implements Action { type = AutoActionTypes.RebuildFuncSuc; constructor(public payload: string) { } }

export class RebuildViewAction implements Action { type = AutoActionTypes.RebuildView; constructor(public payload: number) { } }
export class RebuildViewSucAction implements Action { type = AutoActionTypes.RebuildViewSuc; constructor(public payload: string) { } }

export class ExportAttachAction implements Action { type = AutoActionTypes.ExportAttach; constructor(public payload: any) { } }
export class ExportAttachSucAction implements Action { type = AutoActionTypes.ExportAttachSuc; constructor(public payload: string) { } }

export class ExportAction implements Action { type = AutoActionTypes.Export; constructor(public payload: string) { } }
export class ExportSucAction implements Action { type = AutoActionTypes.ExportSuc; constructor(public payload: string) { } }

export class TimeingAction implements Action { type = AutoActionTypes.Timeing; constructor(public payload: any) { } }
export class TimeingSucAction implements Action { type = AutoActionTypes.TimeingSuc; constructor(public payload: string) { } }

export class TaskEveryDayAction implements Action { type = AutoActionTypes.TaskEveryDay; constructor(public payload: any) { } }
export class TaskEveryDaySucAction implements Action { type = AutoActionTypes.TaskEveryDaySuc; constructor(public payload: string) { } }

export type AutoActions = AutoShowAction |
  GetCreateIndexAllAction | GetCreateIndexAllSucAction | GetBarCordImgAction | GetBarCordImgSucAction | RebuildUserTempNewAction | RebuildUserTempNewSucAction |
  RebuildFuncAction | RebuildFuncSucAction | RebuildViewAction | RebuildViewSucAction | ExportAttachAction | ExportAttachSucAction | ExportAction | ExportSucAction |
  TimeingAction | TimeingSucAction | TaskEveryDayAction | TaskEveryDaySucAction;
