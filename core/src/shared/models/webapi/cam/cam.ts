import { CamSettingDto } from "../media/media";
import { IPageResult } from "../ipageresult";

export class CamTimeArea {
    id: number;
    CamId: number;
    DeviceTimeStart: string;
    DeviceTimeEnd: string;
}
export class CamSettingCamTimeArea {
    CamItem: CamSettingDto;
    CamArea: Array<CamTimeArea>;
}

export class CameraSettingDtoJson extends IPageResult<CamSettingDto>{}