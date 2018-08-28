import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/Camera';
import { Crop } from '@ionic-native/crop';
import { Geolocation } from '@ionic-native/geolocation';
import { Media } from '@ionic-native/media';
import { Network } from '@ionic-native/network';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { QRScanner } from '@ionic-native/qr-scanner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { IonicApp, IonicModule, Events } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { LaddaModule } from 'angular2-ladda';

import { ApplicationModule } from '../pages/application/application.module';
import { ContactorListModule } from '../pages/contactorlist/contactorlist.module';
import { EventDetailModule } from '../pages/event-detail/event-detail.module';
import { EventEditModule } from '../pages/event-edit/event-edit.module';
import { EventListModule } from '../pages/event-list/event-list.module';
import { FirstPageModule } from '../pages/firstpage/firstpage.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MyPageModule } from '../pages/my/my.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { ChatModule } from '../pages/chat/chat.module';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { OneHeartApp } from './app.component';
import { SummaryCalcModule } from '../pages/summary/summarycalc.module';
import { MobileEventEffects } from './appeffects';
import { AngularHelperModel, prodreducer, devreducer } from 'oneheart-core';
import {
  CounterEffects, LoginEffects, ContactorslistEffects, MapEffects, CacheEffects, AboutPageEffects, CategoryEffects,
  DBActionsEffects, CategoryEmunEffects, ActionFieldsEffects, SearchEffects, TractorBookMarkEffects, ReceivedListEffects,
  ToDoListEffects, ExtToDoListEffects, AccountEffects, EventListEffects, EventListMenuFilterContentEffects,
  CalcChartEffects, EventDetailEffects, EventChildTaskEffects,
  EventCommentEffects, AuthEffects, DictionaryEffects, MenuListsEffects, TagsEffects
} from 'oneheart-core';
import {
  MediaEffects, UserEffects, ORGEffects, ProjectEffects, RoleEffects, PriorityEffects, StatusEffects,
  SelfDefineFunctionsEffects, SelfDefineFieldDtoEffects, IISDBEffects, CameraSettingDtoEffects, NotifyEffects, RelationShipEffects,
  HostSettingEffects, AutoEffects, AjaxEffects
} from 'oneheart-core';
import { TestPageModule } from '../pages/my/testpage.module';

import {
  StorageService, StorageServiceFactory, EventDetailService, EventDetailServiceFactory,
  ChartCalcService, ChartCalcServiceFactory, OnLineServiceFactory, OnLineService
} from 'oneheart-core';


const ionicSetup = {
  menuType: 'overlay',//menu 的显示
  scrollAssist: false, autoFocusAssist: false,  //键盘
  iconMode: 'ios',  //全局图标
  backButtonText: "", backButtonIcon: "ios-arrow-back-outline",  //nav push 返回 icon
  mode: 'md',
  tabsHideOnSubPages: true,//子页面隐藏tab
  //tabsHighlight: true,//tab上面多条线
};

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [OneHeartApp, TutorialPage],
  imports: [
    IonicModule.forRoot(OneHeartApp, ionicSetup)
    , BrowserModule, HttpModule, AngularHelperModel,LaddaModule.forRoot({ style: "contract",spinnerSize: 40,spinnerColor: "red",spinnerLines: 12})
    , LocalStorageModule.withConfig({ prefix: 'my-app', storageType: 'localStorage' })
    , TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [Http] } })
    , StoreModule.provideStore(prodreducer) //prodreducer devreducer
    , LoginPageModule, TabsModule, FirstPageModule, ApplicationModule, ContactorListModule, MyPageModule, ChatModule
    , EventListModule, EventDetailModule, EventEditModule, SummaryCalcModule, TestPageModule
    , EffectsModule.runAfterBootstrap(CounterEffects)
    , EffectsModule.runAfterBootstrap(LoginEffects)
    , EffectsModule.runAfterBootstrap(ContactorslistEffects)
    , EffectsModule.runAfterBootstrap(CacheEffects)
    , EffectsModule.runAfterBootstrap(MapEffects)
    , EffectsModule.runAfterBootstrap(MenuListsEffects)
    , EffectsModule.runAfterBootstrap(AboutPageEffects)
    , EffectsModule.runAfterBootstrap(CategoryEffects)
    , EffectsModule.runAfterBootstrap(DBActionsEffects)
    , EffectsModule.runAfterBootstrap(CategoryEmunEffects)
    , EffectsModule.runAfterBootstrap(ActionFieldsEffects)
    , EffectsModule.runAfterBootstrap(SearchEffects)
    , EffectsModule.runAfterBootstrap(TagsEffects)
    , EffectsModule.runAfterBootstrap(TractorBookMarkEffects)
    , EffectsModule.runAfterBootstrap(ReceivedListEffects)
    , EffectsModule.runAfterBootstrap(ToDoListEffects)
    , EffectsModule.runAfterBootstrap(ExtToDoListEffects)
    , EffectsModule.runAfterBootstrap(AccountEffects)
    , EffectsModule.runAfterBootstrap(EventListEffects)
    , EffectsModule.runAfterBootstrap(EventListMenuFilterContentEffects)
    , EffectsModule.runAfterBootstrap(CalcChartEffects)
    , EffectsModule.runAfterBootstrap(EventDetailEffects)
    , EffectsModule.runAfterBootstrap(EventCommentEffects)
    , EffectsModule.runAfterBootstrap(EventChildTaskEffects)
    , EffectsModule.runAfterBootstrap(AuthEffects)
    , EffectsModule.runAfterBootstrap(DictionaryEffects)
    , EffectsModule.runAfterBootstrap(MediaEffects)
    , EffectsModule.runAfterBootstrap(UserEffects)
    , EffectsModule.runAfterBootstrap(ORGEffects)
    , EffectsModule.runAfterBootstrap(ProjectEffects)
    , EffectsModule.runAfterBootstrap(RoleEffects)
    , EffectsModule.runAfterBootstrap(PriorityEffects)
    , EffectsModule.runAfterBootstrap(StatusEffects)
    , EffectsModule.runAfterBootstrap(SelfDefineFunctionsEffects)
    , EffectsModule.runAfterBootstrap(SelfDefineFieldDtoEffects)
    , EffectsModule.runAfterBootstrap(IISDBEffects)
    , EffectsModule.runAfterBootstrap(CameraSettingDtoEffects)
    , EffectsModule.runAfterBootstrap(NotifyEffects)
    , EffectsModule.runAfterBootstrap(RelationShipEffects)
    , EffectsModule.runAfterBootstrap(HostSettingEffects)
    , EffectsModule.runAfterBootstrap(AutoEffects)
    , EffectsModule.runAfterBootstrap(AjaxEffects)
    , EffectsModule.runAfterBootstrap(MobileEventEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [OneHeartApp, TutorialPage],
  providers: [
    Camera, PhotoViewer, Crop, Media, Device, Keyboard, Geolocation, StatusBar, SplashScreen, FileTransfer,QRScanner
    , Events, HTTP, Network, TranslateService, Actions
    , { provide: prodreducer, useFactory: prodreducer, deps: [] }
    , { provide: StorageService, useFactory: StorageServiceFactory, deps: [LocalStorageService] }
    , { provide: EventDetailService, useFactory: EventDetailServiceFactory, deps: [Http, FileTransfer, HTTP] }
    , { provide: ChartCalcService, useFactory: ChartCalcServiceFactory, deps: [Http, HTTP] }
    , { provide: OnLineService, useFactory: OnLineServiceFactory, deps: [Http, HTTP] }

  ]
})
export class AppModule { }