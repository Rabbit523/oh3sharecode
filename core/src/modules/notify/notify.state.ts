import { NotificationDTO,NotificationDTOJson } from "../../shared/models/webapi/notify/notify";

export interface NotifyState { List: NotificationDTOJson, Notify: NotificationDTO }
export let initialNotifyState: NotifyState = { List: new NotificationDTOJson(), Notify: new NotificationDTO() };
