import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { WebapiConfig } from '../../config';
import { AuthService } from './auth.service';
import { CameraSettingDtoJson, CamSettingCamTimeArea } from '../../models/webapi/cam/cam';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CamDBService extends AuthService {
    constructor(public http: Http, public transfer: FileTransfer, public chttp: HTTP) {
        super(http, chttp);
    }
    GetCamDBGetUrl(ogCat: string, pIndex: number, pSize: number): Observable<CameraSettingDtoJson> {
        var url = WebapiConfig.GetCamDBGetUrl(ogCat, pIndex, pSize);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    GetCamUrl(id: number): Observable<CamSettingCamTimeArea> {
        var url = WebapiConfig.GetCamUrl(id);
        let headers = this.initAuthHeaders();
        return this.get(url, null, headers);
    }
    PostCamSettingUrl(): Observable<string> {
        var url = WebapiConfig.PostCamSettingUrl();
        let headers = this.initAuthHeaders();
        return this.post(url, this.GetCordovaHttpModel({}), headers);
    }
}

export function CamDBServiceFactory(http: Http, transfer: FileTransfer, chttp: HTTP) {
    return new CamDBService(http, transfer, chttp);
};
