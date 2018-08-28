import { Component, Input } from '@angular/core';
import { Utils } from 'oneheart-core';
import { WebapiConfig } from 'oneheart-core';
import { ContactorCacheHelper } from 'oneheart-core';

@Component({
  selector: 'contactorcomponent',
  templateUrl: 'contactorcomponent.html'
})
export class ContactorComponent {

  @Input()
  CreateUserName: string = "";
  @Input()
  Description: string = "";
  @Input()
  RightLabelText: string = "";

  PhoneNo: string = "";
  @Input()
  set UserId(value: number) {
    this._UserId = value;
    this.PhoneNo = ContactorCacheHelper.GetPhoneNoBy(value);
  }
  get UserId(): number { return this._UserId; }
  _UserId: number = -1;


  HasCreaterPicurl: boolean = false;
  @Input()
  set CreaterPicurl(value: string) {
    this.HasCreaterPicurl = ((value != null) && (value != ""));
    if (this.HasCreaterPicurl) {
      this._CreaterPicurl = WebapiConfig.geturl( value);
    }
  }
  get CreaterPicurl(): string { return this._CreaterPicurl; }
  _CreaterPicurl: string = "";



  CreaterLastName: string = "";
  @Input()
  set CreaterName(value: string) {
    this._CreaterName = value;
    this.CreaterLastName = Utils.getLastCharactors(this._CreaterName, 4);
  }
  get CreaterName(): string { return this._CreaterName; }
  _CreaterName: string = "";



}
