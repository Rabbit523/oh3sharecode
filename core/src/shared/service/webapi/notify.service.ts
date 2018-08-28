import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { WebapiConfig } from '../../config/webapiconfig';
import { AuthService } from './auth.service';
import { NotificationDTO, NotificationDTOJson} from '../../models/webapi/notify/notify';

@Injectable()
export class NotifyService extends AuthService {
    constructor(public http: Http, public chttp: HTTP) { super(http, chttp); }

    GetAllNotifyObservable(flag:string,filter:string,pindex: number): Observable<NotificationDTOJson> {
        var url = WebapiConfig.GetNotifyGetUrl(flag,filter, pindex,10);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    GetNotifyObservable(id: number): Observable<NotificationDTO> {
        var url = WebapiConfig.GetNotifyDetailUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }

    PostNotifyObservable(id:number): Observable<string> {
        let url = WebapiConfig.PostNotifyUrl(id);
        let headers = this.initAuthHeaders();
        let request = this.post(url, null, headers);
        return request;
    }    

}

export function NotifyServiceFactory(http: Http, chttp: HTTP) {
    return new NotifyService(http, chttp);
};