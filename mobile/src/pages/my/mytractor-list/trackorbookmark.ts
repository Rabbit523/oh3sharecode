import { NavController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { EventDetailPage } from '../../event-detail/event-detail';

export class TractorBookMarkPage {
    state: coreHeart.TractorBookMarkPageState;
    constructor(public modalCtrl: NavController, public store$: Store<coreHeart.AppState>
    ) {
        this.store$.select(s => s.TractorBookMark).subscribe(state => { this.state = Object.assign({}, state) })
    }
    goToEventDetail(bugid: number) {
        this.modalCtrl.push(EventDetailPage, { Bgid: bugid });
    }
    public openMail(value: string) {
        window.open('mailto:' + value);
    }
}