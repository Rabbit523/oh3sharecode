import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { SelfDefineFunctions,SelfDefineFunctionsJSON } from '../../models/webapi/function/function';

@Injectable()
export class FunctionService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllFunctionObservable(): Observable<SelfDefineFunctionsJSON> {
        var url = WebapiConfig.getFunctionListUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
    GetFuncPageNameDicObservable(): Observable<JSON> {
        let url = WebapiConfig.getFuncPageNameDicUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetFunctionbservable(id: number): Observable<SelfDefineFunctions> {
        var url = WebapiConfig.getFunctionGetUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostFunctionObservable(func: SelfDefineFunctions): Observable<string> {
        let url = WebapiConfig.getFunctionSetUrl();
        let headers = this.initAuthHeaders();
        let request = this.post(url, this.GetCordovaHttpModel(func), headers);
        return request;
    }

    
}

export function FunctionServiceFactory(http: Http, chttp: HTTP) {
    return new FunctionService(http, chttp);
};