import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { WebapiConfig } from '../../config';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ContactorJson } from '../../models/webapi/contactor/contactorperson';
import { BugUserDtoModel } from '../../models/webapi/mytractor/buguserdtomodel';

@Injectable()
export class ContactorService extends AuthService {
    constructor(public http: Http, public transfer: FileTransfer, public chttp: HTTP) {
        super(http, chttp);
    }
    PostUserPic(loginName: string, filepath: any): Promise<string> {
        if (typeof filepath === "string") {
            let headers = this.initAuthHeaders();
            var options: FileUploadOptions = { fileKey: 'file', fileName: loginName + ".png", httpMethod: "post", headers: headers, chunkedMode: false };
            return this.uploadStrPathFile(this.transfer, filepath, WebapiConfig.getpostuserpicurl(loginName), options);
        }
        else
            return this.uploadObjectFile(filepath, WebapiConfig.getpostuserpicurl(loginName));
    }
    getContactorJsonObservable(): Observable<ContactorJson> {
        var url = WebapiConfig.getcontactorurl(true);
        let headers = this.initAuthHeaders();
        let request = this.get(url, null, headers);
        return request;
    }
}

export function ContactorServiceFactory(http: Http, transfer: FileTransfer, chttp: HTTP) {
    return new ContactorService(http, transfer, chttp);
};
