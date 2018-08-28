import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

import { EventConst, WebapiConfig } from '../../config';
import { MediaFileUrl,GrounpMediaFile,ProtectCamSettingDTO, MediaFileUrlJSON } from '../../models/webapi/media/media';
import { AuthService } from '../webapi/auth.service';
import { IPageResult } from '../../models/webapi/ipageresult';

@Injectable()
export class MediaService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) {
        super(http, chttp);
    }
    GetList(active: boolean): Observable<MediaFileUrl[]> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getMediaListurl(active);
        let request = this.get(url, null, headers);
        return request;
    }
    GetProtects(camId: number): Observable<ProtectCamSettingDTO> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getMediaProtectsurl(camId);
        let request = this.get(url, null, headers);
        return request;
    }
    GetShowPlayList(placeid: number, isActive: boolean, day: string): Observable<GrounpMediaFile[]> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getMediaShowPlayListurl(placeid, isActive, day);
        let request = this.get(url, null, headers);
        return request;
    }
    GetStaticPagedList(pIndex: number, pSize: number, sCam: number, cStDate: string, cEndDate: string): Observable<MediaFileUrlJSON> {
        let headers = this.initAuthHeaders();
        let url = WebapiConfig.getStaticPagedListurl(pIndex, pSize,sCam,cStDate,cEndDate);
        let request = this.get(url, null, headers);
        return request;
    }
}

export function MediaServiceFactory(http: Http, chttp: HTTP) {
    return new MediaService(http, chttp);
};