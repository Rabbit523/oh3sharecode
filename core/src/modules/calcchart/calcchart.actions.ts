import { Action } from '@ngrx/store';
import { CalcChartState } from "./calcchart.state";
import { StringKeyValue } from '../../shared/models/common/keyvalue';
import { ChartDataArray } from '../../shared/models/webapi/chart/chartdataArray';


export const CalcChartActionTypes = {
  SHOW: '[CalcChart] Show',
  FirstLoad: '[CalcChart] FirstLoad',
  GetCheckBoxData: '[CalcChart] GetCheckBoxData', SetCheckBoxData: '[CalcChart] SetCheckBoxData',
  GetChartData: '[CalcChart] GetChartData', SetChartData: '[CalcChart] SetChartData',
  ChangeChartXY: '[CalcChart] ChangeChartXY', SetFilterData: '[CalcChart] SetFilterData',
  SummaryCalc: '[CalcChart] SummaryCalc', SummaryCalcSuc: '[CalcChart] SummaryCalcSuc',
  CalcD3: '[CalcChart] CalcD3', CalcD3Suc: '[CalcChart] CalcD3Suc',
};

export class CalcChartShowAction implements Action { type = CalcChartActionTypes.SHOW; constructor(public payload: CalcChartState) { } }
export class CalcChartFirstLoadAction implements Action { type = CalcChartActionTypes.FirstLoad; constructor(public payload: boolean) { } }

export class CalcChartGetCheckBoxDataAction implements Action { type = CalcChartActionTypes.GetCheckBoxData; constructor(public payload: string) { } }
export class CalcChartSetCheckBoxDataAction implements Action { type = CalcChartActionTypes.SetCheckBoxData; constructor(public payload: StringKeyValue[]) { } }

export class CalcChartGetChartDataAction implements Action { type = CalcChartActionTypes.GetChartData; constructor(public payload: string) { } }
export class CalcChartSetChartDataAction implements Action { type = CalcChartActionTypes.SetChartData; constructor(public payload: ChartDataArray[]) { } }

export class CalcChartChangeChartXYAction implements Action { type = CalcChartActionTypes.ChangeChartXY; constructor(public payload: string) { } }
export class CalcChartSetFilterDataAction implements Action { type = CalcChartActionTypes.SetFilterData; constructor(public payload: Array<string>) { } }

export class CalcChartSummaryCalcAction implements Action { type = CalcChartActionTypes.SummaryCalc; constructor(public payload: any) { } }
export class CalcChartSummaryCalcSucAction implements Action { type = CalcChartActionTypes.SummaryCalcSuc; constructor(public payload: Array<ChartDataArray>) { } }

export class CalcChartCalcD3Action implements Action { type = CalcChartActionTypes.CalcD3; constructor(public payload: any) { } }
export class CalcChartCalcD3SucAction implements Action { type = CalcChartActionTypes.CalcD3Suc; constructor(public payload: string) { } }

export type CalcChartActions = CalcChartShowAction
  | CalcChartGetCheckBoxDataAction | CalcChartSetCheckBoxDataAction | CalcChartGetChartDataAction | CalcChartSetChartDataAction
  | CalcChartChangeChartXYAction | CalcChartSetFilterDataAction | CalcChartFirstLoadAction | CalcChartSummaryCalcAction | CalcChartSummaryCalcSucAction |
  CalcChartCalcD3Action | CalcChartCalcD3SucAction;
