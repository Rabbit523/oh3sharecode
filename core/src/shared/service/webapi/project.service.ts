import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { JsonDictionary } from '../../models/common/jsondictionary';
import { TreeNode } from '../../models/common/treenode';
import { ProjectDto, ProjectDtoJSON,ProjectUserPermissionJSON } from '../../models/webapi/project/project';

@Injectable()
export class ProjectService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }
    
    PostPermissionProjectObservable(pjid: number, usids: string, pType: number): Observable<string> {
        var url = WebapiConfig.getPostPermissionListUrl(pjid, usids, pType);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }

    GetPermissionListObservable(pjid: number, usid: number, pType: number, pindex: number): Observable<ProjectUserPermissionJSON> {
        var url = WebapiConfig.getPermissionListUrl(pjid, usid, pType, 10, pindex);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    GetAllProjectObservable(funcId: number, pindex: number): Observable<ProjectDtoJSON> {
        var url = WebapiConfig.getProjectListUrl(funcId, 10, pindex);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    GetProjectObservable(id: number): Observable<ProjectDto> {
        var url = WebapiConfig.getProjectGetUrl(id);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    GetBarCordNamesObservable(): Observable<JsonDictionary<string>> {
        var url = WebapiConfig.getBarCordNameUrl();
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    PostProjectObservable(project: ProjectDto): Observable<string> {
        let url = WebapiConfig.getProjectSetUrl();
        let headers = this.initAuthHeaders();
        return this.post(url, this.GetCordovaHttpModel(project), headers);
    }

    DeleteProjectObservable(id: number): Observable<string> {
        var url = WebapiConfig.getProjectDelUrl(id);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }

    
}

export function ProjectServiceFactory(http: Http, chttp: HTTP) {
    return new ProjectService(http, chttp);
};