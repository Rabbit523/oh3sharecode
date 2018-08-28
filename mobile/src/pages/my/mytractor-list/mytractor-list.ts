import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as  coreheart from 'oneheart-core';
import { TractorBookMarkPage } from './trackorbookmark';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-mytractor-list',
  templateUrl: 'mytractor-list.html'
})
export class MyTractorListPage extends TractorBookMarkPage {

  constructor(public modalCtrl: NavController
    , public store$: Store<coreheart.AppState>
  ) {
    super(modalCtrl, store$);
    this.refreshData(1);
  }

  doSearch(pageNum: number) {
    this.refreshData(pageNum);
    this.CacheNextPage(pageNum);
  }

  refreshData(pageNum: number) {
    let newpager =Object.assign({},this.state.pager)
    newpager.pageIndex =pageNum;
    newpager.pageSize =15;
    this.store$.dispatch(new coreheart.FecthTractorMarkAction(newpager));
  }

  CacheNextPage(pageNum: number) {
   
  }
}