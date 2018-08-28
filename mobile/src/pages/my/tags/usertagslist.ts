import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppState } from 'oneheart-core';
import { Store } from '@ngrx/store';
import { UsertagsPage } from './usertags';

@Component({
  selector: 'usertagslist',
  templateUrl: 'usertagslist.html',
})
export class UserTagsListPage {
  items = [];
  constructor(public navCtrl: NavController, public store$: Store<AppState>) {
    this.store$.select(s => s.Tags.UserTags).subscribe(x => {
      this.items = x;
    });
  }

  EditTag(id: number) {
    this.navCtrl.push(UsertagsPage, { id: id });
  }
}
