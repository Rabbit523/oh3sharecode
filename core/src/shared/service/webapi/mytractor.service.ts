import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { EventConst, WebapiConfig } from '../../config';
import { TractorBookmarkJson } from '../../models/webapi/mytractor/buguserdtomodel';
import { AuthService } from '../webapi/auth.service';

@Injectable()
export class TractorBookmarkService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }

    getTractorMarkJsonObservable(Userid: number, pageIndex: number, pageSize: number): Observable<TractorBookmarkJson> {

        let parameters: any = { "Userid": Userid, "pageIndex": pageIndex, "pageSize": pageSize };
        return this.getObservableBy(WebapiConfig.getmytractorurl(), parameters);
    }
    getBookMarkJsonObservable(shortDec: string, pageIndex: number, pageSize: number): Observable<TractorBookmarkJson> {

        let parameters: any = { "shortDec": shortDec, "pageIndex": pageIndex, "pageSize": pageSize };
        return this.getObservableBy(WebapiConfig.getmybookmarkurl(), parameters);
    }
    private getObservableBy(url: string, parameters: any): Observable<TractorBookmarkJson> {
        let headers = this.initAuthHeaders();
        let request = this.get(url, parameters, headers);
        return request;
    }
}

export function TractorBookmarkServiceFactory(http: Http, chttp: HTTP) {
    return new TractorBookmarkService(http, chttp);
};