import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkjoin';
import 'rxjs/add/observable/fromPromise';
import { AppState } from '../app.state';
import { EventConst,GlobalActionEnum } from "../../shared/config";
import { SelectItemService } from '../../shared/service/webapi/selectitem.service';
import { EventListItemConst } from '../../shared/pages/eventlistitemtype';
import { EventListMenuFilterContentActionTypes, EventListMenuFilterContentSetSateAction, EventListMenuFilterContentViewChangeSuccAction } from './eventlistmenufiltercontent.actions';


@Injectable()
export class EventListMenuFilterContentEffects {
  constructor(
    private actions$: Actions, public store$: Store<AppState>,
    public selectache: SelectItemService
  ) { }

  @Effect() EventListMenuFilterContentAction$ = this.actions$
    .ofType(EventListMenuFilterContentActionTypes.SHOW)
    .map(toPayload)
    .switchMap(initstate => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return Observable.forkJoin(
        this.selectache.GetObservableOrganizations(),
        this.selectache.GetObservableUsers(),
        this.selectache.GetObservableProjects()
      ).map(([orgs, users, projects]) => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
        let dropdown = Object.assign({}, initstate.DropDownFilter, { Organizatoins: orgs, AssignedTos: users, Projects: projects });        
        return new EventListMenuFilterContentSetSateAction(dropdown);
      })
    })

  @Effect() EventListMenuFilterContentViewChangeAction$ = this.actions$
    .ofType(EventListMenuFilterContentActionTypes.ViewChange)
    .map(toPayload)
    .map(listviewId => {
      let menuList = EventListItemConst.GetEventListMenuFor(listviewId);
      return new EventListMenuFilterContentViewChangeSuccAction(menuList);
    })
}