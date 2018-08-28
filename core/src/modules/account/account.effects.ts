import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { AppState } from '../app.state';
import { EventConst, GlobalActionEnum } from "../../shared/config";
import { WebapiConfig } from "../../shared/config/webapiconfig";
import { ContactorService } from '../../shared/service/webapi/contactor.service';
import { AccountActionTypes, AccountLoadDataSuccessAction } from './account.actions';
import { StaticCache } from '../../shared/staticcache';


@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public contactor: ContactorService
  ) {

  }

  @Effect() AccountShowAction$ = this.actions$
    .ofType(AccountActionTypes.SHOW)
    .map(toPayload)
    .map(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      let newState = Object.assign({}, state);
      let Personalization = StaticCache.Config.PersonalizationJson;
      if (Personalization.ClaimData.UserPic)
        newState.Usersrc = WebapiConfig.geturl(Personalization.ClaimData.UserPic);
      var firstName = Personalization.ClaimData.UsFirstname.replace('，', "");
      newState.username = firstName.length > 0 ? firstName : StaticCache.Config.username;
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
      return new AccountLoadDataSuccessAction(newState);
    })

  @Effect() AccountUpdatePictureAction$ = this.actions$
    .ofType(AccountActionTypes.UpdatePicture)
    .map(toPayload)
    .withLatestFrom(this.store$.select(s => s.Account))
    .switchMap(([imageData, state]) => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.contactor.PostUserPic(StaticCache.Config.username, imageData)
        .then(
        response => {
          let newState = Object.assign({}, state)
          if (response.indexOf("/thumb/") != -1) {
            newState.Usersrc = WebapiConfig.geturlpic(response.replace(/"/g, ""));            
          }
          this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.Event_UpdatePostComplate });
          return new AccountLoadDataSuccessAction(newState);
        })
    })

}