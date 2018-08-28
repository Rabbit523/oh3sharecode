import { OrgDto,OrganizationDtoJSON } from "../../shared/models/webapi/org/orgdto";
export interface ORGState { List:OrganizationDtoJSON, Org: OrgDto}
export let initialORGState: ORGState = { List:new OrganizationDtoJSON(), Org:new OrgDto()};
