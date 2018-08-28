import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { switchMap } from 'rxjs/operator/switchmap';
import { HostSettingState } from './hostsetting.state';
import { AppState } from '../app.state';
import { HostSettingActionTypes, HostSettingShowAction, HostSettingGetNamesSucAction, HostSettingGetMobileSucAction, HostSettingGetPcSucAction, HostSettingSetMobileSucAction, HostSettingSetPcSucAction } from './hostsetting.actions';
import { HostSettingService } from '../../shared/service/webapi/hostsetting.service';


@Injectable()
export class HostSettingEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public hostsettingService: HostSettingService) { }

  @Effect() HostSettingGetMobileAction$ = this.actions$
    .ofType(HostSettingActionTypes.GetMobile)
    .map(toPayload)
    .switchMap(data => {
      return this.hostsettingService.GetMobileUrl(data).map(x => new HostSettingGetMobileSucAction(x));
    })
  @Effect() HostSettingGetNamesAction$ = this.actions$
    .ofType(HostSettingActionTypes.GetNames)
    .map(toPayload)
    .switchMap(data => {
      return this.hostsettingService.GetNamesUrl(data).map(x => new HostSettingGetNamesSucAction(x));
    })

  @Effect() HostSettingGetPcAction$ = this.actions$
    .ofType(HostSettingActionTypes.GetPc)
    .map(toPayload)
    .switchMap(data => {
      return this.hostsettingService.GetPcUrl(data).map(x => new HostSettingGetPcSucAction(x));
    })
  @Effect() HostSettingSetMobileAction$ = this.actions$
    .ofType(HostSettingActionTypes.SetMobile)
    .map(toPayload)
    .switchMap(data => {
      return this.hostsettingService.PostSetMobileUrl(data.str, data.actid).map(x => new HostSettingSetMobileSucAction(x));
    })
  @Effect() HostSettingSetPcAction$ = this.actions$
    .ofType(HostSettingActionTypes.SetPc)
    .map(toPayload)
    .switchMap(data => {
      return this.hostsettingService.PostSetPcUrl(data.str, data.actid).map(x => new HostSettingSetPcSucAction(x));
    })

}