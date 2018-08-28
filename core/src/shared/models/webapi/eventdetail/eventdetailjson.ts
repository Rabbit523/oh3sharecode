import { StringDictionaryMap, StringItemsModel, IntDictionarySelectListItemModelMap } from './Intkeyvalue'
import { CustomFieldsModel } from './customdropdowndefine'
import { ItemsModel, DropDownModel, SelectListItemModel } from './dropdownjson'

export class EventEnablesVisiblesModel {
    Enables: ItemsModel;
    Visibles: ItemsModel;
    Names: StringDictionaryMap;
}
export class BugRelationShipView {
    Id: number;
    Bug1Id: number;
    Bug2Id: number;
    Type: string;
    Direction: number;
    st_name: string;
    bg_short_desc: string;
    DirectionName: string;
}

export class EditBugJsonFieldsModel {
    PlaceID: number;
    id: number;
    Fatherid: number;
    customFields: CustomFieldsModel[];
    WorkFlowEventStatus: string;
    internal_only_Checked: boolean;
    TaskDescriptionId: number;
    PlannedEndDate: string;
    PlaceIdAndAddress: string;
    assignedto: string;
    project: string;
    org: string;
    category: string;
    priority: string;
    status: string;
    shortdesc: string;
    tags: string;
    attachmentDescText: string;
    udf_Value: string;
    comment_Value: string;
    Items: StringItemsModel;
}


export class BugTaskBaseModel {
    Id: number;
    BugId: number;
    CreatedUserId: number;
    CreatedDate: string;
    LastUpdatedUserId: number;
    LastUpdatedDate: string;
    AssignedToUserId: number; // Nullable<>
    PlannedStartDate: string; // Nullable<>
    ActualStartDate: string; // Nullable<>
    PlannedEndDate: string; // Nullable<>
    ActualEndDate: string;  // Nullable<>
    PlannedDuration: number; // Nullable<>
    ActualDuration: number; // Nullable<>
    DurationUnits: string;
    PercentComplete: number; // Nullable<>
    StatusId: number; // Nullable<>
    SortSequence: number; // Nullable<>
    Description: string;
    tsk_type: number;
}
export class BugEditModel {
    DropDown: DropDownModel;
    CDropDown: IntDictionarySelectListItemModelMap;
    TaskList: SelectListItemModel[];
    ItemStatu: boolean;
    reportedByUserStr: string;
    reportedByDateStr: string;//2017-01-17 15:37:52,
    ExplanationTask: BugTaskBaseModel[];
    ExplanationTaskComplate: boolean[];
    PrevItem: EditBugJsonFieldsModel;
    Item: EditBugJsonFieldsModel;
    EventVisibles: EventEnablesVisiblesModel;
    ActionType: number;
    ActionName: string;
    CustomType: number;
    snapshottimestamp: string;//2017-01-25 10:40:51.713,
}
export class AllTasksModel {
    ExplanationTask: BugTaskBaseModel[];
    ExplanationTaskComplate: boolean[];
    constructor() {
        this.ExplanationTask = new Array<BugTaskBaseModel>();
        this.ExplanationTaskComplate = new Array<boolean>();
    }
}
export class EventDetailJson extends AllTasksModel {
    DropDown: DropDownModel;
    CDropDown: IntDictionarySelectListItemModelMap;
    TaskList: SelectListItemModel[];
    ItemStatu: boolean = false;
    reportedByUserStr: string = "";
    reportedByDateStr: string = "";//2017-01-17 15:37:52,
    reportedUsid: number;
    PrevItem: EditBugJsonFieldsModel;
    Item: EditBugJsonFieldsModel;
    EventVisibles: EventEnablesVisiblesModel;
    ActionType: number;
    ActionName: string;
    CustomType: number;
    snapshottimestamp: string;//2017-01-25 10:40:51.713,
    BugRelations: Array<BugRelationShipView>;
    constructor() {
        super();
        this.ActionType = -1;
        this.DropDown = new DropDownModel();
        this.CDropDown = new IntDictionarySelectListItemModelMap();
        this.TaskList = new Array<SelectListItemModel>();
        this.Item = new EditBugJsonFieldsModel();
        this.EventVisibles = new EventEnablesVisiblesModel();
        this.BugRelations = new Array<BugRelationShipView>();
    }
}