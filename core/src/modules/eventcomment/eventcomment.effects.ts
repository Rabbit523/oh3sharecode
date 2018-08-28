import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EventDetailService } from '../../shared/service/webapi/eventdetail.service';
import { EventCommentActionTypes, EventCommentSetCommentAction } from './eventcomment.actions';
import { AppState } from '../app.state';
import { GlobalActionEnum, EventConst } from '../../shared/config';

@Injectable()
export class EventCommentEffects {
  constructor(private actions$: Actions, public eventdetailtservice: EventDetailService, public store$: Store<AppState>) { }

  @Effect() EventCommentSaveCommentAction$ = this.actions$
    .ofType(EventCommentActionTypes.SaveComment)
    .map(toPayload)
    .map(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailtservice.uploadComment(state.bgId, state.files, state.comment, state.contentType).then(bo => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: bo });
        return new EventCommentSetCommentAction("");
      });
    })
}