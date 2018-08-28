import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { PriorityActionTypes, PriorityShowAction,  PriorityGetSucAction, PriorityPostSucAction, PriorityGetListSucAction } from './priority.actions';
import { PriorityService } from '../../shared/service/webapi/priority.service';

@Injectable()
export class PriorityEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public priorityser: PriorityService) { }

  @Effect() PriorityGetAction$ = this.actions$.ofType(PriorityActionTypes.Get).map(toPayload)
    .switchMap(id => {
      return this.priorityser.GetPrioritybservable(id).map(x => new PriorityGetSucAction(x))
        .catch(err => this.priorityser.handleError("PriorityService.GetPrioritybservable", err))
    })

  @Effect() PriorityPostAction$ = this.actions$.ofType(PriorityActionTypes.Post).map(toPayload)
    .switchMap(Org => {
      return this.priorityser.PostPriorityObservable(Org).map(x => new PriorityPostSucAction(x))
        .catch(err => this.priorityser.handleError("PriorityService.PostPriorityObservable", err))
    })

  @Effect() PriorityGetListAction$ = this.actions$.ofType(PriorityActionTypes.GetList).map(toPayload)
    .switchMap(data => {
      return this.priorityser.GetAllPriorityObservable().map(x => new PriorityGetListSucAction(x))
        .catch(err => this.priorityser.handleError("PriorityService.GetAllPriorityObservable", err))
    })

}