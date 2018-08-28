import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { WebapiConfig } from '../../config/webapiconfig';
import { PersonalizationJson } from '../../models/webapi/oneheartuser/userdata';
import { Utils } from '../../utils/utils';
import { BaseService } from './baseservice';
import { StaticCache } from '../../staticcache';


//需要身份验证信息的http请求基础类
@Injectable()
export class AuthService extends BaseService {

    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    _formPostHeader(): JSON {
        return <any>{ "Content-Type": "application/x-www-form-urlencoded" };
    }
    loginProcess(userName: string, password: string): Observable<any> {
        let url = WebapiConfig.getloginurl();
        let header:any =this._formPostHeader();
        return this.post(url, this._getLoginData(userName, password), header);
    }

    IdtokenLogout(){
         "/connect/endsession?id_token_hint={0}&post_logout_redirect_uri={1}"
    }
    
    CheckAccessToken(plat:number): Observable<any> {
        return this.get(WebapiConfig.getchecktokenurl(plat), <JSON>{}, this.initAuthHeaders());
    }

    //服务器解析token
    validataToken(): Observable<any> {
        let url = WebapiConfig.gettokenvalidataurl();
        let header:any =this._formPostHeader();
        return this.post(url, this._GetdataByplatform({ token: StaticCache.authservicetoken }), header);
    }

    //非jwt有效  刷新服务器上的token   token的serverID
    refreshToken(): Observable<any> {
        let url = WebapiConfig.getrevocationurl();
        let header:any =Object.assign({}, this._formPostHeader(),this.initAuthHeaders("Basic"));
        return this.post(url, this._GetdataByplatform({token:"", token_type_hint: "refresh_token" }), this.initAuthHeaders("Basic"));
    }
    //非jwt有效 取消服务器上的token   token的serverID
    revocationToken(): Observable<any> {
        let url = WebapiConfig.getrevocationurl();
        let header:any =Object.assign({}, this._formPostHeader(),this.initAuthHeaders("Basic"));
        return this.post(url, this._GetdataByplatform({token:"", token_type_hint: "access_token" }), this.initAuthHeaders("Basic"));
    }


    _getLoginData(userName: string, password: string): any {
        var result: any = {
            "grant_type": "password",
            "username": userName,
            "password": password,
            "client_id": StaticCache.Config.interfacecode,
            "client_secret": "not-a-secret",
            "scope": StaticCache.Config.interfacecode,
        };
        return this._GetdataByplatform(result);
    }
    _GetdataByplatform(result: any): any {
        if (!StaticCache.Config.platformIsMobileWeb) {
            return result;
        }
        else {
            return Utils.JsonToUrlString(result);
        }
    }
    SetLoginUserInfo(): Observable<PersonalizationJson> {
        return this.get(WebapiConfig.getuserdataurl(), <JSON>{}, this.initAuthHeaders());
    }

    

}
export function AuthServiceFactory(http: Http, chttp: HTTP) {
    return new AuthService(http, chttp);
};