import { Component, Input, OnChanges } from '@angular/core';
import { Utils } from 'oneheart-core';

@Component({
  selector: 'namedatephonecomponent',
  templateUrl: 'namedatephonecomponent.html'
})
export class NameDatePhoneComponent implements OnChanges {
  ngOnChanges() {
    if (this.PhoneNo && Utils.IsAPhoneNumber(this.PhoneNo)) {
      this.CallColor = "favorite";
    }
  }
  @Input() PhoneNo: string;
  @Input() Description: string = "";
  @Input() PersonName: string = "";

  CallColor: string = "textbgc";
  openCall(value: string) {
    if (this.CallColor == "favorite") {
      window.open('tel:' + value);
    }
  }

}
