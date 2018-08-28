import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HostSettingActions, HostSettingActionTypes } from './hostsetting.actions';
import { initialHostSettingState, HostSettingState } from './hostsetting.state';

export function HostSettingReducer(state = initialHostSettingState, action: HostSettingActions): HostSettingState {
  switch (action.type) {
    case HostSettingActionTypes.SHOW:
      return Object.assign({}, state, initialHostSettingState);

    case HostSettingActionTypes.GetNamesSuc:
      return Object.assign({}, state, { Names: action.payload });

    case HostSettingActionTypes.GetMobileSuc:
      return Object.assign({}, state, { Mobile: action.payload });

    case HostSettingActionTypes.GetPcSuc:
      return Object.assign({}, state, { Pc: action.payload });
    default:
      return state;

  }
}
