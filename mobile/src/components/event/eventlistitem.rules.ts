import { BugDtoModel } from 'oneheart-core';
import { EventListItemBase } from './eventlistitembase';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'eventlistitemrules',
  templateUrl: 'eventlistitem.rules.html', // 'eventlistitem1.component.html',  
})

export class EventListItemRules extends EventListItemBase {
  @Output()
  eventclick = new EventEmitter<number>();//点击按钮出发的事件
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