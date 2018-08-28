import { Action } from '@ngrx/store';
import { RelationShipState } from "../../modules/relationship";
import { EditBugMarkViewModel, BugSubscriptionsDtoJson, ArrayStringDtoJson, ABugRelationsDtoJson } from '../../shared/models/webapi/relation/relationship';

export const RelationShipActionTypes = {
  SHOW: '[RelationShip] Show',
  MergeBug: '[RelationShip] MergeBug', BugMark: '[RelationShip] BugMark', SubUserList: '[RelationShip] SubUserList', BugSubList: '[RelationShip] BugSubList', ShipList: '[RelationShip] ShipList',
  MergeBugSuc: '[RelationShip] MergeBugSuc', BugMarkSuc: '[RelationShip] BugMarkSuc', SubUserListSuc: '[RelationShip] SubUserListSuc', BugSubListSuc: '[RelationShip] BugSubListSuc', ShipListSuc: '[RelationShip] ShipListSuc',
  PostAddShip: '[RelationShip] PostAddShip', PostRemoveShip: '[RelationShip] PostRemoveShip', PostAddSub: '[RelationShip] PostAddSub',
  PostRemoveSub: '[RelationShip] PostRemoveSub', PostMarks: '[RelationShip] PostMarks', PostFlag: '[RelationShip] PostFlag', PostMerge: '[RelationShip] PostMerge'
};

export class RelationShipShowAction implements Action { type = RelationShipActionTypes.SHOW; constructor(public payload: RelationShipState) { } }

export class RelationShipPostMergeAction implements Action { type = RelationShipActionTypes.PostMerge; constructor(public payload: any) { } }
export class RelationShipMergeBugAction implements Action { type = RelationShipActionTypes.MergeBug; constructor(public payload: any) { } }
export class RelationShipMergeBugSucAction implements Action { type = RelationShipActionTypes.MergeBugSuc; constructor(public payload: string[]) { } }

export class RelationShipPostMarksAction implements Action { type = RelationShipActionTypes.PostMarks; constructor(public payload: any) { } }
export class RelationShipPostFlagAction implements Action { type = RelationShipActionTypes.PostFlag; constructor(public payload: any) { } }
export class RelationShipBugMarkAction implements Action { type = RelationShipActionTypes.BugMark; constructor(public payload: any) { } }
export class RelationShipBugMarkSucAction implements Action { type = RelationShipActionTypes.BugMarkSuc; constructor(public payload: EditBugMarkViewModel) { } }

export class RelationShipSubUserListAction implements Action { type = RelationShipActionTypes.SubUserList; constructor(public payload: number) { } }
export class RelationShipSubUserListSucAction implements Action { type = RelationShipActionTypes.SubUserListSuc; constructor(public payload: BugSubscriptionsDtoJson) { } }

export class RelationShipPostAddSubAction implements Action { type = RelationShipActionTypes.PostAddSub; constructor(public payload: any) { } }
export class RelationShipPostRemoveSubAction implements Action { type = RelationShipActionTypes.PostRemoveSub; constructor(public payload: any) { } }
export class RelationShipBugSubListAction implements Action { type = RelationShipActionTypes.BugSubList; constructor(public payload: number) { } }
export class RelationShipBugSubListSucAction implements Action { type = RelationShipActionTypes.BugSubListSuc; constructor(public payload: ArrayStringDtoJson) { } }

export class RelationShipPostAddShipAction implements Action { type = RelationShipActionTypes.PostAddShip; constructor(public payload: any) { } }
export class RelationShipPostRemoveShipAction implements Action { type = RelationShipActionTypes.PostRemoveShip; constructor(public payload: any) { } }
export class RelationShipShipListAction implements Action { type = RelationShipActionTypes.ShipList; constructor(public payload: number) { } }
export class RelationShipShipListSucAction implements Action { type = RelationShipActionTypes.ShipListSuc; constructor(public payload: ABugRelationsDtoJson) { } }

export type RelationShipActions = RelationShipShowAction | RelationShipPostMergeAction | RelationShipMergeBugAction | RelationShipMergeBugSucAction | RelationShipPostMarksAction | RelationShipPostFlagAction | RelationShipBugMarkAction | RelationShipBugMarkSucAction | RelationShipSubUserListAction | RelationShipSubUserListSucAction | RelationShipPostAddSubAction | RelationShipPostRemoveSubAction | RelationShipBugSubListAction | RelationShipBugSubListSucAction | RelationShipPostAddShipAction | RelationShipPostRemoveShipAction | RelationShipShipListAction | RelationShipShipListSucAction;
