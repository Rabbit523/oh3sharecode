import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { Events, NavController, ToastController, ViewController, } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { PageUtils, ToastPosition } from '../../../shared/models/cache/pageutils';

declare var chcp: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  appVersion = "";
  systemtitle = "";
  webapiaddress = "";
  timediffseconds = 0;
  appVersiondate = 0;//new Date();
  webVersiondate = 0;//new Date();
  updatemessage = "";
  networkState = "";
  readyToInstallWebVersion = "";
  UUid: string;

  static customFormat = 'YYYY.MM.DD-HH.mm.ss';
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public device: Device
    , public events: Events, public toastCtrl: ToastController, public network: Network, public store$: Store<coreHeart.AppState>
  ) {
    this.UUid = this.device.uuid;
    this.calcdata();
    store$.select(s => s.About).subscribe(server => {
      this.setServerVersionData(server.readyToInstallWebVersion)
      this.calcdata();
    });
  }
  ionViewCanEnter(): void {
    this.getCurrentVersionInfo().then(curver => { coreHeart.StaticCache.Config.appVersion = curver; this.calcdata(); });
    this.store$.dispatch(new coreHeart.GetInstallWebVersionAction(coreHeart.WebapiConfig.configFile()));
  }
  calcdata() {
    this.networkState = this.network.type;
    this.systemtitle = coreHeart.StaticCache.Config.systemtitle;
    this.webapiaddress = coreHeart.StaticCache.Config.baseurl;
    this.appVersion = (coreHeart.StaticCache.Config.appVersion).substring(0, 20);//WebapiConfig.appCodeVersion();
    let localdata = coreHeart.Utils.strtodate(this.appVersion, AboutPage.customFormat).getTime();
    this.appVersiondate = localdata;
    this.webVersiondate = localdata;
  }
  setServerVersionData(readyToInstallWebVersion: string) {
    this.readyToInstallWebVersion = (readyToInstallWebVersion).substring(0, 20);
    this.webVersiondate = coreHeart.Utils.strtodate(this.readyToInstallWebVersion, AboutPage.customFormat).getTime();
    this.timediffseconds = Math.abs(this.appVersiondate - this.webVersiondate) / 1000;
    this.updatemessage = this.readyToInstallWebVersion;
  }

  getCurrentVersionInfo(): Promise<string> {
    return new Promise((reslove, reject) => {
      if (!coreHeart.StaticCache.Config.platformIsMobileWeb) {
        chcp.configure(coreHeart.WebapiConfig.options(), (er: any) => {
          chcp.getVersionInfo((error: any, data: any) => {
            coreHeart.Utils.log('chcp.getVersionInfo ', data);
            reslove(data.currentWebVersion);
          });
        });
      }
      else {
        reslove(coreHeart.StaticCache.Config.appVersion)
      }
    });
  }

  fetchUpdateCallback(error: any, data: any, events: Events) {
    coreHeart.Utils.log('fetchUpdateCallback :', error, data);
    if (error) {
      this.updatemessage = "下载出错:" + error.description + error.code;
      events.publish(coreHeart.EventConst.System_Waiting, 50, this.updatemessage);
      coreHeart.Utils.log(this.updatemessage);
      this.events.publish(coreHeart.EventConst.System_Resetwaiting);
      this.ResetWaitingbutton(events);
    }
    else {
      this.updatemessage = "下载成功，准备安装新应用";
      events.publish(coreHeart.EventConst.System_Waiting, 50, this.updatemessage);
      coreHeart.Utils.log(this.updatemessage);
      chcp.installUpdate((error: any) => { this.installationCallback(error, events); });
    }
  }

  installationCallback(error: any, events: Events) {
    this.events.publish(coreHeart.EventConst.System_Waiting, 70);
    if (error) {
      this.updatemessage = "安装失败：" + error;
      this.events.publish(coreHeart.EventConst.System_Waiting, 90, this.updatemessage);
      coreHeart.Utils.log('Failed to install: ' + error.code, error.description);
    } else {
      this.updatemessage = "安装成功！";
      coreHeart.Utils.log('Update installed!');
      this.events.publish(coreHeart.EventConst.System_Waiting, 90, this.updatemessage);
    }
    this.events.publish(coreHeart.EventConst.System_Resetwaiting);
    this.ResetWaitingbutton(events);
  }
  
  ResetWaitingbutton(events: Events) {
    setTimeout(() => { events.publish(coreHeart.EventConst.System_Resetwaiting) }, 2000);
  }

  dismissClick(data?: any) {
    if (this.viewCtrl)
      this.viewCtrl.dismiss(data);
  }
  EndBtnClick() {
    if (this.timediffseconds > 7 * 24 * 3600) {
      if (!coreHeart.StaticCache.Config.platformIsMobileWeb) {
        this.events.publish(coreHeart.EventConst.System_Waiting, 20, "下载中......");
        chcp.fetchUpdate((error: any, data: any) => { this.fetchUpdateCallback(error, data, this.events); });
      }
    } else {
      PageUtils.toastMessage("Api时间：", this.toastCtrl, ToastPosition.middle, 2000);
    }
  }
}