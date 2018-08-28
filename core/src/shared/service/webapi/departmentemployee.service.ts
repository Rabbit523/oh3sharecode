import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { EventConst, WebapiConfig } from '../../config';
import { AuthService } from '../webapi/auth.service';

@Injectable()
export class DepartmentEmployeeService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    getSelectTreeNodesObservable(): Observable<any> {
        var url = WebapiConfig.getemployeetreeurl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
}

export function DepartmentEmployeeServiceFactory(http: Http, chttp: HTTP) {
    return new DepartmentEmployeeService(http, chttp);
};