import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { WebapiConfig } from '../../config';
import { AuthService } from './auth.service';
import { EditBugMarkViewModel, BugSubscriptionsDtoJson, ArrayStringDtoJson, ABugRelationsDtoJson } from '../../models/webapi/relation/relationship';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RelationShipService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }

    PostAddShipObservable(bugid: number, bugid2: number, ship: number, txt: string): Observable<string> {
        var url = WebapiConfig.GetAddShipUrl(bugid, bugid2, ship, txt);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    PostRemoveShipObservable(bugid: number, bugid2: number): Observable<string> {
        var url = WebapiConfig.GetRemoveShipUrl(bugid, bugid2);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    GetShipListObservable(id: number): Observable<ABugRelationsDtoJson> {
        var url = WebapiConfig.GetShipListUrl(id);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    PostAddSubObservable(bugid: number, usid: number): Observable<string> {
        var url = WebapiConfig.GetAddSubUrl(bugid, usid);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    PostRemoveSubObservable(bugid: number, usid: number): Observable<string> {
        var url = WebapiConfig.GetRemoveSubUrl(bugid, usid);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    GetBugSubListObservable(id: number): Observable<ArrayStringDtoJson> {
        var url = WebapiConfig.GetBugSubListUrl(id);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    GetSubUserListObservable(id: number): Observable<BugSubscriptionsDtoJson> {
        var url = WebapiConfig.GetSubUserListUrl(id);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    GetBugMarkObservable(id: number, type: number): Observable<EditBugMarkViewModel> {
        var url = WebapiConfig.GetBugMarkUrl(id, type);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    PostMarksObservable(bgid: number, markId: number): Observable<string> {
        var url = WebapiConfig.PostMarksUrl(bgid, markId);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    PostFlagObservable(bgId: number, flag: number): Observable<number> {
        var url = WebapiConfig.PostFlagUrl(bgId, flag);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
    GetMergeObservable(fromid: number, intoid: number): Observable<string[]> {
        var url = WebapiConfig.MergeBugUrl(fromid, intoid);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    PostMergeObservable(fromid: number, intoid: number): Observable<string> {
        var url = WebapiConfig.MergePostUrl(fromid, intoid);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }
}

export function RelationShipServiceFactory(http: Http, chttp: HTTP) {
    return new RelationShipService(http, chttp);
};
