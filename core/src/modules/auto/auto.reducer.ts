import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AutoActions, AutoActionTypes } from './auto.actions';
import { initialAutoState, AutoState } from './auto.state';

export function AutoReducer(state = initialAutoState, action: AutoActions): AutoState {
  switch (action.type) {
    case AutoActionTypes.SHOW:
      return Object.assign({}, state, initialAutoState);

    case AutoActionTypes.GetCreateIndexAllSuc:
    case AutoActionTypes.RebuildUserTempNewSuc:
    case AutoActionTypes.RebuildFuncSuc:
    case AutoActionTypes.RebuildViewSuc:
    case AutoActionTypes.ExportAttachSuc:
    case AutoActionTypes.ExportSuc:
    case AutoActionTypes.TimeingSuc:
    case AutoActionTypes.TaskEveryDaySuc:
      return Object.assign({}, state, { status: action.payload });
    case AutoActionTypes.GetBarCordImgSuc:
      return Object.assign({}, state, { qrimg: action.payload });
    default:
      return state;

  }
}
