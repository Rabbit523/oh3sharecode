import { Component } from '@angular/core';
import { Events, NavParams, ViewController, AlertController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { PageUtils } from '../../shared/models/cache/pageutils';

@Component({
  selector: 'eventchildtask',
  templateUrl: 'eventchildtask.html',
})

export class EventChildTask {
  ionViewWillUnload(): void {
    this.events.unsubscribe(coreHeart.EventConst.Event_BugItemUpdated);
    this.events.unsubscribe(coreHeart.EventConst.Event_UpdatePostTimeout);
  }
  ionViewDidLoad(): void {
    this.events.subscribe(coreHeart.EventConst.Event_BugItemUpdated, () => { this.events.publish(coreHeart.EventConst.Event_BugListRefresh); this.viewdismiss(true); });
    this.events.subscribe(coreHeart.EventConst.Event_UpdatePostTimeout, () => { this.viewdismiss(true); });
  }
  state: coreHeart.EventChildTaskState;

  constructor(public navParams: NavParams, protected view: ViewController
    , public events: Events, public alert: AlertController, public store$: Store<coreHeart.AppState>) {
    this.store$.select(s => s.EventChildTask).subscribe(x => { this.state = x; this.EventChildChanges(); });
    store$.dispatch(new coreHeart.EventChildTaskShowAction(navParams.data as coreHeart.ChildTaskModel));
  }

  doprocessClcik(id: number) {
    if (id == 1) {
      if (this.ValidateModel())
        this.store$.dispatch(new coreHeart.EventChildTaskUpdatePostAction(this.newstate))
      else
        PageUtils.ShowPromt(this.alert);
    }
    else
      this.viewdismiss(false);
  }

  viewdismiss(val: boolean) {
    if(this.view)
    this.view.dismiss({ data: val });
  }

  newstate: coreHeart.EventChildTaskState;
  EventChildChanges() {
    this.newstate = JSON.parse(JSON.stringify(this.state));
  }


  ValidateModel() {
    return this.newstate.itemEdit.Item.Description.length > 0;
  }

  SetDate(SelectedPlanDate: string) {
    this.newstate.itemEdit.Item.PlannedEndDate = SelectedPlanDate;
  }
}