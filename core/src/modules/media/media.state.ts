import { MediaFileUrl, ProtectCamSettingDTO, GrounpMediaFile, MediaFileUrlJSON } from "../../shared/models/webapi/media/media";

export interface MediaState {
    mediaList: MediaFileUrl[],
    ProtectList: ProtectCamSettingDTO,
    PlayList: GrounpMediaFile[],
    PagedList: MediaFileUrlJSON,
}
export let initialMediaState: MediaState = {
    mediaList: new Array<MediaFileUrl>(),
    ProtectList: new ProtectCamSettingDTO(),
    PlayList: new Array<GrounpMediaFile>(),
    PagedList: new MediaFileUrlJSON()
};