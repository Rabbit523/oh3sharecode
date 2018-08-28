import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { RoleActionTypes, RoleShowAction, RoleGetSucAction, RolePostSucAction, RoleGetListSucAction } from './role.actions';
import { RoleService } from '../../shared/service/webapi/role.service';

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public roleser: RoleService) { }

  @Effect() RoleGetAction$ = this.actions$.ofType(RoleActionTypes.Get).map(toPayload)
    .switchMap(id => {     
      return this.roleser.GetRolebservable(id).map(x => new RoleGetSucAction(x))
        .catch(err => this.roleser.handleError("RoleService.GetOrgObservable", err))
    })

  @Effect() RolePostAction$ = this.actions$.ofType(RoleActionTypes.Post).map(toPayload)
    .switchMap(role => {       
      return this.roleser.PostRoleObservable(role).map(x => new RolePostSucAction(x))
        .catch(err => this.roleser.handleError("RoleService.PostObservable", err))
    })

  @Effect() RoleGetListAction$ = this.actions$.ofType(RoleActionTypes.GetList).map(toPayload)
    .switchMap(index => {       
      return this.roleser.GetAllRoleObservable().map(x => new RoleGetListSucAction(x))
        .catch(err => this.roleser.handleError("RoleService.GetAllOrgsObservable", err))
    })

}