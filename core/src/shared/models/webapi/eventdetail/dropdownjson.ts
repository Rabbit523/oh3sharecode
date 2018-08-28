export class ItemsModel{ 
    Items:boolean[];
}

export class ListItemBaseModel {
    Selected: boolean;
    Text: string;
    Value: string;
}
export class SelectListItemModel extends ListItemBaseModel {
    Disabled: boolean;
    Group: string;
}

export class DropDownJson {
    DropDown: ListItemBaseModel[]
} 
export class DropDownModel{
    Organizatoins:SelectListItemModel[];
    Projects:SelectListItemModel[];
    Categorys:SelectListItemModel[];
    Prioritys:SelectListItemModel[];
    Statuss:SelectListItemModel[];
}

export class DetailDropDownValues {
    AssignToName: string;
    PriorityName: string;
    OrganizatoinName: string;
    ProjectName: string;
    CategoryName: string;
    StatusName: string;
    BugParticipantsName: string;
    constructor(){        
      this.BugParticipantsName = "";
      this.AssignToName = "";
    }
}