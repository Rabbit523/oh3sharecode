import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DictionaryActions, DictionaryActionTypes } from './dictionary.actions';
import { initialDictionaryState, DictionaryState } from './dictionary.state';
import { FieldCategoriesBasePage } from '../../shared/models/helper/fieldcategoriespagehelper';
import { CategoryNameDto } from '../../shared/models/webapi/category/category';

export function DictionaryReducer(state = initialDictionaryState, action: DictionaryActions): DictionaryState {
  switch (action.type) {
    case DictionaryActionTypes.SetStatus:
      return Object.assign({}, state, { status: action.payload });

    case DictionaryActionTypes.SetExtDic:
      let kvs = action.payload as CategoryNameDto[];
      return Object.assign({}, state, { extdic: FieldCategoriesBasePage.groupfilter(kvs) });

    default:
      return state;

  }
}
