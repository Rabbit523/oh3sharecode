import { EventListJson } from '../../shared/models/webapi/eventlist/eventlistjson';
import { EventListPageActionTypes, EventListPageActions } from './eventlist.action';
import { EventListPageState, initialEventListPageState, PageTitleAndFuntype } from './eventlist.state';
import { ListPager } from '../listpager';
import { Utils } from '../../shared/utils/utils';
import { EventListItemConst } from '../../shared/pages/eventlistitemtype';
import { StaticCache } from '../../shared/staticcache';
import { CategoryEnum, CategorySearch } from '../../shared/models/webapi/category/category';


export function EventListPageReducer(state = initialEventListPageState, action: EventListPageActions): EventListPageState {
    switch (action.type) {

        case EventListPageActionTypes.Show: //页面通用 初始化必须传参数
            let pagePriority = action.payload as PageTitleAndFuntype;
            if (pagePriority.ViewId == -1) {
                pagePriority.ViewId = EventListItemConst.GetEventListDefault(pagePriority.FunType);
                StaticCache.Config.ListViewId = pagePriority.ViewId;
            }
            return Object.assign({}, state, { Filter: pagePriority });

        case EventListPageActionTypes.InitEventList:
            let pager = Object.assign({}, state.pager);
            let list = action.payload as EventListJson;
            pager.pageCount = Utils.getPageCount(list.Count, state.pager.pageSize);
            return Object.assign({}, state, { myrecords: list }, { pager: pager });

        case EventListPageActionTypes.AddEventList:
            let newItems = [];
            state.myrecords.Items.forEach(x => newItems.push(x));
            let added = action.payload as EventListJson;
            added.Items.forEach(x => newItems.push(x));
            let pager0 = Object.assign({}, state.pager);
            pager0.pageCount = state.pager.pageCount - 1;
            if (added.Items.length > 0) {
                return Object.assign({}, state,
                    { myrecords: { Items: newItems, NextPageLink: state.myrecords.NextPageLink, Count: state.myrecords.Count } },
                    { pager: pager0 }, { curPage: Number(state.curPage) + 1 });
            }
            else {
                return state;
            }
        case EventListPageActionTypes.SetFilterDictionary:
            let filter = Object.assign({}, state.Filter, { FilterDictionary: action.payload });
            return Object.assign({}, state, { Filter: filter });

        case EventListPageActionTypes.SetPager:
            return Object.assign({}, state, { pager: action.payload });

        case EventListPageActionTypes.SetCurPage:
            return Object.assign({}, state, { curPage: action.payload });

        case EventListPageActionTypes.SetListViewId:
            let ListView = Object.assign({}, state.Filter);
            ListView.ViewId = action.payload as number;
            return Object.assign({}, state, { Filter: ListView });
        default:
            return state;
    }
}