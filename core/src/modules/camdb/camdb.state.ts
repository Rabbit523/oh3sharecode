import { CameraSettingDtoJson, CamSettingCamTimeArea } from "../../shared/models/webapi/cam/cam";
export interface CameraSettingDtoState { List: CameraSettingDtoJson, CamSetting: CamSettingCamTimeArea }
export let initialCameraSettingDtoState: CameraSettingDtoState = { List: new CameraSettingDtoJson(), CamSetting: new CamSettingCamTimeArea() };
