import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CameraSettingDtoActions, CameraSettingDtoActionTypes } from './camdb.actions';
import { initialCameraSettingDtoState, CameraSettingDtoState } from './camdb.state';

export function CameraSettingDtoReducer(state = initialCameraSettingDtoState, action: CameraSettingDtoActions): CameraSettingDtoState {
  switch (action.type) {    
    case CameraSettingDtoActionTypes.GetSuc:
      return Object.assign({}, state, { CamSetting: action.payload });
    case CameraSettingDtoActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case CameraSettingDtoActionTypes.SHOW:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
