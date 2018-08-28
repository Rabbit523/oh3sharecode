import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as coreHeart from 'oneheart-core';
import { Events } from 'ionic-angular';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import { EventListMenuBase } from './eventlistmenubase';

@Component({
    selector: "eventlistmenufiltercontent",
    templateUrl: "eventlistmenufiltercontent.html"
})
export class EventListMenuFilterContent  extends EventListMenuBase implements OnChanges {

    @Input() filter: coreHeart.PageTitleAndFuntype;
    @Output() setDropDownValue = new EventEmitter<coreHeart.DropDownFilterUrlModel>();
    @Input() showview: boolean;

    constructor(public events: Events, public store$: Store<coreHeart.AppState>) {
        super(events,store$);
    }

    ngOnChanges() {
        this.filterChanges(this.filter);
    }

    viewclick(id: number) {
        this.doClick(id);
        this.setDropDownValue.emit(null);//close menu
    }

    MenuFilter(act: number) {
        this.setDropDownValue.emit(act == 1 ? this._DropDownValue : null);
    }
}