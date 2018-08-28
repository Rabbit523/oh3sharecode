import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TagsActions, TagsActionTypes } from './tags.actions';
import { initialTagsState, TagsState } from './tags.state';

export function TagsReducer(state = initialTagsState, action: TagsActions): TagsState {
  switch (action.type) {
    case TagsActionTypes.SETAllDic:
      return Object.assign({}, state, { AllDicTags: action.payload });

    case TagsActionTypes.SETUserTags:
      return Object.assign({}, state, { UserTags: action.payload });

    case TagsActionTypes.SETUserDic:
      return Object.assign({}, state, { UserDicTags: action.payload });

    case TagsActionTypes.SETEditDic:
      return Object.assign({}, state, { EditDicTag: action.payload });

    case TagsActionTypes.SETEditUser:
      return Object.assign({}, state, { EditUserTag: action.payload });

    default:
      return state;

  }
}
