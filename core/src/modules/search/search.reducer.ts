import { Action } from '@ngrx/store';
import { SearchActions, SearchActionType } from './search.actions';
import { SearchState } from './search.state';
import { SearchDto } from "../../shared/models/webapi/search/searchdto";
import { ListPager } from '../listpager';


export function SearchReducer(state = { page: new ListPager(), text: "", Items: [] }, action: SearchActions): SearchState {
    switch (action.type) {
        case SearchActionType.SHOW:
            let pager = Object.assign({}, state.page);
            pager.pageSize = action.payload as number;
            return Object.assign({}, state, { page: pager });
        case SearchActionType.SetData:
            return action.payload as SearchState;
        default:
            return state;
    }
}