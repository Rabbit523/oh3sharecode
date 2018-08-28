import { ProjectDtoJSON, ProjectDto, ProjectUserPermissionJSON } from "../../shared/models/webapi/project/project";
import { JsonDictionary } from "../../shared/models/common/jsondictionary";

export interface ProjectState { List: ProjectDtoJSON, Project: ProjectDto, Permission: ProjectUserPermissionJSON, BarCode: JsonDictionary<string> }
export let initialProjectState: ProjectState = { List: new ProjectDtoJSON(), Project: new ProjectDto(), Permission: new ProjectUserPermissionJSON(), BarCode: {} };
