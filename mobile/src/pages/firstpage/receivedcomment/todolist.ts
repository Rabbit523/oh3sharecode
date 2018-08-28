import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from "@ngrx/store";
import { EventDetailPage } from '../../event-detail/event-detail';

@Component({
    selector: "todolist",
    templateUrl: "todolist.html"
})
export class ToDoList {
    state: coreHeart.ToDoListState;

    constructor( public modalCtrl: NavController, public events: Events
        , public navParams: NavParams, public store$: Store<coreHeart.AppState>
    ) {
        this.store$.dispatch(new coreHeart.ToDoListSetTitleAction(navParams.data.pageTitle));
        let pager = Object.assign({}, coreHeart.initialToDoListState.pager, { pageSize: 15 })
        this.store$.dispatch(new coreHeart.ToDoListShowAction(pager));
        this.store$.select(s => s.ToDoList).subscribe(state => {
            this.state = Object.assign(<coreHeart.ToDoListState>{}, state);
        });
    }

    OpenDetailPage(bugid: number) {
        this.modalCtrl.push(EventDetailPage, { Bgid: bugid });
    }
    
    doInfinite(infiniteScroll: any) {
        infiniteScroll.enable(false);
        setTimeout(() => { try { infiniteScroll.enable(true); } catch (e) { } }, 5000);
        infiniteScroll.waitFor(this.LoadMoreData());
    }
    LoadMoreData(): Promise<any> {
        return new Promise((resolve, reject) => {this.store$.dispatch(new coreHeart.ToDoListPageDownAction(this.state));resolve();});
    }
}