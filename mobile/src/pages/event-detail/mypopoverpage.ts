import { Component } from '@angular/core';
import {  Events, ViewController } from 'ionic-angular';
import * as  coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';
@Component({
    template: `
    <ion-list class="popover-page">      
      <ion-item *ngFor="let item of state" class="text-athelas">
        <ion-label (click)="setdetailviewid(item.key)">{{item.value}}</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class MyPopOverPage {

    state: coreHeart.IntKeyValue[];
    constructor(public events: Events,public viewCtrl:ViewController , public store$: Store<coreHeart.AppState>) {
        this.store$.select(s => s.EventDetail.menuList).subscribe(data => {
            this.state = data;
        })
    }
    setdetailviewid(id: number) {
        this.events.publish(coreHeart.EventConst.Event_DetailViewChangeClick, id);
        if(this.viewCtrl)
        this.viewCtrl.dismiss();
    }
}
