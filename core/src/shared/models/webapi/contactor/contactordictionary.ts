import { ContactorJson, ContactorPhone, ContactorPerson, ContactorState } from './contactorperson';
import { JsonDictionary, JsonDictionaryHelper } from "../../../../shared/models/common";
import { PostItemShow } from '../eventpost/postlistmodel';
import { Utils } from '../../../utils/utils';

export class ContactorHelper {
    static getphoneno(person: ContactorPerson): string {
        var result: string = "";
        if (Utils.IsAPhoneNumber(person.us_username)) {
            result = person.us_username;
        }
        else {
            result = Utils.GetPhoneNumberFromEmail(person.us_email);
        }

        return result;
    }
    static setUserId(result: PostItemShow, value: number, Webapiusers: ContactorState) {
        result.personid = value;
        let item = Webapiusers.userIdDic[value];
        if (item) {
            result.PersonPhone = item.PhoneNo;
            result.PersonPicurl = item.UserPic;
        }
    }
    static getContactorPerson(Webapiusers: ContactorState, UserId: number): ContactorPerson {
        let item = Webapiusers.userIdDic[UserId];
        return item;
    }

    static contactorToDictionaries(contactors: ContactorJson): ContactorState {
        var userIdDic = new JsonDictionary<ContactorPhone>();
        var usernameDic = new JsonDictionary<ContactorPhone>();
        contactors.Items.forEach(item => {
            item.orgList.forEach(user => {
                JsonDictionaryHelper.SetAParameter(userIdDic, user.us_id.toString(), new ContactorPhone(user));
                JsonDictionaryHelper.SetAParameter(usernameDic, user.us_username, new ContactorPhone(user))
            })
        });
        let Webapiusers = <ContactorState>{ userIdDic: userIdDic, usernameDic: usernameDic };
        return Webapiusers;
    }
}