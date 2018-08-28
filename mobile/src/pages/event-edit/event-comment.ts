import { Component } from '@angular/core';
import { Events, NavParams, ViewController } from 'ionic-angular';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-eventcomment',
  templateUrl: 'event-comment.html'
})

export class EventComment {
  state: coreHeart.EventCommentState;
  get platformIsMobileWeb() { return coreHeart.StaticCache.Config.platformIsMobileWeb; }
  constructor(public navParams: NavParams, protected view: ViewController, public events: Events
    , public store$: Store<coreHeart.AppState>) {
    this.store$.select(s => s.EventComment).subscribe(state => this.state = Object.assign({}, state));
  }
  ionViewDidLoad() {
    this.store$.dispatch(new coreHeart.EventCommentShowAction({ bgid: this.navParams.data.Bgid, comheader: this.navParams.data.header, contentType: this.navParams.data.contentType }));
    this.events.subscribe(coreHeart.EventConst.Event_NewCommentPosted, () => { this.viewdismiss(true); });
    this.events.subscribe(coreHeart.EventConst.Event_UpdatePostTimeout, () => { this.viewdismiss(true); });
  }

  ionViewWillUnload() {
    this.events.unsubscribe(coreHeart.EventConst.Event_NewCommentPosted);
    this.events.unsubscribe(coreHeart.EventConst.Event_UpdatePostTimeout);
  }

  SetPath(ary: Array<string>) {
    this.state.files = ary;
  }

  saveComment() {
    this.store$.dispatch(new coreHeart.EventCommentSaveCommentAction(this.state));
  }
  
  doprocess(buttonnum: number) {
    if (buttonnum == 1) {
      this.saveComment();
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
