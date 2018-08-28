export class CustomDropdownDefineModel {
    DropDownKey: string;
    DropDownValue: CategoryLabel[]
}
export class CategoryLabel {
    ct_id: number;
    ct_name: string;
    ct_parentid: number;
    id: number;
    custom_LabelName: string;
}
export class CustomFieldsModel {
    cd_id: number;
    cd_value: string;
    custom_DiseditableStatuses: string;
    custom_InvisibleStatuses: string;
    custom_FieldNameID: string;
    id: number;
    custom_Functionid: number;
    custom_FieldType: number;
    custom_FieldOrder: number;
    custom_LabelName: string;
    prev_Custom_LabelName: string;
    custom_Enable: boolean;
    custom_MustShow: boolean;
    custom_Editable: boolean;
    constructor() {
        this.custom_LabelName = "";
    }
}
export class CustomFieldsModalModel {
    pageDisplay: string[];
    Item: CustomFieldsModel;
    constructor() {
        this.Item = new CustomFieldsModel();
    }
}
export class CustomFieldsSelectModel {
    Item: CustomFieldsModel;
    Dropdown: CategoryLabel[];
    pageDisplay: string;
    constructor() {
        this.Item = new CustomFieldsModel();
    }
}

export class EventFieldDisplay {
    key: string;
    icon: string;
    label: string;
    displayValue: string;
    constructor(vkey: string, vicon: string, vlabel: string, vdisplayValue: string) {
        this.key = vkey;
        this.icon = vicon;
        this.label = vlabel;
        this.displayValue = vdisplayValue;
    }

}
