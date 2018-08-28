import { Action } from '@ngrx/store';
import { EventListJson } from '../../shared/models/webapi/eventlist/eventlistjson';
import { JsonDictionary } from '../../shared/models/common/jsondictionary';
import { ListPager } from '../listpager';
import { PageTitleAndFuntype } from './eventlist.state';

export const EventListPageActionTypes = {
    Show: "[EventListPage] Show",
    FecthEventList: "[EventListPage] FecthEventList",
    FecthEventListData: "[EventListPage] FecthEventListData",    
    InitEventList: "[EventListPage] InitEventList",
    LoadMoreEventList: "[EventListPage] LoadMoreEventList",
    LoadMoreEventListData: "[EventListPage] LoadMoreEventListData",
    CacheNextEventList: "[EventListPage] CacheNextEventList",
    AddEventList: "[EventListPage] AddEventList",
    SetFilterDictionary: "[EventListPage] SetFilterDictionary",
    SetPager: "[EventListPage] SetPager",
    SetCurPage: "[EventListPage] SetCurPage",
    SetScrollGetData: "[EventListPage] SetScrollGetData",
    SetListViewId: "[EventListPage] SetListViewId",
}
export class EventListShowAction implements Action {
    type = EventListPageActionTypes.Show;
    constructor(public payload: PageTitleAndFuntype) { }
}

export class FecthEventListAction implements Action {
    type = EventListPageActionTypes.FecthEventList;
    constructor(public payload: JsonDictionary<string>) { }
}
export class LoadMoreEventListAction implements Action {
    type = EventListPageActionTypes.LoadMoreEventList;
    constructor(public payload: JsonDictionary<string>) { }
}

export class FecthEventListDataAction implements Action {
    type = EventListPageActionTypes.FecthEventListData;
    constructor(public payload: JsonDictionary<string>) { }
}
export class LoadMoreEventListDataAction implements Action {
    type = EventListPageActionTypes.LoadMoreEventListData;
    constructor(public payload: JsonDictionary<string>) { }
}

export class CacheNextEventListAction implements Action {
    type = EventListPageActionTypes.CacheNextEventList;
    constructor(public payload: number) { }
}
export class InitEventListAction implements Action {
    type = EventListPageActionTypes.InitEventList;
    constructor(public payload: EventListJson) { }
}
export class AddEventListAction implements Action {
    type = EventListPageActionTypes.AddEventList;
    constructor(public payload: EventListJson) { }
}

export class SetFilterDictionaryAction implements Action {
    type = EventListPageActionTypes.SetFilterDictionary;
    constructor(public payload: JsonDictionary<string>) { }
}
export class SetPagerAction implements Action {
    type = EventListPageActionTypes.SetPager;
    constructor(public payload: ListPager) { }
}
export class SetCurPageAction implements Action {
    type = EventListPageActionTypes.SetCurPage;
    constructor(public payload: number) { }
}
export class SetScrollGetDataAction implements Action {
    type = EventListPageActionTypes.SetScrollGetData;
    constructor(public payload: boolean) { }
}
export class EventlistSetListViewIdAction implements Action {
  type = EventListPageActionTypes.SetListViewId;
  constructor(public payload: number) { }
}

export type EventListPageActions = FecthEventListAction | FecthEventListDataAction |
    LoadMoreEventListAction | LoadMoreEventListDataAction |
     CacheNextEventListAction | SetFilterDictionaryAction |EventlistSetListViewIdAction|
    InitEventListAction | AddEventListAction | SetPagerAction |
    SetCurPageAction | SetScrollGetDataAction | EventListShowAction;
