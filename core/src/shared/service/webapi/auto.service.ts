import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { WebapiConfig } from '../../config';
import { AuthService } from './auth.service';
import { CameraSettingDtoJson, CamSettingCamTimeArea } from '../../models/webapi/cam/cam';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutoDBService extends AuthService {
    constructor(public http: Http, public transfer: FileTransfer, public chttp: HTTP) {
        super(http, chttp);
    }
    GetCreateIndexAll(us: string, pw: string): Observable<string> {
        return this.get(WebapiConfig.GetCreateIndexAll(us, pw), null, <any>{});
    }

    GetBarCordImg(QrStr: string, size: number, checkbug: boolean = false): Observable<any> {
        return this.get(WebapiConfig.GetBarCordImg(QrStr, size, checkbug), null, <any>{});
    }

    RebuildUserTempNew(): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.RebuildUserTempNew(), null, headers);
    }
    RebuildFunc(id: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.RebuildFunc(id), null, headers);
    }
    RebuildView(id: number): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.RebuildView(id), null, headers);
    }
    ExportAttach(): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.ExportAttach(), null, headers);
    }
    Export(t: string): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.Export(t), null, headers);
    }
    Timeing(Stid: number = 0, usid: number = -1, detail: number = 0): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.Timeing(Stid, usid, detail), null, headers);
    }
    TaskEveryDay(): Observable<string> {
        let headers = this.initAuthHeaders();
        return this.get(WebapiConfig.TaskEveryDay(), null, headers);
    }
}

export function AutoDBServiceFactory(http: Http, transfer: FileTransfer, chttp: HTTP) {
    return new AutoDBService(http, transfer, chttp);
};
