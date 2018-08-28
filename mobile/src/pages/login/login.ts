import { Component } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Events, NavController, ToastController } from 'ionic-angular';
import { AppState, StorageService } from 'oneheart-core';
import { Network } from '@ionic-native/network';
import { LoginBase } from './loginbase';

import { TabsPage } from '../tabs/tabspage';

@Component({
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginPage extends LoginBase {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController
    , public events: Events, public store$: Store<AppState>, public actions$: Actions
    , public storageService: StorageService, public network: Network) {
    super(navCtrl, toastCtrl, events, store$, actions$, storageService, network);
    this.firstLoadPage =TabsPage;
  } 
}