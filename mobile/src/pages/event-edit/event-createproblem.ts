import { Component } from '@angular/core';
import { Events, NavParams, ViewController, AlertController } from 'ionic-angular';
import { EventEditBasePage } from './event-editbase';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { PageUtils } from '../../shared/models/cache/pageutils';

@Component({
    selector: 'page-event-createproblem',
    templateUrl: 'event-createproblem.html'
})

export class EventCreateProblemPage extends EventEditBasePage {

    constructor(public navParams: NavParams, protected view: ViewController, public events: Events, public store$: Store<coreHeart.AppState>, public alert: AlertController) {
        super(navParams, view, events, store$);        
    }

    get platformIsMobileWeb() { return coreHeart.StaticCache.Config.platformIsMobileWeb; }


    MoveTo(value: coreHeart.PlaceInfo) {
        if (coreHeart.Utils.isNullOrEmpty(this.fieldProblemFrom.cd_value)) {
            this.fieldProblemFrom.cd_value = value.position;
        }
        if (coreHeart.Utils.isNullOrEmpty(this.editState.Item.shortdesc)) {
            var user = coreHeart.ContactorCacheHelper.GetContactorByName(coreHeart.StaticCache.Config.username);
            var us_firstname = user.us_firstname;
            this.editState.Item.shortdesc = coreHeart.Utils.NowTime() + us_firstname + '在' + value.position + '发现了一个问题';
        }
    }
    doprocessClick(buttonnum: number) {
        if (buttonnum == 1) {
            if (this.ValidateModel()) {
                coreHeart.EventDetailJsonHelper.SetAFieldbyCustomFieldNameID(this.editState, coreHeart.DBProblem.WorkFlowStatus, "新增");
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.From, this.fieldProblemFrom);
                this.doprocess(this.editState);
            }
            else
                PageUtils.ShowPromt(this.alert);
        }
        else {
            this.doprocess(null);
        }
    }

    ValidateModel(): boolean {
        return this.editState.Item.shortdesc.length > 0;
    }
}