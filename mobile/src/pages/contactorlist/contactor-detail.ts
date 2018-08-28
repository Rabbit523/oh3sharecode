import { ContactorPerson } from 'oneheart-core';
import { Component } from '@angular/core';
import { NavParams, ViewController, Events } from 'ionic-angular';
import { StorageService } from 'oneheart-core';

@Component({
  selector: 'contactor-detail',
  templateUrl: 'contactor-detail.html'
})
export class ContactorDetailPage {
  contactorPerson: ContactorPerson = new ContactorPerson();

  constructor(public navParams: NavParams, public view: ViewController
    , public events: Events, public userdata: StorageService) {
    this.contactorPerson = navParams.data.contactorPerson;
  }

  ionViewCanEnter() {
    this.rate = this.userdata.GetRating(this.contactorPerson.us_id);
  }

  openCall(value: string) {
    if (value.length > 0)
      window.open('tel:' + value);
  }

  rate: number = 0;
  onModelChange(_event) {
    this.userdata.SetRating(this.contactorPerson.us_id, Number(_event));
  }
  dismiss() {
    if (this.view)
      this.view.dismiss();
  }
}