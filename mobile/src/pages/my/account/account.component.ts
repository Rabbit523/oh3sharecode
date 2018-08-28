import { Component, Input } from '@angular/core';
import { Camera } from '@ionic-native/Camera';
import { Crop } from '@ionic-native/crop';
import { Events, ToastController, Platform } from 'ionic-angular';

import * as coreHeart from 'oneheart-core';
import { CameraOptionHelper } from '../../../components/camera/mobile/cameraoption';
import { LoginPage } from '../../login/login';
import { Store } from '@ngrx/store';
import { PageUtils, ToastPosition } from '../../../shared/models/cache/pageutils';

@Component({
  selector: 'pageaccountcomponent',
  templateUrl: 'account.component.html'
})
export class AccountComponentPage {

  @Input() state: coreHeart.AccountState;

  constructor(public toastCtrl: ToastController, public events: Events,
    public camera: Camera, public platform: Platform, public storage: coreHeart.StorageService,
    public crop: Crop, public store$: Store<coreHeart.AppState>
  ) {
  }
  getMedia(): Promise<string> {
    return this.camera.getPicture(CameraOptionHelper.getcameraop_TakePhotoCrop(this.camera))
      .then((fileUri) => {
        if (this.platform.is('ios')) {
          return fileUri
        } else if (this.platform.is('android')) {
          fileUri = 'file://' + fileUri;
          return this.crop.crop(fileUri, { quality: 100 });
        }
      })
      .then((path) => { return path; })
  }
  ClearCache() {
    this.storage.clear();
    PageUtils.toastMessage("清理完毕，请重新登陆！", this.toastCtrl, ToastPosition.middle, 2000)
  }
  logout() {
    this.store$.dispatch(new coreHeart.AuthLogoutAction(""));
    this.events.publish(coreHeart.EventConst.Goto_Page, LoginPage);
  }

  changePassword() {
    coreHeart.Utils.log('Clicked to change password');
  }

  takeupdatePicture() {
    this.getMedia()
      .then(imageData => {
        this.updatePicture(imageData);
      })
  }
  updatePicture(imageData: string) {
    this.store$.dispatch(new coreHeart.AccountUpdatePictureAction(imageData));
  }

}
