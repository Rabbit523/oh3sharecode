import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import { AppState } from '../app.state';
import { EventConst, GlobalActionEnum } from "../../shared/config";
import { SearchService } from '../../shared/service/webapi/search.service';
import { SearchActionType, SearchSetDataAction } from './search.actions';
import { SearchState } from './search.state';
import { Utils } from '../../shared/utils/utils';

@Injectable()
export class SearchEffects {
    constructor(private actions$: Actions, public store$: Store<AppState>, public search: SearchService) { }

    @Effect() SearchDataAction$ = this.actions$
        .ofType(SearchActionType.SearchData)
        .map(toPayload)
        .withLatestFrom(this.store$.select(s => s.Search))
        .switchMap(([search, state]) => {
            this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
            return this.search.webapiGetSearchText(search.txt, state.page.pageIndex, state.page.pageSize)
                .map(response => {
                    let newState = {
                        page: {
                            pageIndex: search.page,
                            pageCount: Utils.getPageCount(response.Count, state.page.pageSize),
                            pageSize: state.page.pageSize,
                        },
                        text: search.txt,
                        Items: response.Items
                    };
                    this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
                    return new SearchSetDataAction(newState);
                })
        });

}