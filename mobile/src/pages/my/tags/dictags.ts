import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TreeNode, AppState, EditDicShowAction, EditDicPostAction } from 'oneheart-core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dictags',
  templateUrl: 'dictags.html',
})
export class DicTagsPage {

  subHeader="";
  item: TreeNode = new TreeNode(0, "", 0);
  constructor(public navCtrl: NavController, public navParams: NavParams, public store$: Store<AppState>) {
    store$.select(s => s.Tags.EditDicTag).subscribe(x => { this.item = Object.assign({}, x) })
    this.subHeader=navParams.data.id>0?"编辑 ":"新增";
    store$.dispatch(new EditDicShowAction(navParams.data.id));
  }

  EditChange() {
    this.store$.dispatch(new EditDicPostAction(this.item));
    this.navCtrl.pop();
  }
}