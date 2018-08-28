import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { IISSite, NewSite, NewSiteDb } from '../../models/webapi/iisdb/iisdb';

@Injectable()
export class IISDBService extends AuthService {

    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllSiteObservable(): Observable<IISSite> {
        var url = WebapiConfig.GetIISDBGetUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostInitDBObservable(dbname: NewSiteDb): Observable<string> {
        var url = WebapiConfig.PostDBInitUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(dbname), headers);
        return request;
    }

    PostNewSiteObservable(site: NewSite): Observable<string> {
        let url = WebapiConfig.PostIISCreateUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(site), headers);
        return request;
    }
}

export function IISDBServiceFactory(http: Http, chttp: HTTP) { return new IISDBService(http, chttp); };