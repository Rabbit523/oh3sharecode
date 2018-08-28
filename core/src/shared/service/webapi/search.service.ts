import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { WebapiConfig } from '../../config';
import { AuthService } from '../webapi/auth.service';

@Injectable()
export class SearchService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    webapiGetSearchText(text:string,page: number, size: number): Observable<any> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getSearchUrl(page,size,text);
        let request = this.get(url, null, headers);
        return request;
    }

}

export function SearchServiceFactory(http: Http, chttp: HTTP) {
    return new SearchService(http, chttp);
};