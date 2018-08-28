import { Component } from '@angular/core';
import { NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { EventEditBasePage } from './event-editbase';
import { Store } from '@ngrx/store';
import * as coreHeart from 'oneheart-core';
import { PageUtils } from '../../shared/models/cache/pageutils';
@Component({
    selector: 'page-event-reportproblem',
    templateUrl: 'event-reportproblem.html'
})

export class EventReportProblemPage extends EventEditBasePage {


    constructor(public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public store$: Store<coreHeart.AppState>, public alert: AlertController) {
        super(navParams, viewCtrl, events, store$);
    }

    validataModel(): boolean {
        return this.editState.Item.shortdesc.length > 0 &&
            this.bugProblem.fieldProblemResponsiblePerson.Item.cd_value.length > 0;
    }

    doprocessClick(id: number) {
        if (id == 1) {
            if (this.validataModel()) {
                this.bugProblem.fieldProblemWorkFlowStatus.cd_value = coreHeart.ApplicationProblem.problemWorkflowstatusreport;
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.WorkFlowStatus, this.bugProblem.fieldProblemWorkFlowStatus);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.From, this.bugProblem.fieldProblemFrom.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.ResponsibleDepart, this.bugProblem.fieldProblemResponsibleDepart.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.Type, this.bugProblem.fieldProblemType.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.Level, this.bugProblem.fieldProblemLevel.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.ProcessType, this.bugProblem.fieldProblemProcessType.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.ResponsiblePerson, this.bugProblem.fieldProblemResponsiblePerson.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.MajorPerson, this.bugProblem.fieldProblemMajorPerson.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.CoordinateDepart, this.bugProblem.fieldProblemCoordinateDepart.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.SuperviseDepart, this.bugProblem.fieldProblemSuperviseDepart.Item);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.Change, this.bugProblem.fieldProblemChange);
                coreHeart.EventDetailJsonHelper.SaveAFieldbyCustomLabel(this.editState, coreHeart.DBProblem.EndDate, this.bugProblem.fieldProblemEndDate);
                this.doprocess(this.editState);
            } else {
                PageUtils.ShowPromt(this.alert);
            }
        } else {
            this.doprocess(null);
        }
    }
}