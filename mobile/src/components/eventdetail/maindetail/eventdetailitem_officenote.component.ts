import { EventFieldDisplay, JsonDictionary } from 'oneheart-core';
import { Component, Input } from '@angular/core';
import { FieldDisplayBase } from './fielddisplaybase';

@Component({
  selector: 'eventdetailitemofficenote',
  templateUrl: 'eventdetailitem_officenote.component.html',
})

export class EventDetailItemOfficeNote extends FieldDisplayBase{
  shortdesc: EventFieldDisplay;

  @Input()
  set MainDisplayDictionary(value: JsonDictionary<EventFieldDisplay>) {
    this._MainDisplayDictionary = value;
    this.shortdesc =this.getMDisplayField("shortdesc");
  }
  get MainDisplayDictionary(): JsonDictionary<EventFieldDisplay> {
    return this._MainDisplayDictionary;
  }
  
  @Input()
  set ExtDisplayDictionary(value: JsonDictionary<EventFieldDisplay>) {
    this._ExtDisplayDictionary = value;
  }

  get ExtDisplayDictionary(): JsonDictionary<EventFieldDisplay> {
    return this._ExtDisplayDictionary;
  }  
}