import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { PriorityDto,PriorityDtoJSON } from '../../models/webapi/priority/priority';

@Injectable()
export class PriorityService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllPriorityObservable(): Observable<PriorityDtoJSON> {
        var url = WebapiConfig.getPriorityListUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetPrioritybservable(id: number): Observable<PriorityDto> {
        var url = WebapiConfig.getPriorityGetUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostPriorityObservable(priority: PriorityDto): Observable<string> {
        let url = WebapiConfig.getPrioritySetUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(priority), headers);
        return request;
    }
}

export function PriorityServiceFactory(http: Http, chttp: HTTP) {
    return new PriorityService(http, chttp);
};