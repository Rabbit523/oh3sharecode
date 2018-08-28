//import { Webapi } from 'oneheart-core';
import { Utils, StaticCache} from 'oneheart-core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'personpicorname',
  templateUrl: 'personpicorname.html'
})
export class PersonPicOrNameComponent {
  @Input() small: boolean = false;
  @Input()
  set PersonPicurl(value: string) {
    this.HasPersonPicurl = ((value != null) && (value != ""));
    if (this.HasPersonPicurl) {
      if (Utils.isUrlAddress(value))
        this._PersonPicurl = value;
      else
        this._PersonPicurl = StaticCache.Config.baseurl + value;
    }
  }

  get PersonPicurl(): string {
    return this._PersonPicurl;
  }

  @Input()
  set PersonName(value: string) {
    this._PersonName = value;
    this.PersonLastName = Utils.getLastCharactors(this._PersonName, 4);
  }
  get PersonName(): string {
    return this._PersonName;
  }


  PersonLastName: string = "";
  _PersonName: string = "";


  _PersonPicurl: string = "";
  HasPersonPicurl: boolean = false;

}
