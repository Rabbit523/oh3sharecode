import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AjaxActions, AjaxActionTypes } from './ajax.actions';
import { initialAjaxState, AjaxState } from './ajax.state';

export function AjaxReducer(state = initialAjaxState, action: AjaxActions): AjaxState {
  switch (action.type) {
    case AjaxActionTypes.SHOW:
      return Object.assign({}, state, action.payload);

    case AjaxActionTypes.PostEventSuc:
      return Object.assign({}, state, { PostEvent: action.payload });
    case AjaxActionTypes.PostFileSuc:
      return Object.assign({}, state, { PostFile: action.payload });
    case AjaxActionTypes.ViewThumbSuc:
      return Object.assign({}, state, { ViewThumb: action.payload });
    case AjaxActionTypes.SelectFeildsFromTreeSuc:
      return Object.assign({}, state, { SelectFeildsFromTree: action.payload });
    case AjaxActionTypes.AllProjectTreeSuc:
      return Object.assign({}, state, { AllProjectTree: action.payload });
    case AjaxActionTypes.SelfAutoSubScribersTreeSuc:
      return Object.assign({}, state, { SelfAutoSubScribersTree: action.payload });
    case AjaxActionTypes.SelectAllFromTreeSuc:
      return Object.assign({}, state, { SelectAllFromTree: action.payload });
    case AjaxActionTypes.SelectAssignToFromTreeSuc:
      return Object.assign({}, state, { SelectAssignToFromTree: action.payload });
    case AjaxActionTypes.GetProjectPermissionBySuc:
      return Object.assign({}, state, { GetProjectPermissionBy: action.payload });
    case AjaxActionTypes.GetBugKeyWordsSuc:
      return Object.assign({}, state, { GetBugKeyWords: action.payload });
    case AjaxActionTypes.GetMeetingExsitSuc:
      return Object.assign({}, state, { GetMeetingExsit: action.payload });
    case AjaxActionTypes.EndMeetingSuc:
      return Object.assign({}, state, { EndMeeting: action.payload });
    case AjaxActionTypes.RebuildMeetingSuc:
      return Object.assign({}, state, { RebuildMeeting: action.payload });
    case AjaxActionTypes.GoToMeetingSuc:
      return Object.assign({}, state, { GoToMeeting: action.payload });
    case AjaxActionTypes.GetPlayBlackSuc:
      return Object.assign({}, state, { GetPlayBlack: action.payload });
    case AjaxActionTypes.CloseMasterDetailsSuc:
      return Object.assign({}, state, { CloseMasterDetails: action.payload });
    case AjaxActionTypes.DeleteCommentSuc:
      return Object.assign({}, state, { DeleteComment: action.payload });
    default:
      return state;
  }
}
