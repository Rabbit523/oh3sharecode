import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { IISDBActionTypes, IISDBShowAction, DBPostSucAction, IISPostSucAction, IISDBGetListSucAction } from './iisdb.actions';
import { IISDBService } from '../../shared/service/webapi/iisdb.service';

@Injectable()
export class IISDBEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public iisdbser: IISDBService) { }

  @Effect() DBPostAction$ = this.actions$.ofType(IISDBActionTypes.PostDB).map(toPayload)
    .switchMap(db => {     
      return this.iisdbser.PostInitDBObservable(db).map(x => new DBPostSucAction(x))
        .catch(err => this.iisdbser.handleError("IISDBService.PostInitDBObservable", err))
    })

  @Effect() IISPostAction$ = this.actions$.ofType(IISDBActionTypes.PostIIS).map(toPayload)
    .switchMap(iis => {       
      return this.iisdbser.PostNewSiteObservable(iis).map(x => new IISPostSucAction(x))
        .catch(err => this.iisdbser.handleError("IISDBService.PostNewSiteObservable", err))
    })

  @Effect() IISDBGetListAction$ = this.actions$.ofType(IISDBActionTypes.GetList).map(toPayload)
    .switchMap(index => {       
      return this.iisdbser.GetAllSiteObservable().map(x => new IISDBGetListSucAction(x))
        .catch(err => this.iisdbser.handleError("IISDBService.GetAllSiteObservable", err))
    })

}