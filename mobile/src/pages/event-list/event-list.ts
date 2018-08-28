import { Component } from '@angular/core';
import { Events,  NavController } from 'ionic-angular';
import { MenuController, NavParams, ViewController } from 'ionic-angular';
import { CalcChart } from './chartcalc/calcchart';
import { EventListMyCreatePage } from './event-listmycreate';
import { EventListBasePage } from './eventlistbasepage';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';

@Component({
  selector: 'eventlist',
  templateUrl: 'event-list.html',
})

export class EventListPage extends EventListBasePage {

  constructor(navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController    
    , public sideMenu: MenuController, public events: Events, public store$: Store<coreHeart.AppState>
  ) {
    super(viewCtrl, navParams, events, navCtrl, store$);
    this.events.subscribe(coreHeart.EventConst.Event_ListViewChangeClick, (id: number) => {
      this.setlistviewid(id);
    });
  }

  // menu
  openMenu() {
    this.sideMenu.open("listfiltercontentMenu");
  }
  ionViewDidEnter() {
    this.sideMenu.enable(this.navParams.get('FunType') != 5, 'listfiltercontentMenu');
  }
  viewWillLeave() {
    this.events.unsubscribe(coreHeart.EventConst.Event_ListViewChangeClick);
    this.sideMenu.enable(false, 'listfiltercontentMenu');
  }
  // view
  setlistviewid(id: number) {
    this.store$.dispatch(new coreHeart.EventlistSetListViewIdAction(id));
  }

  //menu过滤
  MenuFilter(DropDownValue: coreHeart.DropDownFilterUrlModel) {
    if (DropDownValue) {
      let temp: any = Object.assign({}, this.navParams.data);
      coreHeart.EventListParaHelper.SetDropDownToData(temp, DropDownValue,this.state.Filter.FunType);      
      temp[coreHeart.EventListParaHelper.ListParas.Page] = 1;
      this.store$.dispatch(new coreHeart.FecthEventListAction(temp));
    }
    this.sideMenu.close();
  }

  //menu 统计图
  openCharts() {
    this.sideMenu.close();
    this.navParams.data[coreHeart.EventListParaHelper.ListParas.Page] = 1;
    this.navCtrl.push(CalcChart, this.navParams.data);
  }

  //我创建的
  openMycreate() {
    let actName = "";
    if (this.state.Filter.FunType == coreHeart.EventActionType.TeamTask)
      actName = "任务";
    if (this.state.Filter.FunType == coreHeart.EventActionType.TeamLocomotive)
      actName = "机调10";
    this.navCtrl.push(EventListMyCreatePage, ApplicationFirstBasePage.MyCreated(this.state.Filter.FunType, "我发布的" + actName))
  }
}