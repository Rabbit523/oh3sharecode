import { IPageResult } from '../ipageresult';
export class GrounpMediaFile {
    constructor() {
        this.Items = new Array<MediaFile>();
        this.bp_PostDateTime = "";//new Date(-8640000000000000+1);
    }
    bg_short_desc: string;
    ThumbFileName: string;
    GroupTime: string;
    bp_PostDateTime: string;
    Items: Array<MediaFile>;
}

export class MediaFile {
    Id: number;
    BgId: number;
    CamId: number;
    bg_short_desc: string;
    bg_tags: string;
    Organization: string;
    bg_reported_date: string;
    bg_last_updated_date: string;
    bp_PostDateTime: string;
    FileName: string;
    ThumbFileName: string;
    rtmpadd: string;
    IsActive: boolean;
}

export class MediaFileUrl extends MediaFile {
    DeviceIP: string;
    DevicePort: string;
    DeviceUser: string;
    DevicePass: string;
}
export class CamSetting {
    id: number;
    CamId: number;
    MediaFileSize: number;
    NewEventIntervalTimeMin: number;
    DeviceOrganization: number;
    DeviceCategory: string;
    DeviceIP: string;
    DevicePort: number;
    DeviceRecordType: number;
    DeviceEventCategory: number;
    DeviceEventPriority: number;
    DeviceEventStatus: number;
    DeviceEventAssigned: number;
    DeviceEventUdf: number;
    DeviceEventIdentityId: number;
    DeviceEventActionType: number;
    DeviceEventProject: number;
    DeviceUser: string;
    DevicePass: string;
    DeviceRTMP: string;
    DeviceGroup: string;
}

export class CamSettingDto extends CamSetting {
    og_name: string;
    DeviceUrl: string;
    TimeArea: string;
}

export class ProtectCamSettingDTO {
    items: Array<CamSettingDto>;
    audios: string[];
    commands: string[];
}

export class MediaFileUrlJSON extends IPageResult<MediaFileUrl>{}