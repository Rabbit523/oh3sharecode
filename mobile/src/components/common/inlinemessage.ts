import { Component } from "@angular/core";
import { Events } from "ionic-angular";
import * as coreHeart from 'oneheart-core';
export class InLineMessageModel { show: boolean; msg: string; }

@Component({
    selector: "inlinemessage",
    templateUrl: 'inlinemessage.html'
})
export class InLineMessage {
    constructor(public events: Events) {
        this.events.unsubscribe(coreHeart.EventConst.System_InLineMsg);
        this.events.subscribe(coreHeart.EventConst.System_InLineMsg, (msg) => {
            this.InLineMsg = msg;
        });
    }
    InLineMsg = { show: false, msg: "" };
    HiddenCard() {
        this.InLineMsg.show = false;
    }
}