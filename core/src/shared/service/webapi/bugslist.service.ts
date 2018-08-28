import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { EventConst, WebapiConfig } from '../../config';
import { AuthService } from '../webapi/auth.service';
import { EventListJson, BugQueryDto } from '../../models/webapi/eventlist/eventlistjson';

@Injectable()
export class BugsListService extends AuthService {

    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }
    GetExtTODOObservable(index: number, size: number, fielslabel: string, fid: number, st: string): Observable<any> {
        let headers = this.initAuthHeaders();
        let request = this.get(WebapiConfig.getEXTTODOListurl(index, size, encodeURI(fielslabel), fid, encodeURI(st)), null, headers);
        let cacheKey = WebapiConfig.getTODOListurl(index, size)
        let delayType = 'all';
        return request;
    }
    GetTODOObservable(index: number, size: number): Observable<any> {
        let headers = this.initAuthHeaders();
        let request = this.get(WebapiConfig.getTODOListurl(index, size), null, headers);
        return request;
    }
    
    GetEventCountObservable(searhparameter: JSON): Observable<number> {
        let headers = this.initAuthHeaders();
        let request = this.get(WebapiConfig.getEventCountUrl(), searhparameter, headers);
        return request;
    }

    GetEventlistObservable(searhparameter: JSON): Observable<EventListJson> {
        let headers = this.initAuthHeaders();
        let request = this.get(WebapiConfig.getEventlistUrl(), searhparameter, headers);
        return request;
    }

    
}

export function BugsListServiceFactory(http: Http, chttp: HTTP) {
    return new BugsListService(http, chttp);
};
