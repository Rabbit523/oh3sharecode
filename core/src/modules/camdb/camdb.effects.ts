import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { CameraSettingDtoActionTypes, CameraSettingDtoGetSucAction, CameraSettingDtoPostSucAction, CameraSettingDtoGetListSucAction } from './camdb.actions';
import { CamDBService } from '../../shared/service/webapi/camdb.service';

@Injectable()
export class CameraSettingDtoEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public CameraSettingDtoser: CamDBService) { }

  @Effect() GetCamUrlAction$ = this.actions$.ofType(CameraSettingDtoActionTypes.Get).map(toPayload)
    .switchMap(id => {     
      return this.CameraSettingDtoser.GetCamUrl(id).map(x => new CameraSettingDtoGetSucAction(x))
        .catch(err => this.CameraSettingDtoser.handleError("CamDBService.PostInitDBObservable", err))
    })

  @Effect() PostCamSettingUrlAction$ = this.actions$.ofType(CameraSettingDtoActionTypes.Post).map(toPayload)
    .switchMap(data => {       
      return this.CameraSettingDtoser.PostCamSettingUrl().map(x => new CameraSettingDtoPostSucAction(x))
        .catch(err => this.CameraSettingDtoser.handleError("CamDBService.PostNewSiteObservable", err))
    })

  @Effect() CameraSettingDtoGetListAction$ = this.actions$.ofType(CameraSettingDtoActionTypes.GetList).map(toPayload)
    .switchMap(data => {       
      return this.CameraSettingDtoser.GetCamDBGetUrl(data.ogCat, data.pIndex, data.pSize).map(x => new CameraSettingDtoGetListSucAction(x))
        .catch(err => this.CameraSettingDtoser.handleError("CamDBService.GetCamDBGetUrl", err))
    })

}