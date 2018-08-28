import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { WebapiConfig } from '../../config';
import { AuthService } from './auth.service';
import { EventDispalyTitle } from '../../models/webapi/hostsetting/hostsetting';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HostSettingService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }

    GetNamesUrl(actid: number): Observable<EventDispalyTitle> {
        var url = WebapiConfig.GetNamesUrl(actid);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    GetMobileUrl(actid: number): Observable<string> {
        var url = WebapiConfig.GetMobileUrl(actid);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    GetPcUrl(actid: number): Observable<string> {
        var url = WebapiConfig.GetPcUrl(actid);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    PostSetMobileUrl(mobile: string, actid: number): Observable<string> {

        var url = WebapiConfig.PostSetMobileUrl(mobile, actid);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    PostSetPcUrl(pc: string, actid: number): Observable<string> {
        var url = WebapiConfig.PostSetPcUrl(pc, actid);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }

}

export function HostSettingServiceFactory(http: Http, chttp: HTTP) {
    return new HostSettingService(http, chttp);
};
