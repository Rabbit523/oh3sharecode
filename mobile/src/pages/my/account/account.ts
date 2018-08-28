import { Component } from '@angular/core';
import { Events,ToastController, ViewController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { PageUtils } from '../../../shared/models/cache/pageutils';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  state: coreHeart.AccountState;

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, public events: Events, public store$: Store<coreHeart.AppState>
  ) {
    this.store$.select(s => s.Account).subscribe(state => this.state = Object.assign({}, state))
    this.store$.dispatch(new coreHeart.AccountShowAction(coreHeart.initialAccountState));
    //cordova.file.externalDataDirectory
    //cordova-plugin-file-transfer
    //clear cache  43057
  }

  ionViewWillUnload(): void {
    this.events.unsubscribe(coreHeart.EventConst.Event_UpdatePostComplate);
  }
  ionViewDidLoad(): void {
    this.events.subscribe(coreHeart.EventConst.Event_UpdatePostComplate, () => {
      this.events.publish(coreHeart.EventConst.System_Resetwaiting);
      PageUtils.toastMessage('上传成功', this.toastCtrl);
    })
  }

  dismiss(data?: any) {
    if (this.viewCtrl)
      this.viewCtrl.dismiss(data);
  }

}
