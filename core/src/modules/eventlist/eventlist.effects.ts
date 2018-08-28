import { Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import { AppState } from '../app.state';
import {
    EventListPageActionTypes, InitEventListAction, AddEventListAction, SetPagerAction, SetFilterDictionaryAction,
    FecthEventListDataAction, LoadMoreEventListDataAction, CacheNextEventListAction
} from './eventlist.action';
import { BugsListService } from '../../shared/service/webapi/bugslist.service';
import { StorageService } from '../../shared/service/cachedata/storageservice';
import { EventListParaHelper } from '../../shared/models/common/eventlistparahelper';
import { EventConst,GlobalActionEnum } from '../../shared/config';
import { WebapiConfig } from '../../shared/config/webapiconfig';

@Injectable()
export class EventListEffects {
    constructor(public actions$: Actions, public store$: Store<AppState>, public eventListSer: BugsListService, public userData: StorageService) {    }

    @Effect() GetEventListAction$ = this.actions$
        .ofType(EventListPageActionTypes.FecthEventList)
        .map(toPayload)
        .withLatestFrom(this.store$.select(s => s.EventList.pager))
        .switchMap(([stringDic, pager]) => {
            let newPager = Object.assign({}, pager);
            newPager.pageSize = Number(stringDic[EventListParaHelper.ListParas.PageSize]);
            newPager.pageIndex = Number(stringDic[EventListParaHelper.ListParas.Page]);
            return Observable.from([
                new SetPagerAction(newPager), new SetFilterDictionaryAction(stringDic),
                new FecthEventListDataAction(stringDic), new CacheNextEventListAction(newPager.pageIndex + 1)
            ]);
        });

    @Effect() LoadMoreEventListAction$ = this.actions$
        .ofType(EventListPageActionTypes.LoadMoreEventList)
        .map(toPayload)
        .withLatestFrom(this.store$.select(s => s.EventList.pager))
        .switchMap(([stringDic, pager]) => {
            let newPager = Object.assign({}, pager);
            newPager.pageSize = Number(stringDic[EventListParaHelper.ListParas.PageSize]);
            newPager.pageIndex = Number(stringDic[EventListParaHelper.ListParas.Page]);
            return Observable.from([
                new SetPagerAction(newPager), new SetFilterDictionaryAction(stringDic),
                new LoadMoreEventListDataAction(stringDic), new CacheNextEventListAction(newPager.pageIndex + 1)
            ]);
        });

    @Effect() FecthEventListDataAction$ = this.actions$
        .ofType(EventListPageActionTypes.FecthEventListData)
        .map(toPayload)
        .switchMap(stringDic => {
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
            return this.eventListSer.GetEventlistObservable(stringDic)
                .map(data => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new InitEventListAction(data) })
                .catch(err => this.eventListSer.handleError("GetEventlistObservable", err));
        });

    @Effect() LoadMoreEventListDataAction$ = this.actions$
        .ofType(EventListPageActionTypes.LoadMoreEventListData)
        .map(toPayload)
        .switchMap(stringDic => {
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
            return this.eventListSer.GetEventlistObservable(stringDic)
                .map(data => {this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new AddEventListAction(data) })
                .catch(err => this.eventListSer.handleError("GetEventlistObservable", err));
        });

    @Effect() CacheNextEventListAction$ = this.actions$
        .ofType(EventListPageActionTypes.CacheNextEventList)
        .map(toPayload)
        .withLatestFrom(this.store$.select(s => s.EventList))
        .switchMap(([pageNum, EventList]) => {
            if (pageNum < EventList.pager.pageCount) {
                let stringDic: any = Object.assign({}, EventList.Filter.FilterDictionary, { Page: Number(pageNum) + 1 });
                return this.eventListSer.GetEventlistObservable(stringDic)
                    .map(data => {
                        return this.eventListSer.handleNoAction();
                    })
                    .catch(err => this.eventListSer.handleError("GetEventlistObservable", err));
            } else {
                return this.eventListSer.handleNoAction();
            }
        });


    @Effect() SetListViewIdAction$ = this.actions$
        .ofType(EventListPageActionTypes.SetListViewId)
        .map(toPayload)
        .switchMap(id => {
            this.userData.saveListViewId(id);
            return this.eventListSer.handleNoAction();
        })


}