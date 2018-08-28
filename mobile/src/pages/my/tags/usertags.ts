import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TreeNode, AppState, EditUserShowAction, Utils, EditUserPostAction } from 'oneheart-core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'usertags',
  templateUrl: 'usertags.html',
})
export class UsertagsPage {
  subHeader = "";
  item = new TreeNode(0, "", 0);
  child: any = [];
  userTags: TreeNode[];
  dicTags: TreeNode[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public store$: Store<AppState>) {
    store$.select(s => s.Tags.EditUserTag).subscribe(eu => {
      this.item = Object.assign({}, eu);
      store$.select(s0 => s0.Tags.UserDicTags).take(1).subscribe(udt => { let temp = []; udt.forEach(i => { if (i.parentid == eu.id) { temp.push(i.id) } }); this.child = temp; });
    });
    store$.select(s => s.Tags.UserTags).subscribe(ut => { this.userTags = ut; });
    store$.select(s => s.Tags.AllDicTags).subscribe(adt => { this.dicTags = Utils.JsonToIdNameArray(adt); });
    this.subHeader=navParams.data.id>0?"编辑 ":"新增";
    this.store$.dispatch(new EditUserShowAction(navParams.data.id));
  }
  EditChange() {
    this.store$.dispatch(new EditUserPostAction({ item: this.item, ids: this.child }));
    this.navCtrl.pop();    
  }
}
