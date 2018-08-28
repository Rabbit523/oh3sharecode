import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AppState, SearchDataAction, SearchState, TreeNode, SHOWUserTagsAction } from 'oneheart-core';
import { Store } from '@ngrx/store';
import { EventDetailPage } from '../../../pages/event-detail/event-detail';
import { PageUtils, ToastPosition } from '../../../shared/models/cache/pageutils';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public searchtext = '';
  state: Observable<SearchState>;
  tags: TreeNode[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public store$: Store<AppState>,
    public toast: ToastController
  ) {
    this.state = this.store$.select(s => s.Search)
    this.store$.select(s => s.Tags.UserTags).subscribe(x => this.tags = x)
    this.store$.dispatch(new SHOWUserTagsAction(""));
    //this.store$.dispatch(new SearchShowAction(20));
  }

  goToEventDetail(id: number) {
    this.navCtrl.push(EventDetailPage, { Bgid: id });
  }
  goToNumber() {
    let id = parseInt(this.searchtext);
    if (id > 0) {
      this.navCtrl.push(EventDetailPage, { Bgid: id });
    }
    else {
      PageUtils.toastMessage("无效的ID！", this.toast, ToastPosition.middle, 1500);
    }
  }
  goToSearch() {
    this.store$.dispatch(new SearchDataAction({ txt: this.searchtext, page: 1 }));
  }
  tagsSearch(tag: string) {    
    this.store$.dispatch(new SearchDataAction({ txt: "tags://丨" + tag + "丨", page: 1 }));
  }
}