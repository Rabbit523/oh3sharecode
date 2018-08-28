import { Role, RoleDTOJSON } from "../../shared/models/webapi/roles/role";
export interface RoleState { List: RoleDTOJSON, Role: Role }
export let initialRoleState: RoleState = { List: new RoleDTOJSON(), Role: new Role() };
