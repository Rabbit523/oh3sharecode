import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { AppState } from '../app.state';
import { TractorBookmarkService } from '../../shared/service/webapi/mytractor.service';
import { TractorBookmarkJson } from '../../shared/models/webapi/mytractor/buguserdtomodel';
import { ListPager } from '../listpager';
import { Utils } from '../../shared/utils/utils';
import { EventConst, GlobalActionEnum } from '../../shared/config';


export const TractorBookMarkPageActionTypes = {
    FecthTractorMark: "[TractorBookMarkPage] FecthTractorMark",
    SetTractorMark: "[TractorBookMarkPage] SetTractorMark",
    FecthBookMark: "[TractorBookMarkPage] FecthBookMark",
    SetBookMark: "[TractorBookMarkPage] SetBookMark"
}

export class FecthTractorMarkAction implements Action {
    type = TractorBookMarkPageActionTypes.FecthTractorMark;
    constructor(public payload: ListPager) { }
}
export class FecthBookMarkAction implements Action {
    type = TractorBookMarkPageActionTypes.FecthBookMark;
    constructor(public payload: ListPager) { }
}

export class SetTractorMarkAction implements Action {
    type = TractorBookMarkPageActionTypes.SetTractorMark;
    constructor(public payload: TractorBookmarkJson) { }
}

export class SetBookMarkAction implements Action {
    type = TractorBookMarkPageActionTypes.SetBookMark;
    constructor(public payload: TractorBookmarkJson) { }
}

export type TractorBookMarkPageActions = FecthTractorMarkAction | SetTractorMarkAction | FecthBookMarkAction | SetBookMarkAction;

@Injectable()
export class TractorBookMarkEffects {
    constructor(public actions$: Actions, public tbService: TractorBookmarkService, public store$: Store<AppState>) { }

    @Effect() GetTractorMarkAction$ = this.actions$
        .ofType(TractorBookMarkPageActionTypes.FecthTractorMark)
        .map(toPayload)
        .switchMap(pager => {
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
            return this.tbService.getTractorMarkJsonObservable(-1, pager.pageIndex, pager.pageSize)
                .map(data => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new SetTractorMarkAction(data) })
                .catch(err => { return this.tbService.handleError("getTractorMarkJsonObservable", err); });
        });

    @Effect() GetBookMarkAction$ = this.actions$
        .ofType(TractorBookMarkPageActionTypes.FecthBookMark)
        .map(toPayload)
        .switchMap(pager => {
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
            return this.tbService.getBookMarkJsonObservable("", pager.pageIndex, pager.pageSize)
                .map(data => { this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); return new SetBookMarkAction(data) })
                .catch(err => { return this.tbService.handleError("getBookMarkJsonObservable", err); });
        });
}

export function TractorBookMarkPageReducer(state = initialTractorBookMarkPageState, action: TractorBookMarkPageActions): TractorBookMarkPageState {
    switch (action.type) {

        case TractorBookMarkPageActionTypes.FecthTractorMark:
        case TractorBookMarkPageActionTypes.FecthBookMark:
            return Object.assign({}, state, { pager: action.payload });
        case TractorBookMarkPageActionTypes.SetTractorMark:
            let myrecords1 = action.payload as TractorBookmarkJson;
            if (myrecords1.Count) {
                let pager1 = Object.assign({}, state.pager);
                pager1.pageCount = Utils.getPageCount(myrecords1.Count, state.pager.pageSize);
                return Object.assign({}, state, { TractorMark: action.payload, pager: pager1 });
            } else {
                return state
            }

        case TractorBookMarkPageActionTypes.SetBookMark:
            let myrecords2 = action.payload as TractorBookmarkJson;
            if (myrecords2.Count) {
                let pager2 = Object.assign({}, state.pager);
                pager2.pageCount = Utils.getPageCount(myrecords2.Count, state.pager.pageSize);
                return Object.assign({}, state, { BookMark: action.payload, pager: pager2 });
            } else {
                return state
            }

        default:
            return state;
    }
}

export interface TractorBookMarkPageState {
    TractorMark: TractorBookmarkJson;
    BookMark: TractorBookmarkJson;
    pager: ListPager;
}
export let initialTractorBookMarkPageState: TractorBookMarkPageState = {
    TractorMark: new TractorBookmarkJson(),
    BookMark: new TractorBookmarkJson(),
    pager: new ListPager()
}