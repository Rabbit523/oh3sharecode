import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { EventConst, WebapiConfig } from '../../config';
import { PlaceInfo } from '../../models/webapi/geolocation/placeInfo';
import { AuthService } from '../webapi/auth.service';

@Injectable()
export class MapService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    webapiGetMap(latitude: number, longtitude: number): Observable<PlaceInfo> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getApiMapurl(latitude, longtitude);
        let request = this.get(url, null, headers);
        return request;
    }

    GetDistanceKM(lat1: number, lng1: number, lat2: number, lng2: number) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        return s;
    }



}

export function MapServiceFactory(http: Http, chttp: HTTP) {
    return new MapService(http, chttp);
};