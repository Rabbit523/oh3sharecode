import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { AppState } from '../app.state';
import { EventConst ,GlobalActionEnum} from "../../shared/config";
import { BugsListService } from '../../shared/service/webapi/bugslist.service';
import { ExtToDoListActionTypes, ExtToDoListLoadDataSuccessAction } from './exttodolist.actions';



@Injectable()
export class ExtToDoListEffects {
  constructor(
    private actions$: Actions, public store$: Store<AppState>,
    public eventListSer: BugsListService
  ) { }

  @Effect() ExtToDoListShowAction$ = this.actions$
    .ofType(ExtToDoListActionTypes.SHOW)
    .map(toPayload)
    .switchMap(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventListSer.GetExtTODOObservable(state.pager.pageIndex, state.pager.pageSize, state.label, state.fid,state.st)
        .map(response => {
          let newState = Object.assign({}, state, {
            pager: { pageIndex: state.pager.pageIndex + 1, pageCount: state.pager.pageCount, pageSize: state.pager.pageSize, },
            Items: response.Items, count: response.Count
          });
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new ExtToDoListLoadDataSuccessAction(newState);
        })
    })

  @Effect() ExtToDoListPageDownAction$ = this.actions$
    .ofType(ExtToDoListActionTypes.PAGEDOWN)
    .map(toPayload)
    .switchMap(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventListSer.GetExtTODOObservable(state.pager.pageIndex, state.pager.pageSize, state.label, state.fid,state.st)
        .map(response => {
          let temp = Object.assign([], state.Items)
          response.Items.forEach(element => { temp.push(element); });
          let newState = Object.assign({}, state, {
            pager: { pageIndex: state.pager.pageIndex + 1, pageCount: state.pager.pageCount, pageSize: state.pager.pageSize, },
            Items: temp, count: response.Count
          });
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new ExtToDoListLoadDataSuccessAction(newState);
        })
        .catch(err => {
          return this.eventListSer.handleError("GetExtTODOObservable", err);
        })
    })
}