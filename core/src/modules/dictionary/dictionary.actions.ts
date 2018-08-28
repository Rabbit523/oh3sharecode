import { Action } from '@ngrx/store';
import { DictionaryState } from "../../modules/dictionary";
import { StatusDto } from '../../shared/models/webapi/status/status';
import { CategoryNameDto, CategorySearch } from '../../shared/models/webapi/category/category';


export const DictionaryActionTypes = {
  GetDictionary: '[Dictionary] GetDictionary',
  GetStatus: '[Dictionary] GetStatus',
  GetExtDic: '[Dictionary] GetExtDic',
  SetStatus: '[Dictionary] SetStatus',
  SetExtDic: '[Dictionary] SetExtDic',
};

export class DictionaryGetAction implements Action {
  type = DictionaryActionTypes.GetDictionary;
  constructor(public payload: any) { }
}
export class DictionaryGetStatusAction implements Action {
  type = DictionaryActionTypes.GetStatus;
  constructor(public payload: any) { }
}

export class DictionaryGetExtDicAction implements Action {
  type = DictionaryActionTypes.GetExtDic;
  constructor(public payload: any) { }
}

export class DictionarySetStatusAction implements Action {
  type = DictionaryActionTypes.SetStatus;
  constructor(public payload: StatusDto[]) { }
}

export class DictionarySetExtDicAction implements Action {
  type = DictionaryActionTypes.SetExtDic;
  constructor(public payload: CategoryNameDto[]) { }
}


export type DictionaryActions = DictionaryGetAction|DictionaryGetStatusAction| DictionaryGetExtDicAction| DictionarySetStatusAction| DictionarySetExtDicAction;