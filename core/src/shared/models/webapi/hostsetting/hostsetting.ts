import { JsonDictionary } from "../../common/jsondictionary";

 export class EventDispalyTitleFields {
    Category: string;
    Priority: string;
    Org: string;
    LastUpdatePeople: string;
    UserDefinedBugAttribute: string;
    ShortDesc: string;
    Project: string;
    Tags: string;
    AssignTo: string;
    Status: string;
    ReportedOrganizition: string;
}

export class EventDispalyTitle extends EventDispalyTitleFields {
    CustomDefind: JsonDictionary<string>;
}