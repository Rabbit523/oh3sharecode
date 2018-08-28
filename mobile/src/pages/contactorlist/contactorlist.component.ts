import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as coreHeart from 'oneheart-core';

@Component({
  selector: 'contactorlistcomponent',
  templateUrl: 'contactorlist.component.html'
})

export class ContactorPageList {
  @Input() state:coreHeart.ContactorslistState;
  @Output() itemTapped: EventEmitter<coreHeart.ContactorPerson>= new EventEmitter<coreHeart.ContactorPerson>();
  speakerItemTapped(speaker: coreHeart.ContactorPerson) {
    this.itemTapped.emit(speaker);
  }
}
