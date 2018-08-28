import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppState, Utils } from 'oneheart-core';
import { Store } from '@ngrx/store';
import { DicTagsPage } from './dictags';


@Component({
  selector: 'dictagslist',
  templateUrl: 'dictagslist.html',
})
export class DicTagsListPage {

  items = [];
  constructor(public navCtrl: NavController, public store$: Store<AppState>) {
    this.store$.select(s => s.Tags.AllDicTags).subscribe(x => {
      this.items = Utils.JsonToIdNameArray(x);
    });
  }
  EditTag(id: number) {
    this.navCtrl.push(DicTagsPage, { id: id });
  }
}
