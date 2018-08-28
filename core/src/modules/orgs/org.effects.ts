import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { ORGActionTypes, ORGShowAction, ORGDelSucAction, ORGGetSucAction, ORGPostSucAction, ORGGetListSucAction } from './org.actions';
import { OrgsService } from '../../shared/service/webapi/orgs.service';

@Injectable()
export class ORGEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public orgser: OrgsService) { }

  @Effect() ORGDelAction$ = this.actions$.ofType(ORGActionTypes.del).map(toPayload)
    .switchMap(id => {
      return this.orgser.DeleteObservable(id).map(x => new ORGDelSucAction(x))
        .catch(err => this.orgser.handleError("OrgsService.DeleteObservable", err))
    })

  @Effect() ORGGetAction$ = this.actions$.ofType(ORGActionTypes.Get).map(toPayload)
    .switchMap(id => {     
      return this.orgser.GetOrgObservable(id).map(x => new ORGGetSucAction(x))
        .catch(err => this.orgser.handleError("OrgsService.GetOrgObservable", err))
    })

  @Effect() ORGPostAction$ = this.actions$.ofType(ORGActionTypes.Post).map(toPayload)
    .switchMap(Org => {       
      return this.orgser.PostObservable(Org).map(x => new ORGPostSucAction(x))
        .catch(err => this.orgser.handleError("OrgsService.PostObservable", err))
    })

  @Effect() ORGGetListAction$ = this.actions$.ofType(ORGActionTypes.GetList).map(toPayload)
    .switchMap(index => {       
      return this.orgser.GetAllOrgsObservable(index).map(x => new ORGGetListSucAction(x))
        .catch(err => this.orgser.handleError("OrgsService.GetAllOrgsObservable", err))
    })

}