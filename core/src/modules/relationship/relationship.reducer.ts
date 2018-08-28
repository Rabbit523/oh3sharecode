import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RelationShipActions, RelationShipActionTypes } from './relationship.actions';
import { initialRelationShipState, RelationShipState } from './relationship.state';

export function RelationShipReducer(state = initialRelationShipState, action: RelationShipActions): RelationShipState {
  switch (action.type) {
    case RelationShipActionTypes.SHOW:
      return Object.assign({}, state, initialRelationShipState);
    case RelationShipActionTypes.MergeBugSuc:
      return Object.assign({}, state, { MergeBug: action.payload });
    case RelationShipActionTypes.BugMarkSuc:
      return Object.assign({}, state, { BugMark: action.payload });
    case RelationShipActionTypes.SubUserListSuc:
      return Object.assign({}, state, { SubUserList: action.payload });
    case RelationShipActionTypes.BugSubListSuc:
      return Object.assign({}, state, { BugSubList: action.payload });
    case RelationShipActionTypes.ShipListSuc:
      return Object.assign({}, state, { ShipList: action.payload });
    default:
      return state;

  }
}
