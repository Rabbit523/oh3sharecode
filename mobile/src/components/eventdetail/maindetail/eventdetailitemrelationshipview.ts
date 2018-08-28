import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as coreHeart from 'oneheart-core';

@Component({
  selector: "eventdetailitemrelationshipview",
  templateUrl: 'eventdetailitemrelationshipview.html'
})
export class EventDetailItemRelationShipView {

  @Input() BugRelations: Array<coreHeart.BugRelationShipView> = new Array<coreHeart.BugRelationShipView>();

  @Output() GotoDetail = new EventEmitter;

  btnClick(id: number) {
    this.GotoDetail.emit(id);
  }
}