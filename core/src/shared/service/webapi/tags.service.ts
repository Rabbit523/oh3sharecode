import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { JsonDictionary } from '../../models/common/jsondictionary';
import { TreeNode } from '../../models/common/treenode';

@Injectable()
export class TagsService extends AuthService {

    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }


    GetBugTagsGetBy(id: number): Observable<TreeNode> {
        if (id > 0) {
            var url = WebapiConfig.getbugtagsGetByurl(id);
            let headers = this.initAuthHeaders();
            let request = this.get(url, null, headers);
            return request;
        } else {
            return Observable.from([new TreeNode(0, "", 0)]);
        }
    }

    GetUserTagsGetBy(id: number): Observable<TreeNode> {
        if (id > 0) {
            var url = WebapiConfig.getusertagsGetByurl(id);
            let headers = this.initAuthHeaders();
            let request = this.get(url, null, headers);
            return request;
        } else {
            return Observable.from([new TreeNode(0, "", 0)]);
        }

    }

    getAllTagsObservable(): Observable<JsonDictionary<string>> {
        var url = WebapiConfig.getbugtagsGeturl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }



    GetUserTagsObservable(): Observable<any> {
        var url = WebapiConfig.getusertagsGetUserTagsurl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
    GetDicTagsObservable(): Observable<any> {
        var url = WebapiConfig.getusertagsGetDicTagsurl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }


    PostTagObservable(id: number, name: string): Observable<number> {
        let url = "";
        if (id > 0)
            url = WebapiConfig.getbugtagsnupdateurl(id, name);
        else
            url = WebapiConfig.getbugtagsnInserturl(name);
        let headers = this.initAuthHeaders();
        let request = this.post(url, null, headers );
        return request;
    }
    PostUserObservable(id: number, name: string, parentid: number, ids: number[]): Observable<number> {
        let url = "", str = ids.join(",");
        if (id > 0)
            url = WebapiConfig.getusertagsUpdateurl(id, name, parentid,str);
        else
            url = WebapiConfig.getusertagsInserturl(name, parentid,str);
        let headers = this.initAuthHeaders();
        let request = this.post(url, null, headers);
        return request;
    }
    DeleteObservable(id: number): Observable<any> {
        var url = WebapiConfig.getusertagsDeleteurl(id);
        let headers = this.initAuthHeaders();
        let request = this.post(url, null, headers);
        return request;
    }

}

export function TagsServiceFactory(http: Http, chttp: HTTP) {
    return new TagsService(http, chttp);
};