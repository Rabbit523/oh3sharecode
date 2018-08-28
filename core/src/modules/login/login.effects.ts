import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkjoin';
import { AppState } from '../app.state';
import { Utils } from "../../shared/utils/utils";
import { AuthSetAction } from "../auth";
import { EventConst } from '../../shared/config/eventconst';
import { ContactorHelper } from '../../shared/models/webapi/contactor/contactordictionary';
import { ContactorJson } from '../../shared/models/webapi/contactor/contactorperson';
import { AuthService } from '../../shared/service/webapi/auth.service';
import { ContactorService } from '../../shared/service/webapi/contactor.service';
import { DepartmentEmployeeService } from '../../shared/service/webapi/departmentemployee.service';
import { StorageService } from '../../shared/service/cachedata/storageservice';
import { BugsListService } from '../../shared/service/webapi/bugslist.service';
import { GlobalActionEnum } from '../../shared/config/globalactionenum';
import {
  LoginActionTypes, processLoginSuccessAction, LoginFailureAction, CheckUseNameAction, AccessTokenStateAction,
  GetSystemInfoAction, GetSystemInfoSuccessAction, ProcessLoginAction, CacheLoadAction, LoginSuccessAction
} from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions
    , public contactorcache: ContactorService
    , public authService: AuthService, public eventListSer: BugsListService
    , public userData: StorageService, public departmentEmployeeCache: DepartmentEmployeeService
    , public store$: Store<AppState>
  ) {

  }

  //登陆后超时再次登陆
  @Effect() ResetLoginAction = this.actions$
    .ofType(LoginActionTypes.ResetLogin)
    .map(toPayload)
    .switchMap(login => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.authService.loginProcess(login.username, login.password)
        .map(resultresponse => {
          if (resultresponse && resultresponse.access_token) {
            this.userData.setUserToken(resultresponse.access_token);
            this.userData.loginSucessSaveUserPassword(login.username, login.password);
            return new processLoginSuccessAction("");
          } else {
            return new LoginFailureAction("用户验证错误！");
          }
        })
        .catch(err => this.authService.handleError("authService.loginProcess", err))
    })

  //测试用登陆
  @Effect() LoginTestAction$ = this.actions$
    .ofType(LoginActionTypes.LOGINTEST)
    .map(toPayload)
    .map(login => {
      let responseSystemInfo = { id: login.interfacecode, webapiaddress: login.webapiaddress, systemtitle: login.systemtitle };
      this.userData.saveinterfaceCode(login.interfacecode);
      this.userData.saveSysteminfo(responseSystemInfo)
      return this.authService.handleNoAction();
    });

  @Effect() ProcessLoginAction$ = this.actions$
    .ofType(LoginActionTypes.AUTHSERVICEPROCESSLOGIN)
    .map(toPayload)
    .switchMap(login => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Waiting });
      return this.authService.loginProcess(login.username, login.password)
        .map(resultresponse => {
          if (resultresponse && resultresponse.access_token) {
            this.userData.setUserToken(resultresponse.access_token);
            this.userData.loginSucessSaveUserPassword(login.username, login.password);
            return new processLoginSuccessAction("LoadCache");
          } else {
            return new LoginFailureAction("用户验证错误！");
          }
        })
        .catch(err => this.authService.handleError("authService.loginProcess", err))
    });


  @Effect() CheckAccessTokenAction$ = this.actions$
    .ofType(LoginActionTypes.CheckAccessTokenState)
    .map(toPayload)
    .switchMap(plat => {
      return this.authService.CheckAccessToken(plat)
        .map(x => {
          return new AccessTokenStateAction(x);
        })
        .catch(err => Observable.of(new AccessTokenStateAction(0)))
    });

  @Effect() processLoginSuccessAction$ = this.actions$
    .ofType(LoginActionTypes.AUTHSERVICEPROCESSLOGINSUCCESS)
    .map(toPayload)
    .switchMap(str =>
      this.authService.SetLoginUserInfo()
        .map(x => {
          this.userData.loginSavePersonalizationJson(x);
          if (str == "LoadCache")
            return new CacheLoadAction("");
          else
            return this.authService.handleNoAction();
        })
        .catch(err => this.authService.handleError("authService.SetLoginUserInfo", err))
    );

  @Effect() CacheLoadAction$ = this.actions$
    .ofType(LoginActionTypes.CACHELOAD)
    .switchMap(() => {
      return Observable.forkJoin(
        this.contactorcache.getContactorJsonObservable(),
        this.departmentEmployeeCache.getSelectTreeNodesObservable()
      ).map(([co, de]) => {
        this.userData.setContactorCache(ContactorHelper.contactorToDictionaries(co as ContactorJson));
        this.userData.setDepartmentEmployeeCache(de);
        this.store$.dispatch(new AuthSetAction(false));
        this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.Login_Success });
        return new LoginSuccessAction("");
      })
    });

  @Effect() System_ResetwaitingAction$ = this.actions$
    .ofType(LoginActionTypes.LOGIN_FAILURE, LoginActionTypes.LOGIN_SUCCESS)
    .map(() => {
      this.store$.dispatch({ type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting });
      return this.authService.handleNoAction();
    });
}