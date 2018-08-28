import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { StatusDto,StatusDtoJSON } from '../../models/webapi/status/status';

@Injectable()
export class StatusService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllStatusObservable(): Observable<StatusDtoJSON> {
        var url = WebapiConfig.getStatusListUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetStatusbservable(id: number): Observable<StatusDto> {
        var url = WebapiConfig.getStatusGetUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostStatusObservable(status: StatusDto): Observable<string> {
        let url = WebapiConfig.getStatusSetUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url,this.GetCordovaHttpModel(status), headers);
        return request;
    }
}

export function StatusServiceFactory(http: Http, chttp: HTTP) {
    return new StatusService(http, chttp);
};