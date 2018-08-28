import { KeyIconName } from 'oneheart-core';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FabContainer } from 'ionic-angular';

@Component({
  selector: 'eventdetailcommands',
  templateUrl: 'eventdetailcommands.component.html',
})

export class EventdetailCommandsComponent {
  @ViewChild('ionFab') fab: FabContainer
  @Input() commands = new Array<KeyIconName>();
  @Output() buttonprocess = new EventEmitter<string>();
  @Output() GoBack = new EventEmitter<string>();

  CommandClick(btnkey: string) {
    this.fab.close();//要延时 不然不会关闭
    setTimeout(() => { this.buttonprocess.emit(btnkey); }, 500);
  }
  ClosePage() {
    this.GoBack.emit("");
  }
}