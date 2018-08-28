import { StatusDtoJSON, StatusDto } from "../../shared/models/webapi/status/status";

export interface StatusState { List: StatusDtoJSON, Status: StatusDto }
export let initialStatusState: StatusState = { List: new StatusDtoJSON(), Status: new StatusDto() };
