import { Component } from '@angular/core';
import { NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { EventEditBasePage } from './event-editbase';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core'
import { PageUtils } from '../../shared/models/cache/pageutils';

@Component({
    selector: 'page-event-editproblem',
    templateUrl: 'event-editproblem.html'
})

export class EventEditProblemPage extends EventEditBasePage {

    constructor(public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public store$: Store<coreHeart.AppState>, public alert: AlertController) {
        super(navParams, viewCtrl, events, store$);                
    }

    get platformIsMobileWeb() { return coreHeart.StaticCache.Config.platformIsMobileWeb; }


    DoprocessClick(buttonnum: number) {
        if (buttonnum == 1) {
            if (this.ValidateModel()) {
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.From, this.bugProblem.fieldProblemFrom.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.ResponsibleDepart, this.bugProblem.fieldProblemResponsibleDepart.Item);
                this.doprocess(this.editState);
            }
            else
                PageUtils.ShowPromt(this.alert);
        } else {
            this.doprocess(null);
        }
    }

    ValidateModel(): boolean {
        return this.editState.Item.shortdesc.length > 0;
    }    
}
