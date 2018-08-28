import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { AppState } from '../app.state';
import { EventConst,GlobalActionEnum } from "../../shared/config";
import { ContactorCacheHelper } from '../../shared/models/helper/contactorcachehelper';
import { EventPostService } from '../../shared/service/webapi/eventpost.service';
import { ReceivedListActionTypes, ReceivedListLoadDataSuccessAction } from './receivedlist.actions';



@Injectable()
export class ReceivedListEffects {
  constructor(
    private actions$: Actions, public store$: Store<AppState>,
     public eventpostSer: EventPostService
  ) { }

  @Effect() ReceivedListShowAction$ = this.actions$
    .ofType(ReceivedListActionTypes.SHOW)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.ReceivedList))
    .switchMap(([number, state]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventpostSer.GetNewCommentObservable(state.pager.pageIndex, state.pager.pageSize)
        .map(
        response => {
          let newState = {
            pager: { pageIndex: state.pager.pageIndex + 1, pageCount: state.pager.pageCount, pageSize: state.pager.pageSize, },
            comments: ContactorCacheHelper.toMyNewPostCommentWithNamePics(response)
          };
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new ReceivedListLoadDataSuccessAction(newState);
        })
    })

  @Effect() ReceivedListPageDownAction$ = this.actions$
    .ofType(ReceivedListActionTypes.PAGEDOWN)
    .map(toPayload)
    .switchMap(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventpostSer.GetNewCommentObservable(state.pager.pageIndex, state.pager.pageSize)
        .map(response => {
          let msg = "";
          if (response.length > 0) { msg = "AppDataOK"; } else { msg = "AppNoData"; }
          let newItems = ContactorCacheHelper.toMyNewPostCommentWithNamePics(response)
          let temp = Object.assign([], state.comments)
          newItems.forEach(element => { temp.push(element); });
          let newState = { pager: { pageIndex: state.pager.pageIndex + 1, pageCount: state.pager.pageCount, pageSize: state.pager.pageSize, }, comments: temp };          
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new ReceivedListLoadDataSuccessAction(newState);
        })
        .catch(err => {
          return this.eventpostSer.handleError("GetNewCommentObservable", err);
        })
    })
}