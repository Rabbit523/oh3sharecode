import { BugDtoModel, Utils, ContactorPhone, StaticCache } from 'oneheart-core';

export class EventListItemBase {
  setitem(value: BugDtoModel) {
    this._item = value;
    this.CreateLastName = Utils.getLastCharactors(this._item.us_firstname_reported, 4);
    this.itemBgReportedUser = StaticCache.Webapiusers.userIdDic[value.bg_reported_user]
  }
  _item: BugDtoModel;
  CreateLastName: string = "";
  itemBgReportedUser: ContactorPhone;
}