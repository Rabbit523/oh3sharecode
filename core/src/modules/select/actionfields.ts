import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { IntKeyValue } from '../../shared/models/common/keyvalue';
import { SelectItemService } from '../../shared/service/webapi/selectitem.service';
import { TreeNode } from '../../shared/models/common/treenode';
import { EventConst } from '../../shared/config/eventconst';

export const ActionFieldsActionTypes = {
  FetchDataFromApi: "[ActionFields] FetchDataFromApi",
  SetData: "[ActionFields] SetData",
  SetDataSucc: "[ActionFields] SetDataSucc"
}

export class ActionFieldsFetchDataFromApiAction implements Action {
  type = ActionFieldsActionTypes.FetchDataFromApi;
  constructor(public payload: string) { }
}
export class ActionFieldsSetDataAction implements Action {
  type = ActionFieldsActionTypes.SetData;
  constructor(public payload: TreeNode[]) { }
}
export class ActionFieldsSetDataSuccAction implements Action {
  type = ActionFieldsActionTypes.SetDataSucc;
  constructor(public payload: string) { }
}

export type ActionFieldsActions = ActionFieldsFetchDataFromApiAction | ActionFieldsSetDataAction | ActionFieldsSetDataSuccAction;

@Injectable()
export class ActionFieldsEffects {
  constructor(public actions$: Actions, public selectcacheService: SelectItemService) { }

  @Effect() FetchDataFromApiAction$ = this.actions$
    .ofType(ActionFieldsActionTypes.FetchDataFromApi)
    .map(toPayload)
    .switchMap(configFile => {
      return this.selectcacheService.GetObservableAllFields()
        .map(response => {  return new ActionFieldsSetDataAction(response) })
        .catch(error => this.selectcacheService.handleError("GetObservableAllFields", error))
    });

}


export function ActionFieldsReducer(state = { ActionFields: [] }, action: ActionFieldsActions): ActionFieldsState {
  switch (action.type) {
    case ActionFieldsActionTypes.SetData:
      return Object.assign({}, state, { ActionFields: action.payload });
    default:
      return state;
  }
}


export interface ActionFieldsState { ActionFields: TreeNode[] }