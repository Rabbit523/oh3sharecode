import { IPageResult } from "../ipageresult";

export class OrgDto {
    constructor() { this.og_domain = ""; }
    og_order: number;
    og_Level: number;
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
    org_defaultUser: number;
    ParentId: number;
    og_bg_ActionType_field_permission_level: number;
}
export class OrganizationDto extends OrgDto {
    og_defaultUserName: string;
}

export class OrganizationDtoJSON extends IPageResult<OrganizationDto>{ }