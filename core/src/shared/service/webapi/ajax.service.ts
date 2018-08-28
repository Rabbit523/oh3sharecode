import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config';
import { AuthService } from './auth.service';
import { CameraSettingDtoJson, CamSettingCamTimeArea } from '../../models/webapi/cam/cam';
import { TreeViewModel, PythonPostModel } from '../../models/webapi/autoajax/apimodel';
import { IntKeyValue } from '../../models/common/keyvalue';
import { JsonDictionary } from '../../models/common/jsondictionary';


@Injectable()
export class AjaxDBService extends AuthService {
    constructor(public http: Http, public transfer: FileTransfer, public chttp: HTTP) {
        super(http, chttp);
    }
    
    PostEvent(item: PythonPostModel): Observable<number> {
        return this.post(WebapiConfig.PostEvent(),  this.GetCordovaHttpModel(item), <any>{});
    }
    PostFile(id: number, user: string, pass: string, deviceid: string, file: string | Blob): Observable<string> {
        let headers = this._formPostHeader();
        let fd = new FormData();
        fd.append("u", user);
        fd.append("p", pass);
        fd.append("d", deviceid);
        fd.append("files", file);
        return this.post(WebapiConfig.PostFile(id), fd, headers);
    }
    ViewThumb(bugid: number,size:number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.ViewThumb(bugid,size), null, headers);
    }
    SelectFeildsFromTree(callBack: string, selectIds: string, fuctype: number): Observable<TreeViewModel> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.SelectFeildsFromTree(callBack, selectIds, fuctype), null, headers);
    }
    
    AllProjectTree(callBack: string, ids: string, title: string): Observable<TreeViewModel> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.AllProjectTree(callBack, ids, title), null, headers);
    }
    SelectAllFromTree(callBack: string, type: string, fill: string, selval: string = ""): Observable<TreeViewModel> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.SelectAllFromTree(callBack, type, fill, selval), null, headers);
    }
    SelectAssignToFromTree(projectSelect: number, orgSelect: number, callBack: string, bugid: number, selectIds: string = ""): Observable<TreeViewModel> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.SelectAssignToFromTree(projectSelect, orgSelect, callBack, bugid, selectIds), null, headers);
    }
    SelfAutoSubScribersTree(callBack: string, title: string, ids: string, usid: number): Observable<TreeViewModel> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.SelfAutoSubScribersTree(callBack, title, ids, usid), null, headers);
    }
    GetProjectPermissionBy(projectid: number, usid: number, permissionType: number): Observable<string[]> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.GetProjectPermissionBy(projectid, usid, permissionType), null, headers);
    }
    GetBugKeyWords(bugId: number): Observable<JsonDictionary<number>> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.GetBugKeyWords(bugId), null, headers);
    }
    GetMeetingExsit(id: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.GetMeetingExsit(id), null, headers);
    }
    EndMeeting(id: number, bgid: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.EndMeeting(id, bgid), null, headers);
    }
    RebuildMeeting(id: number, postId: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.RebuildMeeting(id, postId), null, headers);
    }
    GoToMeeting(id: number, bgid: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.GoToMeeting(id, bgid), null, headers);
    }
    GetPlayBlack(id: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.GetPlayBlack(id), null, headers);
    }
    CloseMasterDetails(id: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.CloseMasterDetails(id), null, headers);
    }
    DeleteComment(id: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.DeleteComment(id), null, headers);
    }
}

export function AjaxDBServiceFactory(http: Http, transfer: FileTransfer, chttp: HTTP) {
    return new AjaxDBService(http, transfer, chttp);
};
