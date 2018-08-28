import { Component, EventEmitter, Output, Input } from '@angular/core';
import { EventListItemBase } from '../../../components/event/eventlistitembase';
import { BugDtoModel } from 'oneheart-core';

@Component({
    selector:"todocomponent",
    templateUrl:"todo.component.html"
})
export class ToDoComponent extends EventListItemBase {
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