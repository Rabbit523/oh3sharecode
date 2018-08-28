import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { EventConst,  WebapiConfig } from '../../config';
import { TreeNode } from '../../models/common';
import { IntKeyValue } from '../../models/common/keyvalue';
import { AuthService } from '../webapi/auth.service';
import { StatusDto } from '../../models/webapi/status/status';



@Injectable()
export class SelectItemService extends AuthService {

    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }

    GetObservableCategoryEnum(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getcategoryenumurl());
    }

    GetObservableFunctionTypes(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getFunctionTypesUrl());
    }

    GetObservableProjects(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getProjectsUrl());
    }
    GetObservableFlags(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getFlagsUrl());
    }

    GetObservableStatuss(): Observable<StatusDto[]> {
        return this._GetFromUrl(WebapiConfig.getStatussUrl());
    }

    GetObservablePrioritys(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getPrioritysUrl());
    }

    GetObservableCategorys(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getCategorysUrl());
    }

    GetObservableUsers(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getUsersUrl());
    }

    GetObservableOrganizations(): Observable<IntKeyValue[]> {
        return this._GetFromUrl(WebapiConfig.getOrganizationsUrl());
    }

    GetObservableAllFields(): Observable<TreeNode[]> {
        var url = WebapiConfig.getAllFieldsUrl();
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    private _GetFromUrl(url: string): Observable<any[]> {
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
}

export function SelectItemServiceFactory(http: Http, chttp: HTTP) {
    return new SelectItemService(http, chttp);
};