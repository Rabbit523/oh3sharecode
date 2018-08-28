import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.state';
import { UserActionTypes, UserShowAction, UserGetSucAction, UseSetSucAction, UserListGetSucAction, ImportUserSucAction,UserPermissionPostSucAction } from './user.actions';
import { UserService } from '../../shared/service/webapi/user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public userService: UserService) { }

  @Effect() PostPermissionUserAction$ = this.actions$
  .ofType(UserActionTypes.UserPermissionPost)
  .map(toPayload)
  .switchMap(data => {
    return this.userService.PostPermissionUserObservable(data.usid,data.projectids,data.ptype).map(res => {
      return new UserPermissionPostSucAction(res);
    })
  })

  @Effect() GetUserGetUrlAction$ = this.actions$
    .ofType(UserActionTypes.UserGet)
    .map(toPayload)
    .switchMap(state => {
      return this.userService.GetUserObservable(state).map(res => {
        return new UserGetSucAction(res);
      })
    })

  @Effect() GetUserListUrlAction$ = this.actions$
    .ofType(UserActionTypes.UserListGet)
    .map(toPayload)
    .switchMap(state => {
      return this.userService.GetUserListObservable(state).map(res => {
        return new UserListGetSucAction(res);
      })
    })

  @Effect() SetUserSetUrlAction$ = this.actions$
    .ofType(UserActionTypes.UserSet)
    .map(toPayload)
    .switchMap(state => {
      return this.userService.PostUserObservable(state).map(res => {
        return new UseSetSucAction(res);
      })
    })

  @Effect() getImportUserUrlAction$ = this.actions$
    .ofType(UserActionTypes.ImportUser)
    .map(toPayload)
    .switchMap(state => {
      return this.userService.ImportUserObservable(state).then(res => {
        return new ImportUserSucAction(res);
      })
    })

}