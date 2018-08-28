import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AppState } from '../app.state';
import { SelectItemService } from '../../shared/service/webapi/selectitem.service';
import { CategoryService } from '../../shared/service/webapi/category.service';
import { EventConst,GlobalActionEnum } from '../../shared/config';
import { DictionaryActionTypes, DictionaryGetExtDicAction, DictionaryGetStatusAction, DictionarySetStatusAction, DictionarySetExtDicAction } from './dictionary.actions';


@Injectable()
export class DictionaryEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>,
    public cachser: SelectItemService, public cate: CategoryService) {
  }

  @Effect() DictionaryGetAction$ = this.actions$
    .ofType(DictionaryActionTypes.GetDictionary)
    .map(toPayload)
    .switchMap(paras => {
      return Observable.from([
        new DictionaryGetStatusAction(""),
        new DictionaryGetExtDicAction("")
      ]);
    })

  @Effect() DictionaryGetStatusAction$ = this.actions$
    .ofType(DictionaryActionTypes.GetStatus)
    .map(toPayload)
    .switchMap(paras => {
      return this.cachser.GetObservableStatuss().map(st => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
        return new DictionarySetStatusAction(st);
      })
    })

  @Effect() DictionaryGetExtDicAction$ = this.actions$
    .ofType(DictionaryActionTypes.GetExtDic)
    .map(toPayload)
    .switchMap(paras => {
      let search = { action: -1, bindId: -1, bindtype: -1, useExt: false };
      return this.cate.GetObservableCategories(search).map(cat => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
        return new DictionarySetExtDicAction(cat);
      })
    })
}