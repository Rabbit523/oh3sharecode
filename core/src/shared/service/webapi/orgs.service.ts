import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { OrgDto, OrganizationDtoJSON} from '../../models/webapi/org/orgdto';

@Injectable()
export class OrgsService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllOrgsObservable(pindex: number): Observable<OrganizationDtoJSON> {
        var url = WebapiConfig.getOrgListUrl(10, pindex);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetOrgObservable(id: number): Observable<OrgDto> {
        var url = WebapiConfig.getOrgGetUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostObservable(org:OrgDto): Observable<string> {
        let url = WebapiConfig.getOrgSetUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(org), headers);
        return request;
    }

    DeleteObservable(id: number): Observable<string> {
        var url = WebapiConfig.getOrgDelUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.post(url, null, headers);
        return request;
    }

}

export function OrgsServiceFactory(http: Http, chttp: HTTP) {
    return new OrgsService(http, chttp);
};