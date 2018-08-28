import * as coreHeart from 'oneheart-core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eventdetailcommandstoolbar',
  templateUrl: 'eventdetailcommandstoolbar.component.html',
})

export class EventdetailCommandsToolbarView {

  constructor() { }

  @Input() commands: Array<coreHeart.KeyIconName> = new Array<coreHeart.KeyIconName>();
  @Output() buttonprocess: EventEmitter<string> = new EventEmitter<string>();  
  @Input() statusdisplay: boolean = false;
  @Input()
  get status(): boolean {
    return this._status;
  }
  set status(val: boolean) {
    this._status = val;
    if (val) { //完成
      this.commandFixed = coreHeart.EventDetailBasePageHelper.GetKeyValue(coreHeart.EventCommand.BugUnComplate);
    }
    else { //未完成
      this.commandFixed = coreHeart.EventDetailBasePageHelper.GetKeyValue(coreHeart.EventCommand.BugComplate);
    }
  }
  private _status: boolean = false;
  commandFixed: coreHeart.KeyIconName;
  CommandClick(btnkey: string) {
    setTimeout(() => { this.buttonprocess.emit(btnkey); }, 500);
  }  
}