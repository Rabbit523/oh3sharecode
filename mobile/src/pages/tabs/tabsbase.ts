import { ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { FirstPage } from '../firstpage/firstpage';
import { MyPage } from '../../pages/my/my';
import { ContactorListPage } from '../../pages/contactorlist/contactorlist';
import { ApplicationPage } from '../../pages/application/applicationpage';
import { Chat } from '../chat/chat';

export class TabsPageBase {
  @ViewChild('mainTabs') tabs: Tabs;
  tab0Root: any = FirstPage;
  tab1Root: any = ContactorListPage;
  tab2Root: any = Chat;
  tab3Root: any = ApplicationPage;
  tab4Root: any = MyPage;
  mySelectedIndex: number;

  constructor() {
  }
}