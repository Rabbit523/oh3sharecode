import { NavParams, ViewController, Events } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
import { EventDetailBasePage } from '../event-detail/event-detailbase';

export class EventEditBasePage extends EventDetailBasePage {

  editState: coreHeart.EventDetailJson = new coreHeart.EventDetailJson();
  fieldProblemFrom: coreHeart.CustomFieldsModel = new coreHeart.CustomFieldsModel();
  bugProblem: coreHeart.BugProblem = new coreHeart.BugProblem();
  PostImgArray: Array<coreHeart.ImgthumbModel> = new Array<coreHeart.ImgthumbModel>();

  subChange() {
    let temp = JSON.parse(JSON.stringify(this.state.ItemMain));
    if (temp.ActionType == coreHeart.EventActionType.Problem) {
      this.fieldProblemFrom = Object.assign({}, coreHeart.EventDetailJsonHelper.GetAFieldbyCustomFieldNameID(temp, coreHeart.DBProblem.From));
      this.bugProblem = coreHeart.EventDetailJsonHelper.GetBugProblem(temp, this.state.CustomDropdownDefine);
      this.PostImgArray=[];
    }
    if (Number(this.state.ItemMain.Item.project) == 0) { }
    this.editState = temp;
  }


  file: any;
  constructor(public navParams: NavParams, protected view: ViewController, public events: Events, public store$: Store<coreHeart.AppState>) {
    super(events, navParams, store$);
    this.setdata = this.subChange;
  }

  ionViewWillUnload() {
    this.events.unsubscribe(coreHeart.EventConst.Event_BugItemCreated);
    this.events.unsubscribe(coreHeart.EventConst.Event_BugItemUpdated);
    this.events.unsubscribe(coreHeart.EventConst.Event_UpdatePostTimeout);
  }
  ionViewDidEnter() {
    this.events.subscribe(coreHeart.EventConst.Event_BugItemCreated, () => {
      this.events.publish(coreHeart.EventConst.Event_BugListRefresh);
      this.events.publish(coreHeart.EventConst.Event_NewBugCreatedNavGo);
      this.viewdismiss(true);
    });
    this.events.subscribe(coreHeart.EventConst.Event_BugItemUpdated, () => {
      this.events.publish(coreHeart.EventConst.Event_BugListRefresh);
      this.viewdismiss(true);
    });
    this.events.subscribe(coreHeart.EventConst.Event_UpdatePostTimeout, () => {
      this.viewdismiss(true);
    });
  }

  SetPath(ary: Array<string>) {
    this.file = ary;
  }
  doprocess(newstate: coreHeart.EventDetailJson) {
    if (newstate) {
      this.store$.dispatch(new coreHeart.EventDetailUploadPostWithEventAction(<coreHeart.EventDetailState>{ postfile: this.file, ItemMain: newstate }));
    }
    else {
      this.viewdismiss(false);
    }
  }
  viewdismiss(val: boolean) {
    if (this.view)
      this.view.dismiss({ data: val });
  }
}