import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AppState } from '../app.state';
import { MapActionTypes, MapShowAction, AddMapAction } from './map.actions';
import { MapService } from '../../shared/service/webapi/map.service';
import { MapInfo } from '../../shared/models/webapi/geolocation/PlaceInfo';
import { EventConst, GlobalActionEnum } from '../../shared/config';


@Injectable()
export class MapEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public map: MapService) {

  }

  @Effect() MapAction$ = this.actions$
    .ofType(MapActionTypes.SHOW)
    .map(toPayload)
    .switchMap(latlog => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      let sta = <MapInfo>{ lat: latlog.lat, log: latlog.log, placeid: 0, position: "", date: Date.now() };
      return this.map.webapiGetMap(latlog.lat, latlog.log).map(pi => {
        sta.placeid = pi.placeid; sta.position = pi.position;
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
        return new AddMapAction(sta);
      }
        , err => { sta.position = "handleError..."; this.map.handleError("GetPosition", err); return new AddMapAction(sta); }
      )
    })
}