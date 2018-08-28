import { Action} from '@ngrx/store';
import { IntKeyValue } from '../../shared/models/common/keyvalue';
import { Category } from '../../shared/models/webapi/category/category';
import {CategoryPageState} from './category.state';
export const CategoryPageActionTypes = {
  FecthCategory: "[CategoryPage] FecthCategory",
  SetCategory: "[CategoryPage] SetCategory",
  SetCategoryfields: "[CategoryPage] SetCategoryfields",
  UpdateCategory: "[CategoryPage] UpdateCategory",
  UpdateSucc: "[CategoryPage] UpdateSucc",
  UpdateFail: "[CategoryPage] UpdateFail"
}

export class FecthCategoryAction implements Action {
  type = CategoryPageActionTypes.FecthCategory;
  constructor(public payload: number) { }
}

export class SetCategoryfieldsAction implements Action {
  type = CategoryPageActionTypes.SetCategoryfields;
  constructor(public payload: Array<IntKeyValue>) { }
}
export class SetCategoryAction implements Action {
  type = CategoryPageActionTypes.SetCategory;
  constructor(public payload: CategoryPageState) { }
}
export class UpdateCategoryAction implements Action {
  type = CategoryPageActionTypes.UpdateCategory;
  constructor(public payload: Category) { }
}
export class UpdateSuccAction implements Action {
  type = CategoryPageActionTypes.UpdateSucc;
  constructor(public payload: number) { }
}
export class UpdateFailAction implements Action {
  type = CategoryPageActionTypes.UpdateFail;
  constructor(public payload: number) { }
}

export type CategoryPageActions = FecthCategoryAction | SetCategoryfieldsAction | SetCategoryAction | UpdateCategoryAction | UpdateSuccAction | UpdateFailAction;