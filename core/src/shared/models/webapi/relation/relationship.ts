import { SelectListItemModel } from '../eventdetail/dropdownjson';
import { IPageResult } from '../ipageresult';
export class EditMarkItemModel extends SelectListItemModel {
    BugId: number;
    Checked: boolean;
}
export class EditBugMarkViewModel {
    id: number;
    ColorFlag: number;
    ColorMarks: Array<EditMarkItemModel>;
    TeamMarks: Array<EditMarkItemModel>;
}
export class BugSubscriptionsDto {
    bs_bug: number;
    bs_user: number;
    bs_delete: number;
    us_username: string;
    usFullName: string;
    us_firstname: string;
    us_lastname: string;
    us_email: string;
    us_filtnotifications: string;
}
export class ABugRelationsDto {
    re_bug1: number;
    re_bug2: number;
    re_type: string;
    re_direction: number;
    re_direction_Name: string;
    bg_short_desc: string;
    st_name: string;
    canremove: number;
}
export class BugSubscriptionsDtoJson extends IPageResult<BugSubscriptionsDto>{ }
export class ABugRelationsDtoJson extends IPageResult<ABugRelationsDto>{ }
export class ArrayStringDtoJson extends IPageResult<Array<string>>{ }