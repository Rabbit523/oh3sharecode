import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Events, NavController, ToastController } from 'ionic-angular';
import {
  LoginState, AppState, StorageService, LoginTestAction, ShowAction,
  EventConst, CategoryEmunFetchDataFromApiAction, DictionaryGetAction, ProcessLoginAction,
  SHOWAllDicAction, SHOWUserTagsAction, SHOWUserDicAction
} from 'oneheart-core';
import { PageUtils,ToastPosition } from '../../shared/models/cache/pageutils';
import { WebAppName } from '../../shared/models/cache/webappname';
import { Network } from '@ionic-native/network';

export class LoginBase {
  firstLoadPage: any;
  state: LoginState;
  _state: LoginState; //此对象可读写
  constructor(public navCtrl: NavController, public toastCtrl: ToastController
    , public events: Events, public store$: Store<AppState>, public actions$: Actions
    , public storageService: StorageService, public network: Network) {

    this.store$.select(s => s.login).subscribe(state => { this.state = state; this._state = Object.assign({}, state); });
    this.store$.dispatch(new LoginTestAction({ username: "", interfacecode: WebAppName.interfacecode, webapiaddress: WebAppName.webapiaddress, systemtitle: WebAppName.systemtitle }))
    this.store$.dispatch(new ShowAction(null));

  }

  get netWorkOK() {
    return this.network.type === undefined;
  }

  //这里只用form的验证   不用form来操作对象 用ngModel来操作对象
  doProcessClick(buttonnum: number) {
    this.events.unsubscribe(EventConst.Login_Success);
    this.events.subscribe(EventConst.Login_Success, () => { this.LoginSucc(); });
    if (this.valid()) {
      this.doprocess(this._state);
    } else {
      PageUtils.toastMessage("必须输入用户名和密码", this.toastCtrl);  //子对象必须重载该函数
      this.events.publish(EventConst.System_Resetwaiting);
    }

    this.events.unsubscribe(EventConst.System_ShowMessage);
    this.events.subscribe(EventConst.System_ShowMessage, msg => { PageUtils.toastMessage(msg, this.toastCtrl); });
  }
  valid() {
    return this._state.username.length > 0 && this._state.password.length > 0;
  }

  LoginSucc() {
    this.showmessage('登录成功');
    setTimeout(LoginBase.InitStoreDictionaryData, 100, this.store$);
    this.navCtrl.setRoot(this.firstLoadPage);
  }

  static InitStoreDictionaryData(store$) {
    store$.dispatch(new CategoryEmunFetchDataFromApiAction(""));
    store$.dispatch(new DictionaryGetAction(null));
    store$.dispatch(new SHOWAllDicAction(null));
    store$.dispatch(new SHOWUserTagsAction(null));
    store$.dispatch(new SHOWUserDicAction(null));
  }
  showmessage(mess: string) {
    PageUtils.toastMessage(mess, this.toastCtrl,ToastPosition.middle,2000);  //子对象必须重载该函数
  }

  doprocess(state: LoginState) {
    this.store$.dispatch(new ProcessLoginAction(state));
  }
}