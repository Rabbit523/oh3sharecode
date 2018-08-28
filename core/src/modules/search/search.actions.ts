import { SearchState } from "./search.state";

export const SearchActionType = {
    SHOW: '[Search] Show',
    SearchData: '[Search] SearchData',
    SetData: '[Search] SetData',
}

export class SearchShowAction {
    type = SearchActionType.SHOW;
    constructor(public payload: number) { }
}

export class SearchDataAction {
    type = SearchActionType.SearchData;
    constructor(public payload: { txt: string, page: number }) { }
}

export class SearchSetDataAction {
    type = SearchActionType.SetData;
    constructor(public payload: SearchState) { }
}


export type SearchActions = SearchShowAction | SearchSetDataAction | SearchDataAction;