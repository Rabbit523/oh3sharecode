import { Component } from '@angular/core';
import { NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { EventEditBasePage } from './event-editbase';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core'
import { PageUtils } from '../../shared/models/cache/pageutils';

@Component({
    selector: 'page-event-edittask',
    templateUrl: 'eventedittask.html'
})

export class EventEditTaskPage extends EventEditBasePage {
    constructor(public navParams: NavParams, protected view: ViewController, public events: Events
        , public alert: AlertController, public store$: Store<coreHeart.AppState>) {
        super(navParams, view, events, store$);

    }
    get platformIsMobileWeb() { return coreHeart.StaticCache.Config.platformIsMobileWeb; }
    

    ValidateModel(): boolean {
        return this.editState.Item.shortdesc.length > 0 &&
            Number(this.editState.Item.project) > 0 &&
            Number(this.editState.Item.assignedto) > 0;
    }

    doprocessClick(num: boolean) {
        if (num) {
            if (this.ValidateModel())
                this.doprocess(this.editState);
            else
                PageUtils.ShowPromt(this.alert);
        } else {
            this.doprocess(null);
        }
    }

}