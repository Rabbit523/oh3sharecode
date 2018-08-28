import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { MediaState } from './media.state';
import { AppState } from '../app.state';
import { MediaActionTypes, MediaShowAction } from './media.actions';
import { MediaService } from '../../shared/service/webapi/media.service';
import { GetListSucAction, GetProtectsSucAction, GetShowPlayListSucAction, GetStaticPagedListSucAction } from './media.actions';

@Injectable()
export class MediaEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public mediaservice: MediaService) { }

  @Effect() GetListAction$ = this.actions$
    .ofType(MediaActionTypes.GetList)
    .map(toPayload)
    .switchMap(active => {
      return this.mediaservice.GetList(active).map(x => new GetListSucAction(x))
    })


  @Effect() GetProtectsAction$ = this.actions$
    .ofType(MediaActionTypes.GetProtects)
    .map(toPayload)
    .switchMap(camid => {
      return this.mediaservice.GetProtects(camid).map(x => new GetProtectsSucAction(x))
    })

  @Effect() GetShowPlayListAction$ = this.actions$
    .ofType(MediaActionTypes.GetShowPlayList)
    .map(toPayload)
    .switchMap(splParas => {
      return this.mediaservice.GetShowPlayList(splParas.placeid, splParas.isActive, splParas.day).map(x => new GetShowPlayListSucAction(x))
    })

  @Effect() GetStaticPagedListAction$ = this.actions$
    .ofType(MediaActionTypes.GetStaticPagedList)
    .map(toPayload)
    .switchMap(splpParas => {
      return this.mediaservice.GetStaticPagedList(splpParas.pIndex, splpParas.pSize, splpParas.sCam, splpParas.cStDate, splpParas.cEndDate).map(x => new GetStaticPagedListSucAction(x))
    })
}