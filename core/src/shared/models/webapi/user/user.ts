import { IPageResult } from '../ipageresult';
import { SelectListItemModel } from '../../../models/webapi/eventdetail/dropdownjson';

export class User_temp_new {
    us_id: number;
    us_admin: number;
    us_default_query: number;
    defaultQueryName: string;
    us_created_user: number;
    us_System_subscribe: number;
    us_auto_subscribe: number;
    us_enable_notifications: number;
    us_org: number;
    us_password: string;
    us_salt: number;
    us_active: number;
    us_username: string;
    us_firstname: string;
    us_lastname: string;
    us_email_pwd: string;
    us_email: string;
    us_bugs_per_page: number;
    us_use_fckeditor: number;
    us_send_notifications_to_self: number;//?
    us_reported_notifications: number;
    us_assigned_notifications: number;
    us_subscribed_notifications: number;
    us_auto_subscribe_own_bugs: number;//?
    us_auto_subscribe_reported_bugs: number;//?
    us_signature: string;
    us_most_recent_login_datetime: string;//?
    us_enable_bug_list_popups: number;
    us_forced_project: number;
    og_id: number;
    og_name: string;
    og_domain: string;
    og_non_admins_can_use: number;
    og_external_user: number;
    og_can_be_assigned_to: number;
    og_can_only_see_own_reported: number;
    og_can_edit_sql: number;
    og_can_delete_bug: number;
    og_can_edit_and_delete_posts: number;
    og_can_merge_bugs: number;
    og_can_mass_edit_bugs: number;
    og_can_use_reports: number;
    og_can_edit_reports: number;
    og_can_view_tasks: number;
    og_can_edit_tasks: number;
    og_can_search: number;
    og_other_orgs_permission_level: number;
    og_can_assign_to_internal_users: number;
    og_category_field_permission_level: number;
    og_priority_field_permission_level: number;
    og_assigned_to_field_permission_level: number;
    og_status_field_permission_level: number;
    og_project_field_permission_level: number;
    og_org_field_permission_level: number;
    og_udf_field_permission_level: number;
    og_tags_field_permission_level: number;
    og_active: number;
    IsHead: boolean;
    org_defaultUser: number;//?
    og_bg_ActionType_field_permission_level: number;//?
    pu_permission_level: number;
    project_admin: number;
    WeiXinOpenID: string;
    CreateBarCord: number;
    ForceLastestBug: number;
    UserPic: string;
    speacilRight: number;
    pu_project: number;//?
    og_Level: number;
}

export class User_tempDto extends User_temp_new {
    pu_user: number;
    fullname: string;
    forcedproject: string;
    new_assigned_notifications: number;
    new_reported_notifications: number;
    UsMostRecentLoginDatetimeStr: string;
}

export class UserDto extends User_tempDto {
    us_adminChinese: string;
    pu_userChinese: string;
    us_activeChinese: string;
    og_external_userChinese: string;
    us_enable_notificationsChinese: string;
    us_auto_subscribeChinese: string;
}

export class ProjectUserPermission extends User_tempDto {
    pj_id: number;
    pj_name: string;
    ProjectPermissionTypeId: number;
    ProjectPermissionName: string;
    pu_auto_subscribe: number;
    pu_auto_subscribeName: string;
}

export class UpdateUserMiddleWareModel {
    ForUser_Database: UserDto;
    UserRoles: SelectListItemModel[];
    projects_sub: string;
    retroactive_Checked: boolean;
}

export class EditUserMiddleWareModel extends UpdateUserMiddleWareModel {
    query_DataSource: SelectListItemModel[];
    OrgItems: SelectListItemModel[];
    UserProjectPermission: ProjectUserPermission[];
    SystemSubScribes: SelectListItemModel[];
    NotificationsLists: SelectListItemModel[];
    confirm_pw_Value: string;
    projects_subnames: string;
}

export class UserDtoJSON extends IPageResult<UserDto>{ }