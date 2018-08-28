import { Action } from '@ngrx/store';
import { CalcChartActions, CalcChartActionTypes } from './calcchart.actions';
import { initialCalcChartState, CalcChartState } from './calcchart.state';

export function CalcChartReducer(state = initialCalcChartState, action: CalcChartActions): CalcChartState {
  switch (action.type) {

    case CalcChartActionTypes.SHOW:
      return action.payload as CalcChartState;
    case CalcChartActionTypes.FirstLoad:
      return Object.assign({}, state, { firstLoad: action.payload });
      
    case CalcChartActionTypes.SetCheckBoxData:
      return Object.assign({}, state, { CheckBoxDataArray: action.payload });

    case CalcChartActionTypes.SetChartData:
      return Object.assign({}, state, { dataArray: action.payload });

    case CalcChartActionTypes.ChangeChartXY:
      let defaultArray1 = Object.assign([], state.defaultArray);
      var f = defaultArray1.shift();
      defaultArray1.push(f);
      return Object.assign({}, state, { defaultArray: defaultArray1 });

    case CalcChartActionTypes.SetFilterData:
      return Object.assign({}, state, { defaultArray: action.payload });


    case CalcChartActionTypes.SummaryCalcSuc:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;

  }
}
