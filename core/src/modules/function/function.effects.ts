import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { SelfDefineFunctionsActionTypes, SelfDefineFunctionsShowAction, SelfDefineFunctionsGetSucAction, SelfDefineFunctionsPostSucAction, SelfDefineFunctionsGetListSucAction, SelfDefineFunctionsGetDicSucAction } from './function.actions';
import { FunctionService } from '../../shared/service/webapi/functions.service';

@Injectable()
export class SelfDefineFunctionsEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public functionser: FunctionService) { }

  @Effect() SelfDefineFunctionsGetAction$ = this.actions$.ofType(SelfDefineFunctionsActionTypes.Get).map(toPayload)
    .switchMap(id => {
      return this.functionser.GetFunctionbservable(id).map(x => new SelfDefineFunctionsGetSucAction(x))
        .catch(err => this.functionser.handleError("FunctionService.GetFunctionbservable", err))
    })

  @Effect() SelfDefineFunctionsPostAction$ = this.actions$.ofType(SelfDefineFunctionsActionTypes.Post).map(toPayload)
    .switchMap(fuc => {
      return this.functionser.PostFunctionObservable(fuc).map(x => new SelfDefineFunctionsPostSucAction(x))
        .catch(err => this.functionser.handleError("FunctionService.PostFunctionObservable", err))
    })

  @Effect() SelfDefineFunctionsGetListAction$ = this.actions$.ofType(SelfDefineFunctionsActionTypes.GetList).map(toPayload)
    .switchMap(data => {
      return this.functionser.GetAllFunctionObservable().map(x => new SelfDefineFunctionsGetListSucAction(x))
        .catch(err => this.functionser.handleError("FunctionService.GetAllFunctionObservable", err))
    })

  @Effect() SelfDefineFunctionsGetDicAction$ = this.actions$.ofType(SelfDefineFunctionsActionTypes.GetDic).map(toPayload)
    .switchMap(data => {
      return this.functionser.GetFuncPageNameDicObservable().map(x => new SelfDefineFunctionsGetDicSucAction(x))
        .catch(err => this.functionser.handleError("FunctionService.GetFuncPageNameDicObservable", err))
    })
}