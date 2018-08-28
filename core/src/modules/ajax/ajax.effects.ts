import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AjaxState } from './ajax.state';
import { AppState } from '../app.state';
import {
  AjaxActionTypes, AjaxShowAction, PostEventSucAction,
  DeleteCommentSucAction, CloseMasterDetailsSucAction, GetPlayBlackSucAction, GoToMeetingSucAction,
  RebuildMeetingSucAction, EndMeetingSucAction, GetMeetingExsitSucAction, GetBugKeyWordsSucAction,
  GetProjectPermissionBySucAction, SelectAssignToFromTreeSucAction, SelectAllFromTreeSucAction, SelfAutoSubScribersTreeSucAction,
  AllProjectTreeSucAction, SelectFeildsFromTreeSucAction, ViewThumbSucAction, PostFileSucAction
} from './ajax.actions';
import { AjaxDBService } from '../../shared/service/webapi/ajax.service';

@Injectable()
export class AjaxEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public ajaxser: AjaxDBService) { }

  @Effect() PostEventAction$ = this.actions$.ofType(AjaxActionTypes.PostEvent).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.PostEvent(data).map(x => { return new PostEventSucAction(x) });
    })

  @Effect() PostFileAction$ = this.actions$.ofType(AjaxActionTypes.PostFile).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.PostFile(data.id, data.user, data.pass, data.deviceid, data.file).map(x => { return new PostFileSucAction(x) });
    })

  @Effect() ViewThumbAction$ = this.actions$.ofType(AjaxActionTypes.ViewThumb).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.ViewThumb(data.bugid, data.size).map(x => { return new ViewThumbSucAction(x) });
    })

  @Effect() SelectFeildsFromTreeAction$ = this.actions$.ofType(AjaxActionTypes.SelectFeildsFromTree).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.SelectFeildsFromTree(data.callBack, data.selectIds, data.fuctype).map(x => { return new SelectFeildsFromTreeSucAction(x) });
    })

  @Effect() AllProjectTreeAction$ = this.actions$.ofType(AjaxActionTypes.AllProjectTree).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.AllProjectTree(data.callBack, data.ids, data.title).map(x => { return new AllProjectTreeSucAction(x) });
    })

  @Effect() SelfAutoSubScribersTreeAction$ = this.actions$.ofType(AjaxActionTypes.SelfAutoSubScribersTree).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.SelfAutoSubScribersTree(data.callBack, data.title, data.ids, data.usid).map(x => { return new SelfAutoSubScribersTreeSucAction(x) });
    })

  @Effect() SelectAllFromTreeAction$ = this.actions$.ofType(AjaxActionTypes.SelectAllFromTree).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.SelectAllFromTree(data.callBack, data.type, data.fill, data.selval).map(x => { return new SelectAllFromTreeSucAction(x) });
    })

  @Effect() SelectAssignToFromTreeAction$ = this.actions$.ofType(AjaxActionTypes.SelectAssignToFromTree).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.SelectAssignToFromTree(data.projectSelect, data.orgSelect, data.callBack, data.bugid, data.selectIds).map(x => { return new SelectAssignToFromTreeSucAction(x) });
    })

  @Effect() GetProjectPermissionByAction$ = this.actions$.ofType(AjaxActionTypes.GetProjectPermissionBy).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.GetProjectPermissionBy(data.projectid, data.usid, data.permissionType).map(x => { return new GetProjectPermissionBySucAction(x) });
    })

  @Effect() GetBugKeyWordsAction$ = this.actions$.ofType(AjaxActionTypes.GetBugKeyWords).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.GetBugKeyWords(data).map(x => { return new GetBugKeyWordsSucAction(x) });
    })

  @Effect() GetMeetingExsitAction$ = this.actions$.ofType(AjaxActionTypes.GetMeetingExsit).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.GetMeetingExsit(data).map(x => { return new GetMeetingExsitSucAction(x) });
    })

  @Effect() EndMeetingAction$ = this.actions$.ofType(AjaxActionTypes.EndMeeting).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.EndMeeting(data.id, data.bgid).map(x => { return new EndMeetingSucAction(x) });
    })

  @Effect() RebuildMeetingAction$ = this.actions$.ofType(AjaxActionTypes.RebuildMeeting).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.RebuildMeeting(data.id, data.postId).map(x => { return new RebuildMeetingSucAction(x) });
    })

  @Effect() GoToMeetingAction$ = this.actions$.ofType(AjaxActionTypes.GoToMeeting).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.GoToMeeting(data.id, data.bgid).map(x => { return new GoToMeetingSucAction(x) });
    })

  @Effect() GetPlayBlackAction$ = this.actions$.ofType(AjaxActionTypes.GetPlayBlack).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.GetPlayBlack(data).map(x => { return new GetPlayBlackSucAction(x) });
    })

  @Effect() CloseMasterDetailsAction$ = this.actions$.ofType(AjaxActionTypes.CloseMasterDetails).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.CloseMasterDetails(data).map(x => { return new CloseMasterDetailsSucAction(x) });
    })

  @Effect() DeleteCommentAction$ = this.actions$.ofType(AjaxActionTypes.DeleteComment).map(toPayload)
    .switchMap(data => {
      return this.ajaxser.DeleteComment(data).map(x => { return new DeleteCommentSucAction(x) });
    })
}