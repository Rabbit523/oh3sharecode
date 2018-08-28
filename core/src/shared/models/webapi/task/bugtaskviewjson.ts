
import { BugTaskBaseModel } from '../eventdetail/eventdetailjson';
import { SelectListItemModel } from '../eventdetail/dropdownjson';

export class BugTaskViewJson {
    TaskUsers: SelectListItemModel[];
    Item: BugTaskBaseModel;
    constructor() {
        this.TaskUsers = [];
        this.Item = new BugTaskBaseModel();
    }
}