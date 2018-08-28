import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { StatusActionTypes, StatusShowAction, StatusGetSucAction, StatusPostSucAction, StatusGetListSucAction } from './status.actions';
import { StatusService } from '../../shared/service/webapi/status.service';

@Injectable()
export class StatusEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public statusser: StatusService) { }

  @Effect() StatusGetAction$ = this.actions$.ofType(StatusActionTypes.Get).map(toPayload)
    .switchMap(id => {
      return this.statusser.GetStatusbservable(id).map(x => new StatusGetSucAction(x))
        .catch(err => this.statusser.handleError("StatusService.GetStatusbservable", err))
    })

  @Effect() StatusPostAction$ = this.actions$.ofType(StatusActionTypes.Post).map(toPayload)
    .switchMap(Org => {
      return this.statusser.PostStatusObservable(Org).map(x => new StatusPostSucAction(x))
        .catch(err => this.statusser.handleError("StatusService.PostStatusObservable", err))
    })

  @Effect() StatusGetListAction$ = this.actions$.ofType(StatusActionTypes.GetList).map(toPayload)
    .switchMap(data => {
      return this.statusser.GetAllStatusObservable().map(x => new StatusGetListSucAction(x))
        .catch(err => this.statusser.handleError("StatusService.GetAllStatusObservable", err))
    })

}