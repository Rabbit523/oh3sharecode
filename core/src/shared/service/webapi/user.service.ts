import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { EventConst, WebapiConfig } from '../../config';
import { EditUserMiddleWareModel, UserDto, UserDtoJSON, UpdateUserMiddleWareModel } from '../../models/webapi/user/user';
import { AuthService } from '../webapi/auth.service';

@Injectable()
export class UserService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    } 
    
    PostPermissionUserObservable(usid: number,pjids:string,pType:number): Observable<string> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getPostPermissionUrl(usid,pjids,pType);
        let request = this.post(url, null, headers);
        return request;
    }
    GetUserObservable(usid: number): Observable<EditUserMiddleWareModel> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getUserGetUrl(usid);
        let request = this.get(url, null, headers);
        return request;
    }
    PostUserObservable(user: UpdateUserMiddleWareModel): Observable<string> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getUseSetUrl();
        let request = this.post(url,  this.GetCordovaHttpModel(user), headers);
        return request;
    }
    GetUserListObservable(searhparameter: JSON): Observable<UserDtoJSON> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getUserListUrl();
        let request = this.get(url, searhparameter, headers);
        return request;
    }
    ImportUserObservable(file: any): Promise<string> {        
        let url = WebapiConfig.getImportUserUrl();
        return this.uploadObjectFile(file, url);
    }
}

export function UserServiceFactory(http: Http, chttp: HTTP) {
    return new UserService(http, chttp);
};