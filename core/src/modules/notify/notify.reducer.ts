import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NotifyActions, NotifyActionTypes } from './notify.actions';
import { initialNotifyState, NotifyState } from './notify.state';

export function NotifyReducer(state = initialNotifyState, action: NotifyActions): NotifyState {
  switch (action.type) {
    case NotifyActionTypes.GetListSuc:
      return Object.assign({}, state, { List: action.payload });
    case NotifyActionTypes.GetSuc:
      return Object.assign({}, state, { Notify: action.payload });
    case NotifyActionTypes.SHOW:
      return Object.assign({}, state, action.payload);      
    default:
      return state;
  }
}
