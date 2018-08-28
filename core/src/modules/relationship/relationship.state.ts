import { EditBugMarkViewModel, BugSubscriptionsDtoJson, ArrayStringDtoJson, ABugRelationsDtoJson } from '../../shared/models/webapi/relation/relationship';
export interface RelationShipState { MergeBug: string[], BugMark: EditBugMarkViewModel, SubUserList: BugSubscriptionsDtoJson, BugSubList: ArrayStringDtoJson, ShipList: ABugRelationsDtoJson }
export let initialRelationShipState: RelationShipState = { MergeBug: [], BugMark: new EditBugMarkViewModel(), SubUserList: new BugSubscriptionsDtoJson(), BugSubList: new ArrayStringDtoJson(), ShipList: new ABugRelationsDtoJson() };
