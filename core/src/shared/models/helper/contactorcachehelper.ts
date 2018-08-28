import { ContactorPhone } from '../../models/webapi/contactor/contactorperson';
import { MyNewPostCommentWithNamePic, MyNewPostComment } from "../../models/webapi/eventpost/postlistmodel";
import { StaticCache } from '../../../shared/staticcache';

export class ContactorCacheHelper {
    static toMyNewPostCommentWithNamePics(response: MyNewPostComment[]) {
        let comments = [];
        let nItem;
        response.forEach(x => {
            nItem = new MyNewPostCommentWithNamePic(x);
            let item = this.GetContactorById(x.bp_user);
            if (item) {
                nItem.PersonLastName = item.us_firstname || item.us_username;
                nItem.PersonPicurl = item.UserPic;
            }
            comments.push(nItem);
        });
        return comments;
    }
    static GetContactorById(userid: number): ContactorPhone {
        let item = StaticCache.Webapiusers.userIdDic[userid.toString()];//.getValue(userid);
        return item;
    }
    static GetContactorByName(username: string): ContactorPhone {
        let item = StaticCache.Webapiusers.usernameDic[username];//.getValue(userid);
        return item;
    }
    static GetPhoneNoBy(userid: number): string {
        let result = "";
        let item = this.GetContactorById(userid);
        if (item) {
            result = item.PhoneNo;
        }
        return result;
    }
}