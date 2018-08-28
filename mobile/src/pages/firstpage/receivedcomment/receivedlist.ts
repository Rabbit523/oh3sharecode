import { Component } from '@angular/core';
import { Events, NavController, ViewController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from "@ngrx/store";
import { EventDetailPage } from '../../event-detail/event-detail';

@Component({
    selector: "receivedlist",
    templateUrl: "receivedlist.html"
})
export class ReceivedList {
    state: coreHeart.ReceivedListState;


    constructor(public view: ViewController, public modalCtrl: NavController, public events: Events, public store$: Store<coreHeart.AppState>
    ) {
        let pager = Object.assign({}, coreHeart.initialReceivedListState.pager, { pageSize: 15 })
        this.store$.dispatch(new coreHeart.ReceivedListShowAction(pager));
        this.store$.select(s => s.ReceivedList).subscribe(state => {
            this.state = Object.assign(<coreHeart.ReceivedListState>{}, state);
        });
    }

    OpenDetailPage(bugid: number) {
        this.modalCtrl.push(EventDetailPage, { Bgid: bugid});
    }
    dismiss() {
        if (this.view)
            this.view.dismiss();
    }
    doInfinite(infiniteScroll: any) {
        infiniteScroll.enable(false);
        setTimeout(() => { try { infiniteScroll.enable(true); } catch (e) { } }, 5000);
        infiniteScroll.waitFor(this.LoadMoreData());
    }
    LoadMoreData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.store$.dispatch(new coreHeart.ReceivedListPageDownAction(this.state));
            resolve();
        });
    }
}