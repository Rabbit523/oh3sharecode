import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { EventComment } from './event-comment';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'problemcomplate',
    templateUrl: 'problemcomplate.html'
})

export class ProblemComplate extends EventComment {

    constructor(public navParams: NavParams, protected view: ViewController
        , protected userdata: coreHeart.StorageService, public events: Events
        , public store$: Store<coreHeart.AppState>) {
        super(navParams, view, events, store$);
    }

    doprocess(buttonnum: number) {
        if (buttonnum == 1) {
            let comment = coreHeart.StaticCache.Config.PersonalizationJson.ClaimData.UsFirstname + " &lt;br/&gt;  "
                + this.state.comment + " [" + this.state.commentHeader + "]";
            this.store$.dispatch(new coreHeart.EventCommentSetCommentAction(comment));
            this.saveComment();
        }
        else {
            this.viewdismiss(false);
        }
    }
   
    get platformIsMobileWeb() { return coreHeart.StaticCache.Config.platformIsMobileWeb; }
}