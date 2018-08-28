// 用户权限 相关的model
export class OneHeartUser {
    id:string;    
    interfacecode:string;
}

export class PersonalizationJson {
    Features: MenuModel[];
    UiClaims: UiClaimsModel;
    ClaimData: ClaimDataModel;
}
export class MenuModel {
    Module: string;
    Url: string;
    IsFixed: boolean;
    DisplayText: string;
    MatchPattern: number;
    ModuleIcon: string;
}
export class ClaimDataModel {
    SessionGuid:string;    
    EnableSearch: number;
    EnableTeamMeetting: number;
    UseMobileLogin: number;
    UseFCKEditor: boolean;
    UserId: number;
    OrganizationId: number;
    ForcedProjectId: number;
    BugsPerPage: number;
    CanOnlySeeOwnReportedBugs: boolean;
    CanUseReports: boolean;
    CanEditReports: boolean;
    OtherOrgsPermissionLevel: number;
    EnablePopUps: boolean;
    CanAddBugs: boolean;
    CanEditAndDeleteBugs: boolean;
    CanDeleteBugs: boolean;
    CanMergeBugs: boolean;
    CanMassEditBugs: boolean;
    CanAssignToInternalUsers: boolean;
    UsFirstname: string;
    UsLastname: string;
    WeiXinOpenID: string;
    UsDefaultQuery: number;
    CreateBarCord: number;
    ForceLastestBug: boolean;
    UserPic: string;
    Ogname: string;
    SpeacilRight: number;
    OgCanBeAssignedTo: boolean;
    OgCanEditSql: boolean;
    CanEditAndDeletePosts: boolean;
    CanSearch: boolean;
    IsExternalUser: boolean;
    CanEditTasks: boolean;
    CanViewTasks: boolean;
    CategoryFieldPermissionLevel: number;
    TagsFieldPermissionLevel: number;
    PriorityFieldPermissionLevel: number;
    AssignedToFieldPermissionLevel: number;
    OrgFieldPermissionLevel: number;
    UdfFieldPermissionLevel: number;
    ProjectFieldPermissionLevel: number;
    StatusFieldPermissionLevel: number;

    
}
export class UiClaimsModel {
    UserName: string;
    Capabilities: string[];
    Constraints: ConstraintsModel;
    NameValueClaims: NameValueClaimsModel[];
}
export class ConstraintsModel {
    UpperLimit: number;
    LowerLimit: number;
    Name: string;

}
export class NameValueClaimsModel {
    Name: string;
    Value: string;
}