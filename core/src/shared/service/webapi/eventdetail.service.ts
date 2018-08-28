import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { Observable } from 'rxjs/Observable';
import { EventConst, WebapiConfig } from '../../config';
import { Utils } from '../../utils/utils';
import { StaticCache } from '../../staticcache';
import { AllTasksModel, EventDetailJson, BugTaskBaseModel } from '../../models/webapi/eventdetail/eventdetailjson';
import { DropDownJson } from '../../models/webapi/eventdetail/dropdownjson';
import { CustomDropdownDefineModel } from '../../models/webapi/eventdetail/customdropdowndefine';
import { BugTaskViewJson } from '../../models/webapi/task/bugtaskviewjson';
import { CommandState } from '../../models/webapi/workflow/commandstate';
import { BugUserDtoModel } from '../../models/webapi/mytractor/buguserdtomodel';
import { KeyValuePair } from '../../models/common/keyvalue';
import { AuthService } from './auth.service';
import { BaseService } from './baseservice';

@Injectable()
export class EventDetailService extends AuthService {
    constructor(public http: Http, public transfer: FileTransfer, public chttp: HTTP) {
        super(http, chttp);
    }

    GetEventDetail(id: number): Observable<EventDetailJson> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.geteventdetailrurl(id);
        return this.get(url, null, headers);
    }

    GetBugUserDtoS(id: number, usid: number): Observable<BugUserDtoModel[]> {
        return this.get(WebapiConfig.GetBugUserDtoS(id, usid), null, this.initAuthHeaders());
    }

    SetNote(id: number): Observable<any> {
        return this.get(WebapiConfig.SetBugNote(id), <JSON>{}, this.initAuthHeaders());
    }

    SetExtendSubTable(bgId: number, fid: number, dataStr: string): Observable<any> {
        return this.get(WebapiConfig.SetExtendSubTable(bgId, fid, dataStr), <JSON>{}, this.initAuthHeaders());
    }

    webApiGetCategoryKVDefine(pjid: number): Observable<CustomDropdownDefineModel[]> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getcategorykvdefineurl(pjid);
        return this.get(url, null, headers);
    }

    webapiGetDropdownChange(pid: number, oid: number, bid: number, aid: number): Observable<DropDownJson> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getdropdownchangerurl(pid, oid, bid, aid);
        return this.get(url, null, headers);
    }

    SetChecked(id: number, st: boolean): Observable<string> {
        let url = WebapiConfig.getsetcheckedurl(id, st);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    GetBugTask(bId: number, tId: number, fId: number): Observable<BugTaskViewJson> {
        let url = WebapiConfig.Getbugtaskurl(bId, tId, fId);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    GetAllBugTasks(bId: number): Observable<AllTasksModel> {
        let url = WebapiConfig.GetBugTasksurl(bId);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }

    DeleteBugTask(tId: number): Observable<string> {
        let url = WebapiConfig.getdeletebugtaskfileurl(tId);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }

    TaskComplate(tId: number): Observable<string> {
        let url = WebapiConfig.gettaskcomplateurl(tId);
        let headers = this.initAuthHeaders();
        return this.post(url, null, headers);
    }

    SaveBugTask(item: BugTaskBaseModel, fieldId: string): Observable<string> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getsavebugtaskurl(fieldId);
        return this.post(url, this.GetCordovaHttpModel(item), headers);
    }

    loadworkflow(bgid: number, actid: number): Observable<CommandState> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getcommandstateurl(bgid, actid);
        return this.get(url, null, headers);
    }
    DeleteBug(bgid: number, delOrNot: boolean): Observable<KeyValuePair<string,string>> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getdeletebugurl(bgid, delOrNot);
        return this.get(url, null, headers);
    }
    executeworkflow(bgid: number, comKey: string, updateUser: boolean): Observable<string> {
        let key = encodeURI(comKey);
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getexecuteandupdateurl(bgid, key, updateUser);
        return this.get(url, null, headers);
    }
    SetStatus(bgid: number, stid: string): Observable<boolean> {
        let key = encodeURI(stid);
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getsetstatusurl(bgid, key);
        return this.post(url, null, headers);
    }
    UpdataACoustomDetail(CustomId: number, CustomStr: string): Observable<any> {
        let key = encodeURI(CustomStr);
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getUpdataACoustomDetailurl(CustomId, key);
        return this.post(url, null, headers);
    }

    // 取消异步 改成回调
    webapiPostEdit(file: string[] | object[], model: EventDetailJson): Promise<string> {
        var CreateOrEdit: boolean = model.Item.id > 0;
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.geteditposturl();
        return this.PostToPromise(this.post(url, this.GetCordovaHttpModel(model), headers))
            .then(jsonstr => {
                if (file && file.length > 0) {
                    return this._uploadFiles(file, jsonstr.id).then(complete => {
                        if (EventConst.Event_UpdatePostTimeout != complete)
                            return CreateOrEdit ? EventConst.Event_BugItemUpdated : EventConst.Event_BugItemCreated;
                        else
                            return complete;
                    });
                } else {
                    return CreateOrEdit ? EventConst.Event_BugItemUpdated : EventConst.Event_BugItemCreated;
                }
            }
                , a => { this.handleError("webapiPostEdit", a); return ""; });
    }



    // 取消异步 改成回调
    uploadComment(id: number, file: string[] | object[], comment: string, contentType: string): Promise<string> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getpostcommenturl();
        if (comment) {
            let _data: any = { "Bgid": id, "Comment": comment, "ContentType": contentType, "Files": {} };
            return this.PostToPromise(this.post(url, this.GetCordovaHttpModel(_data), headers)).then(
                jsonstr => {
                    if (jsonstr === "" && file && file.length > 0) { return this._uploadFiles(file, id); }
                    return EventConst.Event_NewCommentPosted;
                },
                err => { this.handleError("uploadComment", err); return ""; });
        }
        else {
            if (file && file.length > 0) {
                return this._uploadFiles(file, id);
            }
        }
    }

    static eventdetailservicestate: Array<boolean> = new Array<boolean>();

    _uploadFiles(file: string[] | object[], bgid: number): Promise<string> {
        EventDetailService.eventdetailservicestate = new Array<boolean>();
        let PromiseList: Array<Promise<string>> = [];
        let url = WebapiConfig.geteditpostfileurl(bgid);
        for (var i = 0; i < file.length; i++) {
            EventDetailService.eventdetailservicestate.push(false);
            if (typeof file[i] === "string") {
                var options: FileUploadOptions = { fileKey: 'file', fileName: Utils.getFileName(file[i] as string), httpMethod: "post", headers: this.initAuthHeaders(), chunkedMode: false };
                PromiseList.push(this.uploadStrPathFile(this.transfer, file[i] as string, url, options));
            }
            else {
                PromiseList.push(this.uploadObjectFile(file[i] as object, url));
            }
        }
        return new Promise((reslove, reject) => {
            Promise.all(PromiseList).then((data: string[]) => {
                let allretrun = false;
                data.forEach((adata: string) => { allretrun = allretrun && (adata as string).replace(/"/g, "") == "OK"; })
                reslove(allretrun ? EventConst.Event_NewCommentPosted : EventConst.Event_UpdatePostTimeout);
            }).catch((error) => { reject(EventConst.Event_UpdatePostTimeout); });
        })
    }
}


export function EventDetailServiceFactory(http: Http, transferObject: FileTransfer, chttp: HTTP) {
    return new EventDetailService(http, transferObject, chttp);
};