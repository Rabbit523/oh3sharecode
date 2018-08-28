import { Action } from '@ngrx/store';
import { LoginState, LoginModelState } from "../../modules/login";
import { OneHeartUser } from "../../shared/models/webapi/oneheartuser/userdata";
import { SystemInfo } from "../../shared/models/webapi/system/systeminfo";


export const LoginActionTypes = {
  SHOW: '[Login] Show',

  LOGIN: '[Login] Login',
  LOGINTEST: '[Login] LOGINTEST',
  ResetLogin: '[Login] ResetLogin',
  CHECKUSERNAME: '[Login] CheckUserName',
  CHECKUSERNAMESUCCESS: '[Login] CheckUserNameSuccess',
  CHECKUSERNAMEFAILURE: '[Login] CheckUserNameFailure',

  SAVEONEHEARTUSER: '[Login] saveOneHeartUser',
  GETSYSTEMINFO: '[Login] GetSystemInfo',
  GETSYSTEMINFOSUCCESS: '[Login] GetSystemInfoSuccess',
  GETSYSTEMINFOFAILURE: '[Login] GetSystemInfoFailure',

  SAVESYSTEMINFO: '[Login] saveSysteminfo',
  CHECKWEBAPIADDRESS: '[Login] checkWebApiAddress',
  CHECKWEBAPIADDRESSSUCCESS: '[Login] checkWebApiAddressSucess',
  CHECKWEBAPIADDRESSFAILURE: '[Login] checkWebApiAddressFailure',

  AUTHSERVICEPROCESSLOGIN: '[Login] processLogin',
  AUTHSERVICEPROCESSLOGINSUCCESS: '[Login] processLoginSuccess',
  AUTHSERVICEPROCESSLOGINFAILURE: '[Login] processLoginFailure',

  SETLOGINUSERINFO: '[Login] SetLoginUserInfo',
  LOGINSUCCESSSAVEUSERPASSWORD: '[Login] loginSucessSaveUserPassword',
  LOGINSAVEPERSONALIZATIONJSON: '[Login] loginSavePersonalizationJson',
  CACHELOAD: '[Login] contactorcacheLoad',

  LOGIN_SUCCESS: '[Login] LoginSucess',
  LOGIN_FAILURE: '[Login] LoginFailure',

  CheckAccessTokenState: '[Login] CkeckAccessTokenState',
  AccessTokenState: '[Login] AccessTokenState'
};

export class ShowAction implements Action {
  type = LoginActionTypes.SHOW;
  constructor(public payload: LoginState) { }
}
export class LoginAction implements Action {
  type = LoginActionTypes.LOGIN;
  constructor(public payload: LoginState) { }
}
export class LoginTestAction implements Action {
  type = LoginActionTypes.LOGINTEST;
  constructor(public payload: any) { }
}

export class ResetLoginAction implements Action {
  type = LoginActionTypes.ResetLogin;
  constructor(public payload: LoginModelState) { }
}
export class CheckUseNameAction implements Action {
  type = LoginActionTypes.CHECKUSERNAME;
  constructor(public payload: LoginState) { }
}
export class ProcessLoginAction implements Action {
  type = LoginActionTypes.AUTHSERVICEPROCESSLOGIN;
  constructor(public payload: LoginState) { }
}
export class SaveOneHeartUserAction implements Action {
  type = LoginActionTypes.SAVEONEHEARTUSER;
  constructor(public payload: OneHeartUser) { }
}
export class SaveSysteminfoAction implements Action {
  type = LoginActionTypes.SAVESYSTEMINFO;
  constructor(public payload: SystemInfo) { }
}

export class CheckUseNameSuccessAction implements Action {
  type = LoginActionTypes.CHECKUSERNAMESUCCESS;
  constructor(public payload: OneHeartUser) { }
}
export class GetSystemInfoSuccessAction implements Action {
  type = LoginActionTypes.GETSYSTEMINFOSUCCESS;
  constructor(public payload: SystemInfo) { }
}

//------------

export class CheckUseNameFailureAction implements Action {
  type = LoginActionTypes.CHECKUSERNAMEFAILURE;
  constructor(public payload: string) { }
}
export class GetSystemInfoFailureAction implements Action {
  type = LoginActionTypes.GETSYSTEMINFOFAILURE;
  constructor(public payload: string) { }
}
export class CheckWebApiAddressFailureAction implements Action {
  type = LoginActionTypes.CHECKWEBAPIADDRESSFAILURE;
  constructor(public payload: string) { }
}
export class ProcessLoginFailureAction implements Action {
  type = LoginActionTypes.AUTHSERVICEPROCESSLOGINFAILURE;
  constructor(public payload: string) { }
}
export class LoginFailureAction implements Action {
  type = LoginActionTypes.LOGIN_FAILURE;
  constructor(public payload: string) { }
}
export class CheckWebApiAddressSucessAction implements Action {
  type = LoginActionTypes.CHECKWEBAPIADDRESSSUCCESS;
  constructor(public payload: string) { }
}
export class processLoginSuccessAction implements Action {
  type = LoginActionTypes.AUTHSERVICEPROCESSLOGINSUCCESS;
  constructor(public payload: string) { }
}
export class LoginSuccessAction implements Action {
  type = LoginActionTypes.LOGIN_SUCCESS;
  constructor(public payload: string) { }
}
export class AccessTokenStateAction implements Action {
  type = LoginActionTypes.AccessTokenState;
  constructor(public payload: number) { }
}


//--------------

export class GetSystemInfoAction implements Action {
  type = LoginActionTypes.GETSYSTEMINFO;
  constructor(public payload: string) { }
}
export class CheckWebApiAddressAction implements Action {
  type = LoginActionTypes.CHECKWEBAPIADDRESS;
  constructor(public payload: string) { }
}
export class SetLoginUserInfoAction implements Action {
  type = LoginActionTypes.SETLOGINUSERINFO;
  constructor(public payload: string) { }
}
export class LoginSucessSaveUserPasswordAction implements Action {
  type = LoginActionTypes.LOGINSUCCESSSAVEUSERPASSWORD;
  constructor(public payload: string) { }
}
export class LoginSavePersonalizationJsonAction implements Action {
  type = LoginActionTypes.LOGINSAVEPERSONALIZATIONJSON;
  constructor(public payload: string) { }
}
export class CacheLoadAction implements Action {
  type = LoginActionTypes.CACHELOAD;
  constructor(public payload: string) { }
}

export class CheckAccessTokenStateAction implements Action {
  type = LoginActionTypes.CheckAccessTokenState;
  constructor(public payload: string) { }
}



export type LoginActions =
  ShowAction | ResetLoginAction
  | CheckUseNameAction | CheckUseNameSuccessAction | CheckUseNameFailureAction
  | SaveOneHeartUserAction | GetSystemInfoAction | GetSystemInfoSuccessAction | GetSystemInfoFailureAction
  | SaveSysteminfoAction | CheckWebApiAddressAction | CheckWebApiAddressSucessAction | CheckWebApiAddressFailureAction
  | ProcessLoginAction | processLoginSuccessAction | ProcessLoginFailureAction
  | SetLoginUserInfoAction | LoginSucessSaveUserPasswordAction | LoginSavePersonalizationJsonAction
  | CacheLoadAction
  | LoginAction | LoginTestAction
  | LoginSuccessAction | LoginFailureAction
  | CheckAccessTokenStateAction|AccessTokenStateAction;
