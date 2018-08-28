import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoginActions, LoginActionTypes } from './login.actions';
import { initialLoginState, LoginState } from './login.state';
import { StaticCache } from "../../shared/staticcache";
import { SystemInfo } from "../../shared/models/webapi/system/systeminfo";

export function LoginReducer(state = initialLoginState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.SHOW:
      var loginstate = {
        username: StaticCache.Config.username,
        password: StaticCache.Config.password,
        appVersion: StaticCache.Config.appVersion,
        interfaceCode: StaticCache.Config.interfacecode,
        systemtitle: StaticCache.Config.systemtitle,
        submitted: false,
        CheckStr: ""
      };
      return Object.assign({}, state, loginstate);

    case LoginActionTypes.LOGIN:
      return Object.assign({}, state, action.payload);

      case LoginActionTypes.AccessTokenState:
      return Object.assign({}, state, { checkToken: action.payload });

    case LoginActionTypes.CHECKUSERNAMEFAILURE:
    case LoginActionTypes.GETSYSTEMINFOFAILURE:
    case LoginActionTypes.CHECKWEBAPIADDRESSFAILURE:
    case LoginActionTypes.AUTHSERVICEPROCESSLOGINFAILURE:
    case LoginActionTypes.LOGIN_FAILURE:

    case LoginActionTypes.CHECKWEBAPIADDRESSSUCCESS:
    case LoginActionTypes.AUTHSERVICEPROCESSLOGINSUCCESS:
    case LoginActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, { CheckStr: action.payload });

    case LoginActionTypes.SAVESYSTEMINFO:
      let systeminfo: SystemInfo = action.payload as SystemInfo;
      return Object.assign({}, state, {
        systemtitle: systeminfo.systemtitle,
      });

    case LoginActionTypes.AUTHSERVICEPROCESSLOGIN:
      let login = action.payload as LoginState;
      return Object.assign({}, state, { username: login.username, password: login.password }, { submitted: true, CheckStr: "" });

    case LoginActionTypes.CHECKUSERNAME:
    case LoginActionTypes.CHECKUSERNAMESUCCESS:
    case LoginActionTypes.SAVEONEHEARTUSER:
    case LoginActionTypes.GETSYSTEMINFO:
    case LoginActionTypes.GETSYSTEMINFOSUCCESS:
    case LoginActionTypes.CHECKWEBAPIADDRESS:
    case LoginActionTypes.SETLOGINUSERINFO:
    case LoginActionTypes.LOGINSUCCESSSAVEUSERPASSWORD:
    case LoginActionTypes.LOGINSAVEPERSONALIZATIONJSON:
    case LoginActionTypes.CACHELOAD:
    default:
      return state;

  }
}
