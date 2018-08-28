import { ContactorPhone } from 'oneheart-core';
import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from './popover';

@Component({
  selector: 'creatorpiccomponent',
  templateUrl: 'creatorpiccomponent.html'
})
export class CreatorPicComponent {

  constructor(public photoViewer: PhotoViewer, public popoverCtrl: PopoverController) { }
  CreaterName: string;
  CreaterPicurl: string;
  PhoneNo: string;

  @Input()
  set UserItem(value: ContactorPhone) {
    this._Item = value;
    this.PhoneNo = this._Item.PhoneNo;
    this.CreaterName = this._Item.us_username;
    this.CreaterPicurl = this._Item.UserPic;
  }
  get UserItem() { return this._Item; }
  _Item: ContactorPhone;

  @Input()
  ThumbPicurl: string = "";
  @Input()
  CreateDate: string = "";


  @Input() imageclass: string = "";
  @Input() sourcesrc: string = "";
  public waiting = false;  //图片等待
  picClick() {
    var url = this.ThumbPicurl;
    this.photoViewer.show(encodeURI(url), this._getPicName(url));
  }
  _getPicName(filePath: string): string {
    var name = filePath;
    if (filePath.lastIndexOf("/") > 0)
      name = filePath.substr(filePath.lastIndexOf("/") + 1);
    return name;
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {}, { cssClass: 'myPopover' });
    popover.present({
      ev: myEvent
    });
  }
}