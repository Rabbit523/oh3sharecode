import { Action } from '@ngrx/store';
import { UserState } from "../../modules/user";
import { EditUserMiddleWareModel,UpdateUserMiddleWareModel,UserDtoJSON } from '../../shared/models/webapi/user/user';


export const UserActionTypes = {
  SHOW: '[User] Show',
  UserGet: '[User] GetUserGetUrl',
  UserGetSuc: '[User] GetUserGetUrlSuc',
  UserSet: '[User] GetUserSetUrl',
  UserSetSuc: '[User] GetUserSetUrlSuc',
  UserListGet: '[User] getUserListUrl',
  UserListGetSuc: '[User] getUserListUrlSuc',
  ImportUser: '[User] getImportUserUrl',
  ImportUserSuc: '[User] getImportUserUrlSuc',
  UserPermissionPost: '[User] UserPermissionPost',
  UserPermissionPostSuc: '[User] UserPermissionPostSuc'
};

export class UserShowAction implements Action { type = UserActionTypes.SHOW; constructor(public payload: UserState) { } }

export class UserGetAction implements Action { type = UserActionTypes.UserGet; constructor(public payload: number) { } }
export class UserGetSucAction implements Action { type = UserActionTypes.UserGetSuc; constructor(public payload: EditUserMiddleWareModel) { } }

export class UseSetAction implements Action { type = UserActionTypes.UserSet; constructor(public payload: UpdateUserMiddleWareModel) { } }
export class UseSetSucAction implements Action { type = UserActionTypes.UserSetSuc; constructor(public payload: string) { } }

export class UserListGetAction implements Action { type = UserActionTypes.UserListGet; constructor(public payload: JSON) { } }
export class UserListGetSucAction implements Action { type = UserActionTypes.UserListGetSuc; constructor(public payload: UserDtoJSON) { } }

export class ImportUserAction implements Action { type = UserActionTypes.ImportUser; constructor(public payload: any) { } }
export class ImportUserSucAction implements Action { type = UserActionTypes.ImportUserSuc; constructor(public payload: string) { } }

export class UserPermissionPostAction implements Action { type = UserActionTypes.UserPermissionPost; constructor(public payload: any) { } }
export class UserPermissionPostSucAction implements Action { type = UserActionTypes.UserPermissionPostSuc; constructor(public payload: string) { } }

export type UserActions = UserShowAction | UserGetAction | UserGetSucAction |
  UseSetAction | UseSetSucAction | UserListGetAction | UserListGetSucAction |
  ImportUserAction | ImportUserSucAction|UserPermissionPostAction|UserPermissionPostSucAction;
