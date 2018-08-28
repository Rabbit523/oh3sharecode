import { PriorityDtoJSON, PriorityDto } from "../../shared/models/webapi/priority/priority";

export interface PriorityState { List: PriorityDtoJSON, Priority: PriorityDto }
export let initialPriorityState: PriorityState = { List: new PriorityDtoJSON(), Priority: new PriorityDto() };
