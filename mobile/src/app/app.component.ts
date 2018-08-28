import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController, Events, IonicApp, Nav, Platform, ToastController, LoadingController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import * as  coreHeart from 'oneheart-core';
import { WebAppName } from '../shared/models/cache/webappname';
import { LoadingBasePageHelper } from '../pages/shared/loadingbasepagehelper';
import { PageUtils } from '../shared/models/cache/pageutils';
import { LoginPage } from "../pages/login/login";
import { TabsPage } from '../pages/tabs/tabspage';
import { LoginBase } from '../pages/login/loginbase';
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class OneHeartApp {
  coreheartLoading: LoadingBasePageHelper;

  checkSub: any;
  @ViewChild(Nav) nav: Nav;
  constructor(
    public platform: Platform, public ionicApp: IonicApp, public statusBar: StatusBar, public splashscreen: SplashScreen,
    public events: Events, public store$: Store<coreHeart.AppState>, public toastCtrl: ToastController,
    public alertCtrl: AlertController, public translate: TranslateService, public loadCtrl: LoadingController,
    public storageService: coreHeart.StorageService, public cs: coreHeart.OnLineService,
    private keyboard: Keyboard, private network: Network
  ) {
    this.platformReady();
    this.coreheartLoading = new LoadingBasePageHelper(this.loadCtrl, events);
  }

  platformReady() {
    this.platform.ready().then(() => {

      this.keyboard.disableScroll(true);
      this.keyboard.hideKeyboardAccessoryBar(true);
      if (this.platform.is("ios")) { this.statusBar.styleDefault(); }
      if (this.platform.is("android")) { this.statusBar.overlaysWebView(false); this.statusBar.styleBlackOpaque(); }
      this.translate.setDefaultLang("data");
      this.storageService.PlatformAndStorageReadyInitUserData(WebAppName.interfacecode, "2017.12.13-11.11.11", this.platform.is('android'), this.platform.is('ios'), this.platform.is('core') || this.platform.is('mobileweb'));
      this.store$.dispatch(new coreHeart.ShowAction(null));
      this.store$.dispatch(new coreHeart.CheckAccessTokenStateAction("1"));
      setTimeout(() => {
        this.splashscreen.hide();
        this.checkSub = this.store$.select(x => x.login).subscribe(b => {
          if (!this.rootPage && b.checkToken != -1) {
            if (b.checkToken) { this.rootPage = TabsPage; LoginBase.InitStoreDictionaryData(this.store$); } else { this.rootPage = LoginPage; }
          }
        });
      }, 1000);

      console.log("Ready:" + Date.now());
      this.registerBackButtonAction();
      this.listenToLoginEvents();
      //检测网络状态
      this.network.onConnect().subscribe(x => { this.InLineEorMessage(false, "") });
      this.network.onDisconnect().subscribe(x => { this.InLineEorMessage(true, "当前没有网络或信号很差！") });
      //检测服务器状态
      this.cs.startClock((msg) => { if (msg === "Eor") { this.InLineEorMessage(true, "连接服务器异常！"); } else { this.InLineEorMessage(false, ""); } }, 1000 * 60 * 5);
    });
  }

  InLineEorMessage(show: boolean, msg: string) {
    this.events.publish(coreHeart.EventConst.System_InLineMsg, { show: show, msg: msg });
  }
  rootPage: any;


  listenToLoginEvents() {
    this.events.unsubscribe(coreHeart.EventConst.Goto_Page);
    this.events.subscribe(coreHeart.EventConst.Goto_Page, (page: any, data?: any) => { this.setNavRoot(page, data); });

    this.events.unsubscribe(coreHeart.EventConst.Login_timeOut);
    this.events.subscribe(coreHeart.EventConst.Login_timeOut, (data: any) => {
      if (!this.AlertShow) {
        this.store$.dispatch(new coreHeart.AuthSetAction(true));
        try { let activePortal = this.GetActive(); if (activePortal) activePortal.dismiss(); } catch(e){ }
        this.AlertLogin();
      }
    })
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      try { let activePortal = this.GetActive(); if (activePortal) { activePortal.dismiss(); return; } } catch(e){ return; }
      let tabs = this.nav.getActiveChildNav();//获取tabs导航,this.nav是总导航,tabs是子导航
      let tab = tabs.getSelected();
      let activeVC = tab.getActive();
      let activeNav = activeVC.getNav();//通过当前视图的ViewController获取的NavController
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit();
    }, 1);
  }
  //双击退出提示框  
  backButtonPressed: boolean = false;
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      PageUtils.toastMessage('再按一次退出应用', this.toastCtrl);
      this.backButtonPressed = true;
      setTimeout(() => { this.backButtonPressed = false; }, 2000)
    }
  }

  // isActive(page: PageInterface) {
  //   let childNav = this.nav.getActiveChildNav();
  //   // Tabs are a special case because they have their own navigation
  //   if (childNav) {
  //     if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
  //       return 'primary';
  //     }
  //     return;
  //   }

  //   if (this.nav.getActive() && this.nav.getActive().component === page.component) {
  //     return 'primary';
  //   }
  //   return;
  // }

  private setNavRoot(newRootPage: any, data?: any) {
    //this.rootPage = newRootPage;
    this.nav.setRoot(newRootPage, data);
  }
  private AlertShow: boolean = false;
  private AlertLogin() {
    this.AlertShow = true;
    let alert = this.alertCtrl.create({
      title: '登录',
      inputs: [
        { name: 'username', placeholder: '用户名' },
        { name: 'password', placeholder: '密码', type: 'password' }
      ],
      buttons: [
        { text: '取消', role: 'cancel', handler: (data: any) => { this.AlertShow = false; } },
        {
          text: '登录', handler: (data: any) => {
            this.AlertShow = false;
            this.store$.dispatch(new coreHeart.ResetLoginAction(data))
          }
        }
      ]
    });
    alert.present();
  }
  private GetActive(): any {
    return this.ionicApp._loadingPortal.getActive() ||
      this.ionicApp._modalPortal.getActive() ||
      this.ionicApp._toastPortal.getActive() ||
      this.ionicApp._overlayPortal.getActive();
  }
}
