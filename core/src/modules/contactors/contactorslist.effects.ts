import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { ContactorService } from '../../shared/service/webapi/contactor.service';
import { ContactorJson } from '../../shared/models/webapi/contactor/contactorperson';
import { EventConst, GlobalActionEnum } from '../../shared/config';
import { ContactorslistActionTypes, ShowAllContactorsAction, GetContactorsSucessAction } from './contactorslist.actions';
import { AppState } from '../app.state';

@Injectable()
export class ContactorslistEffects {
  constructor(private actions$: Actions, public cacheService: ContactorService, private store$: Store<AppState>) { }

  @Effect() GetAllContactorsAction$ = this.actions$
    .ofType(ContactorslistActionTypes.GetAllContactors)
    .switchMap(() => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.cacheService.getContactorJsonObservable()
        .map(response => { return new ShowAllContactorsAction((response as ContactorJson).Items) })
        .catch(err => this.cacheService.handleError("getContactorJsonObservable", err))
    });

  @Effect() ShowAllContactorsAction$ = this.actions$
    .ofType(ContactorslistActionTypes.ShowAllContactors)
    .map(() => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new GetContactorsSucessAction("") });

  @Effect() ShowContactorsByNameAction$ = this.actions$
    .ofType(ContactorslistActionTypes.ShowContactorsByName)
    //.debounceTime(1000)
    .map(() => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new GetContactorsSucessAction("") });
}