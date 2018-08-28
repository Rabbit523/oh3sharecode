import { Component, ViewChild } from '@angular/core';
import { Events, ModalController, NavController, Slides } from 'ionic-angular';
import { FirstPageBase } from './firstpagebase';
import { Store } from '@ngrx/store';
import { EventDetailService, AppState, ActionPageListGroup } from 'oneheart-core';
import { SearchPage } from './search/search';
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
    search() {
        this.navCtrl.push(SearchPage);
    }
    SetfirstPageList(): ActionPageListGroup[] {
        return [new ActionPageListGroup("", [ApplicationFirstBasePage.receivedlist, ApplicationFirstBasePage.newgeneral, ApplicationFirstBasePage.waitprocess])];
    }

    @ViewChild("mySlides") slides: Slides;
    sildePic: Array<string> = ["assets/img/ica-slidebox-img-3.png", "assets/img/ica-slidebox-img-2.png"];

    ionViewDidEnter() {
        this.slides.startAutoplay();
    }
    ionViewDidLeave() {
        this.slides.stopAutoplay();
    }
}