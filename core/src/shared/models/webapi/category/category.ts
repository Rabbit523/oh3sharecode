import { IntKeyValue } from "../../common/keyvalue";
import { JsonDictionary } from '../../common/jsondictionary';

export class DropDownFilterModel {
    FunctionTypes: Array<IntKeyValue>;
    Projects: Array<IntKeyValue>;
    Flags: Array<IntKeyValue>;
    Statuss: Array<IntKeyValue>;
    Prioritys: Array<IntKeyValue>;
    Categorys: Array<IntKeyValue>;
    AssignedTos: Array<IntKeyValue>;
    Organizatoins: Array<IntKeyValue>;
    constructor() {
        this.FunctionTypes = new Array<IntKeyValue>();
        this.Organizatoins = new Array<IntKeyValue>();
        this.Projects = new Array<IntKeyValue>();
        this.Flags = new Array<IntKeyValue>();
        this.Statuss = new Array<IntKeyValue>();
        this.Prioritys = new Array<IntKeyValue>();
        this.Categorys = new Array<IntKeyValue>();
        this.AssignedTos = new Array<IntKeyValue>();
    }
}

export class DropDownFilterUrlModel {
    FunType: string;
    pj: string;
    flag: string;
    St: string;
    Pri: string;
    Ct: string;
    Asto: string;
    Og: string;
    RpBy: string;
    ReportOg: string;

    SCt: JsonDictionary<string>;
    SeacrhDateS: string;
    SeacrhDateE: string;
    constructor() {
        this.FunType = "";
        this.pj = "";
        this.flag = "";
        this.St = "";
        this.Pri = "";
        this.Ct = "";
        this.Asto = "";
        this.Og = "";
        this.RpBy = "";
        this.ReportOg = "";
        this.SCt = new JsonDictionary<string>();
        this.SeacrhDateS = "";
        this.SeacrhDateE = "";
    }
}
export const CategoryEnum = { DefaultCategories: 0, PersonCategories: 1, DepartCategpries: 2 }

export class Category {
    Id: number;
    Name: string;
    SortOrder: number;
    Default: number;
    ParentId: number;
    BindId: number;
    BindType: number;
    DefineFieldId: number;
    Deleted: boolean;
}

export class CategoryNameDto extends Category {
    BindIdName: string;
    BindTypeName: string;
    DefineFieldIdName: string;
    Functionid: number;
    Depth: number;
}

export class FieldsCategoryName {
    DefineFieldName: string;
    BindIdName: string;
    Functionid: number;
    DefineFields: CategoryNameDto[];
}

export class CategorySearch {
    constructor() {
        this.action = -1;
        this.bindId = -1;
        this.bindtype = -1;
        this.useExt = false;
    }
    action: number; //功能
    bindId: number; //绑定值
    bindtype: number;//绑定类型
    useExt: boolean;//固定扩展字段
}