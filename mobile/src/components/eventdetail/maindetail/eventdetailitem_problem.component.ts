import { Component, Input } from '@angular/core';
import { EventFieldDisplay, JsonDictionary } from 'oneheart-core';
import { FieldDisplayBase } from './fielddisplaybase';

@Component({
  selector: 'eventdetailitemproblem',
  templateUrl: 'eventdetailitem_problem.component.html',
})


export class EventDetailItemProblem extends FieldDisplayBase{
  shortdesc: EventFieldDisplay;
  fieldProblemFrom: EventFieldDisplay;
  fieldProblemResponsibleDepart: EventFieldDisplay;
  fieldProblemResponsiblePerson: EventFieldDisplay;
  fieldProblemCoordinateDepart: EventFieldDisplay;
  fieldProblemSuperviseDepart: EventFieldDisplay;
  fieldProblemMajorPerson: EventFieldDisplay;
  fieldProblemType: EventFieldDisplay;
  fieldProblemLevel: EventFieldDisplay;
  fieldProblemProcessType: EventFieldDisplay;
  fieldProblemChange: EventFieldDisplay;
  PlanDate: EventFieldDisplay;

  @Input()
  set MainDisplayDictionary(value: JsonDictionary< EventFieldDisplay>) {
    this._MainDisplayDictionary = value;
    this.shortdesc =this.getMDisplayField("shortdesc");
  }

  get MainDisplayDictionary(): JsonDictionary< EventFieldDisplay> {
    return this._MainDisplayDictionary;
  }
  
  @Input()
  set ExtDisplayDictionary(value: JsonDictionary< EventFieldDisplay>) {
    this._ExtDisplayDictionary = value;
    this.fieldProblemFrom = this. getEDisplayField("fieldProblemFrom");
    this.fieldProblemResponsibleDepart = this. getEDisplayField("fieldProblemResponsibleDepart");
    this.fieldProblemResponsiblePerson = this. getEDisplayField("fieldProblemResponsiblePerson");
    this.fieldProblemCoordinateDepart = this. getEDisplayField("fieldProblemCoordinateDepart");
    this.fieldProblemSuperviseDepart = this. getEDisplayField("fieldProblemSuperviseDepart");
    this.fieldProblemMajorPerson = this. getEDisplayField("fieldProblemMajorPerson");
    this.fieldProblemType = this. getEDisplayField("fieldProblemType");
    this.fieldProblemLevel =this. getEDisplayField("fieldProblemLevel");
    this.fieldProblemProcessType = this. getEDisplayField("fieldProblemProcessType");
    this.fieldProblemChange = this. getEDisplayField("fieldProblemChange");
    this.PlanDate = this. getEDisplayField("PlanDate");
  }
  get ExtDisplayDictionary(): JsonDictionary< EventFieldDisplay> {
    return this._ExtDisplayDictionary;
  }
  
}