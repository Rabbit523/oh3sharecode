import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { from } from 'rxjs/observable/from';
import { switchMap } from 'rxjs/operator/switchmap';
import { TagsState } from './tags.state';
import { AppState } from '../app.state';
import {
  TagsActionTypes,
  SETAllDicAction, SETUserDicAction, SETUserTagsAction, SETEditUserAction, SETEditDicAction,
  SHOWAllDicAction, SHOWUserDicAction, SHOWUserTagsAction
} from './tags.actions';
import { TagsService } from '../../shared/service/webapi/tags.service';
import { EventConst, GlobalActionEnum } from "../../shared/config";

@Injectable()
export class TagsEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public tags: TagsService) { }

  @Effect() SHOWAllDicAction$ = this.actions$
    .ofType(TagsActionTypes.SHOWAllDic)
    .map(toPayload)
    .switchMap(str => {
      return this.tags.getAllTagsObservable().map(json => new SETAllDicAction(json));
    })

  @Effect() SHOWUserTagsAction$ = this.actions$
    .ofType(TagsActionTypes.SHOWUserTags)
    .map(toPayload)
    .switchMap(str => {
      return this.tags.GetUserTagsObservable().map(res => new SETUserTagsAction(res));
    })

  @Effect() SHOWUserDicAction$ = this.actions$
    .ofType(TagsActionTypes.SHOWUserDic)
    .map(toPayload)
    .switchMap(str => {
      return this.tags.GetDicTagsObservable().map(res => new SETUserDicAction(res));
    })


  @Effect() EditUserShowAction$ = this.actions$
    .ofType(TagsActionTypes.EditUserShow)
    .map(toPayload)
    .switchMap(id => {
      return this.tags.GetUserTagsGetBy(id).map(res => new SETEditUserAction(res));
    })

  @Effect() EditDicShowAction$ = this.actions$
    .ofType(TagsActionTypes.EditDicShow)
    .map(toPayload)
    .switchMap(id => {
      return this.tags.GetBugTagsGetBy(id).map(res => new SETEditDicAction(res));
    })


  @Effect() EditDicPostAction$ = this.actions$
    .ofType(TagsActionTypes.EditDicPost)
    .map(toPayload)
    .switchMap(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.tags.PostTagObservable(state.id, state.name).map(res => {
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }); 
        return new SHOWAllDicAction("");
      });
    })

  @Effect() EditUserPostAction$ = this.actions$
    .ofType(TagsActionTypes.EditUserPost)
    .map(toPayload)
    .switchMap(state => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.tags.PostUserObservable(state.item.id, state.item.name, state.item.parentid, state.ids)
    })
    .switchMap(xx => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
      return Observable.from([new SHOWUserTagsAction(""), new SHOWUserDicAction("")]);
    })

}