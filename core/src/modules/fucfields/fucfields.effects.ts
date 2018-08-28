import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { SelfDefineFieldDtoActionTypes, SelfDefineFieldDtoShowAction, SelfDefineFieldDtoGetSucAction, SelfDefineFieldDtoPostSucAction, SelfDefineFieldDtoGetListSucAction, SelfDefineFieldDtoGetDicSucAction, SelfDefineFieldDtoGetSelectSucAction } from './fucfields.actions';
import { FuncFieldsService } from '../../shared/service/webapi/fucfields.service';

@Injectable()
export class SelfDefineFieldDtoEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public funcfieldsser: FuncFieldsService) { }

  @Effect() SelfDefineFieldDtoGetAction$ = this.actions$.ofType(SelfDefineFieldDtoActionTypes.Get).map(toPayload)
    .switchMap(id => {
      return this.funcfieldsser.GetFuncfieldsGetObservable(id).map(x => new SelfDefineFieldDtoGetSucAction(x))
        .catch(err => this.funcfieldsser.handleError("FuncFieldsService.GetFuncfieldsGetObservable", err))
    })

  @Effect() SelfDefineFieldDtoPostAction$ = this.actions$.ofType(SelfDefineFieldDtoActionTypes.Post).map(toPayload)
    .switchMap(dto => {
      return this.funcfieldsser.PostFuncfieldsObservable(dto).map(x => new SelfDefineFieldDtoPostSucAction(x))
        .catch(err => this.funcfieldsser.handleError("FuncFieldsService.PostFuncfieldsObservable", err))
    })

  @Effect() SelfDefineFieldDtoGetListAction$ = this.actions$.ofType(SelfDefineFieldDtoActionTypes.GetList).map(toPayload)
    .switchMap(data => {
      return this.funcfieldsser.GetFuncfieldsListObservable(data.pfucid, data.pIndex, data.pSize).map(x => new SelfDefineFieldDtoGetListSucAction(x))
        .catch(err => this.funcfieldsser.handleError("FuncFieldsService.GetFuncfieldsListObservable", err))
    })

  @Effect() SelfDefineFieldDtoGetDicAction$ = this.actions$.ofType(SelfDefineFieldDtoActionTypes.GetDic).map(toPayload)
    .switchMap(data => {
      return this.funcfieldsser.GetFieldTypeNamesUrlObservable().map(x => new SelfDefineFieldDtoGetDicSucAction(x))
        .catch(err => this.funcfieldsser.handleError("FuncFieldsService.GetFieldTypeNamesUrlObservable", err))
    })

  @Effect() SelfDefineFieldDtoGetSelectAction$ = this.actions$.ofType(SelfDefineFieldDtoActionTypes.GetSelect).map(toPayload)
    .switchMap(data => {
      return this.funcfieldsser.GetFuncFieldStatusObservable(data).map(x => new SelfDefineFieldDtoGetSelectSucAction(x))
        .catch(err => this.funcfieldsser.handleError("FuncFieldsService.GetFuncFieldStatusObservable", err))
    })
}