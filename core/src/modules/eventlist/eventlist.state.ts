import { EventListJson } from '../../shared/models/webapi/eventlist/eventlistjson';
import { ListPager } from '../listpager';
import { DropDownFilterUrlModel } from '../../shared/models/webapi/category/category';
import { JsonDictionary } from "../../shared/models/common";

export interface PageTitleAndFuntype {
    pageTitle: string,
    FunType: number,
    ViewId: number,
    bindId: number,
    bindtype: number,
    useExt: boolean,
    showdropdownfilter: boolean,
    FilterDictionary: JsonDictionary<string>,
}
export interface EventListPageState {
    myrecords: EventListJson;
    pager: ListPager;
    curPage: number;
    Filter: PageTitleAndFuntype;
    ScrollGetData: boolean,
}
export let initialEventListPageState: EventListPageState = {
    myrecords: new EventListJson(),
    pager: new ListPager(),
    curPage: 0,
    Filter: { FilterDictionary: {}, pageTitle: "", FunType: 0, ViewId: 1, bindId: -1, bindtype: -1, useExt: false, showdropdownfilter: false },
    ScrollGetData: false
};
