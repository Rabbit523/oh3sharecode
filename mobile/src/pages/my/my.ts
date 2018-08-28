import { Component } from '@angular/core';
import { NavController, Events, AlertController } from 'ionic-angular';
import { WebapiConfig, StaticCache, StorageService, ContactorService, JsonDictionary, Utils, EventConst } from 'oneheart-core';
import { AboutPage } from './about/about';
import { AccountPage } from './account/account';
import { MyBookmarkListPage } from './mybookmark-list/mybookmark-list';
import { MyTractorListPage } from './mytractor-list/mytractor-list';
import { MySetupPage } from './setuppage/setuppage';
import { FuntionSetting } from './setuppage/funtionsetting';
import { TestPage } from './testpage';
import { ScanPage } from './scan/scan';
import { Device } from '@ionic-native/device';


@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})

export class MyPage {

  username: string;
  Usersrc: string;
  Ogname: string;
  showNote: JsonDictionary<boolean>;
  constructor(public alertCtrl: AlertController, public nav: NavController, public event: Events, public device: Device,
    public lss: StorageService, public bsservcie: ContactorService
  ) {
    this.Usersrc = "assets/img/noneUser.png";
    this.initdata();
    this.showNote = lss._Storage_Setting;
  }

  initdata() {
    let Personalization = StaticCache.Config.PersonalizationJson;
    if (Personalization.ClaimData.UserPic)
      this.Usersrc = WebapiConfig.geturl(Personalization.ClaimData.UserPic);
    var firstName = Personalization.ClaimData.UsFirstname.replace('，', "");
    this.username = firstName.length > 0 ? firstName : StaticCache.Config.username;
    this.Ogname = Personalization.ClaimData.Ogname;
  }
  openMyTractor() {
    this._NavOpenAPage(MyTractorListPage);
  }
  openMyBookmark() {
    this._NavOpenAPage(MyBookmarkListPage);
  }
  openSetupPage() {
    this._NavOpenAPage(MySetupPage);
  }
  openAccount() {
    this._NavOpenAPage(AccountPage);
  }
  openTestPage() {
    this._NavOpenAPage(TestPage);
  }
  openAbout() {
    this._NavOpenAPage(AboutPage);
  }
  _NavOpenAPage(page: any) {
    this.nav.push(page);
  }

  FunctionPage() {
    this._NavOpenAPage(FuntionSetting)
  }
  openScaner() {
    this.event.unsubscribe(EventConst.System_ShowConFirmMessage);
    this.event.subscribe(EventConst.System_ShowConFirmMessage, msg => {
      let ConFirmMessage = "", title = "", callback = () => { };
      if (msg.err) {
        title = "错误"; ConFirmMessage = msg.err;
      }
      else {
        title = "提示"; ConFirmMessage = "是否授权访问?";
        callback = () => {
          let urlstr = "", urlary = msg.body.split("#");
          if (urlary.length == 3) urlstr = urlary[0] + urlary[1].replace("__", "/").replace("_", "?") + "=" + urlary[2];
          let newUrl = urlstr.replace("nd_", this.device.uuid + "_").replace("nm_", "mn_")
            .replace("ns_", StaticCache.Config.PersonalizationJson.ClaimData.SessionGuid.trim() + "_")
            .replace("_0_", "_" + StaticCache.Config.PersonalizationJson.ClaimData.UserId + "_") + "_" + StaticCache.Config.PersonalizationJson.UiClaims.UserName;
          Utils.log(urlstr, newUrl, StaticCache.Config);
          this.bsservcie.get(newUrl, <JSON>{}, <JSON>{}).subscribe(x => { Utils.log("bsservcie Get", x); });
        }
      }
      this.showConfirm(title, ConFirmMessage, callback);
    });
    this._NavOpenAPage(ScanPage)
  }

  showConfirm(title: string, msg: string, callback) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [{ text: '取消', handler: () => { } }, { text: '同意', handler: () => { if (callback) callback() } }]
    });
    confirm.present();
  }
}