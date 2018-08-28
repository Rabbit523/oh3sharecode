import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { IntKeyValue } from '../../shared/models/common/keyvalue';
import { SelectItemService } from '../../shared/service/webapi/selectitem.service';
import { EventConst } from '../../shared/config/eventconst';

export const CategoryEmunActionTypes = {
  FetchDataFromApi: "[CategoryEmun] FetchDataFromApi",
  SetData: "[CategoryEmun] SetData"
}

export class CategoryEmunFetchDataFromApiAction implements Action {
  type = CategoryEmunActionTypes.FetchDataFromApi;
  constructor(public payload: string) { }
}
export class CategoryEmunSetDataAction implements Action {
  type = CategoryEmunActionTypes.SetData;
  constructor(public payload: IntKeyValue[]) { }
}


export type CategoryEmunActions = CategoryEmunFetchDataFromApiAction | CategoryEmunSetDataAction ;

@Injectable()
export class CategoryEmunEffects {
  constructor(public actions$: Actions, public selectcacheService: SelectItemService) { }

  @Effect() FetchDataFromApiAction$ = this.actions$
    .ofType(CategoryEmunActionTypes.FetchDataFromApi)
    .map(toPayload)
    .switchMap(configFile => {
      return this.selectcacheService.GetObservableCategoryEnum()
        .map(response => {  return new CategoryEmunSetDataAction(response) })
        .catch(error => this.selectcacheService.handleError("GetObservableCategoryEnum", error))
    });

}


export function CategoryEmunReducer(state = { CategoryEmun: [] }, action: CategoryEmunActions): CategoryEmunState {
  switch (action.type) {
    case CategoryEmunActionTypes.SetData:
      return Object.assign({}, state, { CategoryEmun: action.payload });
    default:
      return state;
  }
}


export interface CategoryEmunState { CategoryEmun: IntKeyValue[] }