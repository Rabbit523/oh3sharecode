import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MediaActions, MediaActionTypes } from './media.actions';
import { initialMediaState, MediaState } from './media.state';

export function MediaReducer(state = initialMediaState, action: MediaActions): MediaState {
  switch (action.type) {
    case MediaActionTypes.SHOW:
      return initialMediaState;

    case MediaActionTypes.GetListSuc:
      return Object.assign({}, state, { mediaList: action.payload });

    case MediaActionTypes.GetProtectsSuc:
      return Object.assign({}, state, { ProtectList: action.payload });

    case MediaActionTypes.GetShowPlayListSuc:
      return Object.assign({}, state, { PlayList: action.payload });

    case MediaActionTypes.GetStaticPagedListSuc:
      return Object.assign({}, state, { PagedList: action.payload });
    default:
      return state;

  }
}
