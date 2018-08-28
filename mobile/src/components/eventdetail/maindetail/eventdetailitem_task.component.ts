import { Component, Input } from '@angular/core';
import { EventFieldDisplay, JsonDictionary } from 'oneheart-core';
import { FieldDisplayBase } from './fielddisplaybase';

@Component({
  selector: 'eventdetailitemtask',
  templateUrl: 'eventdetailitem_task.component.html',
})

export class EventDetailItemTask extends FieldDisplayBase {
  shortdesc: EventFieldDisplay;
  OrganizatoinName: EventFieldDisplay;
  AssignToName: EventFieldDisplay;
  BugParticipantsName: EventFieldDisplay;
  PlannedEndDate: EventFieldDisplay;
  @Input()
  set MainDisplayDictionary(value: JsonDictionary<EventFieldDisplay>) {
    this._MainDisplayDictionary = value;
    this.shortdesc = this.getMDisplayField("shortdesc");
    this.OrganizatoinName = this.getMDisplayField("OrganizatoinName");
    this.AssignToName = this.getMDisplayField("AssignToName");
    this.PlannedEndDate = this.getMDisplayField("PlannedEndDate");
  }

  get MainDisplayDictionary(): JsonDictionary<EventFieldDisplay> {
    return this._MainDisplayDictionary;
  }



  @Input()
  set ExtDisplayDictionary(value: JsonDictionary<EventFieldDisplay>) {
    this._ExtDisplayDictionary = value;
    this.BugParticipantsName = this.getEDisplayField("BugParticipantsName");
  }

  get ExtDisplayDictionary(): JsonDictionary<EventFieldDisplay> {
    return this._ExtDisplayDictionary;
  }


}
