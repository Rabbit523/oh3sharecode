import { IPageResult } from "../ipageresult";
import { User_tempDto } from "../user/user";
export class ProjectDropdownDefineFieldDto {
    pd_id: number;
    pj_id: number;
    sdf_id: number;
    sdf_Name: string;
    pd_value: string;
}
export class Project {
    constructor() {
        this.pj_active = 1;
        this.ProjectShowInAllQuery = true;
    }
    pj_id: number;
    pj_name: string;
    ProjectShowInAllQuery: boolean;
    pj_default: number;
    pj_auto_assign_default_user: number;
    pj_auto_subscribe_default_user: number;
    pj_enable_pop3: number;
    pj_active: number;
    pj_default_user: number;
    pj_FatherProject: number;
    pj_BarCordType: number;
    EventFunctionType: number;
    pj_pop3_username: string;
    pj_pop3_email_from: string;
    pj_pop3_password: string;
    pj_description: string;
    default_userName: string;
    pj_FatherProjectName: string;
}

export class ProjectDto extends Project {
    ProjectDropDowns: Array<ProjectDropdownDefineFieldDto>
}
export class ProjectUserPermission extends User_tempDto {
    pj_id: number;
    pj_name: string;
    ProjectPermissionTypeId: number;
    ProjectPermissionName: string;
    pu_auto_subscribe: number;
    pu_auto_subscribeName: string;
}
export class ProjectDtoJSON extends IPageResult<ProjectDto>{ }
export class ProjectUserPermissionJSON extends IPageResult<ProjectUserPermission>{ }
