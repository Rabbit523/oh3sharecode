import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { JsonDictionary } from '../../models/common/jsondictionary';
import { BaseService } from './baseservice';

@Injectable()
export class ChcpversionService extends BaseService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    _initCommonHeaders(CrossOrigin?: boolean): JSON {
        var headers: any = { "Content-Type": "text/html;charset=UTF-8" };
        if (CrossOrigin) { headers = Object.assign({}, headers, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' }) }
        return headers;
    }
    ProcessChcp(configFile: string): Observable<JsonDictionary<string>> {
        let request = this.get(configFile, null, this._initCommonHeaders());
        return request;
    }
}

export function ChcpversionServiceFactory(http: Http, chttp: HTTP) {
    return new ChcpversionService(http, chttp);
};