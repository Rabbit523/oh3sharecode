import { Component, Input } from '@angular/core';
import { EventFieldDisplay, JsonDictionary } from 'oneheart-core';
import { FieldDisplayBase } from './fielddisplaybase';

@Component({
  selector: 'eventdetailitem',
  templateUrl: 'eventdetailitem.component.html',
})

export class EventDetailItem extends FieldDisplayBase{

  shortdesc: EventFieldDisplay;
  ProjectName: EventFieldDisplay;
  OrganizatoinName: EventFieldDisplay;
  AssignToName: EventFieldDisplay;
  CategoryName: EventFieldDisplay;
  StatusName: EventFieldDisplay;
  PriorityName: EventFieldDisplay;

  @Input()
  set MainDisplayDictionary(value: JsonDictionary<EventFieldDisplay>) {
    this._MainDisplayDictionary = value;
    this.shortdesc = this.getMDisplayField("shortdesc");
    this.ProjectName = this.getMDisplayField("ProjectName");
    this.OrganizatoinName = this.getMDisplayField("OrganizatoinName");
    this.AssignToName = this.getMDisplayField("AssignToName");
    this.CategoryName = this.getMDisplayField("CategoryName");
    this.StatusName = this.getMDisplayField("StatusName");
    this.PriorityName = this.getMDisplayField("PriorityName");
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