import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppState } from '../app.state';
import { StorageService } from '../../shared/service/cachedata/storageservice';
import { AuthOpSucAction, AuthActionTypes } from './auth.actions';


@Injectable()
export class AuthEffects {
  constructor(public actions$: Actions, public store$: Store<AppState>, public userdata: StorageService
  ) {
  }

  @Effect() AuthLogoutAction$ = this.actions$
    .ofType(AuthActionTypes.Logout)
    .map(() => {
      this.userdata.logout();
      return new AuthOpSucAction("");
    })

  @Effect() AuthSetAction$ = this.actions$
    .ofType(AuthActionTypes.AuthSet)
    .map(toPayload)
    .map(auth => {
      this.userdata.setUserLOGGEDIN(auth);
      return new AuthOpSucAction("");
    })

  @Effect() TokenSetAction$ = this.actions$
    .ofType(AuthActionTypes.TokenSet)
    .map(toPayload)
    .map(token => {
      this.userdata.setUserToken(token);
      return new AuthOpSucAction("");
    })


}