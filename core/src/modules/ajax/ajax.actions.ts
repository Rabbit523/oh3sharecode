import { Action } from '@ngrx/store';
import { AjaxState } from "../../modules/ajax";
import { TreeViewModel, PythonPostModel } from '../../shared/models/webapi';
import { JsonDictionary } from '../../shared/models/common/jsondictionary';

export const AjaxActionTypes = {
  SHOW: '[Ajax] Show',
  PostEvent: '[Ajax] PostEvent', PostEventSuc: '[Ajax] PostEventSuc',
  PostFile: '[Ajax] PostFile', PostFileSuc: '[Ajax] PostFileSuc',
  ViewThumb: '[Ajax] ViewThumb', ViewThumbSuc: '[Ajax] ViewThumbSuc',
  SelectFeildsFromTree: '[Ajax] SelectFeildsFromTree', SelectFeildsFromTreeSuc: '[Ajax] SelectFeildsFromTreeSuc',
  AllProjectTree: '[Ajax] AllProjectTree', AllProjectTreeSuc: '[Ajax] AllProjectTreeSuc',
  SelfAutoSubScribersTree: '[Ajax] SelfAutoSubScribersTree', SelfAutoSubScribersTreeSuc: '[Ajax] SelfAutoSubScribersTreeSuc',
  SelectAllFromTree: '[Ajax] SelectAllFromTree', SelectAllFromTreeSuc: '[Ajax] SelectAllFromTreeSuc',
  SelectAssignToFromTree: '[Ajax] SelectAssignToFromTree', SelectAssignToFromTreeSuc: '[Ajax] SelectAssignToFromTreeSuc',
  GetProjectPermissionBy: '[Ajax] GetProjectPermissionBy', GetProjectPermissionBySuc: '[Ajax] GetProjectPermissionBySuc',
  GetBugKeyWords: '[Ajax] GetBugKeyWords', GetBugKeyWordsSuc: '[Ajax] GetBugKeyWordsSuc',
  GetMeetingExsit: '[Ajax] GetMeetingExsit', GetMeetingExsitSuc: '[Ajax] GetMeetingExsitSuc',
  EndMeeting: '[Ajax] EndMeeting', EndMeetingSuc: '[Ajax] EndMeetingSuc',
  RebuildMeeting: '[Ajax] RebuildMeeting', RebuildMeetingSuc: '[Ajax] RebuildMeetingSuc',
  GoToMeeting: '[Ajax] GoToMeeting', GoToMeetingSuc: '[Ajax] GoToMeetingSuc',
  GetPlayBlack: '[Ajax] GetPlayBlack', GetPlayBlackSuc: '[Ajax] GetPlayBlackSuc',
  CloseMasterDetails: '[Ajax] CloseMasterDetails', CloseMasterDetailsSuc: '[Ajax] CloseMasterDetailsSuc',
  DeleteComment: '[Ajax] DeleteComment', DeleteCommentSuc: '[Ajax] DeleteCommentSuc',
};

export class AjaxShowAction implements Action { type = AjaxActionTypes.SHOW; constructor(public payload: AjaxState) { } }

export class PostEventAction implements Action { type = AjaxActionTypes.PostEvent; constructor(public payload: PythonPostModel) { } }
export class PostEventSucAction implements Action { type = AjaxActionTypes.PostEventSuc; constructor(public payload: number) { } }

export class PostFileAction implements Action { type = AjaxActionTypes.PostFile; constructor(public payload: { id: number, user: string, pass: string, deviceid: string, file: string | Blob }) { } }
export class PostFileSucAction implements Action { type = AjaxActionTypes.PostFileSuc; constructor(public payload: string) { } }

export class ViewThumbAction implements Action { type = AjaxActionTypes.ViewThumb; constructor(public payload: { bugid: string, size: number }) { } }
export class ViewThumbSucAction implements Action { type = AjaxActionTypes.ViewThumbSuc; constructor(public payload: string) { } }

export class SelectFeildsFromTreeAction implements Action { type = AjaxActionTypes.SelectFeildsFromTree; constructor(public payload: { callBack: string, selectIds: string, fuctype: number }) { } }
export class SelectFeildsFromTreeSucAction implements Action { type = AjaxActionTypes.SelectFeildsFromTreeSuc; constructor(public payload: TreeViewModel) { } }

export class AllProjectTreeAction implements Action { type = AjaxActionTypes.AllProjectTree; constructor(public payload: { callBack: string, ids: string, title: string }) { } }
export class AllProjectTreeSucAction implements Action { type = AjaxActionTypes.AllProjectTreeSuc; constructor(public payload: TreeViewModel) { } }

export class SelfAutoSubScribersTreeAction implements Action { type = AjaxActionTypes.SelfAutoSubScribersTree; constructor(public payload: { callBack: string, title: string, ids: string, usid: number }) { } }
export class SelfAutoSubScribersTreeSucAction implements Action { type = AjaxActionTypes.SelfAutoSubScribersTreeSuc; constructor(public payload: TreeViewModel) { } }

export class SelectAllFromTreeAction implements Action { type = AjaxActionTypes.SelectAllFromTree; constructor(public payload: { callBack: string, type: string, fill: string, selval: string }) { } }
export class SelectAllFromTreeSucAction implements Action { type = AjaxActionTypes.SelectAllFromTreeSuc; constructor(public payload: TreeViewModel) { } }

export class SelectAssignToFromTreeAction implements Action { type = AjaxActionTypes.SelectAssignToFromTree; constructor(public payload: { projectSelect: number, orgSelect: number, callBack: string, bugid: number, selectIds: string }) { } }
export class SelectAssignToFromTreeSucAction implements Action { type = AjaxActionTypes.SelectAssignToFromTreeSuc; constructor(public payload: TreeViewModel) { } }

export class GetProjectPermissionByAction implements Action { type = AjaxActionTypes.GetProjectPermissionBy; constructor(public payload: { projectid: number, usid: number, permissionType: number }) { } }
export class GetProjectPermissionBySucAction implements Action { type = AjaxActionTypes.GetProjectPermissionBySuc; constructor(public payload: Array<string>) { } }

export class GetBugKeyWordsAction implements Action { type = AjaxActionTypes.GetBugKeyWords; constructor(public payload: number) { } }
export class GetBugKeyWordsSucAction implements Action { type = AjaxActionTypes.GetBugKeyWordsSuc; constructor(public payload: JsonDictionary<number>) { } }

export class GetMeetingExsitAction implements Action { type = AjaxActionTypes.GetMeetingExsit; constructor(public payload: number) { } }
export class GetMeetingExsitSucAction implements Action { type = AjaxActionTypes.GetMeetingExsitSuc; constructor(public payload: string) { } }

export class EndMeetingAction implements Action { type = AjaxActionTypes.EndMeeting; constructor(public payload: { id: number, bgid: number }) { } }
export class EndMeetingSucAction implements Action { type = AjaxActionTypes.EndMeetingSuc; constructor(public payload: string) { } }

export class RebuildMeetingAction implements Action { type = AjaxActionTypes.RebuildMeeting; constructor(public payload: { id: number, postId: number }) { } }
export class RebuildMeetingSucAction implements Action { type = AjaxActionTypes.RebuildMeetingSuc; constructor(public payload: string) { } }

export class GoToMeetingAction implements Action { type = AjaxActionTypes.GoToMeeting; constructor(public payload: { id: number, bgid: number }) { } }
export class GoToMeetingSucAction implements Action { type = AjaxActionTypes.GoToMeetingSuc; constructor(public payload: string) { } }

export class GetPlayBlackAction implements Action { type = AjaxActionTypes.GetPlayBlack; constructor(public payload: number) { } }
export class GetPlayBlackSucAction implements Action { type = AjaxActionTypes.GetPlayBlackSuc; constructor(public payload: string) { } }

export class CloseMasterDetailsAction implements Action { type = AjaxActionTypes.CloseMasterDetails; constructor(public payload: number) { } }
export class CloseMasterDetailsSucAction implements Action { type = AjaxActionTypes.CloseMasterDetailsSuc; constructor(public payload: string) { } }

export class DeleteCommentAction implements Action { type = AjaxActionTypes.DeleteComment; constructor(public payload: number) { } }
export class DeleteCommentSucAction implements Action { type = AjaxActionTypes.DeleteCommentSuc; constructor(public payload: string) { } }


export type AjaxActions = AjaxShowAction | PostEventAction | PostEventSucAction | PostFileAction | PostFileSucAction |
  ViewThumbAction | ViewThumbSucAction | SelectFeildsFromTreeAction | SelectFeildsFromTreeSucAction |
  AllProjectTreeAction | AllProjectTreeSucAction | SelfAutoSubScribersTreeAction | SelfAutoSubScribersTreeSucAction |
  SelectAllFromTreeAction | SelectAllFromTreeSucAction | SelectAssignToFromTreeAction | SelectAssignToFromTreeSucAction |
  GetProjectPermissionByAction | GetProjectPermissionBySucAction | GetBugKeyWordsAction | GetBugKeyWordsSucAction |
  GetMeetingExsitAction | GetMeetingExsitSucAction | EndMeetingAction | EndMeetingSucAction |
  RebuildMeetingAction | RebuildMeetingSucAction | GoToMeetingAction | GoToMeetingSucAction |
  GetPlayBlackAction | GetPlayBlackSucAction | CloseMasterDetailsAction | CloseMasterDetailsSucAction |
  DeleteCommentAction | DeleteCommentSucAction;
