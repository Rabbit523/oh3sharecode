import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { AppState } from '../app.state';
import { MenuListsActionTypes, MenuListsSetCountAction } from './menulists.actions';
import { BugsListService } from '../../shared/service/webapi/bugslist.service';
import { MenuCount } from '../../shared/models/common/pagemodel';
import { JsonDictionary } from 'src/shared/models/common/jsondictionary';

@Injectable()
export class MenuListsEffects {
    constructor(private actions$: Actions, public store$: Store<AppState>, public bugslistSer: BugsListService) {

    }

    @Effect() MenuListsProblemChangeAction$ = this.actions$
        .ofType(MenuListsActionTypes.ListProblemChange)
        .map(toPayload)
        .switchMap(JsonKvs => {
            let temp$: Array<Observable<number>> = [];
            let result: JsonDictionary<MenuCount> = {};
            JsonKvs.forEach(JsonKv => { temp$.push(this.bugslistSer.GetEventCountObservable(JsonKv.value)); })
            return Observable.forkJoin(temp$).map(res => {
                res.forEach((Count, i) => { result[JsonKvs[i].key] = { Id: JsonKvs[i].key, count: Count, date: "" } });
                return new MenuListsSetCountAction(result);
            })
        })
}