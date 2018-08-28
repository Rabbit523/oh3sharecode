import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { SelfDefineFieldDto, SelfDefineFieldDtoJSON } from '../../models/webapi/funcfields/fieldsdto';
import { SelectListItemModel } from '../../models/webapi/eventdetail/dropdownjson';

@Injectable()
export class FuncFieldsService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetFuncfieldsListObservable(funcId: number, pIndex: number, psize: number): Observable<SelfDefineFieldDtoJSON> {
        var url = WebapiConfig.getFuncfieldsListUrl(funcId, pIndex, psize);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
    GetFieldTypeNamesUrlObservable(): Observable<JSON> {
        let url = WebapiConfig.getFieldTypeNamesUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
    GetFuncFieldStatusObservable(fucid: number): Observable<SelectListItemModel[]> {
        let url = WebapiConfig.getFuncFieldStatusUrl(fucid);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetFuncfieldsGetObservable(id: number): Observable<SelfDefineFieldDto> {
        var url = WebapiConfig.getFuncfieldsGetUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostFuncfieldsObservable(func: SelfDefineFieldDto): Observable<string> {
        let url = WebapiConfig.getFuncfieldsSetUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(func), headers);
        return request;
    }


}

export function FuncFieldsServiceFactory(http: Http, chttp: HTTP) {
    return new FuncFieldsService(http, chttp);
};