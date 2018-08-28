import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TabsPageBase } from './tabsbase';


@Component({
  templateUrl: 'tabspage.html'
})
export class TabsPage  extends TabsPageBase
{
  constructor(navParams: NavParams) {
    super();
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
