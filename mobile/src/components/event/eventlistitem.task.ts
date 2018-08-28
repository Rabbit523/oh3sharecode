import { BugDtoModel } from 'oneheart-core';
import { EventListItemBase } from './eventlistitembase';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'eventlistitemtask',
  templateUrl: 'eventlistitem.task.html',
})
export class EventListItemTask extends EventListItemBase {
  @Output() eventclick = new EventEmitter<number>();
  @Input()
  set item(value: BugDtoModel) {
    this.setitem(value);
  }
  get item(): BugDtoModel {
    return this._item;
  }
  btnClick(bgid: number) {
    this.eventclick.emit(bgid);
  }
}