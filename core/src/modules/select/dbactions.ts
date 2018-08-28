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

export const DBActionsActionTypes = {
  FetchDataFromApi: "[DBActions] FetchDataFromApi",
  SetData: "[DBActions] SetData",
  SetDataSucc: "[DBActions] SetDataSucc"
}

export class DBActionsFetchDataFromApiAction implements Action {
  type = DBActionsActionTypes.FetchDataFromApi;
  constructor(public payload: string) { }
}
export class DBActionsSetDataAction implements Action {
  type = DBActionsActionTypes.SetData;
  constructor(public payload: IntKeyValue[]) { }
}
export class DBActionsSetDataSuccAction implements Action {
  type = DBActionsActionTypes.SetDataSucc;
  constructor(public payload: string) { }
}

export type DBActionsActions = DBActionsFetchDataFromApiAction | DBActionsSetDataAction | DBActionsSetDataSuccAction;

@Injectable()
export class DBActionsEffects {
  constructor(public actions$: Actions, public selectcacheService: SelectItemService) { }

  @Effect() FetchDataFromApiAction$ = this.actions$
    .ofType(DBActionsActionTypes.FetchDataFromApi)
    .map(toPayload)
    .switchMap(configFile => {
      return this.selectcacheService.GetObservableFunctionTypes()
        .map(response => { return new DBActionsSetDataAction(response) })
        .catch(error => this.selectcacheService.handleError("GetObservableFunctionTypes", error))
    });

}


export function DBActionsReducer(state = { DBActions: [] }, action: DBActionsActions): DBActionsState {
  switch (action.type) {
    case DBActionsActionTypes.SetData:
      return Object.assign({}, state, { DBActions: action.payload });
    default:
      return state;
  }
}


export interface DBActionsState { DBActions: IntKeyValue[] }