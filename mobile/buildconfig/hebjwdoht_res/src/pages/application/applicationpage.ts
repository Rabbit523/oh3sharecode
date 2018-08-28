import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

import { BugsListService, AppState, ActionPageListGroup } from 'oneheart-core';
import { ApplicationBase } from './applicationbase';
import { Store } from '@ngrx/store';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';

@Component({
    selector: 'applicationpage',
    templateUrl: 'applicationpage.html'
})
export class ApplicationPage extends ApplicationBase {

    constructor(public navCtrl: NavController, public eventListSer: BugsListService,
        public events: Events, public store$: Store<AppState>) {
        super(navCtrl, events, eventListSer, store$);
    }
    SubscribeCompany() { }

    SetApplicationPageList(): ActionPageListGroup[] { return [new ActionPageListGroup("个人", [ApplicationFirstBasePage.myunfinished]), new ActionPageListGroup("团队", [ApplicationFirstBasePage.supervise, ApplicationFirstBasePage.teamevent, ApplicationFirstBasePage.allevent])]; }
}