import { DateConvertBaseHelper } from 'oneheart-core';
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'ionitemdatetime',
  templateUrl: 'ionitemdatetime.component.html'
})
export class IonItemDateTimeComponent implements OnChanges {
  SelectedPlanDate: string;
  defaultPlanDate: string;

  @Input() DateFormat: string;
  @Input() LabelName: string;
  @Input() PlannedEndDate: string;
  @Output() SetDate = new EventEmitter<string>();

  DateChange() {
    this.SelectedPlanDate = DateConvertBaseHelper.getCsharpDateStr(this.defaultPlanDate);
    this.SetDate.emit(this.SelectedPlanDate);
  }

  ngOnChanges(): void {
    if (this.PlannedEndDate)
      this.InitDate();
  }

  InitDate() {
    if (this.PlannedEndDate) {
      this.defaultPlanDate = DateConvertBaseHelper.getDateStrFromCsharp(this.PlannedEndDate);
      this.SelectedPlanDate = this.defaultPlanDate.replace("T", " ");
    }
    else {
      this.defaultPlanDate = DateConvertBaseHelper.NextDay();
    }
  }
}