export class PageActionModel {
    constructor(vEnumId: string, vIconName: string, vH_title: string, vP_title: string, vP_color: string) {
        this.EnumId = vEnumId;
        this.IconName = vIconName;
        this.H_title = vH_title;
        this.P_title = vP_title;
        this.P_color = vP_color;
    }
    EnumId: string = "";//标识
    IconName: string = "";//图标
    P_color: string = "";//图标颜色
    H_title: string = "";//主标题
    P_title: string = "";//副标题
}
export class MenuCount {
    Id: string;
    count: number;
    date: string;
}

export class PageActionNumberModel extends PageActionModel {
    constructor(vid: string, vIconName: string, vH_title: string, vP_title: string, vP_color: string, calc: boolean) {
        super(vid, vIconName, vH_title, vP_title, vP_color);        
        this.calc = calc;
    }
    Count: string = ""; //条数
    LastTime: string = "";//最新时间
    calc: boolean;//是否计算条数
}

export class ActionPageListGroup {
    constructor(vG_title: string, vitems: PageActionModel[]) {
        this.G_title = vG_title;
        this.items = vitems;
    }
    items: PageActionModel[];
    G_title: string = "";
}

export class ApplicationPageListGroup {
    constructor(vG_title: string, vitems: PageActionNumberModel[]) {
        this.G_title = vG_title;
        this.items = vitems;
    }
    items: PageActionNumberModel[];
    G_title: string = "";
}