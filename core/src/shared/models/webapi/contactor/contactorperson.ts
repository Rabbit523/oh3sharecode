import { JsonDictionary } from "../../../../shared/models/common";
import { ContactorHelper } from "./contactordictionary";

export class ContactorPerson {
    us_id: number;
    us_admin: number;
    us_username: string;
    us_firstname: string;
    us_lastname: string;
    us_email: string;
    IsHead: boolean;
    og_name: string;
    UserPic: string;
}
export class ContactorOrg {
    orgKeyName: string;
    orgList: ContactorPerson[];
}

export class ContactorJson {
    Items: ContactorOrg[];
    NextPageLink: string;
    Count: number;
}
export class ContactorPhone extends ContactorPerson {
    PhoneNo: string;
    constructor(item: ContactorPerson) {
        super();
        this.us_id = item.us_id;
        this.us_admin = item.us_admin;
        this.us_username = item.us_username;
        this.us_firstname = item.us_firstname;
        this.us_lastname = item.us_lastname;
        this.us_email = item.us_email;
        this.IsHead = item.IsHead;
        this.og_name = item.og_name;
        this.UserPic = item.UserPic;
        this.PhoneNo = ContactorHelper.getphoneno(this);

    }
}
export class ContactorState {
    userIdDic: JsonDictionary<ContactorPhone>;
    usernameDic: JsonDictionary<ContactorPhone>;
}