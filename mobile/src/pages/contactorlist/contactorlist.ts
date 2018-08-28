import { ContactorDetailPage } from './contactor-detail';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalController, Events } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';

@Component({
  selector: 'page-contactorlist',
  templateUrl: 'contactorlist.html'
})
export class ContactorListPage {
  state: coreHeart.ContactorslistState;

  constructor(public modalCtrl: ModalController, public store$: Store<coreHeart.AppState>, public events: Events
  ) {
    this.store$.select(s => s.contactors).subscribe(sc => {
      this.state = sc;
    })
    this.store$.dispatch(new coreHeart.GetAllContactorsAction(""));

  }

  search(event: any) {
    this.store$.dispatch(new coreHeart.ShowContactorsByNameAction(event.target.value || ''));
  }

  itemClickTapped(employee: coreHeart.ContactorPerson) {
    let modal = this.modalCtrl.create(ContactorDetailPage, { contactorPerson: employee });
    modal.present();
  }
}