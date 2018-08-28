
import { CategoryPageState } from './category.state';
import { Category } from '../../shared/models/webapi/category/category';
import { CategoryPageActions, CategoryPageActionTypes } from './category.action';
export function CategoryPageReducer(state = { Category: new Category(), httpCode: 0, HeadTitle: "", fieldCategorys: [] }, action: CategoryPageActions): CategoryPageState {
  switch (action.type) {
    case CategoryPageActionTypes.SetCategory:
      return Object.assign({}, state, action.payload);
    case CategoryPageActionTypes.SetCategoryfields:
      return Object.assign({}, state, { fieldCategorys: action.payload });
    case CategoryPageActionTypes.UpdateSucc:
      return Object.assign({}, state, { httpCode: action.payload });
    default:
      return state;
  }
}