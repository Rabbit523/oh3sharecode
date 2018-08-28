import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { EventConst, WebapiConfig } from '../../config';
import { IntKeyValue, StringKeyValue } from '../../models/common/keyvalue';
import { AuthService } from '../webapi/auth.service';
import { ChartDataArray } from '../../models/webapi/chart/chartdataArray';

@Injectable()
export class ChartCalcService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetBCDataJsonStrUrlObservable(searhparameter: JSON): Observable<string> {
        let headers = this.initAuthHeaders();
        let request = this.get(WebapiConfig.getBCDataJsonStrUrl(), searhparameter, headers);
        return request;
    }
  
    //黑桃是大卫王，梅花是亚历山大大帝，红桃是查理大帝，方块是凯撒大帝
    GetChartListObservable(type1: string, type2: string, searhparameter: JSON): Observable<Array<ChartDataArray>> {
        let headers = this.initAuthHeaders();
        let request = this.get(WebapiConfig.getchartlisturl(type1, type2), searhparameter, headers);
        return request;
    }
  
    GetChartCalcSelector(): Observable<StringKeyValue[]> {
        let url = WebapiConfig.getChartCalcSelectorUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

}

export function ChartCalcServiceFactory(http: Http, chttp: HTTP) {
    return new ChartCalcService(http, chttp);
};