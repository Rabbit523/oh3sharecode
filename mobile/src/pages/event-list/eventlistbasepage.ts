import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { EventDetailPage } from '../event-detail/event-detail';

// 基础类
export class EventListBasePage {
    state: coreHeart.EventListPageState = coreHeart.initialEventListPageState;
    _navParams: NavParams;
    EventListSub: any = undefined;
    MyrecordsSub: any = undefined;
    showView: boolean = false;//视图切换按钮
    constructor(public viewCtrl: ViewController, public navParams: NavParams, public events: Events, public modalCtrl: NavController, public store$: Store<coreHeart.AppState>) {
        this._navParams = navParams;
        this.showView = this._navParams.get('showView') || true;
    }

    ionViewWillUnload(): void {
        this.EventListSub.unsubscribe();
        this.MyrecordsSub.unsubscribe();
    }
    ionViewCanEnter(): void {

        let paras = <coreHeart.PageTitleAndFuntype>{};
        paras.pageTitle = this._navParams.get('pageTitle');
        paras.FunType = this._navParams.get('FunType');
        paras.ViewId = coreHeart.StaticCache.Config.ListViewId || 1;
        paras.bindId = coreHeart.StaticCache.Config.UserId;
        paras.bindtype = coreHeart.CategoryEnum.PersonCategories;
        paras.useExt = true;
        paras.showdropdownfilter = paras.FunType == 4 || paras.FunType == 0;
        this.EventListSub = this.store$.select(s => s.EventList).subscribe(eventList => { this.state = eventList; });
        this.MyrecordsSub = this.store$.select(s => s.EventList.myrecords).subscribe(rsp => { this._refreshListAndPage(rsp); });

        //包含funtype不定义的情况 即所有功能的
        coreHeart.Utils.log(paras,this._navParams);
        this.store$.dispatch(new coreHeart.EventListShowAction(paras));
        this.events.unsubscribe(coreHeart.EventConst.Event_BugListRefresh);
        this.events.subscribe(coreHeart.EventConst.Event_BugListRefresh, () => { this.refreshData(1); });
        this.refreshData(1);
    }

    dismiss(data?: any) {
        if (this.viewCtrl)
            this.viewCtrl.dismiss(data);
    }
    openMail(value: string) {
        window.open('mailto:' + value);
    }
    goToEventDetail(bg_id: number) {
        this.modalCtrl.push(EventDetailPage, { Bgid: bg_id });
    }

    _refreshListAndPage(response: coreHeart.EventListJson) {
        this.store$.dispatch(new coreHeart.SetCurPageAction(Number(this.state.pager.pageIndex) + 1));
        this.events.publish(coreHeart.EventConst.System_Resetwaiting);
    }

    doInfinite(infiniteScroll: any) {
        infiniteScroll.enable(false);
        setTimeout(() => { try { infiniteScroll.enable(true); } catch (e) { } }, 5000);
        infiniteScroll.waitFor(this.LoadMoreData());
    }
    LoadMoreData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.store$.dispatch(new coreHeart.SetScrollGetDataAction(true));
            this.navParams.data[coreHeart.EventListParaHelper.ListParas.Page] = Number(this.state.curPage) + 1;
            this.store$.dispatch(new coreHeart.LoadMoreEventListAction(this.navParams.data));
            resolve();
        })
    }

    doSearch(pageNum: number) {
        this.refreshData(pageNum);
    }
    doRefresh(refresher: any) {
        this.refreshData(1).then((err: boolean) => {
            refresher.complete();
        });
    }

    refreshData(page: number): Promise<any> {
        return new Promise((reslove, reject) => {
            this.store$.dispatch(new coreHeart.SetScrollGetDataAction(false));
            var state = Object.assign({}, this.navParams.data, { [coreHeart.EventListParaHelper.ListParas.Page]: page });
            this.store$.dispatch(new coreHeart.FecthEventListAction(state));
            reslove(true)
        })
    }

}