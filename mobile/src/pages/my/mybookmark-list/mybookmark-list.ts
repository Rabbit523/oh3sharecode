import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TractorBookMarkPage } from '../mytractor-list/trackorbookmark';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-mybookmark-list',
  templateUrl: 'mybookmark-list.html'
})
export class MyBookmarkListPage extends TractorBookMarkPage {

  constructor(public modalCtrl: NavController,  public store$: Store<coreHeart.AppState>
  ) {
    super(modalCtrl,  store$);
    this.refreshData(1);
  }
  doSearch(pageNum: number) {
    this.refreshData(pageNum);
    this.CacheNextPage(pageNum);
  }
  refreshData(pageNum: number) {
    let newpager = Object.assign({}, this.state.pager)
    newpager.pageIndex = pageNum;
    newpager.pageSize = 15;
    this.store$.dispatch(new coreHeart.FecthBookMarkAction(newpager));
  }
  CacheNextPage(pageNum: number) {
  }
}