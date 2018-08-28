import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { EventListBasePage } from './eventlistbasepage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'eventlistmycreate',
  templateUrl: 'event-listmycreate.html',
})

export class EventListMyCreatePage extends EventListBasePage {
  constructor(navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: NavController
    , public events: Events, public store$: Store<coreHeart.AppState>
  ) {
    super(viewCtrl, navParams, events, modalCtrl, store$);
  }
}