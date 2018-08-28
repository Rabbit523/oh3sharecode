import { EventDispalyTitle } from "../../shared/models/webapi/hostsetting/hostsetting";

export interface HostSettingState { Names: EventDispalyTitle, Mobile: string, Pc: string }

export let initialHostSettingState: HostSettingState = { Names: new EventDispalyTitle(), Mobile: "", Pc: "" };
