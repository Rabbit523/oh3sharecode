import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as coreHeart from 'oneheart-core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'eventtimetask',
  templateUrl: 'eventtimetask.component.html',
})

export class EventTimeTask {
  @Input() ExplanationTask: coreHeart.BugTaskBaseModel[] = new Array<coreHeart.BugTaskBaseModel>();
  @Input() ExplanationTaskComplate: boolean[] = new Array<boolean>();
  @Output() ItemTextClick: EventEmitter<number> = new EventEmitter<number>();
  constructor(public store$: Store<coreHeart.AppState>) { }

  ItemClick(id: number, index: number) {
    if (!this.ExplanationTaskComplate[index])
      this.ItemTextClick.emit(id);
  }

  GridCheckBoxClick(index: number) {
    let para = { Bgid: this.ExplanationTask[index].BugId, action: this.ExplanationTask[index].Id };    
    this.store$.dispatch(new coreHeart.EventDetailSetTaskStateAction(para));
  }
}