import { AboutPageState } from './about.state';
import { AboutPageActions, AboutPageActionTypes } from './about.action';
export function AboutPageReducer(state = { readyToInstallWebVersion: "" }, action: AboutPageActions): AboutPageState {
  switch (action.type) {
    case AboutPageActionTypes.SetInstallWebVersion:
      return Object.assign({}, state, { readyToInstallWebVersion: action.payload });
    default:
      return state;
  }
}