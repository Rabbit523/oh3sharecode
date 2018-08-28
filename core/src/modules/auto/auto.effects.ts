import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { switchMap } from 'rxjs/operator/switchmap';
import { AutoState } from './auto.state';
import { AppState } from '../app.state';
import {
  AutoActionTypes, GetCreateIndexAllSucAction, GetBarCordImgSucAction, RebuildUserTempNewSucAction,
  RebuildFuncSucAction, RebuildViewSucAction, ExportAttachSucAction, ExportSucAction, TimeingSucAction, TaskEveryDaySucAction
} from './auto.actions';
import { AutoDBService } from '../../shared/service/webapi/auto.service';


@Injectable()
export class AutoEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public autoser: AutoDBService) {

  }

  @Effect() GetCreateIndexAllAction$ = this.actions$.ofType(AutoActionTypes.GetCreateIndexAll).map(toPayload)
    .switchMap(data => {
      return this.autoser.GetCreateIndexAll(data.us, data.pw).map(x => new GetCreateIndexAllSucAction(x))
    })

  @Effect() GetBarCordImgActionAction$ = this.actions$.ofType(AutoActionTypes.GetBarCordImg).map(toPayload)
    .switchMap(data => {
      return this.autoser.GetBarCordImg(data.QrStr, data.size, data.checkbug).map(x => new GetBarCordImgSucAction(x))
    })

  @Effect() RebuildUserTempNewAction$ = this.actions$.ofType(AutoActionTypes.RebuildUserTempNew).map(toPayload)
    .switchMap(data => {
      return this.autoser.RebuildUserTempNew().map(x => new RebuildUserTempNewSucAction(x))
    })

  @Effect() RebuildFuncAction$ = this.actions$.ofType(AutoActionTypes.RebuildFunc).map(toPayload)
    .switchMap(data => {
      return this.autoser.RebuildFunc(data).map(x => new RebuildFuncSucAction(x))
    })

  @Effect() RebuildViewActionAction$ = this.actions$.ofType(AutoActionTypes.RebuildView).map(toPayload)
    .switchMap(data => {
      return this.autoser.RebuildView(data).map(x => new RebuildViewSucAction(x))
    })

  @Effect() ExportAttachAction$ = this.actions$.ofType(AutoActionTypes.ExportAttach).map(toPayload)
    .switchMap(data => {
      return this.autoser.ExportAttach().map(x => new ExportAttachSucAction(x))
    })

  @Effect() ExportAction$ = this.actions$.ofType(AutoActionTypes.Export).map(toPayload)
    .switchMap(data => {
      return this.autoser.Export(data).map(x => new ExportSucAction(x))
    })

  @Effect() TimeingAction$ = this.actions$.ofType(AutoActionTypes.Timeing).map(toPayload)
    .switchMap(data => {
      return this.autoser.Timeing(data.Stid, data.usid, data.detail).map(x => new TimeingSucAction(x))
    })

  @Effect() TaskEveryDayAction$ = this.actions$.ofType(AutoActionTypes.TaskEveryDay).map(toPayload)
    .switchMap(data => {
      return this.autoser.TaskEveryDay().map(x => new TaskEveryDaySucAction(x))
    })
}