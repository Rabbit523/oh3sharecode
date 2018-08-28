import { BugTaskViewJson } from '../../shared/models/webapi/task/bugtaskviewjson';


export class ChildTaskModel {
    Id: number;
    Tid: number;
    Fid: number;
}
export class EventChildTaskBase {
    itemEdit: BugTaskViewJson;
    fieldsId: string;
}
export interface EventChildTaskState {
    itemEdit: BugTaskViewJson;
    fieldsId: string;
    HeadTitle: string;
}

export let initialEventChildTaskState: EventChildTaskState = {
    itemEdit: new BugTaskViewJson(),
    fieldsId: "",
    HeadTitle: ""
};