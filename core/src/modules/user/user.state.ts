import { UserDtoJSON, EditUserMiddleWareModel } from "../../shared/models/webapi/user/user";

export interface UserState { UserInfo: EditUserMiddleWareModel; UserList: UserDtoJSON; ImportMsg: string; }
export let initialUserState: UserState = { UserInfo: new EditUserMiddleWareModel(), UserList: new UserDtoJSON(), ImportMsg: "" };