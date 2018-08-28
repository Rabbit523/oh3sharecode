import { Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ChcpversionService } from '../../shared/service/webapi/chcpversion.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { EventConst } from '../../shared/config/eventconst';
import { AppState } from '../app.state';

import { SetInstallWebVersionAction, AboutPageActionTypes, GetInstallSuccAction } from './about.action'
@Injectable()
export class AboutPageEffects {
  constructor(public actions$: Actions, public Chcpversion: ChcpversionService, public store$: Store<AppState>) { }

  @Effect() GetInstallWebVersionAction$ = this.actions$
    .ofType(AboutPageActionTypes.GetInstallWebVersion)
    .map(toPayload)
    .switchMap(configFile => {
      return this.Chcpversion.ProcessChcp(configFile)
        .map(response => new SetInstallWebVersionAction(response['release']))
        .catch(error => { return this.Chcpversion.handleError("ProcessChcp", error); })
    });


  @Effect() SetInstallWebVersionAction$ = this.actions$
    .ofType(AboutPageActionTypes.SetInstallWebVersion)
    .map(() => { return new GetInstallSuccAction("") });
}

