import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { ChildTaskModel } from './eventchildtask.state';
import { AppState } from '../app.state';
import { EventConst } from "../../shared/config";
import { EventDetailService } from '../../shared/service/webapi/eventdetail.service';
import { BugTaskViewJson } from '../../shared/models/webapi/task/bugtaskviewjson';
import { GlobalActionEnum } from '../../shared/config/globalactionenum';
import { EventChildTaskActionTypes, EventChildTaskShowSuccAction } from './eventchildtask.actions';



@Injectable()
export class EventChildTaskEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>
    , public eventdetailservice: EventDetailService) {

  }
  @Effect() EventChildTaskShowAction$ = this.actions$
    .ofType(EventChildTaskActionTypes.SHOW)
    .map(toPayload)
    .switchMap((childTaskParas: ChildTaskModel) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.GetBugTask(childTaskParas.Id, childTaskParas.Tid, childTaskParas.Fid)
        .map((item: BugTaskViewJson) => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new EventChildTaskShowSuccAction({ itemEdit: item, fieldsId: childTaskParas.Fid.toString() })
        })
        .catch(error => this.eventdetailservice.handleError("GetBugTask", error));
    })

  @Effect() EventChildTaskUpdatePostAction$ = this.actions$
    .ofType(EventChildTaskActionTypes.UpdatePost)
    .map(toPayload)
    .switchMap(eventChildTaskBase => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventdetailservice.SaveBugTask(eventChildTaskBase.itemEdit.Item, eventChildTaskBase.fieldsId)
        .map(str => {
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.Event_BugItemUpdated });            
          return this.eventdetailservice.handleNoAction(str);
        })
        .catch(error => this.eventdetailservice.handleError("SaveBugTask", error))
    })

}