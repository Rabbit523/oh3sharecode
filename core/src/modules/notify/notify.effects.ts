import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { NotifyActionTypes, NotifyGetSucAction, NotifyPostSucAction, NotifyGetListSucAction } from './notify.actions';
import { NotifyService } from '../../shared/service/webapi/notify.service';

@Injectable()
export class NotifyEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public notifyser: NotifyService) { }


  @Effect() NotifyGetAction$ = this.actions$.ofType(NotifyActionTypes.Get).map(toPayload)
    .switchMap(id => {
      return this.notifyser.GetNotifyObservable(id).map(x => new NotifyGetSucAction(x))
        .catch(err => this.notifyser.handleError("NotifyService.GetNotifyObservable", err))
    })

  @Effect() NotifyPostAction$ = this.actions$.ofType(NotifyActionTypes.Post).map(toPayload)
    .switchMap(Org => {
      return this.notifyser.PostNotifyObservable(Org).map(x => new NotifyPostSucAction(x))
        .catch(err => this.notifyser.handleError("NotifyService.PostNotifyObservable", err))
    })

  @Effect() NotifyGetListAction$ = this.actions$.ofType(NotifyActionTypes.GetList).map(toPayload)
    .switchMap(data => {
      return this.notifyser.GetAllNotifyObservable(data.flag,data.filter, data.index).map(x => new NotifyGetListSucAction(x))
        .catch(err => this.notifyser.handleError("NotifyService.GetAllNotifyObservable", err))
    })

}