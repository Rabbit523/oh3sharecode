import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import {  WebapiConfig } from '../../config';
import { PostListModel ,MyNewPostComment} from '../../models/webapi/eventpost/postlistmodel';
import { AuthService } from './auth.service';

@Injectable()
export class EventPostService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    GetNewCommentObservable(pageindex: number, pagesize: number): Observable<MyNewPostComment[]> {
        var cacheKey = WebapiConfig.geteventgetnewpostsurlurl(pageindex, pagesize);
        let headers = this.initAuthHeaders();
        let request = this.get(cacheKey, <JSON>{}, headers);
        return request;
    }
    geturl(id: number): string {
        return WebapiConfig.geteventpostrurl(id);
    }


    webapiGetPosts(id: number): Observable<PostListModel[]> {
        let headers = this.initAuthHeaders();
        let url = this.geturl(id);

        return this.get(url, null, headers);
    }
}

export function EventPostServiceFactory(http: Http, chttp: HTTP) {
    return new EventPostService(http, chttp);
};