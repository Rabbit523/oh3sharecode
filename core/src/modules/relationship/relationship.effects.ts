import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchmap';
import { map } from 'rxjs/operator/map';
import { AppState } from '../app.state';
import { RelationShipState } from './relationship.state';
import {
  RelationShipActionTypes, RelationShipShowAction, RelationShipMergeBugSucAction, RelationShipBugMarkSucAction,
  RelationShipSubUserListSucAction, RelationShipBugSubListSucAction, RelationShipShipListSucAction
} from './relationship.actions';
import { RelationShipService } from '../../shared/service/webapi/relationship.service';

@Injectable()
export class RelationShipEffects {
  constructor(private actions$: Actions, public store$: Store<AppState>, public relationSer: RelationShipService) { }

  @Effect() RelationShipMergeBugAction$ = this.actions$
    .ofType(RelationShipActionTypes.MergeBug)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.GetMergeObservable(data.fromid, data.intoid).map(x => new RelationShipMergeBugSucAction(x)) })

  @Effect() RelationShipBugMarkAction$ = this.actions$
    .ofType(RelationShipActionTypes.BugMark)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.GetBugMarkObservable(data.id, data.type).map(x => new RelationShipBugMarkSucAction(x)) })

  @Effect() RelationShipSubUserListAction$ = this.actions$
    .ofType(RelationShipActionTypes.SubUserList)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.GetSubUserListObservable(data).map(x => new RelationShipSubUserListSucAction(x)) })

  @Effect() RelationShipBugSubListAction$ = this.actions$
    .ofType(RelationShipActionTypes.BugSubList)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.GetBugSubListObservable(data).map(x => new RelationShipBugSubListSucAction(x)) })

  @Effect() RelationShipShipListAction$ = this.actions$
    .ofType(RelationShipActionTypes.ShipList)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.GetShipListObservable(data).map(x => new RelationShipShipListSucAction(x)) })

  @Effect() RelationShipPostAddShipAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostAddShip)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostAddShipObservable(data.bgid, data.bugid2, data.ship, data.txt).map(x => Observable.of({ type: "", payload: x })) })

  @Effect() RelationShipPostRemoveShipAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostRemoveShip)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostRemoveShipObservable(data.bugid, data.bugid2).map(x => Observable.of({ type: "", payload: x })) })

  @Effect() RelationShipPostAddSubAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostAddSub)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostAddSubObservable(data.bugid, data.usid).map(x => Observable.of({ type: "", payload: x })) })

  @Effect() RelationShipPostRemoveSubAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostRemoveSub)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostRemoveSubObservable(data.bugid, data.usid).map(x => Observable.of({ type: "", payload: x })) })

  @Effect() RelationShipPostMarksAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostMarks)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostMarksObservable(data.bgid, data.markid).map(x => Observable.of({ type: "", payload: x })) })

  @Effect() RelationShipPostFlagAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostFlag)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostFlagObservable(data.bgid, data.flag).map(x => Observable.of({ type: "", payload: x })) })

  @Effect() RelationShipPostMergeAction$ = this.actions$
    .ofType(RelationShipActionTypes.PostMerge)
    .map(toPayload)
    .switchMap(data => { return this.relationSer.PostMergeObservable(data.fromid, data.intoid).map(x => Observable.of({ type: "", payload: x })) })

}