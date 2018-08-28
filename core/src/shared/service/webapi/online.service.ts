import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { AuthService } from '../webapi/auth.service';
import { WebapiConfig } from '../../config';
import { BaseService } from './baseservice';
import { Observable } from 'rxjs/Rx';
import 'rxjs/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class OnLineService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }
    static clock: any = null;
    static GetTestVersion(interval, fn, http, chttp) {
        let r = Math.random();
        let json: any = { "api-version": Math.round(r) + 1, "tmkt": r };
        BaseService.StaticGet(http, chttp, WebapiConfig.gettestvurl(), json, <JSON>{}).catch(e => { return Observable.of("Eor"); }).subscribe(x => {
            fn(x); OnLineService.clock = setTimeout(OnLineService.GetTestVersion, interval, interval, fn, http, chttp);
        });
    }

    startClock(fn, interval) {
        if (OnLineService.clock === null) {
            OnLineService.GetTestVersion(interval, fn, this.http, this.chttp);
        }
    }
    stopClock() {
        if (OnLineService.clock !== null) {
            clearTimeout(OnLineService.clock);
            OnLineService.clock = null;
        }
    }
}
export function OnLineServiceFactory(http: Http, chttp: HTTP) {
    return new OnLineService(http, chttp);
};
