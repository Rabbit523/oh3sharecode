import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { WebapiConfig } from '../../config';
import { Category,CategoryNameDto, CategorySearch } from '../..//models/webapi/category/category';
import { AuthService } from './auth.service';

@Injectable()
export class CategoryService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    GetObservableCategories(search: CategorySearch): Observable<CategoryNameDto[]> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getApiCategoriesurl(search.action, search.bindtype, search.bindId, search.useExt);
        let request = this.get(url, null, headers);
        return request;
    }
    GetCategory(id: number): Observable<Category> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getApiCategoryurl(id);
        return this.get(url, null, headers);
    }

    InsertUpdate(model: Category): Observable<string> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getApiCategoryInsertUpdateurl();
        return this.post(url, this.GetCordovaHttpModel(model) , headers);
    }

    Delete(id: number): Observable<boolean> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getApiCategoryDeleteurl(id);
        return this.post(url, null, headers);
    }
}

export function CategoryServiceFactory(http: Http, chttp: HTTP) {
    return new CategoryService(http, chttp);
};