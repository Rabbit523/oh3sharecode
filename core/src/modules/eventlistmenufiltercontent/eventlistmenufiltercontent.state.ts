import { DropDownFilterModel, DropDownFilterUrlModel } from '../../shared/models/webapi/category/category';
import { IntKeyValue } from '../../shared/models/common/keyvalue';

export interface EventListMenuFilterContentState {
    DropDownFilter: DropDownFilterModel;
    DropDownValue: DropDownFilterUrlModel;    
    menuList: Array<IntKeyValue>;
}

export let initialEventListMenuFilterContentState: EventListMenuFilterContentState = {
    DropDownFilter: new DropDownFilterModel(),
    DropDownValue: new DropDownFilterUrlModel(),    
    menuList: new Array<IntKeyValue>()
};
