import { ModuleWithProviders, state } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { FileTransfer, FileTransferObject, FileUploadResult, FileTransferError } from '@ionic-native/file-transfer';
import { Observable } from 'rxjs/Observable';
import { EventConst, GlobalActionEnum } from '../../config';
import { Utils } from '../../utils/utils';
import { StaticCache } from '../../staticcache';
import { timeout } from 'rxjs/operator/timeout';
import { map } from 'rxjs/operator/map';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';
//http请求的基础类，所有的http请求都从这里继承，禁止直接使用http.get方法
//从这里先诊断是否网络可用，提交前发送等待信号，完成后提交等待结束信号

export class BaseService {
    constructor(public http: Http, public chttp: HTTP) { }

    AddVersion_GET(searhparameter: JSON, version?: number) { if (version) { searhparameter["api-version"] = version; } }

    AddVersion_POST(_Url: string, version?: number): string { if (version) { if (_Url.indexOf("?") > 0) { _Url += "&"; } else { _Url += "?"; } _Url += "api-version=" + version; } return _Url; }

    initAuthHeaders(b: string = "Bearer"): JSON { return <any>{ "Authorization": b + " " + StaticCache.authservicetoken }; }

    handleError(from: string, error: any): Observable<any> {
        let errmsg = JSON.stringify({ "from": from, "errmsg": error });
        Utils.log(errmsg);
        //{"from":"GetEventlistObservable","errmsg":{"status":1,"error":"The request timed out"}}
        if (error.status == 401)
            return Observable.of({ type: GlobalActionEnum.Events, payload: EventConst.Login_timeOut });        
        else
            return Observable.from([{ type: "handleError", payload: errmsg }, { type: GlobalActionEnum.Events, payload: EventConst.System_Resetwaiting }]);
    }

    handleNoAction(msg?: string): Observable<any> {
        return Observable.of({ type: "handleNoAction", payload: msg ? msg : "" });
    }

    TransferUploadFileEvent(event: ProgressEvent) {

    }
    //http://roblouie.com/article/574/learn-ionic-cordova-file-upload/
    // mobile 文件上传
    uploadStrPathFile(transfer: FileTransfer, filepath: string, url: string, options: any): Promise<string> {
        let fileTransfer: FileTransferObject = transfer.create();
        fileTransfer.onProgress(this.TransferUploadFileEvent);
        return fileTransfer.upload(filepath, url, options).then((data: FileUploadResult) => { Utils.log("uploadStrPathFile", data); return data.response; }, (error: FileTransferError) => { Utils.log("uploadStrPathFile", error); return error.body; });
    }
    // web 文件上传
    uploadObjectFile(Objectfile: any, url: string): Promise<string> {
        var formData = new FormData();
        formData.append("file", Objectfile);
        let headers = this.initAuthHeaders();
        let post$: Observable<any> = this.post(url, formData, headers);
        return this.PostToPromise(post$).then((data: FileUploadResult) => { Utils.log("uploadObjectFile", data); return data.response; }, (error: FileTransferError) => { Utils.log("uploadObjectFile", error); return error.body; });;
    }

    PostToPromise(ob: Observable<any>): Promise<any> {
        return new Promise((resolve, reject) => { let value; ob.subscribe((x) => value = x, (err) => reject(err), () => resolve(value)); });
    }

    GetCordovaHttpModel(model: any): any {
        if (!StaticCache.Config.platformIsMobileWeb) {
            return { "model": JSON.stringify(model) };
        }
        else {
            return model;
        }
    }

    post<TModel>(url: string, body: TModel, headers: JSON): Observable<any> {
        return BaseService.StaticPost(this.http, this.chttp, url, body, headers);
    }
    get(url: string, parameters: JSON, headers: JSON): Observable<any> {
        return BaseService.StaticGet(this.http, this.chttp, url, parameters, headers);
    }
    static StaticPost<TModel>(http: Http, chttp: HTTP, url: string, body: TModel, headers: JSON): Observable<any> {
        let request: Observable<any>;
        if (!body) { body = <TModel>{}; }
        if (!StaticCache.Config.platformIsMobileWeb) {
            request = Observable.fromPromise(chttp.post(url, body, headers)).map((response: any) => { return JSON.parse(response.data); });
        }
        else {
            let newheaders = Utils.JsonToHeaders(headers);
            request = http.post(url, body, { headers: newheaders }).map(response => { return response.json(); });
        }
        return request;//.timeout(3000);
    }
    static StaticGet(http: Http, chttp: HTTP, url: string, parameters: JSON, headers: JSON): Observable<any> {
        if (!headers["Content-Type"]) { headers["Content-Type"] = "application/json; charset=UTF-8"; }
        let request: Observable<any>;
        if (!parameters) { parameters = <JSON>{} }
        if (!StaticCache.Config.platformIsMobileWeb) {
            request = Observable.fromPromise(chttp.get(url, parameters, headers)).map((response: any) => { return JSON.parse(response.data) });
        }
        else {
            let newheader = Utils.JsonToHeaders(headers);
            let newParams = Utils.JsonToUrlString(parameters);
            request = http.get(url, { headers: newheader, search: newParams }).map(response => { return response.json(); });
        }
        return request;//.timeout(3000);
    }
}

export function BaseServiceFactory(http: Http, chttp: HTTP) {
    return new BaseService(http, chttp);
};
