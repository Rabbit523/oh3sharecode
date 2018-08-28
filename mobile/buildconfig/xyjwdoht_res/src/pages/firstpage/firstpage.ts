import { Component } from '@angular/core';
import { Events, ModalController, NavController } from 'ionic-angular';
import { FirstPageBase } from './firstpagebase';
import { Store } from '@ngrx/store';
import { EventDetailService, AppState, ActionPageListGroup } from 'oneheart-core';
import { ApplicationFirstBasePage } from '../applicationfirstbasepage';
@Component({
    selector: 'firstpage',
    templateUrl: 'firstpage.html'
})
export class FirstPage extends FirstPageBase {

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events
        , public detailservice: EventDetailService, public store$: Store<AppState>) {
        super(navCtrl, modalCtrl, events, detailservice, store$);
        this.SubscribeCompany = () => { this.SubscribeCompany_TodoAndRecvived() };
        this.InitFirstPageList();
    }


    SetfirstPageList(): ActionPageListGroup[] {
        return [new ActionPageListGroup("", [ApplicationFirstBasePage.receivedlist, ApplicationFirstBasePage.newtask, ApplicationFirstBasePage.newTransfermachine, ApplicationFirstBasePage.waitprocess])];
    }
}