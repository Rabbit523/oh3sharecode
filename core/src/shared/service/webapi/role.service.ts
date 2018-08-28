import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { JsonDictionary } from '../../models/common/jsondictionary';
import { TreeNode } from '../../models/common/treenode';
import { GUID, Role, RoleDTOJSON } from '../../models/webapi/roles/role';

@Injectable()
export class RoleService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllRoleObservable(): Observable<RoleDTOJSON> {
        var url = WebapiConfig.getRoleListUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetRolebservable(id: GUID): Observable<Role> {
        var url = WebapiConfig.getRoleGetUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostRoleObservable(role: Role): Observable<string> {
        let url = WebapiConfig.getRoleSetUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(role), headers);
        return request;
    }

}

export function RoleServiceFactory(http: Http, chttp: HTTP) {
    return new RoleService(http, chttp);
};