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

import { BugsListService } from '../../shared/service/webapi/bugslist.service';
import { ToDoListActionTypes, ToDoListLoadDataSuccessAction } from './todolist.actions';



@Injectable()
export class ToDoListEffects {
  constructor(
    private actions$: Actions, public store$: Store<AppState>,public eventListSer: BugsListService
  ) { }

  @Effect() ToDoListShowAction$ = this.actions$
    .ofType(ToDoListActionTypes.SHOW)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.ToDoList))
    .switchMap(([number, state]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventListSer.GetTODOObservable(state.pager.pageIndex, state.pager.pageSize)
        .map(response => {
          let newState = Object.assign({}, state, {
            pager: { pageIndex: state.pager.pageIndex + 1, pageCount: state.pager.pageCount, pageSize: state.pager.pageSize, },
            Items: response.Items, count: response.Count
          });
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new ToDoListLoadDataSuccessAction(newState);
        })
    })

  @Effect() ToDoListPageDownAction$ = this.actions$
    .ofType(ToDoListActionTypes.PAGEDOWN)
    .map(toPayload)
    .switchMap(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.eventListSer.GetTODOObservable(state.pager.pageIndex, state.pager.pageSize)
        .map(response => {
          let temp = Object.assign([], state.Items);
          response.Items.forEach(element => { temp.push(element); });
          let newState = Object.assign({}, state, {
            pager: { pageIndex: state.pager.pageIndex + 1, pageCount: state.pager.pageCount, pageSize: state.pager.pageSize, },
            Items: temp, count: response.Count
          });
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
          return new ToDoListLoadDataSuccessAction(newState);
        })
        .catch(err => {
          return this.eventListSer.handleError("GetTODOObservable", err);
        })
    })
}