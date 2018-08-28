//import { Webapi } from 'oneheart-core';
import { Component, Input } from '@angular/core';
import { ContactorCacheHelper } from 'oneheart-core';
@Component({
  selector: 'eventdetailcreator',
  templateUrl: 'eventdetailcreator.component.html',
})
export class EventDetailCreator {
  @Input()
  set UserId(value: number) {
    this._UserId = value;
    if (value) {
      let item = ContactorCacheHelper.GetContactorById(this._UserId);
      if (item) {
        this.PhoneNo = item.PhoneNo;
        this.CreaterName = item.us_firstname;
        this.CreaterPicurl = item.UserPic;
      }
    }
  }
  get UserId(): number { return this._UserId; }
  _UserId: number = -1;

  CreaterName: string = "";
  PhoneNo: string = "";
  CreaterPicurl: string = "";

  @Input() Id: string = "";
  @Input() ReportedDate: string = "";
  @Input() ItemStatu: string = "";
}