import { Action } from '@ngrx/store';

export const AboutPageActionTypes = {
  GetInstallWebVersion: "[AboutPage] GetInstallWebVersion",
  SetInstallWebVersion: "[AboutPage] SetInstallWebVersion",
  GetInstallSucc: "[AboutPage] GetInstallSucc"
}

export class GetInstallWebVersionAction implements Action {
  type = AboutPageActionTypes.GetInstallWebVersion;
  constructor(public payload: string) { }
}
export class GetInstallSuccAction implements Action {
  type = AboutPageActionTypes.GetInstallSucc;
  constructor(public payload: string) { }
}
export class SetInstallWebVersionAction implements Action {
  type = AboutPageActionTypes.SetInstallWebVersion;
  constructor(public payload: string) { }
}

export type AboutPageActions = GetInstallWebVersionAction | SetInstallWebVersionAction | GetInstallSuccAction;