import { Action } from '@ngrx/store';
import { ProjectState } from "../../modules/project";
import { ProjectDtoJSON, ProjectDto, ProjectUserPermissionJSON } from '../../shared/models/webapi/project/project';
import { JsonDictionary } from '../../shared/models/common/jsondictionary';


export const ProjectActionTypes = { SHOW: '[Project] Show', BarCordNames: '[Project]BarCordNamesdel', BarCordNamesSuc: '[Project] BarCordNamesSuc', del: '[Project] del', delSuc: '[Project] delSuc', Post: '[Project] Post', PostSuc: '[Project] PostSuc', Get: '[Project] Get', GetSuc: '[Project] GetSuc', GetList: '[Project] GetList', GetListSuc: '[Project] GetListSuc', GetPermissionList: '[Project] GetPermissionList', GetPermissionListSuc: '[Project] GetPermissionListSuc', PermissionPost: '[Project] PermissionPost', PermissionPostSuc: '[Project] PermissionPostSuc' };

export class ProjectShowAction implements Action { type = ProjectActionTypes.SHOW; constructor(public payload: ProjectState) { } }

export class ProjectDelAction implements Action { type = ProjectActionTypes.del; constructor(public payload: number) { } }
export class ProjectDelSucAction implements Action { type = ProjectActionTypes.delSuc; constructor(public payload: string) { } }

export class ProjectPostAction implements Action { type = ProjectActionTypes.Post; constructor(public payload: ProjectDto) { } }
export class ProjectPostSucAction implements Action { type = ProjectActionTypes.PostSuc; constructor(public payload: string) { } }

export class ProjectGetAction implements Action { type = ProjectActionTypes.Get; constructor(public payload: number) { } }
export class ProjectGetSucAction implements Action { type = ProjectActionTypes.GetSuc; constructor(public payload: ProjectDto) { } }

export class BarCordNamesAction implements Action { type = ProjectActionTypes.BarCordNames; constructor(public payload: any) { } }
export class BarCordNamesSucAction implements Action { type = ProjectActionTypes.BarCordNamesSuc; constructor(public payload: JsonDictionary<string>) { } }

export class ProjectGetListAction implements Action { type = ProjectActionTypes.GetList; constructor(public payload: any) { } }
export class ProjectGetListSucAction implements Action { type = ProjectActionTypes.GetListSuc; constructor(public payload: ProjectDtoJSON) { } }

export class ProjectGetPermissionListAction implements Action { type = ProjectActionTypes.GetPermissionList; constructor(public payload: any) { } }
export class ProjectGetPermissionListSucAction implements Action { type = ProjectActionTypes.GetPermissionListSuc; constructor(public payload: ProjectUserPermissionJSON) { } }

export class PostPermissionProjectAction implements Action { type = ProjectActionTypes.PermissionPost; constructor(public payload: any) { } }
export class PostPermissionProjectSucAction implements Action { type = ProjectActionTypes.PermissionPostSuc; constructor(public payload: string) { } }


export type ProjectActions = ProjectShowAction |BarCordNamesAction| BarCordNamesSucAction| ProjectDelAction | ProjectDelSucAction | ProjectPostAction | ProjectPostSucAction | ProjectGetAction | ProjectGetSucAction | ProjectGetListAction | ProjectGetListSucAction | ProjectGetPermissionListAction | ProjectGetPermissionListSucAction | PostPermissionProjectAction | PostPermissionProjectSucAction;
